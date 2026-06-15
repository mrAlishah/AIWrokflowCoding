# Skills Index

Routing index for approved execution protocols.

Read this file to select one skill. Then read only the selected skill file.

Global rules currently live in `docs/ai/governance/`.

Future target structure:

```text
docs/ai/skills/governance/
docs/ai/skills/pbi/
docs/ai/skills/review/
docs/ai/skills/pr/
docs/ai/skills/tools/
```

Compatibility note:

Existing flat skill files and existing skill names remain callable during this migration phase. Do not read the target folders by default.

## Repository

| Task | Skill |
| --- | --- |
| Refresh reusable repo knowledge | `repo-context-update` |
| Audit `docs/ai` cleanup or context cost | `docs-ai-cleanup-audit` |

## PBI Workflow

| Task | Skill |
| --- | --- |
| Clarify raw PBI | `pbi-clarification` |
| Create PBI workspace | `pbi-workspace-create` |
| Create implementation plan | `pbi-plan-create` |
| Sync user answer or policy | `policy-plan-update` |
| Execute one phase | `implementation-phase` |
| Review PBI implementation | `review-phase` |
| Fix approved findings | `fix-phase` |
| Analyze human PR feedback | `review-feedback-analysis` |
| Final PBI handoff | `pbi-final-handoff` |

## Review Workflow

Use `pr-review-workflow` for daily end-to-end local PR/code review.

| Task | Skill |
| --- | --- |
| Daily full review | `pr-review-workflow` |
| Create review workspace only | `review-workspace-create` |
| Analyze local diff | `review-diff-analysis` |
| Create comments and suggestions | `review-comments-create` |
| Follow up on review updates | `review-followup` |
| Final review handoff | `review-final-handoff` |

## Do Not Read By Default

Do not read all skills. Read only the selected skill file.

Do not read `docs/ai/foundation/**` as daily runtime context.
