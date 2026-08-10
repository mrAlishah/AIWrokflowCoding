const actions = new Set(["read_context", "read_source", "write_markdown", "write_source", "run_build", "run_tests", "run_static_analysis", "add_dependency", "network_access", "external_tool", "read_secret", "destructive_operation", "git_commit", "git_push", "create_pr", "modify_policy", "modify_repo_context"]);
const authorities = new Set(["system_governance", "repository_policy", "workflow_constraint", "stp_config", "repository_preference", "profile_default"]);
const modes = new Set(["AUTO", "RECOMMEND", "APPROVAL", "FORBIDDEN"]);
const permissions = new Set(["ALLOW", "ALLOW_WITH_CONDITIONS", "REQUIRE_APPROVAL", "DENY"]);
const riskLevels = new Set(["LOW", "NORMAL", "HIGH", "CRITICAL"]);
const policyStatuses = new Set(["resolved", "blocked", "unresolved", "invalid_policy", "invalid_input"]);
const supportedPairs = new Set(["AUTO/ALLOW", "AUTO/ALLOW_WITH_CONDITIONS", "AUTO/REQUIRE_APPROVAL", "RECOMMEND/ALLOW", "APPROVAL/REQUIRE_APPROVAL", "FORBIDDEN/DENY"]);
const metadata = /^[A-Za-z][A-Za-z0-9_.:-]{0,127}$/;

function fail(code) { return { status: "invalid_input", errors: [{ code }], warnings: [] }; }
function blocked(reason_code, technical_block) { return { status: "blocked", human_requirement: { required: false, kind: "not_required", reason_code, allowed_responses: [] }, technical_block, hdr_candidate: null, warnings: [] }; }
function validMetadata(value) { return typeof value === "string" && metadata.test(value); }
function validateEvidence(rules) {
  if (!Array.isArray(rules)) return false;
  return rules.every((rule) => rule && typeof rule === "object" && !Array.isArray(rule) && authorities.has(rule.authority));
}
function validateReasons(reasons) {
  return Array.isArray(reasons) && reasons.every((reason) => reason && typeof reason === "object" && !Array.isArray(reason) && validMetadata(reason.code) && (reason.rule_id === undefined || validMetadata(reason.rule_id)) && (reason.authority === undefined || authorities.has(reason.authority)));
}
function validateCapability(capability) {
  if (capability === undefined) return { valid: true, technical_block: { blocked: false, reason_code: null, missing_capabilities: [] } };
  if (!capability || typeof capability !== "object" || Array.isArray(capability) || !["resolved", "blocked"].includes(capability.status)) return { valid: false };
  const capabilities = capability.capabilities;
  if (!capabilities || typeof capabilities !== "object" || Array.isArray(capabilities) || !Array.isArray(capabilities.required) || !Array.isArray(capabilities.missing) || !capabilities.selected || typeof capabilities.selected !== "object" || Array.isArray(capabilities.selected)) return { valid: false };
  if (capabilities.required.some((value) => !validMetadata(value)) || capabilities.missing.some((value) => !validMetadata(value)) || [...new Set(capabilities.required)].length !== capabilities.required.length || [...new Set(capabilities.missing)].length !== capabilities.missing.length || capabilities.missing.some((value) => !capabilities.required.includes(value)) || Object.entries(capabilities.selected).some(([key, value]) => !validMetadata(key) || !validMetadata(value))) return { valid: false };
  if (capability.status === "resolved" && capabilities.missing.length !== 0) return { valid: false };
  return { valid: true, technical_block: { blocked: capability.status === "blocked", reason_code: capability.status === "blocked" ? "HITL_CAPABILITY_BLOCKED" : null, missing_capabilities: [...capabilities.missing].sort() } };
}
function validateResolvedPolicy(policy) {
  if (!policy.action || !actions.has(policy.action.requested)) return "HITL_INVALID_POLICY_ACTION";
  if (!policy.risk || !riskLevels.has(policy.risk.level)) return "HITL_INVALID_POLICY_RISK";
  if (!Array.isArray(policy.conditions) || policy.conditions.some((condition) => !validMetadata(condition))) return "HITL_INVALID_POLICY_CONDITIONS";
  if (!validateEvidence(policy.matched_rules)) return "HITL_INVALID_POLICY_EVIDENCE";
  if (!validateReasons(policy.reasons)) return "HITL_INVALID_POLICY_REASONS";
  return null;
}
function hdr(policy, reason_code) {
  const allowed_responses = ["APPROVE", "REJECT", "CANCEL"];
  return {
    affected_action: policy.action.requested,
    blocking_scope: policy.action.requested,
    reason_human_is_required: reason_code,
    risk: { level: policy.risk.level },
    decision_mode: policy.decision.mode,
    permission: policy.permission,
    allowed_responses,
    conditions: [...new Set(policy.conditions)].sort(),
    policy_evidence: [...new Set(policy.matched_rules.map((rule) => rule.authority))].sort().map((authority) => ({ authority }))
  };
}
function resolvedRequirement(required, reason_code, policy, technical_block) {
  return { status: "resolved", human_requirement: { required, kind: required ? "approval" : "not_required", reason_code, allowed_responses: required ? ["APPROVE", "REJECT", "CANCEL"] : [] }, technical_block, hdr_candidate: required ? hdr(policy, reason_code) : null, warnings: [] };
}

/** Pure Step 19 interpreter. It derives HITL requirements without prompting, persistence, runtime state, or execution authority. */
export function resolveHumanDecisionRequirement(input = {}) {
  if (!input || typeof input !== "object" || Array.isArray(input)) return fail("HITL_INPUT_REQUIRED");
  const policy = input.policy;
  if (!policy || typeof policy !== "object" || Array.isArray(policy) || !policyStatuses.has(policy.status)) return fail("HITL_POLICY_REQUIRED");
  const capability = validateCapability(input.capability);
  if (!capability.valid) return fail("HITL_INVALID_CAPABILITY_RESULT");
  if (policy.status !== "invalid_input" && (!modes.has(policy.decision?.mode) || !permissions.has(policy.permission))) return fail("HITL_INVALID_POLICY_SHAPE");
  if (policy.status !== "invalid_input" && !supportedPairs.has(`${policy.decision.mode}/${policy.permission}`)) return blocked("HITL_UNSUPPORTED_POLICY_PAIR", capability.technical_block);
  if (policy.status !== "resolved") return blocked("HITL_UPSTREAM_POLICY_NOT_RESOLVED", capability.technical_block);
  const policyError = validateResolvedPolicy(policy);
  if (policyError) return fail(policyError);
  if (policy.decision.mode === "FORBIDDEN") return resolvedRequirement(false, "HITL_POLICY_PROHIBITED", policy, capability.technical_block);
  if (policy.permission === "REQUIRE_APPROVAL") return resolvedRequirement(true, policy.decision.mode === "APPROVAL" ? "HITL_DECISION_APPROVAL_REQUIRED" : "HITL_ACTION_APPROVAL_REQUIRED", policy, capability.technical_block);
  return resolvedRequirement(false, "HITL_NOT_REQUIRED", policy, capability.technical_block);
}
