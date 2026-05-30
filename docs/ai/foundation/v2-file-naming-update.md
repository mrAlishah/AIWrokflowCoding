# V2 File Naming Update

## Summary

Updated V2 documentation and skill instructions so PBI and Review workspace files use the approved numeric-prefix naming. The update preserves file responsibilities and workflow semantics.

## Old Names Replaced

PBI workspace references:

- `implementation-plan.md` -> `02-implementation-plan.md`
- `codebase-index.md` -> `03-codebase-index.md`

Review workspace references:

- `review-brief.md` -> `01-review-brief.md`
- `context.md` -> `02-context.md`
- `diff-analysis.md` -> `03-diff-analysis.md`
- `en-pr-comments.md` -> `04-en-pr-comments.md`
- `fa-pr-suggestions.md` -> `05-fa-pr-suggestions.md`
- `followup-log.md` -> `06-followup-log.md`
- `handoff.md` -> `07-handoff.md`

## New Official PBI Names

```text
docs/ai/pbi/STP-XXXX/
  00-approved-pbi.md
  01-context.md
  02-implementation-plan.md
  03-codebase-index.md
  04-decision_log.md
  05 reserved unused
  06-handoff.md
  phases/
  knowledge/
```

## New Official Review Names

```text
docs/ai/reviews/STP-XXXX/
  01-review-brief.md
  02-context.md
  03-diff-analysis.md
  04-en-pr-comments.md
  05-fa-pr-suggestions.md
  06-followup-log.md
  07-handoff.md
```

## Files Updated

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
- `pbi-plan-create` updates `01-context.md`, `02-implementation-plan.md`, `03-codebase-index.md`, `phases/*.md`, `knowledge/*` if needed, and `04-decision_log.md` if needed.
- `implementation-phase` reads `02-implementation-plan.md`.
- `pbi-final-handoff` updates `06-handoff.md`.
- `review-workspace-create` creates the new Review file names.
- `review-diff-analysis` updates `03-diff-analysis.md`.
- `review-comments-create` updates `04-en-pr-comments.md` and `05-fa-pr-suggestions.md`.
- `review-followup` updates `06-followup-log.md`.
- `review-final-handoff` updates `07-handoff.md`.

## Remaining Risks

`docs/ai/repo-context/codebase-index.md` remains unchanged because it is a repo-context file, not a PBI workspace file.

## Source Code Modified

No

## Ready For Re-validation

Yes
