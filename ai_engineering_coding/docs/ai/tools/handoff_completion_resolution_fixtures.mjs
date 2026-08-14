import assert from "node:assert/strict";
import { resolveHandoffCompletion } from "./handoff_completion_resolution.mjs";
import { resolveWorkflowRoute } from "./workflow_routing_resolution.mjs";

const identity = (overrides = {}) => ({ implementation_fingerprint: "impl-1", scope_fingerprint: "scope-1", verification_identity_fingerprint: "verification-1", review_identity: "review-1", handoff_definition_fingerprint: "handoff-1", ...overrides });
const completed = (overrides = {}) => ({ identity: identity(), evidence_refs: ["handoff.evidence"], ...overrides });
const base = (overrides = {}) => ({ current_identity: identity(), implementation: { status: "COMPLETE" }, verification: { status: "EVIDENCE_CURRENT" }, review_requirement: { status: "REQUIRED" }, review_result: { status: "APPROVED_CURRENT" }, scope_reassessment: { required: false }, policy_gate: { status: "SATISFIED" }, handoff_observation: null, ...overrides });
const noReview = (overrides = {}) => base({ current_identity: identity({ review_identity: "NONE" }), review_requirement: { status: "NOT_REQUIRED" }, review_result: null, ...overrides });
const exactKeys = ["resolution_status", "status", "evidence_refs", "reason_codes", "errors", "warnings"];
function assertResult(input, status, reason, evidence_refs = status === "COMPLETE" ? ["handoff.evidence"] : []) { const result = resolveHandoffCompletion(input); assert.deepEqual(result, { resolution_status: "resolved", status, evidence_refs, reason_codes: [reason], errors: [], warnings: [] }); assert.deepEqual(Object.keys(result), exactKeys); }

const cases = [
  ["valid_no_completion", base(), "NOT_COMPLETE", "HANDOFF_NOT_COMPLETE"],
  ["valid_current_completion", base({ handoff_observation: completed() }), "COMPLETE", "HANDOFF_COMPLETE_CURRENT"],
  ["valid_no_review_completion", noReview({ handoff_observation: completed({ identity: identity({ review_identity: "NONE" }) }) }), "COMPLETE", "HANDOFF_COMPLETE_CURRENT"],
  ["unordered_refs_canonicalized", base({ handoff_observation: completed({ evidence_refs: ["handoff.z", "handoff.a", "handoff.z"] }) }), "COMPLETE", "HANDOFF_COMPLETE_CURRENT", ["handoff.a", "handoff.z"]],
  ["null_observation_not_complete", base({ handoff_observation: null }), "NOT_COMPLETE", "HANDOFF_NOT_COMPLETE", []],
  ["verification_not_required", base({ verification: { status: "NOT_REQUIRED" }, handoff_observation: completed() }), "COMPLETE", "HANDOFF_COMPLETE_CURRENT"],
];
let total = 0;
let passed = 0;
let failed = 0;
function record(ok, id) { total++; if (ok) passed++; else failed++; console.log(`${ok ? "PASS" : "FAIL"} ${id}`); }
for (const [id, input, status, reason, refs] of cases) { let ok = true; try { assertResult(input, status, reason, refs); } catch { ok = false; } record(ok, id); }

const staleDimensions = ["implementation_fingerprint", "scope_fingerprint", "verification_identity_fingerprint", "review_identity", "handoff_definition_fingerprint"];
for (const dimension of staleDimensions) { const current = identity({ [dimension]: dimension === "review_identity" ? "review-2" : `${dimension}-current` }); const observationIdentity = identity({ [dimension]: dimension === "review_identity" ? "review-1" : `${dimension}-old` }); const result = resolveHandoffCompletion(base({ current_identity: current, handoff_observation: completed({ identity: observationIdentity }) })); const ok = result.status === "NOT_COMPLETE" && result.reason_codes[0] === "HANDOFF_STALE"; record(ok, `stale_${dimension}`); }

const contradictions = [
  ["incomplete_implementation", base({ implementation: { status: "INCOMPLETE" }, handoff_observation: completed() })],
  ["verification_required", base({ verification: { status: "REQUIRED" }, handoff_observation: completed() })],
  ["verification_in_progress", base({ verification: { status: "IN_PROGRESS" }, handoff_observation: completed() })],
  ["verification_failed", base({ verification: { status: "FAILED" }, handoff_observation: completed() })],
  ["verification_blocked", base({ verification: { status: "BLOCKED" }, handoff_observation: completed() })],
  ["verification_stale", base({ verification: { status: "STALE" }, handoff_observation: completed() })],
  ["review_not_approved", base({ review_result: { status: "CHANGES_REQUIRED" }, handoff_observation: completed() })],
  ["review_unresolved", base({ review_requirement: { status: "UNRESOLVED" }, review_result: null, handoff_observation: completed() })],
  ["not_required_with_result", noReview({ review_result: { status: "APPROVED_CURRENT" }, handoff_observation: completed({ identity: identity({ review_identity: "NONE" }) }) })],
  ["scope_reassessment", base({ scope_reassessment: { required: true }, handoff_observation: completed() })],
  ["policy_prohibited", base({ policy_gate: { status: "PROHIBITED" }, handoff_observation: completed() })],
  ["policy_unresolved", base({ policy_gate: { status: "UNRESOLVED" }, handoff_observation: completed() })],
];
for (const [id, input] of contradictions) { const result = resolveHandoffCompletion(input); const ok = result.resolution_status === "invalid_input"; record(ok, id); }

const malformed = [
  ["null_root", null], ["array_root", []], ["empty_root", {}], ["unknown_root_key", { ...base(), extra: true }], ["null_implementation", base({ implementation: null })], ["invalid_implementation", base({ implementation: { status: "MAYBE" } })], ["invalid_verification", base({ verification: { status: "PASSED" } })], ["invalid_requirement", base({ review_requirement: { status: "MAYBE" } })], ["invalid_review_result", base({ review_result: { status: "DONE" } })], ["invalid_reassessment", base({ scope_reassessment: { required: "no" } })], ["array_observation", base({ handoff_observation: [] })], ["empty_observation", base({ handoff_observation: {} })], ["unknown_observation_field", base({ handoff_observation: { ...completed(), extra: true } })], ["missing_identity", base({ handoff_observation: { evidence_refs: ["handoff.evidence"] } })], ["malformed_identity", base({ handoff_observation: completed({ identity: {} }) })], ["missing_evidence", base({ handoff_observation: completed({ evidence_refs: [] }) })], ["bad_evidence_ref", base({ handoff_observation: completed({ evidence_refs: ["https://example.com"] }) })], ["oversized_fingerprint", base({ handoff_observation: completed({ identity: identity({ implementation_fingerprint: "x".repeat(129) }) }) })], ["raw_handoff_prose", base({ handoff_observation: { ...completed(), summary: "done" } })], ["raw_diff", base({ handoff_observation: { ...completed(), diff: "source" } })],
];
for (const [id, input] of malformed) { let result; try { result = resolveHandoffCompletion(input); } catch { result = null; } const ok = result?.resolution_status === "invalid_input"; record(ok, id); }

const orderedA = base({ handoff_observation: completed({ evidence_refs: ["handoff.a", "handoff.b"] }) });
const orderedB = base({ handoff_observation: completed({ evidence_refs: ["handoff.b", "handoff.a"] }) });
const deterministic = JSON.stringify(resolveHandoffCompletion(orderedA)) === JSON.stringify(resolveHandoffCompletion(orderedB)); record(deterministic, "unordered_full_output_equality");
const frozen = structuredClone(orderedB); const before = JSON.stringify(frozen); const deepFreeze = (value) => { if (value && typeof value === "object" && !Object.isFrozen(value)) { Object.freeze(value); Object.values(value).forEach(deepFreeze); } }; deepFreeze(frozen); const immutable = resolveHandoffCompletion(frozen).status === "COMPLETE" && JSON.stringify(frozen) === before; record(immutable, "frozen_input_not_mutated");

const hash = (digit) => `sha256:${digit.repeat(64)}`;
const runtime = { version: 1, workspace: { id: "STP-29", operation_id: "operation_1" }, lifecycle: { state: "OPEN" }, human_decision: { required: false, request_status: "none", decision_id: null, request_identity: null, request_fingerprint: null, response_status: "none" }, technical_block: { blocked: false, missing_capabilities: [] }, policy_projection: { status: "resolved", terminal_reason: null }, ownership: { active_owner: "runtime_coordinator" }, revision: { state_revision: hash("a"), expected_revision: hash("b") } };
const workflowBase = (handoff) => ({ runtime_state: runtime, policy_gate: { status: "SATISFIED" }, implementation: { status: "COMPLETE" }, verification: { status: "EVIDENCE_CURRENT" }, review_requirement: { status: "NOT_REQUIRED", reason_codes: [] }, review_result: null, scope_reassessment: { required: false }, handoff: { status: handoff }, evidence_refs: [] });
const workflowReady = resolveWorkflowRoute(workflowBase("NOT_COMPLETE")); const workflowComplete = resolveWorkflowRoute(workflowBase("COMPLETE"));
const workflowOk = workflowReady.status === "READY" && workflowReady.stage === "HANDOFF" && workflowComplete.status === "COMPLETE" && workflowComplete.stage === "NONE"; record(workflowOk, "workflow_compatibility");
console.log(`Handoff completion fixture suite: ${passed}/${total} passed`); if (failed > 0) { console.error(`Handoff completion fixture failures: ${failed}`); process.exitCode = 1; }
