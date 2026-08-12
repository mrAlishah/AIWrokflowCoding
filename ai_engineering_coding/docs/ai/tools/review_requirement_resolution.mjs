const riskLevels = new Set(["LOW", "NORMAL", "HIGH", "CRITICAL"]);
const triStates = new Set([true, false, "UNKNOWN"]);
const reviewStatuses = new Set(["REQUIRED", "NOT_REQUIRED", "UNSPECIFIED"]);
const changeFactKeys = ["security_sensitive", "authorization_change", "public_api_change", "destructive_migration"];
const reasonOrder = ["REVIEW_CRITICAL_RISK", "REVIEW_HIGH_RISK", "REVIEW_SECURITY_SENSITIVE", "REVIEW_AUTHORIZATION_CHANGE", "REVIEW_PUBLIC_API_CHANGE", "REVIEW_DESTRUCTIVE_MIGRATION", "REVIEW_POLICY_REQUIRED", "REVIEW_ACCEPTANCE_CRITERIA_REQUIRED", "REVIEW_REQUIREMENT_UNRESOLVED"];

function invalid(code) { return { resolution_status: "invalid_input", status: "UNRESOLVED", reason_codes: [], evidence_refs: [], errors: [{ code }], warnings: [] }; }
function resolved(status, reasonCodes) { return { resolution_status: "resolved", status, reason_codes: reasonOrder.filter((code) => reasonCodes.has(code)), evidence_refs: [], errors: [], warnings: [] }; }
function exactObject(value, keys) { return value !== null && typeof value === "object" && !Array.isArray(value) && Object.keys(value).length === keys.length && keys.every((key) => Object.hasOwn(value, key)); }

function validResolvedRisk(value) {
  return exactObject(value, ["status", "risk", "trace", "warnings"]) && value.status === "resolved" &&
    exactObject(value.risk, ["level", "factors", "reasons", "escalations", "evidence_quality", "uncertainty"]) && riskLevels.has(value.risk.level) &&
    Array.isArray(value.risk.factors) && Array.isArray(value.risk.reasons) && Array.isArray(value.risk.escalations) && typeof value.risk.evidence_quality === "string" && exactObject(value.risk.uncertainty, ["impact", "source"]) &&
    exactObject(value.trace, ["baseline", "affected_areas", "intent_present"]) && exactObject(value.trace.baseline, ["level", "source"]) && Array.isArray(value.trace.affected_areas) && typeof value.trace.intent_present === "boolean" && Array.isArray(value.warnings);
}
function validChangeFacts(value) { return exactObject(value, changeFactKeys) && changeFactKeys.every((key) => triStates.has(value[key])); }
function validReviewProjection(value) { return exactObject(value, ["status"]) && reviewStatuses.has(value.status); }

/** Pure Step 26 resolver: determines whether independent review is required from normalized facts. It does not perform review, verification, routing, policy resolution, or runtime mutation. */
export function resolveReviewRequirement(input) {
  if (input === null || typeof input !== "object" || Array.isArray(input) || !exactObject(input, ["risk", "change_facts", "policy_review", "acceptance_review"])) return invalid("REVIEW_REQUIREMENT_INVALID_INPUT");
  if (!validResolvedRisk(input.risk)) return invalid("REVIEW_REQUIREMENT_INVALID_RISK");
  if (!validChangeFacts(input.change_facts)) return invalid("REVIEW_REQUIREMENT_INVALID_CHANGE_FACTS");
  if (!validReviewProjection(input.policy_review)) return invalid("REVIEW_REQUIREMENT_INVALID_POLICY_PROJECTION");
  if (!validReviewProjection(input.acceptance_review)) return invalid("REVIEW_REQUIREMENT_INVALID_ACCEPTANCE_PROJECTION");

  const reasons = new Set();
  if (input.risk.risk.level === "CRITICAL") reasons.add("REVIEW_CRITICAL_RISK");
  if (input.risk.risk.level === "HIGH") reasons.add("REVIEW_HIGH_RISK");
  const factReasons = { security_sensitive: "REVIEW_SECURITY_SENSITIVE", authorization_change: "REVIEW_AUTHORIZATION_CHANGE", public_api_change: "REVIEW_PUBLIC_API_CHANGE", destructive_migration: "REVIEW_DESTRUCTIVE_MIGRATION" };
  for (const key of changeFactKeys) if (input.change_facts[key] === true) reasons.add(factReasons[key]);
  if (input.policy_review.status === "REQUIRED") reasons.add("REVIEW_POLICY_REQUIRED");
  if (input.acceptance_review.status === "REQUIRED") reasons.add("REVIEW_ACCEPTANCE_CRITERIA_REQUIRED");
  if (reasons.size) return resolved("REQUIRED", reasons);
  if (changeFactKeys.some((key) => input.change_facts[key] === "UNKNOWN")) return resolved("UNRESOLVED", new Set(["REVIEW_REQUIREMENT_UNRESOLVED"]));
  return resolved("NOT_REQUIRED", reasons);
}
