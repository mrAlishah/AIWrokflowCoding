import Ajv2020 from "ajv/dist/2020.js";
import schema from "../config/schema/runtime_state.schema.json" with { type: "json" };

const terminalReasons = new Set(["POLICY_PROHIBITED", "HUMAN_REJECTED", "HUMAN_CANCELLED", "INVALID_UPSTREAM", "UNRECOVERABLE_FAILURE"]);
const fingerprints = new Set(["decision_id", "request_identity", "request_fingerprint"]);
const ajv = new Ajv2020({ allErrors: true, strict: true, strictRequired: false, validateFormats: false });
const validateSchema = ajv.compile(schema);
function finding(code, path, message) { return { code, path, message }; }
function schemaErrors(errors = []) {
  return errors.map((error) => {
    const property = error.keyword === "additionalProperties" ? error.params.additionalProperty : error.keyword === "required" ? error.params.missingProperty : undefined;
    const path = [error.instancePath.replace(/^\//, "").replaceAll("/", "."), property].filter(Boolean).join(".") || "<root>";
    return finding("RUNTIME_STATE_INVALID_SCHEMA", path, error.message ?? "runtime state schema validation failed");
  });
}
function hasIdentity(human) { return [...fingerprints].every((field) => human[field] !== null); }
function hasNoHumanDecision(human) { return !human.required && human.request_status === "none" && !hasIdentity(human) && human.response_status === "none"; }
function hasConsumedHumanDecision(human) { return human.required && human.request_status === "terminal" && human.response_status === "consumed" && hasIdentity(human); }
function semanticErrors(state) {
  const errors = [], { lifecycle, human_decision: human, technical_block: block, policy_projection: policy } = state;
  if (!block.blocked && block.missing_capabilities.length) errors.push(finding("RUNTIME_STATE_INVALID_TECHNICAL_BLOCK", "technical_block", "unblocked state must not list missing capabilities"));
  if (block.blocked && block.missing_capabilities.length === 0) errors.push(finding("RUNTIME_STATE_INVALID_TECHNICAL_BLOCK", "technical_block.missing_capabilities", "blocked state requires at least one missing capability"));
  if (block.missing_capabilities.some((value, index, values) => index && values[index - 1].localeCompare(value) > 0)) errors.push(finding("RUNTIME_STATE_INVALID_TECHNICAL_BLOCK", "technical_block.missing_capabilities", "missing capabilities must be sorted"));
  if (lifecycle.state === "TERMINAL" && !terminalReasons.has(policy.terminal_reason)) errors.push(finding("RUNTIME_STATE_INVALID_TERMINAL_REASON", "policy_projection.terminal_reason", "terminal state requires a canonical terminal reason"));
  if (lifecycle.state !== "TERMINAL" && policy.terminal_reason !== null) errors.push(finding("RUNTIME_STATE_INVALID_TERMINAL_REASON", "policy_projection.terminal_reason", "non-terminal state must have null terminal reason"));
  if (lifecycle.state === "WAITING_FOR_HUMAN") {
    if (!human.required || human.request_status !== "pending" || !hasIdentity(human)) errors.push(finding("RUNTIME_STATE_INVALID_LIFECYCLE_RELATION", "human_decision", "waiting state requires a persisted pending human decision identity"));
    if (!["none", "recorded", "validated", "rejected_stale", "conflicting"].includes(human.response_status)) errors.push(finding("RUNTIME_STATE_INVALID_HUMAN_DECISION", "human_decision.response_status", "waiting state cannot contain consumed response evidence"));
  }
  if (human.request_status === "superseded" && lifecycle.state === "WAITING_FOR_HUMAN") errors.push(finding("RUNTIME_STATE_INVALID_HUMAN_DECISION", "human_decision.request_status", "superseded request cannot remain waiting"));
  if (["pending", "superseded", "terminal"].includes(human.request_status) && (!human.required || !hasIdentity(human))) errors.push(finding("RUNTIME_STATE_INVALID_HUMAN_DECISION", "human_decision", "non-empty request status requires human decision identity"));
  if (human.response_status !== "none" && (!human.required || !hasIdentity(human))) errors.push(finding("RUNTIME_STATE_INVALID_HUMAN_DECISION", "human_decision", "response evidence requires human decision identity"));
  if (human.response_status === "consumed") {
    if (lifecycle.state === "WAITING_FOR_HUMAN" || !human.required || !hasIdentity(human) || human.request_status !== "terminal") errors.push(finding("RUNTIME_STATE_INVALID_HUMAN_DECISION", "human_decision", "consumed response requires a non-waiting terminal request identity"));
  }
  if (human.request_status === "none" && (human.decision_id !== null || human.request_identity !== null || human.request_fingerprint !== null || human.response_status !== "none")) errors.push(finding("RUNTIME_STATE_INVALID_HUMAN_DECISION", "human_decision", "no request must not carry decision identity or response evidence"));
  if (lifecycle.state === "TERMINAL") {
    if (["HUMAN_REJECTED", "HUMAN_CANCELLED"].includes(policy.terminal_reason) && !hasConsumedHumanDecision(human)) errors.push(finding("RUNTIME_STATE_INVALID_HUMAN_DECISION", "human_decision", "human terminal outcome requires a correlated consumed human decision"));
    if (policy.terminal_reason === "POLICY_PROHIBITED" && !hasNoHumanDecision(human)) errors.push(finding("RUNTIME_STATE_INVALID_HUMAN_DECISION", "human_decision", "policy prohibition must not carry a human decision"));
    if (["INVALID_UPSTREAM", "UNRECOVERABLE_FAILURE"].includes(policy.terminal_reason) && human.response_status === "consumed") errors.push(finding("RUNTIME_STATE_INVALID_HUMAN_DECISION", "human_decision.response_status", "non-human terminal outcome must not carry a consumed human decision"));
  }
  return errors;
}
/** Pure validator: validates supplied document shape and internal consistency only; it does not read, write, authenticate, consume, or transition runtime state. In persisted state, human_decision.required records that the correlated operation carries or carried a human gate; it does not itself mean the lifecycle is currently waiting. */
export function validateRuntimeState(state) {
  if (state && typeof state === "object" && !Array.isArray(state) && Number.isInteger(state.version) && state.version !== 1) return { status: "invalid_input", schema_validation: "invalid", semantic_validation: "not_run", errors: [finding("RUNTIME_STATE_UNSUPPORTED_VERSION", "version", "runtime state schema version is unsupported")], warnings: [] };
  const structuralValid = validateSchema(state);
  const errors = structuralValid ? semanticErrors(state) : schemaErrors(validateSchema.errors);
  return { status: errors.length ? "invalid_input" : "valid", schema_validation: structuralValid ? "valid" : "invalid", semantic_validation: structuralValid ? (errors.length ? "invalid" : "valid") : "not_run", errors, warnings: [] };
}
