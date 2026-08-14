const identifier = /^[A-Za-z][A-Za-z0-9_.:-]{0,127}$/;
const implementationStatuses = new Set(["COMPLETE", "INCOMPLETE"]);
const verificationStatuses = new Set(["NOT_REQUIRED", "EVIDENCE_CURRENT", "REQUIRED", "IN_PROGRESS", "FAILED", "BLOCKED", "STALE"]);
const reviewRequirementStatuses = new Set(["REQUIRED", "NOT_REQUIRED", "UNRESOLVED"]);
const reviewResultStatuses = new Set(["NOT_STARTED", "IN_PROGRESS", "APPROVED_CURRENT", "CHANGES_REQUIRED", "BLOCKED", "STALE"]);
const policyStatuses = new Set(["SATISFIED", "PROHIBITED", "UNRESOLVED"]);
const identityKeys = ["implementation_fingerprint", "scope_fingerprint", "verification_identity_fingerprint", "review_identity", "handoff_definition_fingerprint"];
const rootKeys = ["current_identity", "implementation", "verification", "review_requirement", "review_result", "scope_reassessment", "policy_gate", "handoff_observation"];
const reasonCodes = new Set(["HANDOFF_NOT_COMPLETE", "HANDOFF_COMPLETE_CURRENT", "HANDOFF_STALE", "HANDOFF_INVALID_PREREQUISITE", "HANDOFF_SCOPE_REASSESSMENT_REQUIRED"]);

function exactObject(value, keys) { return value !== null && typeof value === "object" && !Array.isArray(value) && Object.keys(value).length === keys.length && keys.every((key) => Object.hasOwn(value, key)); }
function validIdentifier(value) { return typeof value === "string" && identifier.test(value); }
function validReferences(value) { return Array.isArray(value) && value.every(validIdentifier); }
function validIdentity(value) { return exactObject(value, identityKeys) && identityKeys.every((key) => validIdentifier(value[key])); }
function sameIdentity(left, right) { return identityKeys.every((key) => left[key] === right[key]); }
function invalid(code, path = "input") { return { resolution_status: "invalid_input", status: "NOT_COMPLETE", evidence_refs: [], reason_codes: [], errors: [{ code, path }], warnings: [] }; }
function resolved(status, evidenceRefs, reason) { return { resolution_status: "resolved", status, evidence_refs: [...new Set(evidenceRefs)].sort(), reason_codes: [reason], errors: [], warnings: [] }; }
function validObservation(value) { return exactObject(value, ["identity", "evidence_refs"]) && validIdentity(value.identity) && validReferences(value.evidence_refs) && value.evidence_refs.length > 0; }

function validInputShape(input) {
  return exactObject(input, rootKeys)
    && validIdentity(input.current_identity)
    && exactObject(input.implementation, ["status"]) && implementationStatuses.has(input.implementation.status)
    && exactObject(input.verification, ["status"]) && verificationStatuses.has(input.verification.status)
    && exactObject(input.review_requirement, ["status"]) && reviewRequirementStatuses.has(input.review_requirement.status)
    && (input.review_result === null || (exactObject(input.review_result, ["status"]) && reviewResultStatuses.has(input.review_result.status)))
    && exactObject(input.scope_reassessment, ["required"]) && typeof input.scope_reassessment.required === "boolean"
    && exactObject(input.policy_gate, ["status"]) && policyStatuses.has(input.policy_gate.status)
    && (input.handoff_observation === null || validObservation(input.handoff_observation));
}

function reviewRelationshipValid(input) {
  const requirement = input.review_requirement.status;
  if (requirement === "UNRESOLVED") return false;
  if (requirement === "NOT_REQUIRED") return input.review_result === null && input.current_identity.review_identity === "NONE";
  return input.review_result !== null && input.current_identity.review_identity !== "NONE";
}

function currentPrerequisitesSatisfied(input) {
  return input.implementation.status === "COMPLETE"
    && ["EVIDENCE_CURRENT", "NOT_REQUIRED"].includes(input.verification.status)
    && (input.review_requirement.status === "NOT_REQUIRED" || input.review_result?.status === "APPROVED_CURRENT")
    && input.scope_reassessment.required === false
    && input.policy_gate.status === "SATISFIED";
}

/** Pure Step 29 resolver: normalizes bounded current handoff completion evidence. */
export function resolveHandoffCompletion(input) {
  if (!validInputShape(input)) return invalid("HANDOFF_INVALID_INPUT");
  if (!reviewRelationshipValid(input)) return invalid("HANDOFF_INVALID_REVIEW_RELATIONSHIP", "review_result");
  const observation = input.handoff_observation;
  if (observation === null) return resolved("NOT_COMPLETE", [], currentPrerequisitesSatisfied(input) ? "HANDOFF_NOT_COMPLETE" : input.scope_reassessment.required ? "HANDOFF_SCOPE_REASSESSMENT_REQUIRED" : "HANDOFF_INVALID_PREREQUISITE");
  if (!currentPrerequisitesSatisfied(input)) return invalid(input.scope_reassessment.required ? "HANDOFF_SCOPE_REASSESSMENT_REQUIRED" : "HANDOFF_INVALID_PREREQUISITE", "handoff_observation");
  const evidenceRefs = [...new Set(observation.evidence_refs)].sort();
  if (!sameIdentity(observation.identity, input.current_identity)) return resolved("NOT_COMPLETE", evidenceRefs, "HANDOFF_STALE");
  return resolved("COMPLETE", evidenceRefs, "HANDOFF_COMPLETE_CURRENT");
}
