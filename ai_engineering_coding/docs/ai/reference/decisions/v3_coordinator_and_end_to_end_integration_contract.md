---
Name: V3 Coordinator and End-to-End Integration Contract
Type: Architecture Specification
Subject: Deterministic Single-Snapshot Control-Plane Composition
Status: Proposed
Date: 2026-08-14
---

# V3 Coordinator and End-to-End Integration Contract

## Scope and Ownership

The Coordinator evaluates one immutable normalized snapshot by composing the
canonical V3 resolvers. It owns composition order, bounded projection passing,
safe early stopping, failure provenance, and final orchestration output. It
does not own risk, policy, capability selection, HITL, runtime semantics,
verification, review, handoff, or Workflow routing.

Workflow Routing remains the authoritative owner of `status`, `stage`, and
completion. The Coordinator forwards the actual Workflow result. `COMPLETE`
therefore comes only from Workflow and means engineering workflow completion,
not publication, merge, deployment, or authorization.

## Composition Graph

```text
Integration boundary -> Runtime validation -> Effective Config -> Risk -> Policy -> Capability -> HITL
                         |                       |
                         +-> Review Requirement  +-> runtime stop facts
                         +-> Verification
Review Requirement + Review Observation -> Review Result
Implementation + Verification + Review + Policy + Handoff Observation -> Handoff
All normalized projections + Runtime State -> Workflow Routing
```

One evaluation performs this graph once. Runtime validation precedes
gate-specific early-stop reporting. A valid terminal or
`WAITING_FOR_HUMAN` runtime may stop evaluation with Runtime ownership; other
runtime projections remain inputs to Workflow Routing, which retains final
precedence. The Coordinator never loops, retries, waits internally, executes
tools, persists state, or invokes an agent.

## Input and Output

The input contains only strictly bounded resolver-owned inputs and normalized
current projections. The Coordinator admits the integration boundary before
calling Effective Config or any other canonical resolver; unknown nested keys
and invalid container/leaf types are rejected. Raw
source, diffs, policy trees/rules, logs, review prose, handoff documents,
secrets, provider transcripts, and model transcripts are outside the contract;
only the bounded normalized policy-rule projection is accepted.

`workflow_input.policy_gate` is an optional compatibility assertion, not an
independent authority. The Coordinator derives the Workflow gate from the
canonical Decision / Action Policy result: resolved non-approval permission
maps to `SATISFIED`; prohibited/deny maps to `PROHIBITED`; unresolved or
approval-required policy cannot map to `SATISFIED`. A supplied assertion must
exactly match the derived gate or the snapshot is invalid.

`requires_human` is a convenience flag derived only from an authoritative
runtime `WAITING_FOR_HUMAN` state or a canonical HITL requirement. It never
overrides Runtime or Workflow status.

For an approval-required Policy/HITL projection, the Coordinator may derive
`approval_satisfied_for_current_operation` only when the valid OPEN Runtime
state contains a terminal, consumed human decision whose operation, action,
decision ID, request identity, and request fingerprint exactly match the
bounded current approval identity projection. Stale, conflicting, superseded,
wrong-identity, and terminal states never satisfy the approval obligation.
This is an integration fact, not new Policy or HITL authority.

The output is a compact orchestration projection containing the actual
Workflow status/stage, one active owner, bounded reason codes, evidence
references, subsystem status summaries, human/block/completion flags, and
bounded errors. Full subsystem payloads are not copied into the output.

## Early Stops and Failure Propagation

Invalid or unavailable authoritative upstream results stop evaluation and
identify the owning subsystem. Prohibited or unresolved policy, capability
blocks, required human decisions, invalid runtime state, and terminal runtime
state are never upgraded into an active downstream route. Canonical errors are
projected as bounded codes; free-form messages are not propagated.

HITL does not create or consume a human response. Runtime persistence and
transitions remain outside this pure evaluation. Integration tests must cover
successive immutable snapshots for the verification/review/fix/handoff loop;
each Coordinator call remains single-snapshot and no call performs the loop.

## Determinism and Boundaries

Equivalent bounded reference collections are copied, sorted, and deduplicated
at the integration boundary. Caller input is not mutated. The Coordinator
uses no filesystem, network, Git, shell, provider, LLM, clock, randomness,
publication, persistence, or execution authority.
