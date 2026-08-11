import assert from "node:assert/strict";
import { validateRuntimeState } from "./validate_runtime_state.mjs";
import { resolveRuntimeStateTransition } from "./runtime_state_transition_resolution.mjs";

const hash = (digit) => `sha256:${digit.repeat(64)}`;
const open = (blocked = false) => ({ version: 1, workspace: { id: "STP-23", operation_id: "operation_1" }, lifecycle: { state: "OPEN" }, human_decision: { required: false, request_status: "none", decision_id: null, request_identity: null, request_fingerprint: null, response_status: "none" }, technical_block: { blocked, missing_capabilities: blocked ? ["build"] : [] }, policy_projection: { status: "resolved", terminal_reason: null }, ownership: { active_owner: "runtime_coordinator" }, revision: { state_revision: hash("a"), expected_revision: hash("b") } });
const hdr = (digit = "c") => ({ decision_id: "HDR-20260811T120000Z-a81f", request_identity: hash(digit), request_fingerprint: hash("d") });
const waiting = (response = "none", blocked = false) => ({ ...open(blocked), lifecycle: { state: "WAITING_FOR_HUMAN" }, human_decision: { required: true, request_status: "pending", ...hdr(), response_status: response } });
const consumed = (response) => { const state = waiting("validated"); const result = resolveRuntimeStateTransition({ current_state: state, event: { type: "CONSUME_HUMAN_RESPONSE", ...hdr(), response } }); return result.candidate_state; };
const event = (type, extra = {}) => ({ type, ...extra });
const cases = [
  ["open_to_waiting_pending_hdr", open(), event("PERSIST_HUMAN_REQUEST", hdr()), "resolved", (r) => assert.equal(r.candidate_state.lifecycle.state, "WAITING_FOR_HUMAN")],
  ["same_request_identity_reconciliation_is_idempotent", waiting(), event("PERSIST_HUMAN_REQUEST", hdr()), "unchanged"],
  ["waiting_recorded_stays_waiting", waiting(), event("RECORD_HUMAN_RESPONSE", hdr()), "resolved", (r) => assert.equal(r.candidate_state.human_decision.response_status, "recorded")],
  ["waiting_validated_stays_waiting", waiting("recorded"), event("VALIDATE_HUMAN_RESPONSE", hdr()), "resolved", (r) => assert.equal(r.candidate_state.lifecycle.state, "WAITING_FOR_HUMAN")],
  ["recorded_response_not_consumed", waiting("recorded"), event("CONSUME_HUMAN_RESPONSE", { ...hdr(), response: "APPROVE" }), "invalid_transition"],
  ["validated_response_not_consumed", waiting("validated"), event("VALIDATE_HUMAN_RESPONSE", hdr()), "unchanged"],
  ["waiting_approve_to_open", waiting("validated"), event("CONSUME_HUMAN_RESPONSE", { ...hdr(), response: "APPROVE" }), "resolved", (r) => assert.equal(r.candidate_state.lifecycle.state, "OPEN")],
  ["waiting_reject_to_terminal", waiting("validated"), event("CONSUME_HUMAN_RESPONSE", { ...hdr(), response: "REJECT" }), "resolved", (r) => assert.equal(r.candidate_state.policy_projection.terminal_reason, "HUMAN_REJECTED")],
  ["waiting_cancel_to_terminal", waiting("validated"), event("CONSUME_HUMAN_RESPONSE", { ...hdr(), response: "CANCEL" }), "resolved", (r) => assert.equal(r.candidate_state.policy_projection.terminal_reason, "HUMAN_CANCELLED")],
  ["duplicate_same_approval_consumption_is_idempotent", consumed("APPROVE"), event("CONSUME_HUMAN_RESPONSE", { ...hdr(), response: "APPROVE" }), "unchanged"],
  ["same_decision_id_different_response_conflicts", consumed("APPROVE"), event("CONSUME_HUMAN_RESPONSE", { ...hdr(), response: "REJECT" }), "conflict"],
  ["consumed_approval_cannot_be_reused_for_different_fingerprint", consumed("APPROVE"), event("CONSUME_HUMAN_RESPONSE", { ...hdr("e"), response: "APPROVE" }), "invalid_transition"],
  ["unknown_decision_id_rejected", waiting("validated"), event("CONSUME_HUMAN_RESPONSE", { ...hdr(), decision_id: "HDR-other", response: "APPROVE" }), "invalid_transition"],
  ["stale_fingerprint_marks_rejected_stale_and_waits", waiting(), event("MARK_RESPONSE_STALE", { ...hdr(), request_fingerprint: hash("e") }), "resolved", (r) => assert.equal(r.candidate_state.human_decision.response_status, "rejected_stale")],
  ["conflicting_response_marks_conflicting_and_waits", waiting("recorded"), event("MARK_RESPONSE_CONFLICT", hdr()), "resolved", (r) => assert.equal(r.candidate_state.human_decision.response_status, "conflicting")],
  ["waiting_request_can_be_superseded", waiting(), event("SUPERSEDE_HUMAN_REQUEST", hdr()), "resolved", (r) => assert.equal(r.candidate_state.human_decision.request_status, "superseded")],
  ["old_decision_rejected_after_supersession", { ...open(), human_decision: { required: true, request_status: "superseded", ...hdr(), response_status: "none" } }, event("CONSUME_HUMAN_RESPONSE", { ...hdr(), response: "APPROVE" }), "invalid_transition"],
  ["open_sets_technical_block", open(), event("UPDATE_TECHNICAL_BLOCK", { blocked: true, missing_capabilities: ["build"] }), "resolved"],
  ["open_clears_technical_block", open(true), event("UPDATE_TECHNICAL_BLOCK", { blocked: false, missing_capabilities: [] }), "resolved"],
  ["waiting_sets_technical_block", waiting("none", false), event("UPDATE_TECHNICAL_BLOCK", { blocked: true, missing_capabilities: ["build"] }), "resolved"],
  ["waiting_clears_technical_block_but_stays_waiting", waiting("none", true), event("UPDATE_TECHNICAL_BLOCK", { blocked: false, missing_capabilities: [] }), "resolved", (r) => assert.equal(r.candidate_state.lifecycle.state, "WAITING_FOR_HUMAN")],
  ["approval_consumption_preserves_technical_block", waiting("validated", true), event("CONSUME_HUMAN_RESPONSE", { ...hdr(), response: "APPROVE" }), "resolved", (r) => assert.equal(r.candidate_state.technical_block.blocked, true)],
  ["terminal_rejects_capability_update", consumed("REJECT"), event("UPDATE_TECHNICAL_BLOCK", { blocked: true, missing_capabilities: ["build"] }), "invalid_transition"],
  ["policy_prohibition_from_open", open(), event("APPLY_POLICY_TERMINAL"), "resolved", (r) => assert.equal(r.candidate_state.policy_projection.terminal_reason, "POLICY_PROHIBITED")],
  ["policy_prohibition_from_waiting", waiting(), event("APPLY_POLICY_TERMINAL"), "resolved", (r) => assert.equal(r.candidate_state.human_decision.request_status, "none")],
  ["invalid_upstream_to_terminal", open(), event("APPLY_INVALID_UPSTREAM_TERMINAL"), "resolved", (r) => assert.equal(r.candidate_state.policy_projection.terminal_reason, "INVALID_UPSTREAM")],
  ["unrecoverable_failure_to_terminal", open(), event("APPLY_UNRECOVERABLE_FAILURE"), "resolved"],
  ["terminal_cannot_reopen_with_approval", consumed("REJECT"), event("CONSUME_HUMAN_RESPONSE", { ...hdr(), response: "APPROVE" }), "conflict"],
  ["terminal_cannot_accept_new_hdr", consumed("REJECT"), event("PERSIST_HUMAN_REQUEST", hdr()), "invalid_transition"],
  ["invalid_current_state", { ...open(), lifecycle: { state: "READY" } }, event("APPLY_POLICY_TERMINAL"), "invalid_input"],
  ["unknown_event_type", open(), event("RUN_TESTS"), "invalid_input"],
  ["event_unknown_field", open(), event("APPLY_POLICY_TERMINAL", { secret: "value" }), "invalid_input"],
  ["missing_event_required_field", waiting(), event("RECORD_HUMAN_RESPONSE", { decision_id: hdr().decision_id }), "invalid_input"],
  ["malformed_decision_id", open(), event("PERSIST_HUMAN_REQUEST", { ...hdr(), decision_id: "bad id" }), "invalid_input"],
  ["non_string_decision_id", open(), event("PERSIST_HUMAN_REQUEST", { ...hdr(), decision_id: null }), "invalid_input"],
  ["malformed_request_fingerprint", open(), event("PERSIST_HUMAN_REQUEST", { ...hdr(), request_fingerprint: "bad" }), "invalid_input"],
  ["duplicate_stale_response_is_idempotent", waiting("rejected_stale"), event("MARK_RESPONSE_STALE", { ...hdr(), request_fingerprint: hash("e") }), "unchanged"],
  ["invalid_technical_block_projection", open(), event("UPDATE_TECHNICAL_BLOCK", { blocked: false, missing_capabilities: ["build"] }), "invalid_transition"]
];
let passed = 0;
for (const [id, current_state, transition, expected, verify] of cases) { const actual = resolveRuntimeStateTransition({ current_state, event: transition }); let ok = actual.status === expected && (!actual.candidate_state || validateRuntimeState(actual.candidate_state).status === "valid"); try { if (ok && verify) verify(actual); } catch { ok = false; } console.log(`${ok ? "PASS" : "FAIL"} ${id}`); if (ok) passed += 1; }
const deterministicInput = { current_state: waiting("validated", true), event: event("CONSUME_HUMAN_RESPONSE", { ...hdr(), response: "APPROVE" }) }; const deterministic = JSON.stringify(resolveRuntimeStateTransition(deterministicInput)) === JSON.stringify(resolveRuntimeStateTransition(structuredClone(deterministicInput))); console.log(`${deterministic ? "PASS" : "FAIL"} deterministic_output`); if (deterministic) passed += 1;
console.log(`Runtime state transition fixture suite: ${passed}/${cases.length + 1} passed`); process.exitCode = passed === cases.length + 1 ? 0 : 1;
