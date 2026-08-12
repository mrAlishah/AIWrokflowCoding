import { validateRuntimeState } from "./validate_runtime_state.mjs";

const identifier = /^[A-Za-z][A-Za-z0-9_.:-]{0,127}$/;
const policyGates = new Set(["SATISFIED", "PROHIBITED", "UNRESOLVED"]);
const implementationStatuses = new Set(["COMPLETE", "INCOMPLETE"]);
const verificationStatuses = new Set(["NOT_REQUIRED", "REQUIRED", "IN_PROGRESS", "EVIDENCE_CURRENT", "FAILED", "BLOCKED", "STALE"]);
const reviewRequirementStatuses = new Set(["REQUIRED", "NOT_REQUIRED", "UNRESOLVED"]);
const reviewResultStatuses = new Set(["NOT_STARTED", "IN_PROGRESS", "APPROVED_CURRENT", "CHANGES_REQUIRED", "BLOCKED", "STALE"]);
const handoffStatuses = new Set(["NOT_COMPLETE", "COMPLETE"]);
const terminalReasons = { POLICY_PROHIBITED: "WORKFLOW_TERMINAL_POLICY", HUMAN_REJECTED: "WORKFLOW_TERMINAL_HUMAN_REJECTED", HUMAN_CANCELLED: "WORKFLOW_TERMINAL_HUMAN_CANCELLED", INVALID_UPSTREAM: "WORKFLOW_TERMINAL_INVALID_UPSTREAM", UNRECOVERABLE_FAILURE: "WORKFLOW_TERMINAL_FAILURE" };
const obligationOrder = ["VERIFICATION", "REVIEW", "HANDOFF"];
const topLevel = new Set(["runtime_state", "policy_gate", "implementation", "verification", "review_requirement", "review_result", "scope_reassessment", "handoff", "evidence_refs"]);

function invalid(code) { return { resolution_status: "invalid_input", status: "BLOCKED", stage: "NONE", reason: "WORKFLOW_INVALID_INPUT", required_obligations: [], evidence_refs: [], errors: [{ code }], warnings: [] }; }
function route(status, stage, reason, required_obligations, evidence_refs) { return { resolution_status: "resolved", status, stage, reason, required_obligations, evidence_refs, errors: [], warnings: [] }; }
function validReferenceList(value) { return Array.isArray(value) && value.every((item) => typeof item === "string" && identifier.test(item) && !/^(?:https?|file):/i.test(item)) && new Set(value).size === value.length && value.every((item, index, values) => index === 0 || values[index - 1].localeCompare(item) <= 0); }
function validReasonCodes(value) { return validReferenceList(value); }
function obligations(stage, reviewRequired) {
  const required = stage === "IMPLEMENTATION" || stage === "FIX" ? ["VERIFICATION"] : [];
  if (stage === "IMPLEMENTATION" || stage === "VERIFICATION" || stage === "FIX") { if (reviewRequired) required.push("REVIEW"); }
  if (stage !== "HANDOFF") required.push("HANDOFF");
  return obligationOrder.filter((item) => item !== stage && required.includes(item));
}
function terminalRoute(reason, refs) { return route("TERMINAL", "NONE", terminalReasons[reason], [], refs); }
function isPositive(input) { return input.verification?.status === "EVIDENCE_CURRENT" || input.review_result?.status === "APPROVED_CURRENT" || input.handoff?.status === "COMPLETE"; }
function handoffEligible(input) {
  const reviewRequired = input.review_requirement.status === "REQUIRED";
  return input.runtime_state.lifecycle.state === "OPEN" && !input.runtime_state.technical_block.blocked && input.policy_gate.status === "SATISFIED" && !input.scope_reassessment.required && input.implementation.status === "COMPLETE" && ["EVIDENCE_CURRENT", "NOT_REQUIRED"].includes(input.verification.status) && input.review_requirement.status !== "UNRESOLVED" && (!reviewRequired || input.review_result.status === "APPROVED_CURRENT");
}

/** Pure Step 25 router: consumes normalized projections and selects one logical next stage. It never executes work, persists or transitions runtime state, resolves policy/capabilities/HITL, or finalizes verification. */
export function resolveWorkflowRoute(input) {
  if (!input || typeof input !== "object" || Array.isArray(input) || Object.keys(input).some((key) => !topLevel.has(key))) return invalid("WORKFLOW_INVALID_INPUT");
  for (const key of ["runtime_state", "policy_gate", "implementation", "scope_reassessment", "handoff", "evidence_refs"]) if (!(key in input)) return invalid("WORKFLOW_MISSING_PROJECTION");
  if (!input.policy_gate || typeof input.policy_gate !== "object" || Object.keys(input.policy_gate).length !== 1 || !policyGates.has(input.policy_gate.status)) return invalid("WORKFLOW_UNSUPPORTED_VALUE");
  if (!input.implementation || typeof input.implementation !== "object" || Object.keys(input.implementation).length !== 1 || !implementationStatuses.has(input.implementation.status)) return invalid("WORKFLOW_UNSUPPORTED_VALUE");
  if (!input.scope_reassessment || typeof input.scope_reassessment !== "object" || Object.keys(input.scope_reassessment).length !== 1 || typeof input.scope_reassessment.required !== "boolean") return invalid("WORKFLOW_UNSUPPORTED_VALUE");
  if (!input.handoff || typeof input.handoff !== "object" || Object.keys(input.handoff).length !== 1 || !handoffStatuses.has(input.handoff.status)) return invalid("WORKFLOW_UNSUPPORTED_VALUE");
  if (!validReferenceList(input.evidence_refs)) return invalid("WORKFLOW_INVALID_EVIDENCE_REFERENCE");
  const runtimeValidation = validateRuntimeState(input.runtime_state);
  if (runtimeValidation.status !== "valid") return invalid("WORKFLOW_INVALID_RUNTIME_STATE");
  const complete = input.implementation.status === "COMPLETE";
  if (complete && (!("verification" in input) || !("review_requirement" in input))) return invalid("WORKFLOW_MISSING_PROJECTION");
  if ("verification" in input && (!input.verification || typeof input.verification !== "object" || Object.keys(input.verification).length !== 1 || !verificationStatuses.has(input.verification.status))) return invalid("WORKFLOW_UNSUPPORTED_VALUE");
  if ("review_requirement" in input && (!input.review_requirement || typeof input.review_requirement !== "object" || Object.keys(input.review_requirement).some((key) => !["status", "reason_codes"].includes(key)) || !reviewRequirementStatuses.has(input.review_requirement.status) || !validReasonCodes(input.review_requirement.reason_codes ?? []))) return invalid("WORKFLOW_UNSUPPORTED_VALUE");
  if ("review_result" in input && input.review_result !== null && (!input.review_result || typeof input.review_result !== "object" || Object.keys(input.review_result).length !== 1 || !reviewResultStatuses.has(input.review_result.status))) return invalid("WORKFLOW_UNSUPPORTED_VALUE");
  const reviewRequired = input.review_requirement?.status === "REQUIRED";
  if (!("review_requirement" in input) && "review_result" in input) return invalid("WORKFLOW_MISSING_PROJECTION");
  if (reviewRequired && (!("review_result" in input) || input.review_result === null)) return invalid("WORKFLOW_MISSING_PROJECTION");
  if (input.review_requirement?.status === "NOT_REQUIRED" && input.review_result !== undefined && input.review_result !== null) return invalid("WORKFLOW_CONTRADICTORY_PROJECTION");
  if (input.implementation.status === "INCOMPLETE" && (input.verification?.status === "EVIDENCE_CURRENT" || input.review_result?.status === "APPROVED_CURRENT" || input.handoff.status === "COMPLETE")) return invalid("WORKFLOW_CONTRADICTORY_PROJECTION");
  if (input.runtime_state.lifecycle.state === "TERMINAL" && input.handoff.status === "COMPLETE") return invalid("WORKFLOW_CONTRADICTORY_PROJECTION");
  if (input.runtime_state.lifecycle.state === "WAITING_FOR_HUMAN" && input.handoff.status === "COMPLETE") return invalid("WORKFLOW_CONTRADICTORY_PROJECTION");
  if (input.verification?.status === "FAILED" && input.handoff.status === "COMPLETE") return invalid("WORKFLOW_CONTRADICTORY_PROJECTION");
  if (input.review_result?.status === "CHANGES_REQUIRED" && input.handoff.status === "COMPLETE") return invalid("WORKFLOW_CONTRADICTORY_PROJECTION");
  if (["PROHIBITED", "UNRESOLVED"].includes(input.policy_gate.status) && isPositive(input)) return invalid("WORKFLOW_CONTRADICTORY_PROJECTION");
  if (input.handoff.status === "COMPLETE" && !handoffEligible(input)) return invalid("WORKFLOW_CONTRADICTORY_PROJECTION");
  const refs = [...input.evidence_refs];
  if (input.runtime_state.lifecycle.state === "TERMINAL") return terminalRoute(input.runtime_state.policy_projection.terminal_reason, refs);
  if (input.policy_gate.status === "PROHIBITED") return route("BLOCKED", "NONE", "WORKFLOW_POLICY_PROHIBITED", [], refs);
  if (input.policy_gate.status === "UNRESOLVED") return route("BLOCKED", "NONE", "WORKFLOW_POLICY_UNRESOLVED", [], refs);
  if (input.scope_reassessment.required) return route("BLOCKED", "NONE", "WORKFLOW_REASSESSMENT_REQUIRED", [], refs);
  if (input.runtime_state.lifecycle.state === "WAITING_FOR_HUMAN") return route("WAITING", "NONE", "WORKFLOW_WAITING_FOR_HUMAN", [], refs);
  if (input.runtime_state.technical_block.blocked) return route("BLOCKED", "NONE", "WORKFLOW_TECHNICAL_CAPABILITY_BLOCK", [], refs);
  if (!complete) return route("READY", "IMPLEMENTATION", "WORKFLOW_IMPLEMENTATION_REQUIRED", obligations("IMPLEMENTATION", reviewRequired), refs);
  if (["REQUIRED", "STALE"].includes(input.verification.status)) return route("READY", "VERIFICATION", "WORKFLOW_VERIFICATION_REQUIRED", obligations("VERIFICATION", reviewRequired), refs);
  if (input.verification.status === "IN_PROGRESS") return route("WAITING", "NONE", "WORKFLOW_VERIFICATION_RUNNING", [], refs);
  if (input.verification.status === "FAILED") return route("READY", "FIX", "WORKFLOW_VERIFICATION_FAILED", obligations("FIX", reviewRequired), refs);
  if (input.verification.status === "BLOCKED") return route("BLOCKED", "NONE", "WORKFLOW_VERIFICATION_BLOCKED", [], refs);
  if (input.review_requirement.status === "UNRESOLVED") return route("BLOCKED", "NONE", "WORKFLOW_REVIEW_REQUIREMENT_UNRESOLVED", [], refs);
  if (reviewRequired) {
    if (["NOT_STARTED", "STALE"].includes(input.review_result.status)) return route("READY", "REVIEW", "WORKFLOW_REVIEW_REQUIRED", obligations("REVIEW", true), refs);
    if (input.review_result.status === "IN_PROGRESS") return route("WAITING", "NONE", "WORKFLOW_REVIEW_RUNNING", [], refs);
    if (input.review_result.status === "CHANGES_REQUIRED") return route("READY", "FIX", "WORKFLOW_REVIEW_CHANGES_REQUIRED", obligations("FIX", true), refs);
    if (input.review_result.status === "BLOCKED") return route("BLOCKED", "NONE", "WORKFLOW_REVIEW_BLOCKED", [], refs);
  }
  if (input.handoff.status === "COMPLETE") return route("COMPLETE", "NONE", "WORKFLOW_COMPLETE", [], refs);
  return route("READY", "HANDOFF", "WORKFLOW_HANDOFF_READY", [], refs);
}
