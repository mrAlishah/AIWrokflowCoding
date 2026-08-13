const riskLevels = new Set(["LOW", "NORMAL", "HIGH", "CRITICAL"]);
const changeTypes = new Set(["documentation", "implementation", "bug_fix", "refactor", "migration", "configuration", "analysis"]);
const checkStatuses = new Set(["NOT_STARTED", "RUNNING", "PASSED", "FAILED", "BLOCKED", "NOT_APPLICABLE"]);
const criterionClasses = new Set(["automated", "tool_observable", "manual_observable", "human_decision", "not_verifiable"]);
const evidenceRefs = /^[A-Za-z][A-Za-z0-9_.:-]{0,127}$/;
const fingerprints = /^[A-Za-z0-9][A-Za-z0-9_.:-]{0,127}$/;
const rootKeys = ["risk", "change_facts", "acceptance_criteria", "policy", "implementation", "capabilities", "evidence"];
const changeKeys = ["change_type", "affected_areas", "frontend_ui", "security_sensitive", "authorization_change", "public_api_change", "destructive_migration", "dependency_addition", "performance_sensitive"];
const riskKeys = ["level", "factors"];
const projectionRiskKeys = ["status", "risk", "trace", "warnings"];
const reasonOrder = ["VERIFICATION_NO_APPLICABLE_CHECKS", "VERIFICATION_FAILED", "VERIFICATION_BLOCKED", "VERIFICATION_STALE", "VERIFICATION_RUNNING", "VERIFICATION_REQUIRED", "VERIFICATION_CURRENT"];

function invalid(code, path = "input") { return { resolution_status: "invalid_input", status: "BLOCKED", required_checks: [], missing_checks: [], failed_checks: [], blocked_checks: [], stale_checks: [], running_checks: [], evidence_refs: [], reason_codes: [], errors: [{ code, path }], warnings: [] }; }
function output(status, checks, details, reasons = []) {
  const order = [...checks].sort((a, b) => a.id.localeCompare(b.id));
  return { resolution_status: "resolved", status, required_checks: order, missing_checks: [...(details.missing ?? [])].sort(), failed_checks: [...(details.failed ?? [])].sort(), blocked_checks: [...(details.blocked ?? [])].sort(), stale_checks: [...(details.stale ?? [])].sort(), running_checks: [...(details.running ?? [])].sort(), evidence_refs: [...new Set(details.refs ?? [])].sort(), reason_codes: reasonOrder.filter((code) => reasons.has(code)), errors: [], warnings: [] };
}
function exactObject(value, keys) { return value !== null && typeof value === "object" && !Array.isArray(value) && Object.keys(value).length === keys.length && keys.every((key) => Object.hasOwn(value, key)); }
function identifierList(value) { return Array.isArray(value) && value.every((item) => typeof item === "string" && fingerprints.test(item)) && new Set(value).size === value.length && value.every((item, index, values) => index === 0 || values[index - 1].localeCompare(item) <= 0); }
function validRisk(value) {
  if (exactObject(value, projectionRiskKeys) && value.status === "resolved" && exactObject(value.risk, ["level", "factors", "reasons", "escalations", "evidence_quality", "uncertainty"]) && riskLevels.has(value.risk.level)) {
    const risk = value.risk;
    const traceValid = exactObject(value.trace, ["baseline", "affected_areas", "intent_present"]) && exactObject(value.trace.baseline, ["level", "source"]) && riskLevels.has(value.trace.baseline.level) && typeof value.trace.baseline.source === "string" && identifierList(value.trace.affected_areas) && typeof value.trace.intent_present === "boolean";
    const uncertaintyValid = exactObject(risk.uncertainty, ["impact", "source"]) && typeof risk.uncertainty.impact === "string" && typeof risk.uncertainty.source === "string";
    return Array.isArray(risk.factors) && risk.factors.every((factor) => exactObject(factor, ["code", "sources"]) && typeof factor.code === "string" && Array.isArray(factor.sources) && identifierList([...factor.sources].sort())) && Array.isArray(risk.reasons) && Array.isArray(risk.escalations) && typeof risk.evidence_quality === "string" && uncertaintyValid && traceValid && Array.isArray(value.warnings);
  }
  return exactObject(value, riskKeys) && riskLevels.has(value.level) && Array.isArray(value.factors) && value.factors.every((factor) => typeof factor === "string" && fingerprints.test(factor));
}
function riskLevel(value) { return value.status === "resolved" ? value.risk.level : value.level; }
function riskFactors(value) { return value.status === "resolved" ? value.risk.factors.map((factor) => factor.code) : value.factors; }
function validChangeFacts(value) { return exactObject(value, changeKeys) && changeTypes.has(value.change_type) && identifierList(value.affected_areas) && ["frontend_ui", "security_sensitive", "authorization_change", "public_api_change", "destructive_migration", "dependency_addition", "performance_sensitive"].every((key) => typeof value[key] === "boolean"); }
function validCriteria(value) { return Array.isArray(value) && value.every((criterion) => exactObject(criterion, ["id", "classification", "required"]) && typeof criterion.id === "string" && fingerprints.test(criterion.id) && criterionClasses.has(criterion.classification) && typeof criterion.required === "boolean") && new Set(value.map((criterion) => criterion.id)).size === value.length && value.every((criterion, index, values) => index === 0 || values[index - 1].id.localeCompare(criterion.id) <= 0); }
function validProjection(value) { return exactObject(value, ["verification_required", "required_check_types", "excluded_check_types", "verification_policy_fingerprint"]) && typeof value.verification_required === "boolean" && identifierList(value.required_check_types) && identifierList(value.excluded_check_types) && typeof value.verification_policy_fingerprint === "string" && fingerprints.test(value.verification_policy_fingerprint) && !value.required_check_types.some((type) => value.excluded_check_types.includes(type)); }
function validImplementation(value) { return exactObject(value, ["revision", "scope_fingerprint", "acceptance_fingerprint", "check_definition_revision"]) && [value.revision, value.scope_fingerprint, value.acceptance_fingerprint, value.check_definition_revision].every((item) => typeof item === "string" && fingerprints.test(item)); }
function validCapabilities(value) { return exactObject(value, ["missing"]) && identifierList(value.missing); }
function validEvidence(value) {
  if (!Array.isArray(value) || new Set(value.map((item) => item?.check_id)).size !== value.length) return false;
  return value.every((item) => exactObject(item, ["check_id", "status", "implementation_revision", "scope_fingerprint", "acceptance_fingerprint", "check_definition_revision", "verification_policy_fingerprint", "evidence_ref"]) && typeof item.check_id === "string" && fingerprints.test(item.check_id) && checkStatuses.has(item.status) && [item.implementation_revision, item.scope_fingerprint, item.acceptance_fingerprint, item.check_definition_revision, item.verification_policy_fingerprint].every((field) => typeof field === "string" && fingerprints.test(field)) && (item.evidence_ref === null || typeof item.evidence_ref === "string" && evidenceRefs.test(item.evidence_ref)) && (!["PASSED", "FAILED", "BLOCKED"].includes(item.status) || typeof item.evidence_ref === "string" && evidenceRefs.test(item.evidence_ref)));
}
function add(checks, id, type, capability = null) { if (!checks.some((check) => check.id === id)) checks.push({ id, type, blocking: true, required_capability: capability }); }
function requiredChecks(input) {
  const { change_facts: change, acceptance_criteria: criteria, policy, risk } = input;
  const checks = [];
  if (change.change_type === "documentation") add(checks, "verification.markdown", "markdown");
  if (change.change_type !== "documentation" && change.change_type !== "analysis") { add(checks, "verification.build", "build", "build"); add(checks, "verification.targeted_tests", "targeted_test", "test"); }
  if (change.frontend_ui) { add(checks, "verification.type_check", "type_check", "type_check"); add(checks, "verification.lint", "lint", "lint"); add(checks, "verification.ux_observation", "manual_observation"); }
  if (change.change_type === "bug_fix") add(checks, "verification.regression", "regression_test", "test");
  if (change.change_type === "refactor") add(checks, "verification.regression", "regression_test", "test");
  if (change.change_type === "migration" || change.destructive_migration) { add(checks, "verification.migration", "migration_check", "migration_validation"); add(checks, "verification.preservation", "preservation_check", "migration_validation"); add(checks, "verification.integration", "integration_test", "test"); }
  if (change.destructive_migration || change.change_type === "migration" && riskLevel(risk) === "CRITICAL") add(checks, "verification.rollback", "rollback_check", "migration_validation");
  if (change.public_api_change) { add(checks, "verification.contract", "contract_test", "test"); add(checks, "verification.compatibility", "compatibility_test", "test"); }
  if (change.security_sensitive) { add(checks, "verification.static_analysis", "static_analysis", "static_analysis"); add(checks, "verification.security_scan", "security_scan", "security_scan"); add(checks, "verification.security_scenarios", "security_scenario", "security_scan"); }
  if (change.authorization_change) { add(checks, "verification.authorization", "authorization_test", "test"); add(checks, "verification.policy", "policy_validation", "static_analysis"); }
  if (change.dependency_addition) { add(checks, "verification.dependency", "dependency_check", "dependency_analysis"); add(checks, "verification.security_scan", "security_scan", "security_scan"); }
  if (change.performance_sensitive) { add(checks, "verification.baseline", "baseline_comparison", "performance_validation"); add(checks, "verification.performance", "performance_check", "performance_validation"); }
  if (change.change_type === "configuration") { add(checks, "verification.schema", "schema_validation", "test"); add(checks, "verification.policy", "policy_validation", "static_analysis"); }
  if (riskFactors(risk).includes("architecture_boundary")) add(checks, "verification.architecture", "architecture_check");
  if (riskFactors(risk).includes("authentication")) add(checks, "verification.authentication_scenarios", "authentication_scenarios", "test");
  if (riskFactors(risk).some((factor) => ["security_boundary", "authentication", "secrets", "pii", "network_access"].includes(factor))) { add(checks, "verification.security_scan", "security_scan", "security_scan"); add(checks, "verification.security_scenarios", "security_scenario", "security_scan"); }
  for (const criterion of criteria) if (criterion.required) add(checks, `verification.acceptance.${criterion.id}`, "acceptance_criteria");
  for (const type of policy.required_check_types) if (!policy.excluded_check_types.includes(type)) add(checks, `verification.policy.${type}`, type);
  return checks.filter((check) => !policy.excluded_check_types.includes(check.type)).sort((a, b) => a.id.localeCompare(b.id));
}
function currentEvidence(evidence, check, implementation, policy) { const record = evidence.find((item) => item.check_id === check.id); if (!record) return { state: "MISSING" }; if ([record.implementation_revision, record.scope_fingerprint, record.acceptance_fingerprint, record.check_definition_revision, record.verification_policy_fingerprint].some((value, index) => value !== [implementation.revision, implementation.scope_fingerprint, implementation.acceptance_fingerprint, implementation.check_definition_revision, policy.verification_policy_fingerprint][index])) return { state: "STALE", record }; return { state: record.status, record }; }

/** Pure Step 27 resolver. It resolves required deterministic checks and their bounded evidence projection; it never executes checks, selects providers, routes workflow, or mutates runtime state. */
export function resolveVerification(input) {
  if (!exactObject(input, rootKeys)) return invalid("VERIFICATION_INVALID_INPUT");
  if (!validRisk(input.risk)) return invalid("VERIFICATION_INVALID_RISK", "risk");
  if (!validChangeFacts(input.change_facts)) return invalid("VERIFICATION_INVALID_CHANGE_FACTS", "change_facts");
  if (!validCriteria(input.acceptance_criteria)) return invalid("VERIFICATION_INVALID_ACCEPTANCE_CRITERIA", "acceptance_criteria");
  if (!validProjection(input.policy)) return invalid("VERIFICATION_INVALID_POLICY_PROJECTION", "policy");
  if (!validImplementation(input.implementation)) return invalid("VERIFICATION_INVALID_IMPLEMENTATION", "implementation");
  if (!validCapabilities(input.capabilities)) return invalid("VERIFICATION_INVALID_CAPABILITIES", "capabilities");
  if (!validEvidence(input.evidence)) return invalid("VERIFICATION_INVALID_EVIDENCE", "evidence");
  const checks = requiredChecks(input);
  const requiredIds = new Set(checks.map((check) => check.id));
  if (input.acceptance_criteria.some((criterion) => criterion.required && criterion.classification === "not_verifiable")) return output("BLOCKED", checks, { blocked: checks.filter((check) => check.type === "acceptance_criteria").map((check) => check.id) }, new Set(["VERIFICATION_BLOCKED"]));
  if (!checks.length) { if (input.evidence.length) return invalid("VERIFICATION_EVIDENCE_WITHOUT_REQUIRED_CHECK"); return output("NOT_REQUIRED", checks, {}, new Set(["VERIFICATION_NO_APPLICABLE_CHECKS"])); }
  if (input.evidence.some((record) => !requiredIds.has(record.check_id))) return invalid("VERIFICATION_EVIDENCE_UNKNOWN_CHECK", "evidence");
  const missing = [], failed = [], blocked = [], stale = [], running = [], refs = [];
  for (const check of checks) { const result = currentEvidence(input.evidence, check, input.implementation, input.policy); if (result.record?.evidence_ref) refs.push(result.record.evidence_ref); if (result.state === "MISSING" || result.state === "NOT_STARTED") missing.push(check.id); else if (result.state === "FAILED") failed.push(check.id); else if (result.state === "BLOCKED") blocked.push(check.id); else if (result.state === "STALE") stale.push(check.id); else if (result.state === "RUNNING") running.push(check.id); else if (result.state === "NOT_APPLICABLE") return invalid("VERIFICATION_REQUIRED_CHECK_NOT_APPLICABLE", `evidence.${check.id}`); else if (result.state !== "PASSED") return invalid("VERIFICATION_UNSUPPORTED_EVIDENCE_STATE", `evidence.${check.id}`); }
  if (input.capabilities.missing.some((capability) => checks.some((check) => check.required_capability === capability))) blocked.push(...checks.filter((check) => input.capabilities.missing.includes(check.required_capability)).map((check) => check.id));
  const unique = (items) => [...new Set(items)];
  const details = { missing, failed, blocked: unique(blocked), stale, running, refs };
  if (failed.length) return output("FAILED", checks, details, new Set(["VERIFICATION_FAILED"]));
  if (blocked.length) return output("BLOCKED", checks, details, new Set(["VERIFICATION_BLOCKED"]));
  if (stale.length) return output("STALE", checks, details, new Set(["VERIFICATION_STALE"]));
  if (running.length) return output("IN_PROGRESS", checks, details, new Set(["VERIFICATION_RUNNING"]));
  if (missing.length) return output("REQUIRED", checks, details, new Set(["VERIFICATION_REQUIRED"]));
  return output("EVIDENCE_CURRENT", checks, details, new Set(["VERIFICATION_CURRENT"]));
}
