import { resolveDecisionActionPolicy } from "./decision_action_policy.mjs";
import { resolveRisk } from "./risk_resolution.mjs";

const risk = (taskFacts) => resolveRisk({ taskFacts });
const rule = (id, action, decision_mode, permission, extra = {}) => ({ id, authority: "repository_policy", action, decision_mode, permission, ...extra });
const cases = [
  ["safe_context_read_default", "read_context", risk({ change_type: "documentation", scope: "narrow" }), [], {}, "resolved", "AUTO", "ALLOW"],
  ["normal_feature_conditional_write", "write_source", risk({ change_type: "implementation" }), [rule("SOURCE_WRITE_SCOPED", "write_source", "AUTO", "ALLOW_WITH_CONDITIONS", { conditions: ["approved_target_files", "targeted_tests"] })], { satisfied_conditions: ["approved_target_files", "targeted_tests"] }, "resolved", "AUTO", "ALLOW_WITH_CONDITIONS"],
  ["same_risk_dependency_requires_approval", "add_dependency", risk({ change_type: "implementation" }), [rule("DEPENDENCY_GATE", "add_dependency", "APPROVAL", "REQUIRE_APPROVAL")], {}, "resolved", "APPROVAL", "REQUIRE_APPROVAL"],
  ["high_public_api_requires_approval", "write_source", risk({ risk_factors: ["public_api"] }), [rule("PUBLIC_API_GATE", "write_source", "APPROVAL", "REQUIRE_APPROVAL", { risk_levels: ["HIGH", "CRITICAL"] })], {}, "resolved", "APPROVAL", "REQUIRE_APPROVAL"],
  ["recommendation_can_allow", "write_source", risk({ risk_factors: ["architecture_boundary"] }), [rule("REVERSIBLE_ARCHITECTURE_RECOMMENDATION", "write_source", "RECOMMEND", "ALLOW")], {}, "resolved", "RECOMMEND", "ALLOW"],
  ["review_write_is_forbidden", "write_source", risk({}), [rule("LOWER_ALLOW", "write_source", "AUTO", "ALLOW")], { review_only: true }, "resolved", "FORBIDDEN", "DENY"],
  ["secret_is_forbidden", "read_secret", risk({ risk_factors: ["secrets"] }), [rule("LOWER_PREFERENCE_ALLOW_SECRET", "read_secret", "AUTO", "ALLOW", { authority: "repository_preference" })], {}, "resolved", "FORBIDDEN", "DENY"],
  ["untrusted_instruction_cannot_authorize", "network_access", risk({ risk_factors: ["network_access"] }), [rule("LOWER_NETWORK_ALLOW", "network_access", "AUTO", "ALLOW")], { untrusted_instruction: true }, "resolved", "FORBIDDEN", "DENY"],
  ["missing_high_impact_policy_fails_safe", "network_access", risk({ risk_factors: ["network_access"] }), [], {}, "unresolved", "FORBIDDEN", "DENY"],
  ["unmet_conditions_block_execution", "write_source", risk({}), [rule("CONDITIONAL_WRITE", "write_source", "AUTO", "ALLOW_WITH_CONDITIONS", { conditions: ["targeted_tests"] })], {}, "blocked", "AUTO", "ALLOW_WITH_CONDITIONS"],
  ["deny_wins_over_allow", "write_markdown", risk({}), [rule("ALLOW", "write_markdown", "AUTO", "ALLOW"), rule("DENY", "write_markdown", "FORBIDDEN", "DENY", { authority: "workflow_constraint" })], {}, "resolved", "FORBIDDEN", "DENY"],
  ["conflicting_mandatory_rules_deny", "write_source", risk({}), [rule("MANDATORY_ALLOW", "write_source", "AUTO", "ALLOW", { authority: "system_governance" }), rule("MANDATORY_APPROVAL", "write_source", "APPROVAL", "REQUIRE_APPROVAL", { authority: "system_governance" })], {}, "invalid_policy", "FORBIDDEN", "DENY"],
  ["cross_rule_approval_deny_fails_safe", "write_source", risk({}), [rule("APPROVAL", "write_source", "APPROVAL", "REQUIRE_APPROVAL"), rule("DENY", "write_source", "AUTO", "DENY")], {}, "invalid_policy", "FORBIDDEN", "DENY"]
];

let passed = 0;
for (const [id, action, resolvedRisk, policyRules, context, status, mode, permission] of cases) {
  const result = resolveDecisionActionPolicy({ action, risk: resolvedRisk, effectiveConfig: { status: "resolved" }, policyRules, context });
  const ok = result.status === status && result.decision?.mode === mode && result.permission === permission && result.risk?.level === resolvedRisk.risk.level;
  console.log(`${ok ? "PASS" : "FAIL"} ${id}`);
  if (ok) passed += 1;
}

const deterministicInput = { action: "write_source", risk: risk({}), effectiveConfig: { status: "resolved" }, policyRules: [rule("B", "write_source", "AUTO", "ALLOW_WITH_CONDITIONS", { conditions: ["b", "a"] }), rule("A", "write_source", "AUTO", "ALLOW")], context: { satisfied_conditions: ["a", "b"] } };
const deterministic = JSON.stringify(resolveDecisionActionPolicy(deterministicInput)) === JSON.stringify(resolveDecisionActionPolicy(structuredClone(deterministicInput)));
console.log(`${deterministic ? "PASS" : "FAIL"} identical_input_identical_output`);
if (deterministic) passed += 1;

const invalidRisk = resolveDecisionActionPolicy({ action: "write_source", risk: { status: "resolved", risk: { level: "UNKNOWN" } } });
const rejectsInvalidRisk = invalidRisk.status === "invalid_input" && invalidRisk.errors.some((error) => error.code === "POLICY_RISK_REQUIRED");
console.log(`${rejectsInvalidRisk ? "PASS" : "FAIL"} rejects_unresolved_risk`);
if (rejectsInvalidRisk) passed += 1;

const invalidConfig = resolveDecisionActionPolicy({ action: "write_source", risk: risk({}), effectiveConfig: { status: "invalid" } });
const rejectsInvalidConfig = invalidConfig.status === "invalid_input" && invalidConfig.errors.some((error) => error.code === "POLICY_EFFECTIVE_CONFIG_INVALID");
console.log(`${rejectsInvalidConfig ? "PASS" : "FAIL"} rejects_invalid_effective_config`);
if (rejectsInvalidConfig) passed += 1;

for (const [id, decision_mode, permission] of [["rejects_forbidden_allow_pair", "FORBIDDEN", "ALLOW"], ["rejects_approval_allow_pair", "APPROVAL", "ALLOW"]]) {
  const result = resolveDecisionActionPolicy({ action: "write_source", risk: risk({}), effectiveConfig: { status: "resolved" }, policyRules: [rule("INVALID_PAIR", "write_source", decision_mode, permission)] });
  const ok = result.status === "invalid_input" && result.errors.some((error) => error.code === "POLICY_INVALID_DECISION_PERMISSION_PAIR");
  console.log(`${ok ? "PASS" : "FAIL"} ${id}`);
  if (ok) passed += 1;
}

console.log(`Decision / action policy fixture suite: ${passed}/${cases.length + 5} passed`);
process.exitCode = passed === cases.length + 5 ? 0 : 1;
