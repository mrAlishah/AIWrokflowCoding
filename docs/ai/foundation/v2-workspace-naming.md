# V2 Workspace Naming

## Summary

This document records the current official V2 workspace names.

Use only the names listed here for active PBI and review workflow files.

## Official PBI Names

```text
docs/ai/pbi/STP-XXXX/
  00-approved-pbi.md
  01-context.md
  02-implementation-plan.md
  03-codebase-index.md
  04-decision_log.md
  05-validation.md
  06-handoff.md
  99-metrics.md
  phases/
  knowledge/
```

## Official Review Names

```text
docs/ai/reviews/STP-XXXX/
  01-review-brief.md
  02-context.md
  03-diff-analysis.md
  04-en-pr-comments.md
  05-fa-pr-suggestions.md
  06-followup-log.md
  07-handoff.md
  99-metrics.md
```

## Runtime Files That Must Match This Naming

- `docs/ai/foundation/v2-approved-baseline.md`
- `docs/ai/foundation/v2-validation-checklist.md`
- `docs/ai/foundation/v2-governance-corrections.md`
- `docs/ai/pbi/README.md`
- `docs/ai/reviews/README.md`
- `docs/ai/skills/pbi-workspace-create.skill.md`
- `docs/ai/skills/pbi-plan-create.skill.md`
- `docs/ai/skills/implementation-phase.skill.md`
- `docs/ai/skills/pbi-final-handoff.skill.md`
- `docs/ai/skills/review-workspace-create.skill.md`
- `docs/ai/skills/review-diff-analysis.skill.md`
- `docs/ai/skills/review-comments-create.skill.md`
- `docs/ai/skills/review-followup.skill.md`
- `docs/ai/skills/review-final-handoff.skill.md`

## Validation Result

Passed.

- `pbi-workspace-create` creates the new PBI file names.
- `pbi-clarification` creates or updates `00-approved-pbi.md`.
- `pbi-workspace-create` creates `05-validation.md`.
- `pbi-workspace-create` creates `99-metrics.md`.
- `pbi-plan-create` updates `01-context.md`, `02-implementation-plan.md`, `03-codebase-index.md`, `05-validation.md`, `phases/*.md`, `knowledge/*` if needed, and `04-decision_log.md` if needed.
- `implementation-phase` reads and updates `05-validation.md` as validation knowledge changes.
- `review-phase` reads and updates `05-validation.md` with review validation gaps.
- `fix-phase` reads and updates `05-validation.md` when fixes change validation needs.
- `pbi-final-handoff` reads `05-validation.md` and updates `06-handoff.md`.
- `review-workspace-create` creates the new Review file names.
- Operational PBI skills append to `99-metrics.md` and update `docs/ai/pbi/metrics.md`.
- Operational review skills append to `99-metrics.md` and update `docs/ai/reviews/metrics.md`.
- `review-diff-analysis` updates `03-diff-analysis.md`.
- `review-comments-create` updates `04-en-pr-comments.md` and `05-fa-pr-suggestions.md`.
- `review-followup` updates `06-followup-log.md`.
- `review-final-handoff` updates `07-handoff.md`.

## Remaining Risks

`docs/ai/repo-context/codebase-index.md` remains valid because it is a repo-context file, not a PBI workspace file.

## Source Code Modified

No

## Ready For Re-validation

Yes
