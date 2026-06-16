# PR Review Help Index

## Guide Files

- `user-guide.md`: explains who should use this area and how to start.
- `workflow.md`: explains the step sequence and decision rules.
- `help-index.md`: maps guides, prompts, skills, and outputs.

## Prompt Folder

Prompts live in `docs/ai/reference/prompts/pr/`. They are paste-ready templates, not runtime instructions.

## Prompt Files

- `01-pr-review-workflow.prompt.md`: full prompt for `pr_review_workflow`.
- `01-pr-review-workflow-short.prompt.md`: short daily prompt for `pr_review_workflow`.
- `01-pr-review-workflow.help.md`: parameter and usage help for `pr_review_workflow`.

## Related Skill Names

- `pr_review_workflow`

## Expected Output Locations

- 01-review-brief.md
- 03-diff-analysis.md
- 04-en-pr-comments.md
- 05-fa-pr-suggestions.md
- 07-handoff.md
- 99-metrics.md

## Which Prompt To Use In Which Situation

Use the full prompt for first-time or careful execution. Use the short prompt for routine execution when parameters are already known.

## Not Available / Not Created

- pr_review_workspace_create
- pr_local_diff_analysis
- pr_review_findings
- pr_review_comments
- pr_review_suggestions
- pr_review_followup
- pr_review_final_handoff
