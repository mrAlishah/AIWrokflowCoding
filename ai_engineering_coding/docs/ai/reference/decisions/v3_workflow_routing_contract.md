---
Name: V3 Workflow Routing Contract
Type: Architecture Specification
Subject: Deterministic Next-Stage Selection from Normalized Operational Facts
Status: Proposed
Date: 2026-08-11
Source Basis: V3 policy, capability, HITL, runtime-state, and deterministic-verification contracts
---

# V3 Workflow Routing Contract

## Purpose and Non-Goals

Workflow Routing answers one bounded question: given normalized current facts,
which logical owner should receive the next stage of work? It returns a route
decision only. It never performs the stage it selects.

This contract does not implement a router, coordinator, workflow runtime,
verification runner, review, fix, handoff, persistence, provider selection,
authentication, action execution, publication, or a route history.

```text
Runtime State != Workflow Routing != Workflow Execution
```

## Architecture Position

```text
Intent
-> Effective Configuration
-> Risk
-> Decision / Permission
-> Capability / Provider
-> HITL Requirement
-> Runtime State
-> Workflow Routing
-> Verification
-> Review / Fix
-> Handoff
```

Runtime State says what is true now. Workflow Routing selects the next bounded
owner. A downstream owner performs its own work and emits its own bounded
evidence. A future coordinator may load state, request a route, invoke an
owner, and persist separately authorized state transitions; it is not part of
this contract.

## Terminology

| Concept | Meaning | Explicitly not |
| --- | --- | --- |
| Route decision | Ephemeral, deterministic selection of one next owner. | Execution instruction or persisted workflow state. |
| Route status | Whether a next stage can be selected now. | Lifecycle state or action permission. |
| Route stage | Logical responsibility selected when status is `READY`. | Model, provider, command, or agent identity. |
| Route reason | Bounded code explaining the selected outcome. | Free-form diagnosis or raw evidence. |
| Obligation | A later required stage known from normalized evidence. | A parallel command to run. |
| Implementation projection | Compact fact that approved implementation scope is incomplete or complete. | AI confidence that code looks complete. |
| Verification projection | Aggregate freshness-aware verification fact from Verification. | Individual check execution or check resolution. |
| Review projection | Aggregate freshness-aware independent-review fact. | Review findings, comments, or severity analysis. |
| Reassessment | Return to upstream risk/policy/capability/HITL resolution for material scope change. | A `FIX` route or automatic scope expansion. |

## Input Contract

The router consumes bounded projections only. It rejects malformed projections,
unknown enum values, missing required facts, and contradictory authoritative
facts; it does not infer a safe route from them.

| Input projection | Required? | Owner | Routing purpose |
| --- | --- | --- | --- |
| Valid current runtime state | Yes | Step 21-23 runtime layer | Authoritative lifecycle, human gate, technical block, terminal reason. |
| Current action-policy gate | Yes | Step 16 | Confirms the affected approved scope is resolved and not prohibited or unresolved. |
| Implementation projection | Yes | Approved task/change owner | Distinguishes incomplete from complete approved work. |
| Verification routing projection | Yes after implementation is complete | Verification subsystem | Supplies a closed pre-review evidence/freshness aggregate. |
| Review requirement projection | Yes after implementation is complete | Review Requirement Resolution | Supplies the one authoritative required/not-required decision. |
| Review result projection | Yes when review is required | Independent Review | Supplies closed review progress/result and freshness. |
| Scope-reassessment projection | Required when a fix/review reports material expansion | Fix or Review | Stops ordinary routing pending upstream re-resolution. |
| Capability/HITL reconciliation projection | Optional but authoritative when supplied | Step 17 / Step 19 | Detects a disagreement with current runtime facts; it does not replace them. |
| Handoff-completion projection | Optional, future | Handoff owner | Allows `COMPLETE` only after handoff has actually completed. |
| Evidence references | Optional | Their producing owner | Compact traceability references only. |

The minimum policy projection is a bounded status for the current approved
scope: `SATISFIED`, `PROHIBITED`, or `UNRESOLVED`. It is not a copy of policy
rules, risk factors, permissions, or provider selection.

Verification owns the required verification set, individual check semantics,
evidence freshness, the following routing projection, and final task-level
`VERIFIED` semantics:

| Verification routing status | Meaning | Workflow effect | Distinct from |
| --- | --- | --- | --- |
| `NOT_REQUIRED` | No verification obligation applies to this approved scope. | Continue to review/handoff prerequisites. | Task `VERIFIED`. |
| `REQUIRED` | Required evidence is not yet current. | `READY / VERIFICATION`. | A running check. |
| `IN_PROGRESS` | Verification is actively producing evidence. | `WAITING / NONE / WORKFLOW_VERIFICATION_RUNNING`. | Human waiting. |
| `EVIDENCE_CURRENT` | All required deterministic verification evidence for the current implementation and scope is satisfied and fresh for routing. | Continue to review/handoff prerequisites. | Task `VERIFIED`. |
| `FAILED` | Required evidence failed. | `READY / FIX` only within approved scope. | `BLOCKED`. |
| `BLOCKED` | Required evidence cannot be completed. | `BLOCKED / NONE`. | `FAILED`. |
| `STALE` | Earlier evidence is known not current. | `READY / VERIFICATION`. | Current positive evidence. |

`EVIDENCE_CURRENT` is deliberately not `VERIFIED`. The deterministic
verification contract defines task-level `VERIFIED` only after all applicable
verification conditions and required independent-review conditions are met.
Verification therefore consumes approved current review evidence during future
finalization; Workflow must never use task `VERIFIED` to decide whether to
enter Review.

Review Requirement Resolution is the single authoritative normalized producer
of `review_requirement: { status, reason_codes }`. It consumes risk, change
class, policy requirements, security-sensitive scope, public-API status,
authorization changes, migration/destructive facts, and applicable acceptance
criteria. Its closed output status is `REQUIRED`, `NOT_REQUIRED`, or
`UNRESOLVED`; reason codes are bounded, sorted, and deduplicated. It must emit
`REQUIRED` for existing mandatory cases—HIGH/CRITICAL work, security-sensitive
or authorization changes, public APIs, destructive migrations, and explicit
policy-required review. Missing or `UNRESOLVED` determination is never
`NOT_REQUIRED`: it routes `BLOCKED / NONE /
WORKFLOW_REVIEW_REQUIREMENT_UNRESOLVED`.

Review Requirement is distinct from Review Result. Independent Review owns the
closed result projection `NOT_STARTED`, `IN_PROGRESS`, `APPROVED_CURRENT`,
`CHANGES_REQUIRED`, `BLOCKED`, or `STALE`. Workflow consumes both projections
and never calculates either one.

`evidence_refs` contains opaque canonical identifiers only, each matching
`^[A-Za-z][A-Za-z0-9_.:-]{0,127}$`; it is sorted and deduplicated. It may not
contain a path, URL, raw log, free-form prose, or embedded evidence payload.

## Route Status and Stage Model

Status and stage are orthogonal. `WAITING`, `BLOCKED`, and `TERMINAL` are
outcomes, not workflow stages; they select no downstream owner.

| Status | Meaning | Can select a stage? |
| --- | --- | --- |
| `READY` | A single bounded stage may be handed to its logical owner. | Yes |
| `WAITING` | Existing human or in-progress external evidence must change first. | No |
| `BLOCKED` | A prerequisite, reconciliation, or required capability is absent. | No |
| `TERMINAL` | The current operation cannot continue. | No |
| `COMPLETE` | A future handoff owner has recorded completion. | No |

| Stage | Logical owner | Entry condition | Explicitly not |
| --- | --- | --- | --- |
| `IMPLEMENTATION` | Implementation workflow | Approved scope remains incomplete and all gates are satisfied. | Source-edit choice, provider selection, or execution. |
| `VERIFICATION` | Verification subsystem | Implementation is complete and current required verification remains unsatisfied. | A claim that verification passed. |
| `REVIEW` | Independent review workflow | Current verification is satisfied and review is required but not current-approved. | Review analysis or a source modification. |
| `FIX` | Bounded fix workflow | Current verification failed or review requires changes within approved scope. | Unlimited refactor or scope expansion. |
| `HANDOFF` | Handoff subsystem | Implementation, verification, and required review are current-satisfied. | Commit, push, PR, deployment, or publication. |
| `NONE` | No downstream owner | Status is not `READY`. | A paused workflow stage. |

## Route Decision Shape

```yaml
resolution_status: resolved # resolved | invalid_input
status: READY # READY | WAITING | BLOCKED | TERMINAL | COMPLETE
stage: VERIFICATION # IMPLEMENTATION | VERIFICATION | REVIEW | FIX | HANDOFF | NONE
reason: WORKFLOW_VERIFICATION_REQUIRED
required_obligations: [REVIEW]
evidence_refs: [verification-aggregate-ref]
errors: [] # bounded codes only; populated for invalid_input
warnings: []
```

`required_obligations` is an ordered, deduplicated closed enum:
`VERIFICATION`, `REVIEW`, `HANDOFF`. It lists only future mandatory stages
after the selected current stage, never the current stage, and uses canonical
order `VERIFICATION`, then `REVIEW`, then `HANDOFF`. It never authorizes
parallel execution, a test, an edit, review execution, or publication. For
example, current `VERIFICATION` with mandatory later review has
`required_obligations: [REVIEW, HANDOFF]`; current `FIX` after a verification
failure and required review has `[VERIFICATION, REVIEW, HANDOFF]`.

A route decision is not a complete operational-state snapshot. It reports its
primary routing cause only. Consumers needing concurrent runtime facts, such
as a technical block while waiting for a human response, retain/access the
canonical runtime-state projection rather than treating the route as lossless.

## Deterministic Routing Precedence

The router evaluates the first applicable rule. A more restrictive or more
authoritative current fact always prevents a lower-priority ready route.

1. Invalid, missing, unsupported, or contradictory required projections return
   `resolution_status: invalid_input`; no route is guessed.
2. Runtime `TERMINAL` returns `TERMINAL / NONE` with a reason derived from its
   bounded terminal reason.
3. A policy gate of `PROHIBITED` or `UNRESOLVED`, or a supplied HITL/capability
   projection inconsistent with runtime state, returns `BLOCKED / NONE` for
   upstream reconciliation. Routing does not manufacture a runtime transition.
4. A material scope-reassessment projection returns `BLOCKED / NONE /
   WORKFLOW_REASSESSMENT_REQUIRED`; it prevents `FIX` and every later stage.
5. Runtime `WAITING_FOR_HUMAN` returns `WAITING / NONE`.
6. Runtime `technical_block.blocked=true` returns `BLOCKED / NONE`.
7. Incomplete approved implementation returns `READY / IMPLEMENTATION`.
8. Verification `REQUIRED` or `STALE` returns `READY / VERIFICATION`;
   `IN_PROGRESS` returns `WAITING / NONE / WORKFLOW_VERIFICATION_RUNNING` rather
   than selecting duplicate work; `EVIDENCE_CURRENT` and `NOT_REQUIRED`
   continue to review/handoff prerequisites.
9. Verification `FAILED` returns `READY / FIX` only for the existing approved
   scope; verification `BLOCKED` returns `BLOCKED / NONE`.
10. An unresolved review requirement returns `BLOCKED / NONE`. A required
   review with `NOT_STARTED` or `STALE` returns `READY / REVIEW`; `IN_PROGRESS`
   returns `WAITING / NONE / WORKFLOW_REVIEW_RUNNING`; `CHANGES_REQUIRED`
   returns `READY / FIX`; `BLOCKED` returns `BLOCKED / NONE`; only
   `APPROVED_CURRENT` continues to handoff prerequisites.
11. Current-satisfied implementation, verification, and required review return
    `READY / HANDOFF`; only a future completed-handoff projection returns
    `COMPLETE / NONE`.

This order prevents `OPEN` from being treated as ready-to-execute. It also
means a blocked capability cannot become a human gate, a failed verification
cannot be relabeled blocked, and a terminal fact cannot be rewritten by review
or handoff evidence.

The following input-consistency rules are explicit. Positive downstream
evidence is authoritative only when it is current; known stale historical
evidence may coexist with an incomplete implementation projection.

| Projection combination | Required result |
| --- | --- |
| Implementation incomplete + `EVIDENCE_CURRENT` | `invalid_input` |
| Implementation incomplete + review `APPROVED_CURRENT` | `invalid_input` |
| Implementation incomplete + handoff complete | `invalid_input` |
| Terminal runtime + handoff complete | `invalid_input` |
| Waiting runtime + handoff complete | `invalid_input` |
| Verification `FAILED` + handoff complete | `invalid_input` |
| Review `CHANGES_REQUIRED` + handoff complete | `invalid_input` |
| Policy `PROHIBITED`/`UNRESOLVED` + current positive downstream evidence | `invalid_input` |
| Scope-reassessment required + any ready ordinary stage | `BLOCKED / NONE / WORKFLOW_REASSESSMENT_REQUIRED` |
| Technical block + verification `IN_PROGRESS` | Valid input; `BLOCKED / NONE` wins until fresh capability evidence reconciles the state. |
| Implementation incomplete + verification/review `STALE` | Valid input; `READY / IMPLEMENTATION` may win. |

## Implementation, Verification, Review, Fix, and Handoff Routing

| Area | Normalized condition | Route result | Forbidden behavior |
| --- | --- | --- | --- |
| Implementation | Approved scope incomplete; all gates clear | `READY / IMPLEMENTATION` | Choosing edits, providers, commands, or agents. |
| Verification | Implementation complete; `REQUIRED` or `STALE` | `READY / VERIFICATION` | Treating routing as a passed check. |
| Verification | `EVIDENCE_CURRENT` or `NOT_REQUIRED` | Continue to review/handoff prerequisites | Calling the task `VERIFIED`. |
| Verification | `IN_PROGRESS` | `WAITING / NONE` | Treating it as human waiting. |
| Verification | Aggregate failed | `READY / FIX` | Silent success or unbounded redesign. |
| Verification | Aggregate blocked | `BLOCKED / NONE` | Converting failure/block into automatic fix. |
| Review | Requirement unresolved | `BLOCKED / NONE` | Defaulting to not-required review. |
| Review | Required and not started/stale after current verification | `READY / REVIEW` | Performing review or making source edits. |
| Review | Required and in progress | `WAITING / NONE` | Starting duplicate review work. |
| Review | Changes required within approved scope | `READY / FIX` | Expanding the approved scope. |
| Review/Fix | Material scope expansion | `BLOCKED / NONE / WORKFLOW_REASSESSMENT_REQUIRED` | Continuing ordinary routing. |
| Review | Approved current | Continue to handoff prerequisites | Skipping required verification freshness. |
| Fix | Bounded correction applied | Verification becomes `STALE`/`REQUIRED`; required review becomes stale or pending | Reusing old verification/review evidence. |
| Handoff | All required evidence current | `READY / HANDOFF` | Commit, push, PR, deploy, or publish. |

The controlled loops are evidence-driven only:

```text
IMPLEMENTATION -> VERIFICATION -> REVIEW (when required) -> HANDOFF
VERIFICATION -> FIX -> VERIFICATION
REVIEW -> FIX -> VERIFICATION -> REVIEW
```

Identical input yields an identical route. Repeating a route without changed
evidence does not make progress and must not be used as a time-based escape.

## Human, Technical, and Terminal Boundaries

| Human wait | Technical block | Terminal | Route result |
| --- | --- | --- | --- |
| Yes | Any | No | `WAITING / NONE / WORKFLOW_WAITING_FOR_HUMAN` |
| No | Yes | No | `BLOCKED / NONE / WORKFLOW_TECHNICAL_CAPABILITY_BLOCK` |
| Any | Any | `POLICY_PROHIBITED` | `TERMINAL / NONE / WORKFLOW_TERMINAL_POLICY` |
| Any | Any | `HUMAN_REJECTED` | `TERMINAL / NONE / WORKFLOW_TERMINAL_HUMAN_REJECTED` |
| Any | Any | `HUMAN_CANCELLED` | `TERMINAL / NONE / WORKFLOW_TERMINAL_HUMAN_CANCELLED` |
| Any | Any | `INVALID_UPSTREAM` | `TERMINAL / NONE / WORKFLOW_TERMINAL_INVALID_UPSTREAM` |
| Any | Any | `UNRECOVERABLE_FAILURE` | `TERMINAL / NONE / WORKFLOW_TERMINAL_FAILURE` |

The router observes `WAITING_FOR_HUMAN`; it never presents, validates, consumes,
or supersedes a human response. It observes the technical block; it never
selects a provider or turns a missing capability into a fix, review, or human
approval. It observes terminal state; it never reopens an operation.

## Freshness, Scope Expansion, and Reassessment

Verification and review evidence is current only when its producing owner says
it matches the approved scope, implementation revision, policy, and applicable
obligation definition. Stale evidence is unsatisfied: stale verification routes
to `VERIFICATION`; stale required review routes to `REVIEW` only after current
verification is satisfied. The router computes no source diff or freshness hash.

If a fix discovers material scope expansion, it returns `BLOCKED / NONE /
WORKFLOW_REASSESSMENT_REQUIRED`. A future coordinator must obtain new approved
task facts and rerun upstream risk, policy, capability, and HITL resolution as
applicable before asking for another route. `REASSESS` is deliberately not a
workflow stage: Step 24 does not create a backward execution edge or decide
which upstream resolver runs.

## Ownership Model

| Responsibility | Owner | Workflow Router Role |
| --- | --- | --- |
| Policy, decision, permission | Step 16 | Consume compact gate only. |
| Capability/provider and technical readiness | Step 17 | Consume runtime block/reconciliation evidence; never select provider. |
| Human-decision requirement/HDR semantics | Step 19 | Observe runtime waiting; never prompt or authenticate. |
| Runtime-state validation, transition, persistence | Steps 21-23 | Read valid state only; never mutate it or `active_owner`. |
| Verification set, checks, evidence, freshness, final `VERIFIED` | Verification | Consume routing projection only. |
| Review requirement | Review Requirement Resolution | Consume required/not-required projection only. |
| Review result | Independent Review | Consume result projection only. |
| Material scope expansion | Fix or Review | Consume stop/reassessment projection only. |
| Fix contents | Bounded fix workflow | Select `FIX` only. |
| Handoff artifact | Handoff subsystem | Select `HANDOFF` only. |
| Runtime ownership update | Future coordinator/runtime writer | May translate later evidence into a transition; router proposes no mutation. |

`ownership.active_owner` is a runtime fact, not a route stage or provider
selector. It can detect an unsupported ownership disagreement in a future
coordinator contract, but Step 24 neither changes it nor assumes that its value
is the selected route owner.

## Publication, Security, and Data Minimization

```text
VERIFIED != AUTHORIZED_TO_PUBLISH
HANDOFF != PUBLISH
```

`HANDOFF` means that a handoff owner may prepare the bounded handoff artifact.
Commit, push, pull-request creation, deployment, and publication remain
separate Step 16 policy-authorized actions with explicit current-task authority.

`READY / HANDOFF` requires: implementation complete; verification routing status
`EVIDENCE_CURRENT` or `NOT_REQUIRED`; a resolved review requirement; when
required, review result `APPROVED_CURRENT`; runtime neither waiting, technically
blocked, nor terminal; policy gate `SATISFIED`; no scope reassessment; fresh
required evidence; and no contradictory projection. It never requires task
`VERIFIED` as a precondition, because Verification finalizes that task-level
status only after it receives the required review approval as current evidence.

Route decisions contain only enums, bounded reason codes, ordered obligations,
and compact evidence references. They contain no secrets, raw human response,
raw tool log, command, source content, provider identity, raw policy object,
untrusted instruction, route history, or workflow-state artifact.

## Failure Semantics

Malformed or contradictory routing projections return `invalid_input` and
bounded errors such as `WORKFLOW_INVALID_RUNTIME_STATE`,
`WORKFLOW_INVALID_UPSTREAM`, or `WORKFLOW_CONTRADICTORY_PROJECTIONS`; they are
not relabeled as a legitimate operational block. Valid operational facts that
cannot progress return `BLOCKED`, `WAITING`, or `TERMINAL` with a bounded
reason. No failure mode infers approval, verification success, review approval,
publication authority, or a new human decision.

Every route branch has a bounded reason code: `WORKFLOW_WAITING_FOR_HUMAN`,
`WORKFLOW_VERIFICATION_RUNNING`, `WORKFLOW_REVIEW_RUNNING`,
`WORKFLOW_TECHNICAL_CAPABILITY_BLOCK`, `WORKFLOW_POLICY_BLOCK`,
`WORKFLOW_REASSESSMENT_REQUIRED`, `WORKFLOW_IMPLEMENTATION_REQUIRED`,
`WORKFLOW_VERIFICATION_REQUIRED`, `WORKFLOW_VERIFICATION_FAILED`,
`WORKFLOW_VERIFICATION_BLOCKED`, `WORKFLOW_REVIEW_REQUIRED`,
`WORKFLOW_REVIEW_CHANGES_REQUIRED`, `WORKFLOW_REVIEW_BLOCKED`,
`WORKFLOW_REVIEW_REQUIREMENT_UNRESOLVED`,
`WORKFLOW_HANDOFF_READY`, bounded `WORKFLOW_TERMINAL_*`, and
`WORKFLOW_COMPLETE`.

Examples of contradictory input include terminal runtime state plus a requested
handoff route, waiting runtime state plus a current handoff claim, and a
technical block plus a ready ordinary verification route. The router rejects
the projection rather than letting a less restrictive claim win.

## Scenario Matrix

| Scenario | Status | Stage | Reason | Forbidden behavior |
| --- | --- | --- | --- | --- |
| OPEN, implementation incomplete | READY | IMPLEMENTATION | `WORKFLOW_IMPLEMENTATION_REQUIRED` | Choose edits or execute them. |
| OPEN, implementation complete, verification `REQUIRED` | READY | VERIFICATION | `WORKFLOW_VERIFICATION_REQUIRED` | Claim verified. |
| Verification `EVIDENCE_CURRENT`, review required | READY | REVIEW | `WORKFLOW_REVIEW_REQUIRED` | Call the task `VERIFIED` before review. |
| Verification failed | READY | FIX | `WORKFLOW_VERIFICATION_FAILED` | Skip re-verification. |
| Verification blocked | BLOCKED | NONE | `WORKFLOW_VERIFICATION_BLOCKED` | Convert to silent fix. |
| Verification `EVIDENCE_CURRENT`, review not required | READY | HANDOFF | `WORKFLOW_HANDOFF_READY` | Publish. |
| Review changes required | READY | FIX | `WORKFLOW_REVIEW_CHANGES_REQUIRED` | Expand scope automatically. |
| Review approved current | READY | HANDOFF | `WORKFLOW_HANDOFF_READY` | Publish. |
| WAITING_FOR_HUMAN | WAITING | NONE | `WORKFLOW_WAITING_FOR_HUMAN` | Start verification or implementation. |
| OPEN plus technical block | BLOCKED | NONE | `WORKFLOW_TECHNICAL_CAPABILITY_BLOCK` | Treat unblock as approval. |
| TERMINAL policy prohibited | TERMINAL | NONE | `WORKFLOW_TERMINAL_POLICY` | Fix/review/HITL override. |
| TERMINAL human rejected | TERMINAL | NONE | `WORKFLOW_TERMINAL_HUMAN_REJECTED` | Ordinary resume. |
| TERMINAL invalid upstream | TERMINAL | NONE | `WORKFLOW_TERMINAL_INVALID_UPSTREAM` | Downstream repair route. |
| Verification stale after fix | READY | VERIFICATION | `WORKFLOW_VERIFICATION_REQUIRED` | Reuse stale evidence. |
| Scope expansion during fix | BLOCKED | NONE | `WORKFLOW_REASSESSMENT_REQUIRED` | Continue FIX. |
| Verified but publication unauthorized | READY | HANDOFF | `WORKFLOW_HANDOFF_READY` | Commit/push/PR/publish. |

## Cross-Contract Consistency and Ambiguities

| Topic | Classification | Contract choice / resolution |
| --- | --- | --- |
| Step 16 policy authority | RESOLVED_BY_EXISTING_CONTRACT | Router consumes an allowed/resolved gate and cannot weaken policy. |
| Step 17 provider/capability selection | RESOLVED_BY_EXISTING_CONTRACT | Runtime technical block is routing-relevant; provider selection is not. |
| Step 18/19 human requirement | RESOLVED_BY_EXISTING_CONTRACT | Runtime waiting is authoritative; router does not prompt or consume response. |
| Steps 20-23 runtime state | RESOLVED_BY_EXISTING_CONTRACT | Router reads state and does not persist, transition, or update ownership. |
| Required verification-set ownership | RESOLVED_BY_EXISTING_CONTRACT | Verification resolves checks; router consumes aggregate status/freshness. |
| Verification routing versus final task `VERIFIED` | SAFE_CONTRACT_CHOICE | Verification emits closed pre-review routing status and finalizes `VERIFIED` only after required review evidence. |
| Review requirement ownership | SAFE_CONTRACT_CHOICE | Review Requirement Resolution is the one authoritative producer; router never recalculates it. |
| Scope-expansion reassessment | SAFE_CONTRACT_CHOICE | Block for reassessment; coordinator owns upstream re-resolution. |
| Handoff readiness | SAFE_CONTRACT_CHOICE | Current verification/review plus clear runtime gates select HANDOFF, not publication. |
| `active_owner` update | DEFERRED | Future coordinator/runtime contract must define authorized ownership transitions. |
| Workflow completion persistence | DEFERRED | A future handoff projection may produce `COMPLETE`; Step 24 creates no state field. |

None of these deferred items blocks the contract because all unsafe cases fail
closed and no runtime behavior is introduced.

## Invariant Matrix

| Invariant | Rule |
| --- | --- |
| Runtime State != Workflow | State is current truth; routing is an ephemeral next-owner decision. |
| Workflow Routing != Execution | A route never invokes a tool, provider, or agent. |
| Workflow != Verification | Router consumes aggregates; Verification owns checks and pass/fail. |
| Workflow != Review | Router selects review; Review owns analysis/findings. |
| Workflow != Fix Execution | Router selects bounded fix; fix owner changes artifacts. |
| Workflow != Handoff Execution | Router selects handoff; handoff owner creates its artifact. |
| Workflow != Provider Selection | Provider choice remains Step 17. |
| Workflow != Policy | Policy gate remains Step 16. |
| Workflow != HITL | Runtime/HITL own human gates and responses. |
| Workflow != Transition | Steps 21-23 own state validation, transition, and persistence. |
| VERIFIED != AUTHORIZED_TO_PUBLISH | Verification evidence cannot grant publication authority. |
| OPEN != READY_TO_EXECUTE | Policy, capability, implementation, verification, and review prerequisites still apply. |

## Negative Space and Future Implementation Boundary

Step 24 creates no workflow resolver code, fixtures, runtime state schema
change, route persistence, route history, verification runner, review runner,
fix executor, handoff runtime, provider/action execution, network call, or
process execution. Step 25 and later implementation remain out of scope.

A later implementation may add a pure resolver and fixtures only after this
contract is independently reviewed. A still-later coordinator may integrate
loading, route resolution, downstream invocation, and authorized runtime-state
updates without changing the separation defined here.
