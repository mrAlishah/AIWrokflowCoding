---
Name: V3 HITL and Human Decision Contract
Type: Architecture Specification
Subject: Human Decision Requirements and Artifacts
Status: Proposed
Date: 2026-08-10
Source Basis: V3 policy, risk/capability, configuration, provenance, concurrency, and golden-evaluation contracts
---

# V3 HITL and Human Decision Contract

## Purpose and Architecture Position

HITL translates resolved upstream policy into a bounded human-decision requirement. It sits after Capability / Provider Resolution and before future Workflow and Runtime State. It consumes resolved state; it does not re-resolve risk, policy, configuration, or providers. It produces a decision requirement and, when required, a Human Decision Request (HDR) contract. It does not persist an HDR, prompt a human, pause/resume work, or execute an action.

## Terminology

| Concept | Meaning | Not meaning |
| --- | --- | --- |
| Human Decision Requirement | Deterministic statement that human input is needed. | A prompt or state transition. |
| Approval | Human answer to whether a policy-gated action may proceed. | Permission to bypass governance. |
| Clarification | Human statement that resolves material intent ambiguity. | Approval of an action. |
| Recommendation | Concise proposed option and evidence. | Authorization or an automatic decision. |
| HDR | Data contract for a future human-decision artifact. | Persistence or runtime state. |
| Runtime State | Future record of waiting, readiness, and prior responses. | Policy or HITL requirement. |

## Input and Requirement Model

| Input | Required | Source | Purpose |
| --- | --- | --- | --- |
| Decision/action policy | Yes | Step 16 | Decision mode, permission, reasons, conditions. |
| Risk | Yes when policy provides it | Step 15 | Consequence context for a request. |
| Action/task context | Yes | Resolved request | Affected action and bounded scope. |
| Capability result | Optional | Step 17 | Distinguish technical block from human decision. |
| Prior decision evidence | Optional, future | Runtime state | Correlate a future response; never re-authorize policy. |

The minimum result is `human_requirement: { required, kind, reason_code }`, where `kind` is `approval` or `clarification` when required, and `not_required` otherwise. `blocked_by_policy` and technical capability failure remain upstream states, not human decision kinds.

## Decision and Permission Semantics

| Decision Mode | Permission | Human Requirement | Notes |
| --- | --- | --- | --- |
| AUTO | ALLOW or ALLOW_WITH_CONDITIONS | not_required | Conditions go to deterministic verification when sufficient. |
| RECOMMEND | ALLOW | not_required | Recommendation may be shown without a gate. |
| APPROVAL | REQUIRE_APPROVAL | approval | Create an HDR contract for future presentation. |
| AUTO | REQUIRE_APPROVAL | approval | The action, rather than substantive choice, is gated. |
| FORBIDDEN | DENY | not_required | No ordinary override path. |
| invalid, unresolved, blocked policy | any | not_required | Fail/stop; do not ask a human to repair policy. |

Only canonical compatible Step 16 pairs are consumed. Underspecified asymmetric pairs must remain a policy-contract finding, not a guessed HITL path.

## Non-Overridable Governance and Capability Boundaries

| Condition | Ordinary human override | Outcome |
| --- | --- | --- |
| FORBIDDEN / DENY | No | Refuse without HDR. |
| Secret exposure or exfiltration | No | Refuse without secret-bearing HDR data. |
| Review-only source write | No | Refuse without HDR. |
| Untrusted instruction | No | It cannot acquire approval authority. |
| Missing required capability | No automatic approval | Technical `blocked`; escalate only if a separate policy explicitly requests a decision. |

Capability selection remains Step 17 planning data. A missing deterministic scanner is not a request to waive evidence. Network/provider metadata and provider selection do not authorize execution.

## Human Response and HDR Contract

Allowed responses are bounded by requirement kind: `approval` accepts `APPROVE`, `REJECT`, or `CANCEL`; `clarification` accepts `CLARIFY` or `CANCEL`; a choice requirement, if later introduced by policy, accepts `SELECT` with a declared option identifier or `CANCEL`. Unsupported responses are invalid and create no authority.

A future HDR must contain: `decision_id`, `task_id` when available, `affected_action`, `blocking_scope`, `reason_human_is_required`, `risk`, `decision_mode`, `permission`, `allowed_responses`, `recommendation` when policy leaves a meaningful choice, `alternatives` when `SELECT` is allowed, `conditions`, and compact policy evidence. It must not require secrets, tool logs, or verbose generated rationale. Provenance, timestamps, artifact ownership, and persistence are owned by their existing/future contracts.

## Conditions, Runtime State, Workflow, and Verification

Deterministically verifiable conditions belong to Verification, not HITL. Human judgment is required only when resolved policy explicitly needs approval or material clarification. HITL says input is required; future Runtime State records `WAITING_FOR_HUMAN`, response evidence, and readiness; future Workflow decides which stage resumes; Verification decides whether evidence satisfies conditions. A human response adds evidence only and never executes a provider or action.

## Fail-Safe Rules and Determinism

Invalid policy, unresolved policy, prohibited action, untrusted authority, and technical capability block do not silently become approval requests. Equivalent normalized inputs produce equivalent requirements. Requirement resolution must not depend on model confidence, free-form guessing, provider identity, time, or conversation state. Recommendation generation, if any, is separate from deterministic requirement resolution.

## Scenario Matrix

| Scenario | HITL Result | Downstream boundary |
| --- | --- | --- |
| AUTO + ALLOW | not_required | Workflow may continue later. |
| RECOMMEND + ALLOW | not_required | Recommendation is non-authorizing. |
| APPROVAL + REQUIRE_APPROVAL | approval required | Future runtime may present HDR. |
| AUTO + REQUIRE_APPROVAL | approval required | Action gate, not policy re-resolution. |
| FORBIDDEN + DENY | not_required | Refuse; no ordinary override. |
| Mandatory secret denial | not_required | Refuse; no secret HDR. |
| Conditional allow with deterministic checks | not_required | Verification boundary. |
| Missing required capability | not_required | Technical blocked state. |
| Material ambiguous intent with policy requirement | clarification required | Future workflow consumes response. |

## Explicit Non-Goals and Future Integration

This contract does not implement a HITL resolver, HDR persistence, `runtime_state.yaml`, waiting transitions, UI/CLI prompts, approval replay, workflow routing, verification, provider execution, or Step 19+. Future runtime integration must consume this contract without allowing a response to weaken mandatory policy.
