import { resolveRisk } from "./risk_resolution.mjs";
import { resolveDecisionActionPolicy } from "./decision_action_policy.mjs";
import { resolveHumanDecisionRequirement } from "./hitl_requirement_resolution.mjs";

const policy = (mode = "AUTO", permission = "ALLOW", status = "resolved", overrides = {}) => ({ status, action: { requested: "write_source" }, risk: { level: "HIGH" }, decision: { mode }, permission, conditions: ["targeted_tests", "approved_target_files", "targeted_tests"], matched_rules: [{ id: "SOURCE_WRITE_GATE", authority: "repository_policy", reason_code: "POLICY_RULE_MATCHED" }], reasons: [{ code: "POLICY_RULE_MATCHED", rule_id: "SOURCE_WRITE_GATE", authority: "repository_policy" }], ...overrides });
const capability = (status = "resolved", overrides = {}) => ({ status, capabilities: { required: ["build", "test"], missing: status === "blocked" ? ["build"] : [], selected: status === "resolved" ? { build: "LOCAL_BUILD", test: "LOCAL_TEST" } : { test: "LOCAL_TEST" }, ...overrides } });
const fixtures = [
  ["auto_allow", { policy: policy() }, { status: "resolved", human_requirement: { required: false, kind: "not_required", reason_code: "HITL_NOT_REQUIRED", allowed_responses: [] }, technical_block: { blocked: false, reason_code: null, missing_capabilities: [] }, hdr_candidate: null, warnings: [] }],
  ["recommend_allow", { policy: policy("RECOMMEND", "ALLOW") }, { status: "resolved", human_requirement: { required: false, kind: "not_required", reason_code: "HITL_NOT_REQUIRED", allowed_responses: [] }, technical_block: { blocked: false, reason_code: null, missing_capabilities: [] }, hdr_candidate: null, warnings: [] }],
  ["auto_conditional_allow", { policy: policy("AUTO", "ALLOW_WITH_CONDITIONS") }, { status: "resolved", human_requirement: { required: false, kind: "not_required", reason_code: "HITL_NOT_REQUIRED", allowed_responses: [] }, technical_block: { blocked: false, reason_code: null, missing_capabilities: [] }, hdr_candidate: null, warnings: [] }],
  ["approval_gate_full_hdr", { policy: policy("APPROVAL", "REQUIRE_APPROVAL") }, { status: "resolved", human_requirement: { required: true, kind: "approval", reason_code: "HITL_DECISION_APPROVAL_REQUIRED", allowed_responses: ["APPROVE", "REJECT", "CANCEL"] }, technical_block: { blocked: false, reason_code: null, missing_capabilities: [] }, hdr_candidate: { affected_action: "write_source", blocking_scope: "write_source", reason_human_is_required: "HITL_DECISION_APPROVAL_REQUIRED", risk: { level: "HIGH" }, decision_mode: "APPROVAL", permission: "REQUIRE_APPROVAL", allowed_responses: ["APPROVE", "REJECT", "CANCEL"], conditions: ["approved_target_files", "targeted_tests"], policy_evidence: [{ authority: "repository_policy" }] }, warnings: [] }],
  ["action_gate", { policy: policy("AUTO", "REQUIRE_APPROVAL") }, { status: "resolved", human_requirement: { required: true, kind: "approval", reason_code: "HITL_ACTION_APPROVAL_REQUIRED", allowed_responses: ["APPROVE", "REJECT", "CANCEL"] }, technical_block: { blocked: false, reason_code: null, missing_capabilities: [] }, hdr_candidate: { affected_action: "write_source", blocking_scope: "write_source", reason_human_is_required: "HITL_ACTION_APPROVAL_REQUIRED", risk: { level: "HIGH" }, decision_mode: "AUTO", permission: "REQUIRE_APPROVAL", allowed_responses: ["APPROVE", "REJECT", "CANCEL"], conditions: ["approved_target_files", "targeted_tests"], policy_evidence: [{ authority: "repository_policy" }] }, warnings: [] }],
  ["auto_allow_capability_resolved", { policy: policy(), capability: capability("resolved") }, { status: "resolved", human_requirement: { required: false, kind: "not_required", reason_code: "HITL_NOT_REQUIRED", allowed_responses: [] }, technical_block: { blocked: false, reason_code: null, missing_capabilities: [] }, hdr_candidate: null, warnings: [] }],
  ["approval_capability_resolved", { policy: policy("APPROVAL", "REQUIRE_APPROVAL"), capability: capability("resolved") }, { status: "resolved", human_requirement: { required: true, kind: "approval", reason_code: "HITL_DECISION_APPROVAL_REQUIRED", allowed_responses: ["APPROVE", "REJECT", "CANCEL"] }, technical_block: { blocked: false, reason_code: null, missing_capabilities: [] }, hdr_candidate: { affected_action: "write_source", blocking_scope: "write_source", reason_human_is_required: "HITL_DECISION_APPROVAL_REQUIRED", risk: { level: "HIGH" }, decision_mode: "APPROVAL", permission: "REQUIRE_APPROVAL", allowed_responses: ["APPROVE", "REJECT", "CANCEL"], conditions: ["approved_target_files", "targeted_tests"], policy_evidence: [{ authority: "repository_policy" }] }, warnings: [] }],
  ["auto_allow_capability_blocked", { policy: policy(), capability: capability("blocked") }, { status: "resolved", human_requirement: { required: false, kind: "not_required", reason_code: "HITL_NOT_REQUIRED", allowed_responses: [] }, technical_block: { blocked: true, reason_code: "HITL_CAPABILITY_BLOCKED", missing_capabilities: ["build"] }, hdr_candidate: null, warnings: [] }],
  ["approval_capability_blocked", { policy: policy("APPROVAL", "REQUIRE_APPROVAL"), capability: capability("blocked") }, { status: "resolved", human_requirement: { required: true, kind: "approval", reason_code: "HITL_DECISION_APPROVAL_REQUIRED", allowed_responses: ["APPROVE", "REJECT", "CANCEL"] }, technical_block: { blocked: true, reason_code: "HITL_CAPABILITY_BLOCKED", missing_capabilities: ["build"] }, hdr_candidate: { affected_action: "write_source", blocking_scope: "write_source", reason_human_is_required: "HITL_DECISION_APPROVAL_REQUIRED", risk: { level: "HIGH" }, decision_mode: "APPROVAL", permission: "REQUIRE_APPROVAL", allowed_responses: ["APPROVE", "REJECT", "CANCEL"], conditions: ["approved_target_files", "targeted_tests"], policy_evidence: [{ authority: "repository_policy" }] }, warnings: [] }],
  ["forbidden_capability_blocked", { policy: policy("FORBIDDEN", "DENY"), capability: capability("blocked") }, { status: "resolved", human_requirement: { required: false, kind: "not_required", reason_code: "HITL_POLICY_PROHIBITED", allowed_responses: [] }, technical_block: { blocked: true, reason_code: "HITL_CAPABILITY_BLOCKED", missing_capabilities: ["build"] }, hdr_candidate: null, warnings: [] }],
  ["blocked_condition", { policy: policy("AUTO", "ALLOW_WITH_CONDITIONS", "blocked") }, { status: "blocked", human_requirement: { required: false, kind: "not_required", reason_code: "HITL_UPSTREAM_POLICY_NOT_RESOLVED", allowed_responses: [] }, technical_block: { blocked: false, reason_code: null, missing_capabilities: [] }, hdr_candidate: null, warnings: [] }],
  ["unresolved", { policy: policy("FORBIDDEN", "DENY", "unresolved") }, { status: "blocked", human_requirement: { required: false, kind: "not_required", reason_code: "HITL_UPSTREAM_POLICY_NOT_RESOLVED", allowed_responses: [] }, technical_block: { blocked: false, reason_code: null, missing_capabilities: [] }, hdr_candidate: null, warnings: [] }]
];

const invalidFixtures = [
  ["malformed_capability", { policy: policy(), capability: { status: "blocked", capabilities: { required: "build", missing: [], selected: {} } } }, { status: "invalid_input", errors: [{ code: "HITL_INVALID_CAPABILITY_RESULT" }], warnings: [] }],
  ["auto_deny", { policy: policy("AUTO", "DENY") }, { status: "blocked", human_requirement: { required: false, kind: "not_required", reason_code: "HITL_UNSUPPORTED_POLICY_PAIR", allowed_responses: [] }, technical_block: { blocked: false, reason_code: null, missing_capabilities: [] }, hdr_candidate: null, warnings: [] }],
  ["recommend_deny", { policy: policy("RECOMMEND", "DENY") }, { status: "blocked", human_requirement: { required: false, kind: "not_required", reason_code: "HITL_UNSUPPORTED_POLICY_PAIR", allowed_responses: [] }, technical_block: { blocked: false, reason_code: null, missing_capabilities: [] }, hdr_candidate: null, warnings: [] }],
  ["recommend_requires_approval", { policy: policy("RECOMMEND", "REQUIRE_APPROVAL") }, { status: "blocked", human_requirement: { required: false, kind: "not_required", reason_code: "HITL_UNSUPPORTED_POLICY_PAIR", allowed_responses: [] }, technical_block: { blocked: false, reason_code: null, missing_capabilities: [] }, hdr_candidate: null, warnings: [] }],
  ["forbidden_requires_approval", { policy: policy("FORBIDDEN", "REQUIRE_APPROVAL") }, { status: "blocked", human_requirement: { required: false, kind: "not_required", reason_code: "HITL_UNSUPPORTED_POLICY_PAIR", allowed_responses: [] }, technical_block: { blocked: false, reason_code: null, missing_capabilities: [] }, hdr_candidate: null, warnings: [] }],
  ["approval_allow", { policy: policy("APPROVAL", "ALLOW") }, { status: "blocked", human_requirement: { required: false, kind: "not_required", reason_code: "HITL_UNSUPPORTED_POLICY_PAIR", allowed_responses: [] }, technical_block: { blocked: false, reason_code: null, missing_capabilities: [] }, hdr_candidate: null, warnings: [] }],
  ["missing_action", { policy: policy("APPROVAL", "REQUIRE_APPROVAL", "resolved", { action: undefined }) }, { status: "invalid_input", errors: [{ code: "HITL_INVALID_POLICY_ACTION" }], warnings: [] }],
  ["invalid_action", { policy: policy("APPROVAL", "REQUIRE_APPROVAL", "resolved", { action: { requested: "shell_command" } }) }, { status: "invalid_input", errors: [{ code: "HITL_INVALID_POLICY_ACTION" }], warnings: [] }],
  ["invalid_risk", { policy: policy("APPROVAL", "REQUIRE_APPROVAL", "resolved", { risk: { level: "EXTREME" } }) }, { status: "invalid_input", errors: [{ code: "HITL_INVALID_POLICY_RISK" }], warnings: [] }],
  ["conditions_as_string", { policy: policy("APPROVAL", "REQUIRE_APPROVAL", "resolved", { conditions: "targeted_tests" }) }, { status: "invalid_input", errors: [{ code: "HITL_INVALID_POLICY_CONDITIONS" }], warnings: [] }],
  ["invalid_matched_rule", { policy: policy("APPROVAL", "REQUIRE_APPROVAL", "resolved", { matched_rules: [{ authority: "curl-malicious" }] }) }, { status: "invalid_input", errors: [{ code: "HITL_INVALID_POLICY_EVIDENCE" }], warnings: [] }],
  ["invalid_reason", { policy: policy("APPROVAL", "REQUIRE_APPROVAL", "resolved", { reasons: [{ code: "raw reason" }] }) }, { status: "invalid_input", errors: [{ code: "HITL_INVALID_POLICY_REASONS" }], warnings: [] }]
];

let passed = 0;
for (const [id, input, expected] of fixtures) {
  const actual = resolveHumanDecisionRequirement(input);
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${ok ? "PASS" : "FAIL"} ${id}`);
  if (ok) passed += 1;
}
for (const [id, input, expected] of invalidFixtures) {
  const actual = resolveHumanDecisionRequirement(input);
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${ok ? "PASS" : "FAIL"} ${id}`);
  if (ok) passed += 1;
}
const adversarialEvidence = ["sk_live_secret", "curl-malicious", "wget_payload", "BearerToken", "rm-rf", "api-key-123", "../../secret", "$(command)"];
for (const value of adversarialEvidence) {
  const actual = resolveHumanDecisionRequirement({ policy: policy("APPROVAL", "REQUIRE_APPROVAL", "resolved", { matched_rules: [{ id: value, authority: "repository_policy", reason_code: value, payload: { raw: value } }] }) });
  const renderedHdr = JSON.stringify(actual.hdr_candidate);
  const ok = JSON.stringify(actual.hdr_candidate?.policy_evidence) === JSON.stringify([{ authority: "repository_policy" }]) && !renderedHdr.includes(value);
  console.log(`${ok ? "PASS" : "FAIL"} adversarial_evidence_${value}`);
  if (ok) passed += 1;
}
const risk = resolveRisk({ taskFacts: { change_type: "implementation", scope: "bounded" } });
const governanceFixtures = [
  ["secret_denial", { action: "read_secret", policyRules: [], context: {} }],
  ["review_only_write_denial", { action: "write_source", policyRules: [{ id: "ALLOW_WRITE", authority: "repository_policy", action: "write_source", decision_mode: "AUTO", permission: "ALLOW" }], context: { review_only: true } }],
  ["untrusted_instruction_denial", { action: "network_access", policyRules: [{ id: "ALLOW_NETWORK", authority: "repository_policy", action: "network_access", decision_mode: "AUTO", permission: "ALLOW" }], context: { untrusted_instruction: true } }]
];
for (const [id, input] of governanceFixtures) {
  const resolvedPolicy = resolveDecisionActionPolicy({ ...input, risk, effectiveConfig: { status: "resolved" } });
  const actual = resolveHumanDecisionRequirement({ policy: resolvedPolicy });
  const ok = actual.status === "resolved" && actual.human_requirement.reason_code === "HITL_POLICY_PROHIBITED" && actual.hdr_candidate === null;
  console.log(`${ok ? "PASS" : "FAIL"} ${id}`);
  if (ok) passed += 1;
}
const deterministicInput = { policy: policy("APPROVAL", "REQUIRE_APPROVAL", "resolved", { conditions: ["targeted_tests", "approved_target_files", "targeted_tests"], matched_rules: [{ id: "Z_GATE", authority: "repository_policy", reason_code: "POLICY_Z" }, { id: "A_GATE", authority: "repository_policy", reason_code: "POLICY_A" }] }), capability: capability("blocked") };
const deterministic = JSON.stringify(resolveHumanDecisionRequirement(deterministicInput)) === JSON.stringify(resolveHumanDecisionRequirement(structuredClone(deterministicInput)));
console.log(`${deterministic ? "PASS" : "FAIL"} deterministic_complete_output`);
if (deterministic) passed += 1;
const total = fixtures.length + invalidFixtures.length + adversarialEvidence.length + governanceFixtures.length + 1;
console.log(`HITL requirement fixture suite: ${passed}/${total} passed`);
process.exitCode = passed === total ? 0 : 1;
