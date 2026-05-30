# V2 Governance Corrections

## Summary

Applied the required governance corrections from the latest V2 validation checklist. The corrections strengthen knowledge separation, PBI workspace semantics, markdown change reporting, context read order, extra file justification, comment quality, simplicity rules, and review workflow details.

## Files Updated

- `docs/ai/README.md`
- `docs/ai/foundation/v2-approved-baseline.md`
- `docs/ai/pbi/README.md`
- `docs/ai/reviews/README.md`
- `docs/ai/skills/README.md`
- `docs/ai/skills/common-skill-rules.md`
- `docs/ai/skills/repo-context-update.skill.md`
- `docs/ai/skills/pbi-workspace-create.skill.md`
- `docs/ai/skills/pbi-plan-create.skill.md`
- `docs/ai/skills/implementation-phase.skill.md`
- `docs/ai/skills/review-phase.skill.md`
- `docs/ai/skills/fix-phase.skill.md`
- `docs/ai/skills/pbi-final-handoff.skill.md`
- `docs/ai/skills/review-workspace-create.skill.md`
- `docs/ai/skills/review-diff-analysis.skill.md`
- `docs/ai/skills/review-comments-create.skill.md`
- `docs/ai/skills/review-followup.skill.md`
- `docs/ai/skills/review-final-handoff.skill.md`

## Corrections Applied

- Added the explicit V2 knowledge separation rule:
  `Repository Knowledge != PBI Knowledge != Review Knowledge != Execution Memory != Architecture Decisions`.
- Defined Repository Knowledge, PBI Knowledge, Review Knowledge, Execution Memory, and Architecture Decisions.
- Strengthened PBI workspace rules for `01-context.md`, `implementation-plan.md`, `codebase-index.md`, `knowledge/`, and `04_decision_log.md`.
- Added the exact markdown change reporting template to all official skills and central docs.
- Added common skill rules in `docs/ai/skills/common-skill-rules.md` and referenced them from the skills index.
- Added context read order and extra file justification rules to central docs and relevant skills.
- Expanded comment quality and simplicity rules for implementation, review, and fix skills.
- Strengthened review diff analysis requirements for changed files, affected modules, affected layers, risks, behavior changes, test impact, missing tests, deeper-review files, and safe-to-ignore files.
- Strengthened review comment output requirements for English PR-ready comments and Persian deep suggestions linked by `PR.No`.
- Strengthened review follow-up status rules for `Planned`, `Done`, and `Ignore`.
- Strengthened review final handoff requirements for final decision, blocking issues, non-blocking issues, resolved issues, ignored issues, remaining risks, next action, and ready-to-merge status.

## Remaining Gaps

None known from the latest correction prompt.

## Source Code Modified

No

## Ready For Re-validation

Yes

