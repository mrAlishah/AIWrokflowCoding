import { validateRuntimeState } from "./validate_runtime_state.mjs";

const fingerprint = /^sha256:[a-f0-9]{64}$/;
const identifier = /^[A-Za-z][A-Za-z0-9_.:-]{0,127}$/;
const correlationFields = ["decision_id", "request_identity", "request_fingerprint"];
const responseValues = new Set(["APPROVE", "REJECT", "CANCEL"]);
const eventShapes = {
  PERSIST_HUMAN_REQUEST: new Set(["type", ...correlationFields]),
  RECORD_HUMAN_RESPONSE: new Set(["type", ...correlationFields]),
  VALIDATE_HUMAN_RESPONSE: new Set(["type", ...correlationFields]),
  CONSUME_HUMAN_RESPONSE: new Set(["type", ...correlationFields, "response"]),
  MARK_RESPONSE_STALE: new Set(["type", ...correlationFields]),
  MARK_RESPONSE_CONFLICT: new Set(["type", ...correlationFields]),
  SUPERSEDE_HUMAN_REQUEST: new Set(["type", ...correlationFields]),
  UPDATE_TECHNICAL_BLOCK: new Set(["type", "blocked", "missing_capabilities"]),
  APPLY_POLICY_TERMINAL: new Set(["type"]),
  APPLY_INVALID_UPSTREAM_TERMINAL: new Set(["type"]),
  APPLY_UNRECOVERABLE_FAILURE: new Set(["type"])
};

function fail(status, code) { return { status, errors: [{ code }], warnings: [] }; }
function unchanged(current) { return { status: "unchanged", changed: false, candidate_state: structuredClone(current), errors: [], warnings: [] }; }
function validCorrelation(event) { return typeof event.decision_id === "string" && typeof event.request_identity === "string" && typeof event.request_fingerprint === "string" && identifier.test(event.decision_id) && fingerprint.test(event.request_identity) && fingerprint.test(event.request_fingerprint); }
function validateEvent(event) {
  if (!event || typeof event !== "object" || Array.isArray(event) || !eventShapes[event.type]) return "RUNTIME_TRANSITION_INVALID_INPUT";
  if (Object.keys(event).some((key) => !eventShapes[event.type].has(key)) || [...eventShapes[event.type]].some((key) => key !== "type" && !(key in event))) return "RUNTIME_TRANSITION_INVALID_INPUT";
  if (correlationFields.every((key) => key in event) && !validCorrelation(event)) return "RUNTIME_TRANSITION_INVALID_INPUT";
  if (event.type === "CONSUME_HUMAN_RESPONSE" && !responseValues.has(event.response)) return "RUNTIME_TRANSITION_INVALID_INPUT";
  if (event.type === "UPDATE_TECHNICAL_BLOCK") {
    if (typeof event.blocked !== "boolean" || !Array.isArray(event.missing_capabilities) || event.missing_capabilities.some((value) => typeof value !== "string" || !identifier.test(value)) || new Set(event.missing_capabilities).size !== event.missing_capabilities.length || event.missing_capabilities.some((value, index, values) => index && values[index - 1].localeCompare(value) > 0)) return "RUNTIME_TRANSITION_INVALID_INPUT";
  }
  return null;
}
function sameCorrelation(human, event) { return correlationFields.every((field) => human[field] === event[field]); }
function correlationError(human, event) {
  if (human.decision_id !== event.decision_id) return "RUNTIME_TRANSITION_DECISION_ID_MISMATCH";
  if (human.request_identity !== event.request_identity) return "RUNTIME_TRANSITION_REQUEST_IDENTITY_MISMATCH";
  if (human.request_fingerprint !== event.request_fingerprint) return "RUNTIME_TRANSITION_STALE_RESPONSE";
  return null;
}
function noHumanDecision() { return { required: false, request_status: "none", decision_id: null, request_identity: null, request_fingerprint: null, response_status: "none" }; }
function prepare(current) { const candidate = structuredClone(current); candidate.revision.expected_revision = current.revision.state_revision; return candidate; }
function complete(candidate) {
  const validation = validateRuntimeState(candidate);
  return validation.status === "valid" ? { status: "resolved", changed: true, candidate_state: candidate, errors: [], warnings: [] } : fail("invalid_transition", "RUNTIME_TRANSITION_INVALID_CANDIDATE");
}
function terminal(candidate, reason, preserveHumanDecision = false) { candidate.lifecycle.state = "TERMINAL"; candidate.policy_projection.terminal_reason = reason; if (!preserveHumanDecision) candidate.human_decision = noHumanDecision(); return complete(candidate); }
function requireWaiting(current, event) {
  if (current.lifecycle.state !== "WAITING_FOR_HUMAN" || current.human_decision.request_status !== "pending") return "RUNTIME_TRANSITION_NOT_ALLOWED";
  return correlationError(current.human_decision, event);
}
function consumedOutcome(current, event) {
  const human = current.human_decision;
  if (!sameCorrelation(human, event)) return fail("invalid_transition", correlationError(human, event));
  const expected = current.lifecycle.state === "OPEN" ? "APPROVE" : current.policy_projection.terminal_reason === "HUMAN_REJECTED" ? "REJECT" : current.policy_projection.terminal_reason === "HUMAN_CANCELLED" ? "CANCEL" : null;
  return expected === event.response ? unchanged(current) : fail("conflict", "RUNTIME_TRANSITION_RESPONSE_CONFLICT");
}

/** Pure Step 23 resolver: it transforms already-normalized evidence into a candidate state only. It never reads/writes state, authenticates a response, creates HDR identity, routes workflow, or executes actions. */
export function resolveRuntimeStateTransition({ current_state: current, event } = {}) {
  const currentValidation = validateRuntimeState(current);
  if (currentValidation.status !== "valid") return fail("invalid_input", "RUNTIME_TRANSITION_INVALID_CURRENT_STATE");
  const eventError = validateEvent(event);
  if (eventError) return fail("invalid_input", eventError);
  const nonHumanTerminal = { APPLY_POLICY_TERMINAL: "POLICY_PROHIBITED", APPLY_INVALID_UPSTREAM_TERMINAL: "INVALID_UPSTREAM", APPLY_UNRECOVERABLE_FAILURE: "UNRECOVERABLE_FAILURE" };
  if (event.type in nonHumanTerminal) {
    if (current.lifecycle.state === "TERMINAL") return current.policy_projection.terminal_reason === nonHumanTerminal[event.type] ? unchanged(current) : fail("invalid_transition", "RUNTIME_TRANSITION_NOT_ALLOWED");
    return terminal(prepare(current), nonHumanTerminal[event.type]);
  }
  if (event.type === "CONSUME_HUMAN_RESPONSE" && current.human_decision.response_status === "consumed") return consumedOutcome(current, event);
  if (current.lifecycle.state === "TERMINAL") return fail("invalid_transition", "RUNTIME_TRANSITION_NOT_ALLOWED");
  if (event.type === "UPDATE_TECHNICAL_BLOCK") {
    const candidate = prepare(current); candidate.technical_block = { blocked: event.blocked, missing_capabilities: [...event.missing_capabilities] };
    return candidate.technical_block.blocked === current.technical_block.blocked && JSON.stringify(candidate.technical_block.missing_capabilities) === JSON.stringify(current.technical_block.missing_capabilities) ? unchanged(current) : complete(candidate);
  }
  if (event.type === "PERSIST_HUMAN_REQUEST") {
    if (current.lifecycle.state === "WAITING_FOR_HUMAN") return sameCorrelation(current.human_decision, event) ? unchanged(current) : fail("invalid_transition", "RUNTIME_TRANSITION_NOT_ALLOWED");
    if (!['none', 'superseded'].includes(current.human_decision.request_status)) return fail("invalid_transition", "RUNTIME_TRANSITION_NOT_ALLOWED");
    const candidate = prepare(current); candidate.lifecycle.state = "WAITING_FOR_HUMAN"; candidate.human_decision = { required: true, request_status: "pending", decision_id: event.decision_id, request_identity: event.request_identity, request_fingerprint: event.request_fingerprint, response_status: "none" };
    return complete(candidate);
  }
  if (event.type === "SUPERSEDE_HUMAN_REQUEST") {
    const guard = requireWaiting(current, event); if (guard) return fail("invalid_transition", guard);
    const candidate = prepare(current); candidate.lifecycle.state = "OPEN"; candidate.human_decision = { ...candidate.human_decision, request_status: "superseded", response_status: "none" };
    return complete(candidate);
  }
  if (event.type === "MARK_RESPONSE_STALE") {
    if (current.lifecycle.state !== "WAITING_FOR_HUMAN" || current.human_decision.request_status !== "pending") return fail("invalid_transition", "RUNTIME_TRANSITION_NOT_ALLOWED");
    if (current.human_decision.decision_id !== event.decision_id || current.human_decision.request_identity !== event.request_identity) return fail("invalid_transition", "RUNTIME_TRANSITION_DECISION_ID_MISMATCH");
    if (current.human_decision.request_fingerprint === event.request_fingerprint) return fail("invalid_transition", "RUNTIME_TRANSITION_NOT_ALLOWED");
    if (current.human_decision.response_status === "rejected_stale") return unchanged(current);
    const candidate = prepare(current); candidate.human_decision.response_status = "rejected_stale"; return complete(candidate);
  }
  const guard = requireWaiting(current, event);
  if (guard) return fail(guard === "RUNTIME_TRANSITION_STALE_RESPONSE" ? "stale" : "invalid_transition", guard);
  if (event.type === "RECORD_HUMAN_RESPONSE") {
    if (current.human_decision.response_status === "recorded") return unchanged(current);
    if (current.human_decision.response_status !== "none") return fail("invalid_transition", "RUNTIME_TRANSITION_NOT_ALLOWED");
    const candidate = prepare(current); candidate.human_decision.response_status = "recorded"; return complete(candidate);
  }
  if (event.type === "VALIDATE_HUMAN_RESPONSE") {
    if (current.human_decision.response_status === "validated") return unchanged(current);
    if (current.human_decision.response_status !== "recorded") return fail("invalid_transition", "RUNTIME_TRANSITION_NOT_ALLOWED");
    const candidate = prepare(current); candidate.human_decision.response_status = "validated"; return complete(candidate);
  }
  if (event.type === "MARK_RESPONSE_CONFLICT") {
    if (current.human_decision.response_status === "conflicting") return unchanged(current);
    if (!["none", "recorded", "validated", "rejected_stale"].includes(current.human_decision.response_status)) return fail("invalid_transition", "RUNTIME_TRANSITION_NOT_ALLOWED");
    const candidate = prepare(current); candidate.human_decision.response_status = "conflicting"; return complete(candidate);
  }
  if (event.type === "CONSUME_HUMAN_RESPONSE") {
    if (current.human_decision.response_status === "consumed") return consumedOutcome(current, event);
    if (current.human_decision.response_status !== "validated") return fail("invalid_transition", "RUNTIME_TRANSITION_NOT_ALLOWED");
    const candidate = prepare(current); candidate.human_decision = { ...candidate.human_decision, request_status: "terminal", response_status: "consumed" };
    if (event.response === "APPROVE") { candidate.lifecycle.state = "OPEN"; return complete(candidate); }
    return terminal(candidate, event.response === "REJECT" ? "HUMAN_REJECTED" : "HUMAN_CANCELLED", true);
  }
  return fail("invalid_input", "RUNTIME_TRANSITION_INVALID_INPUT");
}
