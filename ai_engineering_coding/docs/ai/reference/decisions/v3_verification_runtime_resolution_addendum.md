---
Name: V3 Verification Runtime Resolution Addendum
Type: Architecture Decision Addendum
Subject: Step 27 Verification Runtime Clarifications
Status: Proposed
Date: 2026-08-13
---

# V3 Verification Runtime Resolution Addendum

## Scope

This addendum clarifies the Step 27 runtime integration of the V3
Deterministic Verification Contract (Step 06) with Workflow Routing (Step 24).
It does not supersede unrelated Step 06 semantics, implement verification
execution, or change ownership of risk, policy, capability, HITL, review,
runtime state, routing, handoff, or publication.

## Verification Policy Freshness

The normalized verification input contains a bounded
`verification_policy_fingerprint`. It represents only the resolved policy
projection that can affect verification applicability, required checks,
blocking semantics, or interpretation. It is not raw policy rules and is not
resolved by Verification.

Evidence identity is the tuple:

```text
implementation_revision
+ scope_fingerprint
+ acceptance_fingerprint
+ check_definition_revision
+ verification_policy_fingerprint
```

Evidence with any mismatched identity is `STALE` and cannot produce
`EVIDENCE_CURRENT`.

## Required-Check Relevance

The Step 27 required set is relevance-based:

- architecture-boundary changes require `architecture_check`;
- authentication changes require explicit `authentication_scenarios` plus
  applicable tests and security checks;
- authorization changes require authorization-specific testing and policy or
  security evidence;
- rollback/recovery is required for destructive migrations and critical
  database migrations, not for unrelated critical work.

Risk does not inject unrelated checks merely because its level is HIGH or
CRITICAL.

Policy may exclude a check before it enters `required_checks` through the
normalized `excluded_check_types` projection. A check excluded at this stage
does not produce `NOT_APPLICABLE` evidence.

## Aggregate Precedence

For a valid non-empty required set, the scalar routing status is selected in
this order:

```text
FAILED > BLOCKED > STALE > IN_PROGRESS > REQUIRED > EVIDENCE_CURRENT
```

`FAILED` means a current required check has confirmed failure. `BLOCKED` is
selected only when no current failure exists and a required check cannot
produce evidence. `STALE`, `IN_PROGRESS`, and `REQUIRED` follow the same
fail-safe ordering. Categorized arrays retain all applicable subordinate
facts even when another scalar status wins.

`NOT_REQUIRED` is emitted only for a valid genuinely empty required set.

## NOT_APPLICABLE

Applicability is resolved before a check enters `required_checks`. Therefore a
required check accompanied by `NOT_APPLICABLE` evidence is contradictory input
and returns `invalid_input`. An unavailable applicable check remains
`BLOCKED`; it is not converted to `NOT_APPLICABLE`.

## Evidence Traceability

Completed evidence states (`PASSED`, `FAILED`, and `BLOCKED`) require a
bounded `evidence_ref` identifier. `RUNNING` and `NOT_STARTED` do not require
fabricated references. The normalized output contains only bounded evidence
references, never raw commands, logs, source, secrets, or provider data.
