const statuses = new Set(["NOT_STARTED", "IN_PROGRESS", "APPROVED_CURRENT", "CHANGES_REQUIRED", "BLOCKED", "STALE"]);
const requirements = new Set(["REQUIRED", "NOT_REQUIRED", "UNRESOLVED"]);
const lifecycles = new Set(["NOT_STARTED", "IN_PROGRESS", "COMPLETED", "BLOCKED"]);
const findingClasses = new Set(["BLOCKING", "IMPORTANT", "MINOR"]);
const dispositions = new Set(["OPEN", "RESOLVED", "ACCEPTED_NON_BLOCKING"]);
const scopeEffects = new Set(["IN_SCOPE", "EXPANDS_SCOPE"]);
const identifier = /^[A-Za-z][A-Za-z0-9_.:-]{0,127}$/;
const identityKeys = ["implementation_revision", "scope_fingerprint", "review_definition_fingerprint", "review_policy_fingerprint", "verification_identity_fingerprint"];
const rootKeys = ["review_requirement", "current_identity", "observation"];
const reasonOrder = ["REVIEW_RESULT_NOT_REQUIRED", "REVIEW_RESULT_NOT_STARTED", "REVIEW_RESULT_IN_PROGRESS", "REVIEW_RESULT_APPROVED_CURRENT", "REVIEW_RESULT_CHANGES_REQUIRED", "REVIEW_RESULT_BLOCKED", "REVIEW_RESULT_STALE"];

function invalid(code, path = "input") { return { resolution_status: "invalid_input", status: "BLOCKED", finding_refs: [], required_fix_findings: [], evidence_refs: [], scope_reassessment_required: false, reason_codes: [], errors: [{ code, path }], warnings: [] }; }
function result(status, details, reason) { return { resolution_status: "resolved", status, finding_refs: [...new Set(details.finding_refs ?? [])].sort(), required_fix_findings: [...new Set(details.required_fix_findings ?? [])].sort(), evidence_refs: [...new Set(details.evidence_refs ?? [])].sort(), scope_reassessment_required: details.scope_reassessment_required ?? false, reason_codes: reasonOrder.filter((code) => code === reason), errors: [], warnings: [] }; }
function exactObject(value, keys) { return value !== null && typeof value === "object" && !Array.isArray(value) && Object.keys(value).length === keys.length && keys.every((key) => Object.hasOwn(value, key)); }
function validReferenceList(values) { return Array.isArray(values) && values.every((value) => typeof value === "string" && identifier.test(value)); }
function validIdentity(value) { return exactObject(value, identityKeys) && identityKeys.every((key) => typeof value[key] === "string" && identifier.test(value[key])); }
function validFinding(value) { return exactObject(value, ["id", "class", "disposition", "scope_effect", "evidence_ref"]) && typeof value.id === "string" && identifier.test(value.id) && findingClasses.has(value.class) && dispositions.has(value.disposition) && scopeEffects.has(value.scope_effect) && typeof value.evidence_ref === "string" && identifier.test(value.evidence_ref); }
function validFindings(value) { return Array.isArray(value) && value.every(validFinding) && new Set(value.map((finding) => finding.id)).size === value.length; }
function validRequirement(value) { return exactObject(value, ["status"]) && requirements.has(value.status); }
function validObservation(value) {
  if (!exactObject(value, ["lifecycle", "identity", "findings", "evidence_refs", "prerequisite_code"]) || !lifecycles.has(value.lifecycle) || !validFindings(value.findings) || !validReferenceList(value.evidence_refs) || (value.prerequisite_code !== null && (typeof value.prerequisite_code !== "string" || !identifier.test(value.prerequisite_code)))) return false;
  if (value.lifecycle === "COMPLETED" && (!validIdentity(value.identity) || value.evidence_refs.length === 0)) return false;
  if (value.lifecycle === "COMPLETED" && value.prerequisite_code !== null) return false;
  if (["NOT_STARTED", "IN_PROGRESS"].includes(value.lifecycle) && (value.identity !== null || value.findings.length > 0 || value.evidence_refs.length > 0 || value.prerequisite_code !== null)) return false;
  if (value.lifecycle === "BLOCKED" && (value.identity !== null || value.findings.length > 0 || value.evidence_refs.length > 0 || value.prerequisite_code === null)) return false;
  if (value.lifecycle === "COMPLETED" && value.identity === null) return false;
  return true;
}
function sameIdentity(left, right) { return identityKeys.every((key) => left[key] === right[key]); }

/** Pure Step 28 resolver: normalizes a bounded review observation into the Workflow review-result vocabulary. */
export function resolveReviewResult(input) {
  if (!exactObject(input, rootKeys) || !validRequirement(input.review_requirement) || !validIdentity(input.current_identity) || (input.observation !== null && !validObservation(input.observation))) return invalid("REVIEW_RESULT_INVALID_INPUT");
  const requirement = input.review_requirement.status;
  if (requirement === "UNRESOLVED") return invalid("REVIEW_RESULT_UNRESOLVED_REQUIREMENT");
  if (requirement === "NOT_REQUIRED") {
    if (input.observation !== null) return invalid("REVIEW_RESULT_CONTRADICTORY_NOT_REQUIRED", "observation");
    return result("NOT_STARTED", { scope_reassessment_required: false }, "REVIEW_RESULT_NOT_REQUIRED");
  }
  if (input.observation === null) return result("NOT_STARTED", {}, "REVIEW_RESULT_NOT_STARTED");
  const observation = { ...input.observation, findings: [...input.observation.findings].sort((left, right) => left.id.localeCompare(right.id)), evidence_refs: [...new Set(input.observation.evidence_refs)].sort() };
  if (observation.lifecycle === "NOT_STARTED") return result("NOT_STARTED", {}, "REVIEW_RESULT_NOT_STARTED");
  if (observation.lifecycle === "IN_PROGRESS") return result("IN_PROGRESS", {}, "REVIEW_RESULT_IN_PROGRESS");
  if (observation.lifecycle === "BLOCKED") return result("BLOCKED", {}, "REVIEW_RESULT_BLOCKED");
  const findings = observation.findings;
  const findingRefs = findings.map((finding) => finding.id);
  const requiredFixFindings = findings.filter((finding) => finding.class === "BLOCKING" && finding.disposition === "OPEN");
  if (!sameIdentity(observation.identity, input.current_identity)) return result("STALE", { finding_refs: findingRefs, evidence_refs: observation.evidence_refs }, "REVIEW_RESULT_STALE");
  if (requiredFixFindings.length) return result("CHANGES_REQUIRED", { finding_refs: findingRefs, required_fix_findings: requiredFixFindings.map((finding) => finding.id), evidence_refs: observation.evidence_refs, scope_reassessment_required: requiredFixFindings.some((finding) => finding.scope_effect === "EXPANDS_SCOPE") }, "REVIEW_RESULT_CHANGES_REQUIRED");
  return result("APPROVED_CURRENT", { finding_refs: findingRefs, evidence_refs: observation.evidence_refs }, "REVIEW_RESULT_APPROVED_CURRENT");
}
