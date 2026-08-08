---
Name: V3 Deterministic Verification Contract
Type: Architecture Specification
Subject: Evidence-Based Verification for the AI Engineering Operating System
Status: Proposed
Date: 2026-08-08
Source Basis: V2.3 baseline audit; Step 02 policy contract; Step 03 provenance contract; Step 04 concurrency contract; Step 05 Golden Evaluation contract; approved V3 quality goals
---

# V3 Deterministic Verification Contract

## Purpose and Non-Goals

The rule is: AI reasons, tools verify, and evidence decides. A task is not
verified because the AI believes it is correct, files changed, or a phase
completed.

This contract defines evidence and state semantics only. It does not implement
a verification runner, risk engine, security tooling, CI, or application tests.

## Verification State Model

Check-level states:

- NOT_STARTED: no attempt exists.
- RUNNING: an allowed check is executing.
- PASSED: required evidence satisfies the check.
- FAILED: evidence contradicts the check or a required check failed.
- BLOCKED: the check cannot run or needs an unresolved prerequisite.
- NOT_APPLICABLE: policy explicitly excludes the check.

Task-level states:

- IMPLEMENTED: approved implementation scope is complete; verification is not
  yet complete.
- VERIFIED: all applicable blocking evidence and approvals are complete.
- BLOCKED: verification cannot complete because an environment, tool, decision,
  or prerequisite is unavailable.
- FAILED: required evidence failed or a blocking finding remains.

There is no vague intermediate state such as MOSTLY_VERIFIED.

## Evidence Classes

| Class | Purpose | When applicable | Evidence source | Blocking potential |
|---|---|---|---|---|
| build/compile/type_check | Structural correctness | Compilable or typed changes | Build/compiler output | Blocking when available and required |
| lint/format | Style and static conventions | Affected languages/files | Tool report | Usually required |
| unit_test | Local behavior | Logic changes | Test runner summary | Blocking when required |
| integration_test | Cross-component behavior | Integration changes | Test runner/environment | Blocking when required |
| contract_test | Public/interface compatibility | API or contract changes | Contract test output | Blocking |
| architecture_check | Boundary/design constraints | High-risk architecture changes | Structured review/check | Blocking when required |
| static_analysis | Defect/security patterns | Tool capability and risk | Analyzer report | Blocking when configured |
| security_scan | Secret/vulnerability/security checks | Security-sensitive changes | Scanner report | Blocking |
| dependency_check | Supply-chain/license/version risk | Dependency changes | Dependency tooling | Blocking |
| migration_check | Forward/data migration safety | Schema/data changes | Dry-run/integration output | Blocking |
| rollback_check | Reversal and recovery | Destructive/high-risk migrations | Rollback evidence | Blocking for critical changes |
| performance_check | Regression budget | Performance-sensitive changes | Benchmark/profile | Blocking only when policy requires |
| acceptance_criteria | Requirement satisfaction | Every material criterion | Automated/tool/manual/human evidence | Blocking if material |
| review_diff_check | Independent defect/risk review | Normal and higher-risk changes | Local diff review | Blocking by risk/policy |
| manual_observation | Human-observable behavior | UX or non-automatable behavior | Recorded observation | Blocking when criterion requires it |
| human_approval | Explicit decision gate | Irreversible or policy-gated action | Decision artifact | Blocking |

## Deterministic vs AI-Judged Checks

When a capable tool exists, compilation, tests, lint, static analysis, security
scans, dependency checks, migrations, and rollback checks must use tool evidence.
AI inspection may explain results but cannot substitute for those checks.

AI judgment may supplement architecture reasoning, requirement interpretation,
maintainability observations, and manual UX reasoning. These remain explicitly
judged evidence and cannot masquerade as deterministic checks.

## Required Check Resolution

The required set is resolved before final handoff:

~~~text
intent + risk + change_type + affected_area + policy + acceptance_criteria
= required_verification_set
~~~

The resolved set contains check type, applicability, blocking status, required
capability, scope, and evidence freshness. It is risk-adaptive; there is no
single checklist for every task.

## Risk-Based Verification

| Risk | Expected verification |
|---|---|
| LOW | Targeted relevant checks and material acceptance criteria |
| NORMAL | Build/compile, applicable tests, quality checks, and review as required |
| HIGH | Strong validation, independent review, and relevant security/architecture checks |
| CRITICAL | All applicable deterministic evidence, human approvals, rollback/data-safety evidence, and independent review |

High risk does not mean blindly running unrelated repository checks.

## Change-Type Mapping

| Change type | Typical required checks |
|---|---|
| Documentation | Markdown/reporting checks and acceptance criteria |
| Frontend UI | Build/type/lint, targeted tests, UX observation when required |
| Backend logic | Build/type, unit/integration tests, review |
| Public API | Compile/contract tests, compatibility, acceptance, independent review |
| Database migration | Forward, dry-run, data preservation, integration, rollback as risk requires |
| Authentication | Unit/integration, security scan, auth scenarios, security review |
| Authorization | Authorization tests, security review, policy verification |
| Dependency addition | Dependency/security/license checks, build/tests, approval |
| Configuration | Schema/parse validation, policy checks, targeted behavior |
| Refactor | Build/type, targeted regression tests, diff review |
| Bug fix | Reproduction/regression test, targeted checks, acceptance |
| Performance-sensitive change | Baseline comparison and performance check |
| Security-sensitive change | Static/security/dependency scans, security scenarios, independent security review |

The resolver narrows this mapping to the affected area and actual capabilities.

## Acceptance Criteria Verification

Every material approved criterion is classified as:

- automated: assertion executable by a test/check;
- tool_observable: evidence produced by a configured tool;
- manual_observable: recorded human observation;
- human_decision: explicit approval or decision artifact;
- not_verifiable: cannot currently be evidenced.

not_verifiable never silently passes. It produces a clarification, blocking
finding, or explicit human decision requirement.

## Evidence Record Contract

~~~yaml
check:
  id: CHECK-001
  type: unit_test
  status: PASSED
  command: test-command
  scope: affected-module
  implementation_revision: revision
  observed_at: 2026-08-08T12:00:00Z
  result_summary: 12 passed
  output_ref: failure-log-or-summary-reference
~~~

Required evidence answers what was checked, how, against what scope, result,
time, and implementation revision. command, output_ref, and tool identity are
required when applicable. Store summaries by default; retain raw failure output
only when needed.

## Terminal Output Policy

Successful output is summarized. Failure output is retained when needed for
diagnosis. Raw output is retained when explicitly requested.

Evidence stores a concise result summary and a reference to raw output rather
than copying large terminal logs into task memory.

## Failure Semantics

- Required check fails: check FAILED; task cannot become VERIFIED.
- Required check cannot run: check BLOCKED; task is BLOCKED.
- Required tool unavailable: BLOCKED, unless policy explicitly marks the check
  NOT_APPLICABLE because the capability is not configured.
- Missing environment/fixture: BLOCKED.
- Ambiguous result: BLOCKED pending clarification or repeatable evidence.
- Non-required check fails: record failure; task may remain eligible only if no
  policy or acceptance criterion makes it blocking.

The final status must expose failures and blocks; neither may be relabeled as
success.

## Flaky Check Policy

At most one bounded retry is allowed after recording the first outcome. Record
all attempts and the environment.

- one pass after one failure: mark the check unstable; the task cannot be
  VERIFIED when policy treats flakiness as blocking.
- repeated failure: FAILED.
- divergent/ambiguous outcomes: BLOCKED for investigation, or FAILED when the
  check is required and instability itself violates policy.

Never rerun until green or hide instability.

## Verification / Fix Loop

~~~text
implement
-> verify
-> failure
-> diagnose
-> fix within approved scope
-> verify again
~~~

Verification failure does not authorize unrelated refactoring. A material
scope expansion requires Step 02 policy resolution and, when applicable, HITL
approval before the fix.

## Review Integration

Verification answers whether required evidence passed. Independent review asks
whether defects, risks, regressions, or poor design escaped those checks.

Review is mandatory for HIGH and CRITICAL changes, public APIs, security and
authorization changes, destructive migrations, and whenever policy requires it.
Normal-risk review remains required when the workflow or acceptance criteria
specify it. Review-only work remains source-read-only and diff-first.

## Security Verification

Security-sensitive changes resolve applicable static analysis, dependency scan,
secret scan, authentication scenarios, authorization tests, input-validation
tests, and independent security review.

If a configured deterministic security tool is unavailable, the check is
BLOCKED; AI-only reasoning cannot silently substitute for it. If no such tool
is configured, policy may permit a documented fallback with human/security
review, but the missing capability remains visible.

## Migration Verification

For schema/data migrations, required evidence may include forward migration,
dry run, backward compatibility, data preservation, integration validation, and
rollback.

Forward and data-preservation evidence are blocking for normal migrations.
Rollback and recovery evidence are blocking for destructive or critical
migrations. Missing rollback capability blocks verification rather than passing.

## Publication Boundary

VERIFIED and AUTHORIZED_TO_PUBLISH are separate states. Verification never
grants commit, push, PR creation, or publication permission. Those actions
remain governed by Step 02 policy and explicit current-task authorization.

## Provenance Integration

Verification evidence records the implementation revision and scope. Targeted
source verification may later move reusable knowledge from possibly_stale to
fresh under Step 03. This phase does not modify repo-context or automate
provenance updates.

## Concurrency Integration

05_validation.md and per-task verification evidence are owned by the active
PBI/review workflow. Central verification metrics are derived from per-workspace
records. Every evidence write follows Step 04 ownership, fingerprint,
conflict, and handoff rules.

## Golden Evaluation Integration

Step 05 scenarios may assert required_checks, actual_checks,
verification_status, missing_checks, blocking_failures, implementation_revision,
and evidence references. Golden Evaluation consumes verification results; it
does not define check execution or replace this evidence contract.

## Definition of Verified

A task is VERIFIED only when:

1. approved implementation scope is complete;
2. every applicable blocking check has PASSED evidence;
3. material acceptance criteria have evidence;
4. no blocking review, security, or policy finding remains;
5. required human approvals are satisfied;
6. evidence matches the current implementation revision; and
7. no conflicting post-verification write invalidated the evidence.

## Verification Invalidation

All evidence is invalidated by changes to approved scope, implementation
revision, acceptance criteria, applicable policy, or required verification
definition.

Only targeted evidence is invalidated when an unrelated artifact changes or a
disjoint subsystem is modified. Unchanged checks may remain valid when their
scope and implementation revision are proven unchanged. Any uncertain
relationship becomes BLOCKED or requires targeted re-verification.

## Scenario Evaluation

| Scenario | Risk | Required checks | Expected state | Human/review |
|---|---|---|---|---|
| Trivial documentation change | LOW | Markdown and acceptance | VERIFIED after pass | No independent review unless required |
| Normal backend feature | NORMAL | Build/type, tests, review | VERIFIED after pass | Review per workflow |
| Frontend lint/test change | NORMAL | Build/type, lint, tests | VERIFIED after pass | Review per workflow |
| Compile failure | NORMAL | Compile | FAILED | Fix within scope |
| Failing unit test | NORMAL | Unit test | FAILED | Fix within scope |
| Integration environment unavailable | NORMAL | Integration test | BLOCKED | Environment resolution |
| Flaky test | NORMAL | Bounded retry | BLOCKED or FAILED | Review instability |
| Public API change | HIGH | Contract, compatibility, tests, review | VERIFIED only after all pass | Independent review |
| Security-sensitive dependency | HIGH | Dependency/security/build/tests | VERIFIED only after all pass | Approval/security review |
| Authorization logic | HIGH | Auth tests, security checks, review | VERIFIED only after all pass | Independent security review |
| Database migration | HIGH | Forward, preservation, integration, rollback as required | VERIFIED only with required evidence | Review |
| Destructive migration | CRITICAL | Dry run, preservation, rollback, integration | VERIFIED only after all pass | Approval and independent review |
| Blocking review issue after tests pass | HIGH | Review finding resolution | FAILED | Fix/review loop |
| Implementation changes after verification | Any | Revision comparison | Prior evidence invalidated | Re-verify affected checks |
| Explicit push request with no publication authorization | HIGH | Verification may pass; publication policy check | VERIFIED but not AUTHORIZED_TO_PUBLISH | No push |
| Criterion not deterministically verifiable | Any | Criterion classification | BLOCKED or FAILED | Clarification/human decision |

## Context Cost Assessment

Verification loads the current required-check set, concise evidence summaries,
and failure details only when needed. It does not load full historical logs or
all prior validation artifacts. Evidence references preserve traceability
without copying terminal output into normal context.

## Migration Strategy

1. Preserve existing V2.3 05-validation.md semantics.
2. Introduce the compact V3 evidence record.
3. Add deterministic required-check resolution.
4. Add scripted execution and evidence capture.
5. Add Golden Evaluation assertions and a later regression gate.

Existing PBI workspaces are not rewritten in this phase.

## Migration Constraints

This is a non-runtime V3 architecture specification. It does not implement
verification execution, risk resolution, security tooling, HITL, Golden
Evaluation, route/adapters, configuration, skills, repo-context, or source
changes.
