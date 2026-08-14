---
Name: V3 Independent Review Result and Fix Resolution Contract
Type: Architecture Specification
Subject: Step 28 Normalized Review Result and Bounded Fix Projection
Status: Proposed
Date: 2026-08-13
---

# V3 Independent Review Result and Fix Resolution Contract

## Scope and Ownership

Step 28 consumes a normalized independent-review observation and produces the
authoritative review-result projection consumed by Workflow Routing. It does
not execute review, inspect source or Git, edit files, resolve review
requirement, execute fixes, run verification, route workflow, mutate runtime
state, or authorize publication.

Step 26 owns whether review is required. Step 28 owns only the current result
of that review and bounded fix-relevant references.

## Result Vocabulary

The only result statuses are:

```text
NOT_STARTED
IN_PROGRESS
APPROVED_CURRENT
CHANGES_REQUIRED
BLOCKED
STALE
```

`APPROVED_CURRENT` means the current review identity has no unresolved
blocking corrective finding. It is not task verification, human approval,
handoff completion, or publication authority.

## Input Model

The resolver consumes:

```yaml
review_requirement: {status: REQUIRED | NOT_REQUIRED | UNRESOLVED}
current_identity:
  implementation_revision: bounded_identifier
  scope_fingerprint: bounded_identifier
  review_definition_fingerprint: bounded_identifier
  review_policy_fingerprint: bounded_identifier
  verification_identity_fingerprint: bounded_identifier
observation: null | {
  lifecycle: NOT_STARTED | IN_PROGRESS | COMPLETED | BLOCKED
  identity: same identity when completed
  findings: sorted finding records
  evidence_refs: bounded identifiers
  prerequisite_code: bounded code when BLOCKED
}
```

Finding records contain only `id`, `class`, `disposition`, `scope_effect`,
and `evidence_ref`. Classes are `BLOCKING`, `IMPORTANT`, and `MINOR`.
Dispositions are `OPEN`, `RESOLVED`, and `ACCEPTED_NON_BLOCKING`.
Scope effects are `IN_SCOPE` and `EXPANDS_SCOPE`.

## Lifecycle and Resolution

- missing observation for `REQUIRED` produces `NOT_STARTED`;
- `IN_PROGRESS` produces `IN_PROGRESS`;
- valid `BLOCKED` observation produces `BLOCKED`;
- completed observation with mismatched identity produces `STALE`;
- completed current observation with an open `BLOCKING` finding produces
  `CHANGES_REQUIRED`;
- completed current observation without an open blocking finding produces
  `APPROVED_CURRENT`, including non-blocking findings;
- `NOT_REQUIRED` must have no observation and produces a bounded no-review
  result for the caller to omit from Workflow Routing;
- `UNRESOLVED` requirement or contradictory supplied observations is invalid.

An open blocking finding is corrective. `required_fix_findings` contains its
IDs only. `scope_reassessment_required` is true when any such finding has
`EXPANDS_SCOPE`; it does not authorize scope expansion.

After an implementation, scope, review definition, review policy, or
verification identity change, a prior completed result is `STALE`, never
automatically approved.

## Evidence and Data Minimization

Completed observations require at least one bounded evidence reference.
References use the existing identifier grammar, are sorted and deduplicated,
and cannot contain paths, URLs, logs, commands, source, review prose, secrets,
or embedded payloads. Raw review fields are rejected.

The output contains only bounded status, finding IDs, evidence references,
scope-reassessment state, reason codes, and bounded errors/warnings.
