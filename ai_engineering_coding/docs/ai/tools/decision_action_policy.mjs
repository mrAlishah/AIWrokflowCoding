const actions = new Set(["read_context", "read_source", "write_markdown", "write_source", "run_build", "run_tests", "run_static_analysis", "add_dependency", "network_access", "external_tool", "read_secret", "destructive_operation", "git_commit", "git_push", "create_pr", "modify_policy", "modify_repo_context"]);
const authorities = new Set(["system_governance", "repository_policy", "workflow_constraint", "stp_config", "repository_preference", "profile_default"]);
const decisionModes = new Set(["AUTO", "RECOMMEND", "APPROVAL", "FORBIDDEN"]);
const permissions = new Set(["ALLOW", "ALLOW_WITH_CONDITIONS", "REQUIRE_APPROVAL", "DENY"]);
const riskLevels = new Set(["LOW", "NORMAL", "HIGH", "CRITICAL"]);
const decisionRank = { AUTO: 0, RECOMMEND: 1, APPROVAL: 2, FORBIDDEN: 3 };
const permissionRank = { ALLOW: 0, ALLOW_WITH_CONDITIONS: 1, REQUIRE_APPROVAL: 2, DENY: 3 };

function issue(path, message, code = "POLICY_INVALID_INPUT") { return { code, path, message }; }
function stableRules(rules) { return [...rules].sort((left, right) => left.authority.localeCompare(right.authority) || left.id.localeCompare(right.id)); }
function strongest(rules, field, ranks) { return rules.reduce((winner, rule) => !winner || ranks[rule[field]] > ranks[winner[field]] ? rule : winner, undefined)?.[field]; }
function validDecisionPermissionPair(decision, permission) { return (decision !== "FORBIDDEN" || permission === "DENY") && (decision !== "APPROVAL" || permission === "REQUIRE_APPROVAL"); }

/** Validate the normalized Step 16 policy-resolution input without selecting a capability or executing an action. */
export function validateDecisionActionPolicyInput(input) {
  const errors = [];
  if (!input || typeof input !== "object" || Array.isArray(input)) return { valid: false, errors: [issue("input", "must be an object")] };
  if (!actions.has(input.action)) errors.push(issue("action", "must be a supported action"));
  if (input.risk?.status !== "resolved" || !riskLevels.has(input.risk?.risk?.level)) errors.push(issue("risk", "must be a resolved risk result with a supported level", "POLICY_RISK_REQUIRED"));
  if (input.effectiveConfig !== undefined && input.effectiveConfig?.status !== "resolved") errors.push(issue("effectiveConfig", "must be resolved when supplied", "POLICY_EFFECTIVE_CONFIG_INVALID"));
  if (input.context !== undefined && (!input.context || typeof input.context !== "object" || Array.isArray(input.context))) errors.push(issue("context", "must be an object when supplied"));
  for (const field of ["review_only", "untrusted_instruction"]) if (input.context?.[field] !== undefined && typeof input.context[field] !== "boolean") errors.push(issue(`context.${field}`, "must be a boolean when supplied"));
  if (input.context?.satisfied_conditions !== undefined && (!Array.isArray(input.context.satisfied_conditions) || input.context.satisfied_conditions.some((condition) => typeof condition !== "string"))) errors.push(issue("context.satisfied_conditions", "must be an array of strings when supplied"));
  if (input.policyRules !== undefined && !Array.isArray(input.policyRules)) errors.push(issue("policyRules", "must be an array when supplied"));
  for (const [index, rule] of (input.policyRules ?? []).entries()) {
    const path = `policyRules.${index}`;
    if (!rule || typeof rule !== "object" || Array.isArray(rule)) { errors.push(issue(path, "must be an object")); continue; }
    if (typeof rule.id !== "string" || rule.id.length === 0) errors.push(issue(`${path}.id`, "must be a non-empty string"));
    if (!authorities.has(rule.authority)) errors.push(issue(`${path}.authority`, "must be a supported authority"));
    if (rule.action !== "*" && !actions.has(rule.action)) errors.push(issue(`${path}.action`, "must be a supported action or *"));
    if (!decisionModes.has(rule.decision_mode)) errors.push(issue(`${path}.decision_mode`, "must be a supported decision mode"));
    if (!permissions.has(rule.permission)) errors.push(issue(`${path}.permission`, "must be a supported permission"));
    if (decisionModes.has(rule.decision_mode) && permissions.has(rule.permission) && !validDecisionPermissionPair(rule.decision_mode, rule.permission)) errors.push(issue(path, "FORBIDDEN requires DENY and APPROVAL requires REQUIRE_APPROVAL", "POLICY_INVALID_DECISION_PERMISSION_PAIR"));
    if (rule.risk_levels !== undefined && (!Array.isArray(rule.risk_levels) || rule.risk_levels.some((level) => !riskLevels.has(level)))) errors.push(issue(`${path}.risk_levels`, "must contain supported risk levels when supplied"));
    if (rule.conditions !== undefined && (!Array.isArray(rule.conditions) || rule.conditions.some((condition) => typeof condition !== "string"))) errors.push(issue(`${path}.conditions`, "must be an array of strings when supplied"));
  }
  return { valid: errors.length === 0, errors };
}

function mandatoryRules(input) {
  const rules = [
    { id: "MANDATORY_SECRET_DENY", authority: "system_governance", action: "read_secret", decision_mode: "FORBIDDEN", permission: "DENY", reason_code: "POLICY_SECRET_DENY" }
  ];
  if (input.context?.review_only && input.action === "write_source") rules.push({ id: "MANDATORY_REVIEW_READ_ONLY", authority: "system_governance", action: "write_source", decision_mode: "FORBIDDEN", permission: "DENY", reason_code: "POLICY_REVIEW_SOURCE_WRITE_DENY" });
  if (input.context?.untrusted_instruction) rules.push({ id: "MANDATORY_UNTRUSTED_INSTRUCTION_DENY", authority: "system_governance", action: "*", decision_mode: "FORBIDDEN", permission: "DENY", reason_code: "POLICY_UNTRUSTED_INSTRUCTION_DENY" });
  return rules;
}

function applies(rule, action, level) { return (rule.action === "*" || rule.action === action) && (!rule.risk_levels || rule.risk_levels.includes(level)); }
function result(status, input, decision, permission, matched_rules, conditions, reasons, warnings = []) {
  return { status, action: { requested: input.action }, risk: { level: input.risk.risk.level }, decision: { mode: decision }, permission, conditions, matched_rules: stableRules(matched_rules).map(({ id, authority, decision_mode, permission: rulePermission, reason_code }) => ({ id, authority, decision_mode, permission: rulePermission, reason_code })), reasons, warnings };
}

/**
 * Resolve Decision Mode and Action Permission independently. This is pure policy
 * resolution: it neither executes the action nor performs HITL, workflow,
 * capability/provider selection, or verification.
 */
export function resolveDecisionActionPolicy(input = {}) {
  const validation = validateDecisionActionPolicyInput(input);
  if (!validation.valid) return { status: "invalid_input", errors: validation.errors, warnings: [] };

  const level = input.risk.risk.level;
  const configured = (input.policyRules ?? []).filter((rule) => applies(rule, input.action, level));
  const mandatory = [...mandatoryRules(input).filter((rule) => applies(rule, input.action, level)), ...configured.filter((rule) => rule.authority === "system_governance")];
  const matched = [...mandatory, ...configured.filter((rule) => rule.authority !== "system_governance")];
  const conflictingMandatory = mandatory.length > 1 && new Set(mandatory.map((rule) => `${rule.decision_mode}/${rule.permission}`)).size > 1;
  if (conflictingMandatory) return result("invalid_policy", input, "FORBIDDEN", "DENY", matched, [], [{ code: "POLICY_MANDATORY_CONFLICT", message: "same-priority mandatory policies conflict; deny wins" }]);

  if (matched.length === 0 && input.action === "read_context") return result("resolved", input, "AUTO", "ALLOW", [], [], [{ code: "POLICY_SAFE_READ_DEFAULT", message: "known low-impact context read uses the safe default" }]);
  if (matched.length === 0) return result("unresolved", input, "FORBIDDEN", "DENY", [], [], [{ code: "POLICY_MISSING_FOR_ACTION", message: "no applicable policy permits this action" }]);

  const decision = strongest(matched, "decision_mode", decisionRank);
  const permission = strongest(matched, "permission", permissionRank);
  const conditions = [...new Set(matched.flatMap((rule) => rule.conditions ?? []))].sort();
  const satisfied = new Set(input.context?.satisfied_conditions ?? []);
  const unmet = conditions.filter((condition) => !satisfied.has(condition));
  const reasons = matched.map((rule) => ({ code: rule.reason_code ?? "POLICY_RULE_MATCHED", rule_id: rule.id, authority: rule.authority }));
  if (!validDecisionPermissionPair(decision, permission)) return result("invalid_policy", input, "FORBIDDEN", "DENY", matched, [], [...reasons, { code: "POLICY_FINAL_DECISION_PERMISSION_CONFLICT", message: "independent rule ranking produced an incompatible decision and permission pair" }]);
  if (unmet.length > 0 && permission === "ALLOW_WITH_CONDITIONS") return result("blocked", input, decision, permission, matched, conditions, [...reasons, { code: "POLICY_CONDITIONS_UNMET", conditions: unmet }]);
  return result("resolved", input, decision, permission, matched, conditions, reasons);
}
