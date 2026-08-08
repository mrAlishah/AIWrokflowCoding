---
Name: V3 Provenance and Freshness Contract
Type: Architecture Specification
Subject: Provenance and Freshness for Reusable AI Engineering Knowledge
Status: Proposed
Date: 2026-08-08
Source Basis: V2.3 baseline audit; active V2.3 governance and policy contracts; approved V3 architecture decisions
---

# V3 Provenance and Freshness Contract

## Purpose and Non-Goals

This contract lets future agents decide where reusable knowledge came from,
whether it is fact or inference, which repository revision it represents, and
whether it is safe to use for a current decision.

It is a specification only. It does not implement metadata tooling, automatic
Git checks, a repo-context updater, or the Step 02 policy resolver.

## Knowledge Classes

| Knowledge class | Provenance requirement | Reason |
| --- | --- | --- |
| Repository reusable knowledge | Mandatory compact document-level metadata | Reused across tasks and can silently become stale |
| Repository policies | Mandatory, with authority and verification scope | Policy affects permissions and must not be treated as an unverified preference |
| PBI/task-specific knowledge | Mandatory when reused outside its task; lightweight while local | Task assumptions have a bounded lifetime and scope |
| Phase/execution memory | Optional provenance; execution timestamp and actor are usually sufficient | Describes what happened rather than repository truth |
| Review memory | Mandatory source/diff basis and revision when findings are reused | Findings depend on a specific diff and branch state |
| Architecture/domain decisions | Mandatory nature, source, decision authority, and verification basis | Decisions can outlive implementation details but require explicit authority |
| Learning/human education artifacts | Lightweight source basis; freshness only when presenting current guidance | Optimized for human understanding, not direct authorization |
| Reference/history | Historical provenance when useful; never authoritative by age alone | Preserves traceability without entering normal runtime context |

The primary target is `docs/ai/repo-context/**`. Existing V2.3 ownership remains:
normal repo-context updates are performed only through the designated
repo-context update workflow.

## Provenance Metadata Contract

New or verified reusable knowledge uses this compact block:

```yaml
provenance:
  nature: fact
  source: repository_source
  verified_at: 2026-08-08
  source_revision: <git-commit-sha-or-tree-id>
  freshness: fresh
```

Required fields:

- `nature`: one of `fact`, `inference`, `decision`, or `mixed`.
- `source`: one of `repository_source`, `repository_documentation`,
  `configuration`, `human_decision`, `external_reference`,
  `derived_inference`, or `mixed`.
- `verified_at`: ISO date of the last verification, or `unknown` when it cannot
  be established.
- `source_revision`: the repository commit/tree identifier last verified, or
  `unknown`.
- `freshness`: one of `fresh`, `possibly_stale`, `stale`, or `unknown`.

Optional fields are limited to `verification_scope` (a subsystem or small set
of evidence paths), `authority` (for a human decision or policy owner), and
`source_locator` (a stable external/document reference). Do not include a full
history or repeat evidence for every paragraph.

## Source Model

| Source value | Meaning | Evidence rule |
| --- | --- | --- |
| `repository_source` | Application/source files inspected directly | Repository-level scope is enough for broad navigation; exact paths are required for high-impact claims |
| `repository_documentation` | Maintained repository documentation | Record exact document path when the claim controls implementation or policy |
| `configuration` | Runtime or repository configuration | Record the configuration path and revision when it affects behavior |
| `human_decision` | Explicit approved requirement or architecture decision | Record decision artifact/authority; do not infer approval from a discussion |
| `external_reference` | External standard, guide, or current best-practice source | Record a stable locator and access date when currentness matters |
| `derived_inference` | AI-derived conclusion from one or more sources | Record supporting source class and mark the claim as inference |
| `mixed` | Document combines multiple source types or natures | Use section annotations only for material distinctions |

Exact file lists are not required for low-risk navigation summaries. They are
required for security, policy, authorization, destructive-operation, and
irreversible architecture claims, either in `verification_scope` or a linked
decision artifact.

## Freshness Model

Freshness is change-aware, not calendar-based:

- `fresh`: the recorded revision is current for the relevant source scope, or
  targeted verification confirmed that no relevant change occurred.
- `possibly_stale`: the repository advanced or the source scope is uncertain,
  but no relevant invalidation is known.
- `stale`: a relevant source changed, was removed/renamed, or was explicitly
  invalidated after the recorded verification.
- `unknown`: required metadata or relevant change information is unavailable.

Freshness is evaluated against relevant source scope, not every repository
commit. A changed README should not invalidate unrelated database knowledge;
a changed module boundary should invalidate its module map and dependent
architecture claims.

## Revision Semantics

`source_revision` means the last verified repository state. Prefer a full Git
commit SHA. A tree identifier is acceptable when verification intentionally
covers a tree snapshot. Do not use a branch name, working-tree description, or
calendar date as a revision.

When the repository has advanced:

1. If relevant files are unchanged, knowledge may remain `fresh` after targeted confirmation.
2. If only unrelated files changed and relevance is known, mark
   `possibly_stale` until the next normal verification opportunity.
3. If relevant subsystem files changed, mark `stale` and require targeted
   re-verification before material use.
4. If revision cannot be determined, use `unknown`; do not scan the entire
   repository solely to recover it.

## Fact and Inference Rules

Document-level `nature` is the default. It applies to the document unless a
material section differs.

- `fact` means directly verified from an allowed source.
- `inference` means a reasoned conclusion that is not directly stated by the source.
- `decision` means an explicitly approved human or governance choice.
- `mixed` means the document contains more than one of these natures.

Mixed documents may use a short section annotation only where the distinction
changes a decision:

`` provenance: nature=inference; source=derived_inference ``

Do not annotate every sentence. Inference may guide navigation and hypothesis
formation but cannot be presented as repository fact. An inference supporting a
high-impact action must be verified or explicitly approved.

## Consumption Rules

| Provenance state | Allowed use | Verification behavior |
| --- | --- | --- |
| Fact + fresh | Use normally within recorded scope | No extra scan required |
| Decision + fresh | Use as authoritative within its authority/scope | Confirm authority for material changes |
| Inference + fresh | Guide navigation or recommend a hypothesis | Verify before treating as fact |
| Possibly stale | Navigation and low-risk orientation | Verify affected claims before material decisions |
| Stale | Non-authoritative context only | Targeted verification is required before reliance |
| Unknown | Navigation hints only | Do not authorize policy, security, or irreversible action |

Unknown or stale knowledge does not automatically trigger a whole-repository
scan. The agent identifies the smallest affected source area and verifies that
area before continuing.

## Update and Invalidation Rules

A future provenance-aware repo-context update must:

1. inspect the targeted source area;
2. update the reusable claim;
3. set `nature` and `source` deliberately;
4. record `verified_at` and `source_revision`;
5. set freshness based on relevant scope; and
6. preserve designated repo-context writer ownership.

Mark knowledge `possibly_stale` when the repository advances but relevance is
not yet known. Mark it `stale` when a relevant module, referenced path,
architecture boundary, policy, or test strategy changes, or when a human
explicitly invalidates it. Do not invalidate all repo-context on every commit.

## Policy Resolver Integration

Provenance is an input to the Step 02 resolver, not a replacement for policy.

- Unknown provenance on a mandatory policy is a resolution finding; the policy
  cannot silently grant a high-impact permission.
- Fresh verified policy may be used normally within its authority.
- Possibly stale navigation knowledge may guide locating files, but stale
  authorization, security, or policy knowledge requires targeted verification.
- Inference may support a recommendation, but not an irreversible architecture
  choice, security boundary, destructive operation, or publication decision.
- If targeted verification cannot resolve a high-impact provenance gap, the
  resolver returns `REQUIRE_APPROVAL` or `DENY` according to Step 02
  precedence and action class.

## Risk-Based Verification

| Use case | Verification expectation |
| --- | --- |
| Low-risk navigation | Possibly stale module/file knowledge may be used as a starting point |
| Normal implementation | Verify affected claims when stale or possibly stale |
| High-risk architecture | Require fresh, scoped facts and explicit decisions |
| Security-sensitive action | Require fresh policy/security evidence with exact scope |
| Destructive operation | Require fresh evidence, applicable policy, and human approval |

Verification cost scales with impact and affected scope, not metadata age alone.

## Migration Strategy

Do not rewrite every V2.3 file immediately:

1. New reusable knowledge and any updated reusable knowledge must use this
   contract.
2. Existing files without metadata are `unknown`/legacy until touched or
   verified; they remain usable for low-risk navigation only.
3. Migrate high-value/high-risk files first: `code-policies.md`,
   `coding_standards.md`, `architecture.md`, `workflow.md`,
   `test_strategy.md`, and `module_map.md`.
4. Migrate `file_index.md`, `codebase-index.md`, and `domain_glossary.md` when
   next refreshed.
5. Do not add metadata to runtime adapters, routes, configuration, or skills
   in this phase.

## Scenario Evaluation

| Scenario | Nature / freshness | Allowed use | Verification required? | Expected behavior |
| --- | --- | --- | --- | --- |
| Current architecture fact | fact / fresh | Normal implementation and navigation | No extra scan | Use within verified scope |
| Old module map; unrelated changes | fact / possibly_stale | Navigation | Before material edits | Verify affected module only |
| Old module map after restructuring | fact / stale | Non-authoritative orientation | Yes | Re-verify before relying on it |
| Inferred service dependency | inference / fresh | Hypothesis or recommendation | Yes for implementation decision | Label inference and inspect source |
| Policy file used for implementation | fact or decision / fresh required | Permission/policy input | Yes if stale or unknown | Do not treat unknown policy as authority |
| Security policy with unknown revision | fact / unknown | No security authorization | Yes | Targeted verification or deny |
| Stale test strategy | fact / stale | Test discovery only | Yes before sign-off | Verify current test commands/coverage |
| Repo-context update after inspection | fact / fresh | Reusable knowledge | Yes, as part of update | Record scope, date, and revision |
| Human-approved architecture decision | decision / fresh within authority | Architecture choice | Confirm decision scope | Use as authoritative decision input |
| External current-best-practice reference | external_reference / possibly_stale | Recommendation | Yes when currentness is material | Record locator/access date and label recommendation |

These scenarios are candidates for later Golden Evaluation; this contract does
not implement evaluation.

## Context-Cost Assessment

The metadata block is five required scalar fields, with at most three optional
fields. Normal agents can classify knowledge as `fresh`, `possibly_stale`,
`stale`, or `unknown` without loading provenance history. Exact evidence is
required only for high-impact claims. This keeps provenance useful for fast
routing while avoiding paragraph-level repetition and repository-wide scans.

## Migration Constraints

This is a non-runtime V3 architecture specification. It does not modify
repo-context files, runtime configuration, adapters, routes, skills,
application source, or the policy resolver.
