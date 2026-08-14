---
Name: V3 Handoff and Completion Resolution Contract
Type: Architecture Specification
Subject: Deterministic Current Handoff Completion Projection
Status: Proposed
Date: 2026-08-14
---

# V3 Handoff and Completion Resolution Contract

## Scope and Ownership

Step 29 consumes normalized current prerequisites and an optional bounded
handoff completion observation. It produces the Handoff-owned projection
consumed by Workflow Routing. It does not execute handoff, create artifacts,
publish, commit, push, merge, deploy, route workflow, mutate runtime state,
resolve policy, run verification, perform review, or execute fixes.

Workflow owns readiness routing. Step 29 owns only whether a bounded handoff
completion record is current. `Handoff Ready` and `Handoff Complete` are
distinct. `COMPLETE` means current handoff completion was recorded; it does not
mean published, merged, deployed, human-approved, or authorized to publish.

## Input Contract

The resolver consumes these normalized projections:

```yaml
current_identity:
  implementation_fingerprint: bounded_identifier
  scope_fingerprint: bounded_identifier
  verification_identity_fingerprint: bounded_identifier
  review_identity: bounded_identifier_or_NONE
  handoff_definition_fingerprint: bounded_identifier
implementation: {status: COMPLETE | INCOMPLETE}
verification: {status: NOT_REQUIRED | EVIDENCE_CURRENT | REQUIRED | IN_PROGRESS | FAILED | BLOCKED | STALE}
review_requirement: {status: REQUIRED | NOT_REQUIRED | UNRESOLVED}
review_result: null | {status: NOT_STARTED | IN_PROGRESS | APPROVED_CURRENT | CHANGES_REQUIRED | BLOCKED | STALE}
scope_reassessment: {required: boolean}
policy_gate: {status: SATISFIED | PROHIBITED | UNRESOLVED}
handoff_observation: null | {
  identity: same bounded identity as current_identity
  evidence_refs: bounded identifiers
}
```

The observation is explicit completion evidence. Completion is never inferred
from verification, review, policy, or Workflow readiness alone.

## Resolution Semantics

- no observation with valid current prerequisites produces `NOT_COMPLETE`;
- a current valid completed observation with at least one evidence reference
  produces `COMPLETE`;
- a valid historical observation with a mismatched identity produces
  `NOT_COMPLETE` with `HANDOFF_STALE`;
- malformed observations and contradictory current projections are
  `invalid_input`;
- `COMPLETE` requires implementation `COMPLETE`, verification
  `EVIDENCE_CURRENT` or `NOT_REQUIRED`, required review `APPROVED_CURRENT`, no
  scope reassessment, and policy `SATISFIED`;
- `NOT_REQUIRED` review requires a null review result and uses `NONE` as the
  review identity; no synthetic review fingerprint is invented;
- `UNRESOLVED` review requirement never completes handoff.

The public handoff status vocabulary is exactly `NOT_COMPLETE` and `COMPLETE`.
Stale historical completion remains `NOT_COMPLETE`; `STALE` is not a Workflow
status.

## Identity and Evidence

Completion identity is the bounded tuple of implementation, scope,
verification, review-or-`NONE`, and handoff-definition fingerprints. Each
identifier matches `^[A-Za-z][A-Za-z0-9_.:-]{0,127}$`. Completion evidence is a
copied, sorted, deduplicated list of bounded identifiers. Paths, URLs, prose,
raw handoff documents, source, diffs, commands, logs, secrets, and payloads
are rejected.

## Output Contract

```yaml
resolution_status: resolved | invalid_input
status: NOT_COMPLETE | COMPLETE
evidence_refs: bounded_identifiers
reason_codes: [HANDOFF_NOT_COMPLETE | HANDOFF_COMPLETE_CURRENT | HANDOFF_STALE | HANDOFF_INVALID_PREREQUISITE | HANDOFF_SCOPE_REASSESSMENT_REQUIRED]
errors: [{code: bounded_code, path: bounded_path}]
warnings: []
```

The resolver is pure, total over bounded JSON-like input, deterministic, and
does not mutate caller-owned data.
