---
Name: V3 Runtime State and Human Decision Persistence Contract
Type: Architecture Specification
Subject: Durable Operational State, HDR Persistence, and Response Evidence
Status: Proposed
Date: 2026-08-10
Source Basis: V3 HITL, policy, capability, provenance, verification, and Markdown write-safety contracts
---

# V3 Runtime State and Human Decision Persistence Contract

## Purpose and Architecture Position

Runtime State is the smallest durable projection of what is operationally true
for one workspace: its lifecycle, pending human-decision evidence, technical
block, ownership, and revision. It consumes bounded Step 16–19 results and
durable response evidence. It produces state facts for a future Workflow and
recovery process. It does not resolve policy, risk, capabilities, verification,
or workflow routing.

```text
Policy != HITL Requirement != Runtime State != Workflow != Verification
```

This is a contract only. It creates no state file, persistence writer, prompt,
pause/resume engine, router, or action execution.

## Terminology

| Concept | Meaning | Not meaning |
| --- | --- | --- |
| Runtime State | Current durable operational truth for one workspace. | Policy source, workflow plan, or audit database. |
| Lifecycle State | Coarse resumability state. | A combination of every block and workflow stage. |
| Human Decision Requirement | Step 19 statement that input is needed. | A persisted request or received response. |
| Persisted HDR | Durable, correlated representation of a Step 19 HDR candidate. | Authorization to execute. |
| Human Response Evidence | Validated record of a bounded response to one HDR. | A reusable capability token. |
| Technical Block | Step 17 readiness fact, projected by Step 19. | Human waiting or policy prohibition. |
| Workflow Stage | Future selection of what happens next. | Runtime lifecycle state. |
| State Revision | Fingerprint/revision used to protect a state write. | Policy or artifact revision. |

## State Ownership, Scope, and Lifetime

Runtime state is per workspace or maintenance operation, never global. A
future workspace convention may place it at
`docs/ai/pbi/<workspace-id>/runtime_state.yaml`; that path is illustrative, not
created or locked in by this contract. The workspace identity is stable for its
operation lifetime and must be recorded before a state artifact is created.
One runtime-state record represents one currently affected operation/request;
another action in the same workspace requires its own operation identity rather
than silently inheriting approval or terminal state.

| State Area | Owner | Writer | Scope |
| --- | --- | --- | --- |
| Current runtime projection | Runtime coordinator | One designated runtime-state writer | One workspace/operation |
| HDR candidate | Step 19 | None; it is input data | One resolution attempt |
| Persisted HDR / response evidence | Runtime-state persistence layer | Runtime-state writer | One current operation/request |
| Handoff ownership record | Runtime coordinator | Runtime-state writer after bounded handoff evidence | Workspace |
| Workflow stage / verification result | Their future owners | Not Runtime State | Separate contracts |

The runtime-state persistence layer owns one compact authoritative persisted
HDR/request record as the `human_decision` subrecord of the canonical
per-operation state. Runtime-state projections reference that same record; no
second authoritative HDR artifact or copy is allowed. The UI or human channel submits bounded response evidence; it may not freely
rewrite state. A response is recorded only after a future authentication or
trusted-channel boundary validates it.

## State Dimensions and Lifecycle Model

State dimensions are orthogonal and avoid composite-state explosion.

| Dimension | Shape | Orthogonal To |
| --- | --- | --- |
| `lifecycle.state` | `OPEN`, `WAITING_FOR_HUMAN`, `TERMINAL` | Human response, technical block, workflow, verification |
| `human_decision` | required, request status, decision reference, response status | Technical readiness |
| `technical_block` | blocked, compact missing-capability codes | Human waiting and policy result |
| `policy_projection` | prohibited/invalid/unresolved reason code only | Permission resolution details |
| `ownership` | active owner, bounded handoff status/reference | Workflow routing |
| `revision` | schema version, expected/current state revision | Source policy and artifact revisions |

`OPEN` means no lifecycle terminal or human-wait state is recorded; it does not
mean technical readiness, a workflow stage, or verification success.
`WAITING_FOR_HUMAN` means a persisted,
pending HDR exists. `TERMINAL` means the affected operation cannot resume from
this state without new intent/evidence; its compact reason distinguishes
prohibition, rejection, cancellation, invalid upstream state, or failure.

## Conceptual Schema

```yaml
version: 1
workspace:
  id: STP-XXXX
lifecycle:
  state: WAITING_FOR_HUMAN
human_decision:
  required: true
  request_status: pending # none | pending | superseded | terminal
  decision_id: HDR-... # only after persistence
  request_identity: sha256:... # stable pre-ID semantic tuple
  request_fingerprint: sha256:...
  response_status: none # none | recorded | validated | consumed | rejected_stale | conflicting
technical_block:
  blocked: true
  missing_capabilities: [build]
policy_projection:
  status: resolved
  terminal_reason: null
ownership:
  active_owner: runtime_coordinator
  handoff_status: none
revision:
  state_revision: sha256:...
  expected_revision: sha256:...
```

The schema is conceptual. It contains compact identifiers, enums, codes,
fingerprints, and references only; it never embeds full upstream results.

## HDR Persistence and Human Response Model

Step 19's `hdr_candidate` is not persisted and has no identity. The
runtime-state persistence layer may create the one authoritative compact
persisted request only after binding the candidate to a stable pre-ID request
identity, workspace identity, current request fingerprint, and durable decision
ID. Persisting does not alter decision mode, permission, conditions, technical
block, or evidence.

```text
candidate -> persisted request/pending -> response recorded -> validated -> consumed
```

| Response | State Evidence | Does It Execute? |
| --- | --- | --- |
| APPROVE | Valid positive response bound to the current request | No |
| REJECT | Valid negative response bound to the current request | No |
| CANCEL | Request termination evidence | No |

`request exists`, `response recorded`, `response validated`, and `response
consumed` are distinct. A validated response remains `WAITING_FOR_HUMAN` until
its consumption is durably recorded. Consumption makes that response unavailable
for replay and exposes a satisfied or terminal human gate to Workflow; it never
executes an action. Workflow later decides the next stage from that fact.

## Correlation, Identifier, Staleness, and Replay Protection

| Mechanism | Purpose | Fail-Safe Rule |
| --- | --- | --- |
| `decision_id` | Binds one response to one persisted HDR | Unknown ID is rejected. |
| Workspace ID + affected action + blocking scope | Prevents cross-workspace/scope reuse | Mismatch is rejected. |
| Request fingerprint/revision | Binds response to relevant resolved inputs | Mismatch makes response stale. |
| Response status | Prevents double consumption | Consumed response cannot authorize another attempt. |
| Expected state revision | Prevents lost updates | Conflict stops, re-reads, and reconciles. |

The pre-ID semantic request identity is the stable tuple of workspace/operation,
affected action, blocking scope, and request fingerprint. Before generating an
HDR ID, the persistence layer reuses or reconciles an existing pending request
with the same tuple. A different tuple may create a new request. Unique ID is
therefore not an idempotency key.

Step 19 generates no ID. The effectful persistence layer may generate an
immutable `HDR-<UTC timestamp>-<nonce>` identity at durable-request creation,
using the write-safety identifier strategy. This is not a determinism conflict:
runtime identity is not policy or deterministic requirement resolution.

The request fingerprint is a stable digest of material decision semantics, not
a whole-object hash. It binds, when applicable: workspace/operation identity;
affected action and blocking scope; decision mode and permission; risk level;
human requirement kind and reason; material policy authority/evidence identity;
approval conditions; material capability requirement identity; and material
target/artifact revision. It excludes timestamps, presentation text, raw logs,
raw policy objects, unrelated repository revisions, and provider availability
when that availability changes readiness but not decision meaning.

Relevant changes invalidate a pending request: policy or material risk change,
affected action/scope change, material capability requirement change, target
artifact revision change, request supersession, or workspace replacement.
Unrelated repository changes do not invalidate it. A stale response is
recorded only as rejected evidence and cannot be consumed.

Duplicate delivery with the same decision ID, response, request fingerprint,
and same consumption transition is idempotent. The same ID with a different
response is a conflict; the same response with a different fingerprint is stale
and rejected. An already-consumed approval cannot authorize a materially
different execution attempt. Approval evidence is not a reusable permission
token. A newer request marks the old request `superseded`; old responses never
authorize the newer scope.

## Technical Blocks, Policy Prohibition, and Transitions

Human resolution and technical unblocking are independent. A waiting approval
may coexist with `technical_block.blocked: true`; approval does not clear the
block and restored capability does not satisfy approval. `FORBIDDEN + DENY`
projects to `TERMINAL` with a policy-prohibited reason, no HDR, and never
`WAITING_FOR_HUMAN`.

| From | Trigger / Evidence | To | Guard |
| --- | --- | --- | --- |
| Not initialized | First state creation | OPEN | No prior state is expected; initialize bounded operation state. |
| OPEN | Persisted pending HDR | WAITING_FOR_HUMAN | Reuse/reconcile same request identity before new ID; writer and revision match. |
| WAITING_FOR_HUMAN | Response recorded or validated | WAITING_FOR_HUMAN | Response remains current and unconsumed. |
| WAITING_FOR_HUMAN | APPROVE durably validated and consumed | OPEN | Decision ID, scope, fingerprint, revision, and one-time consumption match; no action executes. |
| WAITING_FOR_HUMAN | REJECT durably validated and consumed | TERMINAL / HUMAN_REJECTED | Response is current, bound, and one-time consumed. |
| WAITING_FOR_HUMAN | CANCEL durably validated and consumed | TERMINAL / HUMAN_CANCELLED | Response is current, bound, and one-time consumed. |
| Any non-terminal | New capability result | Same lifecycle, block dimension changes | Only new Step 17 evidence clears/sets block. |
| Any | Policy prohibition / invalid / unresolved projection | TERMINAL / bounded reason | Never manufacture an HDR. |
| WAITING_FOR_HUMAN | Relevant request change | OPEN or TERMINAL with old request superseded | Old response cannot be consumed. |

`TERMINAL` is terminal only for the affected runtime operation/request, not the
workspace forever. New user intent or a newly authorized operation creates a
new operation identity; the old terminal operation is never silently revived.
Required terminal reasons are `POLICY_PROHIBITED`, `HUMAN_REJECTED`,
`HUMAN_CANCELLED`, `INVALID_UPSTREAM`, and `UNRECOVERABLE_FAILURE`.

Hard guards: time alone cannot leave waiting; a technical block cannot clear
without new capability evidence; a prohibited action cannot become waiting;
and a consumed approval cannot be consumed again.

## Concurrency, Crash Recovery, and Current-State Boundary

Runtime state is high-conflict mutable state. Its future writer follows the
write-safety contract: read current revision, prepare bounded change, re-read,
verify `expected_revision`, then atomically replace. It has one active writer,
no blind overwrite, and no automatic semantic merge on conflict.

| Crash Point | Durable Evidence | Safe Recovery |
| --- | --- | --- |
| Before HDR persistence | No durable request | Safe retry from pre-ID identity; do not claim waiting. |
| After HDR persistence, before presentation | Pending persisted request | Reuse the same request identity and ID; do not generate another request. |
| While waiting | Pending request and revision | Reconstruct waiting projection; do not infer a response. |
| After response write, before consumption | Recorded/validated response evidence | Resume validation/consumption idempotently; remain waiting until consumed. |
| After consumption | Consumed response status and terminal/open projection | Same consumption retry is idempotent. |
| After action completion, before state update | External action evidence/reference | Reconcile against fresh state; never replay approval or action. |

Current runtime state is not event history or a decision log. It retains only
the state necessary to recover. Dedicated future decision artifacts/logs may
retain immutable response history under their own ownership.

## Workflow, Verification, Provenance, and Handoff Boundaries

Runtime State answers “what is true now?” Workflow answers “what stage is
next?” Therefore state may record `active_owner`, bounded handoff reference,
and a verification-pending projection, but not `next_agent`, `run_fix_now`,
or a workflow route. Verification owns condition evaluation, test execution,
and success; state may only reference that verification is pending or a result
reference exists.

Runtime state is transient operational truth, not reusable repository
knowledge. It does not copy a full provenance block. If a human decision is
promoted into reusable knowledge, its future artifact uses the provenance
contract with `source: human_decision` and its own authority/scope.

## Security, Versioning, and Failure Semantics

Runtime state and persisted HDR contain no secrets, raw tool logs, raw policy
objects, untrusted instruction bodies, execution commands, provider-registry
dumps, or free-form generated rationale. Persist only bounded Step 19 HDR
fields, compact status codes, immutable IDs, fingerprints, and references.

Schema version is required. `STATE_NOT_INITIALIZED` is normal when no prior
state is expected and permits bounded initial-state creation. In contrast,
`STATE_EXPECTED_BUT_MISSING` means previously known state disappeared and stops
the affected transition for reconciliation. Unsupported versions, corrupt state,
unknown decision ID, stale response, revision mismatch, conflicting duplicate
response, invalid transition, and writer-ownership mismatch all stop the
affected transition without inferred approval. Human input is requested only
when a remaining semantic conflict is itself policy-authorized; it never
repairs corruption by granting authority.

## Scenario Matrix

| Scenario | Runtime-State Result | Verdict |
| --- | --- | --- |
| AUTO + ALLOW | OPEN; no human request | No HITL implied. |
| APPROVAL + REQUIRE_APPROVAL | WAITING_FOR_HUMAN after HDR persistence | Request is data, not execution. |
| Approval + technical block | Waiting plus `technical_block=true` | Both facts remain visible. |
| AUTO + capability block | OPEN plus `technical_block=true` | No human gate inferred. |
| FORBIDDEN + DENY | TERMINAL policy-prohibited; no HDR | No override path. |
| APPROVE | Valid response evidence recorded | No direct execution. |
| REJECT | Negative response evidence; terminal affected scope | No fixer route implied. |
| CANCEL | Cancelled request; terminal affected scope | No authorization. |
| Duplicate same response | Same evidence/result | Idempotent. |
| Duplicate conflicting response | Conflict | Stop and preserve evidence. |
| Stale response | Rejected-stale evidence | Cannot consume. |
| Unknown decision ID | Rejected input | Cannot authorize. |
| Crash while waiting | Pending request survives | Recover waiting safely. |
| Crash after response before workflow | Response survives | No duplicate approval. |
| State revision conflict | Stop/re-read | No overwrite. |

## Explicit Non-Goals and Future Implementation Guidance

This contract does not implement a runtime-state YAML writer, state machine,
HDR writer, response parser, authentication, UI/CLI, pause/resume engine,
workflow router, verification engine, provider/action execution, database,
lock service, daemon, migration tooling, or Step 21+ behavior.

A future implementation should begin with schema validation, single-writer
ownership, expected-revision checks, atomic replacement, and a small set of
golden recovery/replay cases before adding workflow integration.
