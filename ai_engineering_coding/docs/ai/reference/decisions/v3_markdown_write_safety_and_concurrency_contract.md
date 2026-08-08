---
Name: V3 Markdown Write Safety and Concurrency Contract
Type: Architecture Specification
Subject: Safe Multi-Agent Writes to Markdown Shared Memory
Status: Proposed
Date: 2026-08-08
Source Basis: V2.3 baseline audit; Step 02 policy contract; Step 03 provenance contract; approved V3 shared-memory architecture
---

# V3 Markdown Write Safety and Concurrency Contract

## Purpose and Non-Goals

This contract prevents agents from silently overwriting newer Markdown state,
losing decisions, corrupting shared metrics, or writing artifacts owned by
another workflow.

It is file-oriented, Git-friendly, agent-neutral, recoverable, and low-token.
It specifies no lock service, daemon, database, runtime state file, or
automation.

## Writable Artifact Inventory

| Artifact class | Canonical owner | Writer count/frequency | Conflict risk | Concurrent writes |
| --- | --- | --- | --- | --- |
| Repository context | repo-context update workflow | One designated writer; occasional | High semantic risk | No; handoff required |
| Repository policies | Policy maintenance workflow/human owner | Few writers; rare | Critical | No |
| Approved PBI | Requirement owner/human | One owner; early task stage | Critical | No |
| PBI context | Active planner | One workflow owner | Medium | No |
| Implementation plan | Planner, then workflow handoff | Sequential | High | No |
| Phase files | Active phase executor | One active writer | High | No |
| Decision log | Active PBI workflow | Occasional append | Medium | Append only with unique IDs |
| Validation | Implementation/review workflow | Sequential by phase | High | No |
| Handoff | Owning workflow at completion | One final writer | High | No |
| PBI metrics | Workspace workflow plus aggregate owner | Frequent | High | Per-workspace first |
| Review workspace/findings | Reviewer workflow | Sequential or assigned reviewer | High | No for same section |
| Review comments/follow-up | Review workflow | Sequential | Medium-high | No for same item |
| Review metrics | Review workspace plus aggregate owner | Frequent | High | Per-workspace first |
| Reference docs | Reference maintenance workflow | Maintenance-only | Medium | No |
| System-health reports | Health-check workflow | Generated/single owner | High | No direct concurrent edits |
| Runtime configuration | Human/config maintenance | Rare | Critical | No |
| Future per-STP configuration | Human/task owner | Rare | Critical | No |
| Future HITL decision artifacts | Human decision workflow | One active owner | Critical | No |
| Future learning artifacts | Learning/reference workflow | Multiple authors | Medium | Separate artifacts |

Ownership is exclusive unless the table explicitly allows append-only or
aggregate processing.

## Ownership Model

The contract uses five ownership classes:

- single_writer: one named workflow/capability may write the artifact.
- append_only: writers add uniquely identified records and never rewrite old records.
- human_owned: a human/configuration owner approves semantic changes.
- maintenance_owned: only the designated maintenance workflow may write.
- derived: output is rebuilt from owned inputs rather than edited directly.

Workflow ownership is single-writer ownership plus explicit handoff. Shared
aggregation is append-only per workspace plus derived or single-owner output.

## Write Intent Contract

Before a shared-artifact write, the agent prepares this small internal intent:

~~~yaml
artifact: docs/ai/pbi/STP-XXXX/phases/implementation.md
writer: pbi_implementation_phase
operation: replace_owned_section
expected_revision: content-fingerprint
reason: execute approved implementation phase
scope: section:Execution Memory
~~~

The minimum fields are artifact, writer, operation, expected_revision, reason,
and scope. This is not a durable transaction log; future runtime state stores
it only when handoff or recovery requires it.

## Optimistic Concurrency Model

Use optimistic concurrency:

1. Read the artifact and calculate a content fingerprint.
2. Record the observed fingerprint in write intent.
3. Prepare the smallest scoped change.
4. Re-read and recalculate immediately before writing.
5. Write only when the fingerprint still matches.

The preferred revision marker is a cryptographic hash of exact artifact bytes
plus logical path. A Git blob hash is equivalent when the working-tree
representation is unambiguous. Do not rely only on mtime, embedded counters,
or branch names.

The eventual implementation should use temporary-file plus atomic replacement
where supported, but this contract does not implement it.

## Conflict Detection

A conflict exists when the observed revision differs from the current revision,
including deletion, rename, or ownership change.

On conflict the agent must stop the affected write, preserve the current
artifact, report observed/current revisions, re-read, and re-plan or merge only
under the rules below. Human resolution is required when semantic meaning may
be discarded. No agent may silently overwrite a newer version.

## Merge Rules

| Artifact shape | Merge rule | Human resolution |
| --- | --- | --- |
| Append-only log/event list | Auto-append unique record after revision check | Duplicate/conflicting IDs |
| Decision log | Append when IDs are unique and old decisions are unchanged | Conflicting decisions |
| Independent learning artifacts | Keep separate files or disjoint records | Conflicting claims |
| Structured phase/workspace state | Section-aware merge only with ownership boundaries | Same semantic section |
| Review finding/comment item | Update only assigned finding ID | Same item changed twice |
| Metrics aggregate | Never blind-merge; aggregate per-workspace records | Metric disagreement |
| Runtime/STP configuration | No automatic semantic merge | Always for conflicting values |
| Policy or repo-context knowledge | No blind merge; targeted re-read and owner decision | Conflicting meaning |

Formatting-only changes may merge automatically if semantic content and
ownership are unchanged. The resulting artifact must pass one more revision
check before writing.

## Handoff Model

Normal ownership is sequential:

~~~text
planner -> implementer -> reviewer -> fixer -> handoff
~~~

The handoff payload contains artifact, from, to, scope, expected_revision, and
status. These fields belong in future runtime state or the owning workspace,
not in every Markdown document.

The next capability must re-read after handoff. Handoff does not authorize
writes outside the transferred scope.

## Runtime State Boundary

Durable Markdown contains decisions, rationale, results, and append-only
history. Transient ownership, observed fingerprints, active writer, handoff
target, intent status, and crash-recovery state belong in a future
docs/ai/pbi/STP-XXXX/runtime_state.yaml or equivalent per-workspace state.

Runtime state is not a second policy source. Global runtime state should be
avoided; state is per workspace or per maintenance operation.

## Shared Aggregate Strategy

- PBI/review metrics are written per workspace, then aggregated by a designated
  owner or deterministic rebuild.
- Central metrics are derived outputs, never concurrently edited logs.
- system-health/latest.md is owned by the health-check workflow; history is
  append-only through that workflow.
- Shared indexes are maintenance-owned and revision-checked.
- Repo-context remains maintenance-owned; implementation cannot update it directly.

This reduces contention and makes aggregate recovery possible from owned inputs.

## Failure Recovery

- Crash before write: no artifact change; discard or expire intent.
- Crash after intent before write: no lock remains; next owner re-reads.
- Crash during write: atomic replacement preserves old or new complete content.
- Crash after write before handoff: preserve content; reconcile ownership/state.
- Crash while awaiting approval: preserve request and pause the affected scope.

Optimistic concurrency has no permanent lock to clean up. Recovery never
authorizes a write without a fresh read and ownership check.

## HITL Conflict Rules

No human interruption is needed for a unique append or an unambiguous
disjoint-section merge.

Human resolution is required when approved decisions conflict, configuration
values conflict semantically, two agents changed the same semantic section, or
an automatic merge could discard meaning.

Future decision payload:

~~~text
decision_id
artifact
owner
observed_revision
current_revision
conflicting_scopes
candidate_merges
recommended_option
data_loss_risk
blocking_scope
~~~

## Policy Resolver Integration

Write permission is separate from decision mode:

~~~yaml
permission: ALLOW_WITH_CONDITIONS
conditions:
  - writer_owns_artifact
  - expected_revision_matches
  - scope_is_approved
  - required_checks_pass
~~~

write_markdown, modify_repo_context, modify_policy, and modify_config require
ownership and revision checks as permission conditions. Ownership failure or
revision mismatch denies the write attempt. Policy/config semantic conflicts
return REQUIRE_APPROVAL or DENY under Step 02 precedence.

## Provenance Integration

A successful repo-context update must update Step 03 fields verified_at,
source_revision, and freshness for affected knowledge. A normal phase note,
review comment, or metric append does not need the full provenance block unless
promoted to reusable knowledge.

The write fingerprint protects document state; provenance describes knowledge
reliability. They are complementary.

## Identifier Strategy

Existing stable IDs remain unchanged. New append-only events, review findings,
and HITL decisions use a type prefix, UTC timestamp, and short
collision-resistant nonce:

~~~text
RF-20260808T120000Z-a81f
DEC-20260808T120500Z-c2e7
HDR-20260808T121000Z-91bd
~~~

No global counter is required. IDs are immutable once published; updates
reference the existing ID and still require revision validation.

## Scenario Evaluation

| Scenario | Artifact / owner | Mechanism | Conflict? | Recovery / human? | Expected result |
| --- | --- | --- | --- | --- | --- |
| Two agents update same phase | Phase / active executor | Fingerprint check | Yes | Re-read; human for same section | No overwrite |
| Planner and implementer overlap | Plan / handoff owner | Sequential handoff | Yes | Reconcile ownership | Implementer waits |
| Reviewer while fixer starts | Finding / reviewer then fixer | Finding ID and handoff | Possible | Human for semantic conflict | One owner |
| Two PBIs update central metrics | Per-workspace metrics | Append locally; aggregate later | No direct conflict | Deterministic rebuild | Both records preserved |
| Repo-context overlaps implementation | Repo-context / maintenance owner | Exclusive ownership | Yes | Implementation denied | Maintainer owns update |
| Two decision-log entries | Decision log / PBI workflow | Unique IDs, append-only | No if independent | Auto-append | Both preserved |
| Config edited during execution | Config / human owner | Revision check | Yes | Human approval | No semantic auto-merge |
| Human edits while agent works | Any owned Markdown | Revision mismatch | Yes | Re-read and resolve | Human edit preserved |
| Crash before writing | Any artifact / assigned writer | No durable write | No | Expire intent | Safe retry |
| Crash after write before handoff | Phase/handoff | Durable content and reconciliation | Possible | Reconcile state | Content preserved |
| Same finding, two reviewers | Finding / assigned reviewer | Immutable finding ID | Yes | Human if semantic conflict | No lost meaning |
| Two learning artifacts | Separate files / learning workflow | Separate artifacts | No | No human needed | Independent outputs |

These scenarios are candidates for later Golden Evaluation; this contract does
not implement evaluation.

## Complexity and Token Cost Assessment

The design adds one small intent object, one content fingerprint, and small
ownership/handoff state only when needed. It avoids locks, daemons, databases,
global counters, and per-paragraph metadata. Agents normally read one artifact,
one ownership definition, and one current fingerprint.

Disjoint appends can recover automatically; semantic conflicts pause only the
affected scope. Markdown shared memory therefore remains file-based rather than
becoming a distributed database.

## Migration Strategy

1. New V3 writable workflows must use ownership and optimistic revision checks.
2. Existing V2.3 workspaces retain legacy behavior until touched.
3. Migrate first: central metrics, system-health output, shared indexes,
   repo-context, policies, and configuration.
4. Then migrate PBI/review phase state, findings, decision logs, and handoffs.
5. Do not rewrite existing workspaces solely to add concurrency metadata.

## Migration Constraints

This is a non-runtime V3 architecture specification. It does not implement
locks, runtime state, HITL, Golden Evaluation, policy changes, provenance
automation, or any write behavior.
