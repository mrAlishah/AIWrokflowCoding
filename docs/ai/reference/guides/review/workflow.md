# Review Workflow

## Workflow Overview

Review work follows one selected skill at a time. Use prompts in numbered order only when the task actually needs each step.

## Step By Step Flow

01. `review_workspace_create`: Create the standard review workspace.
02. `review_diff_analysis`: Analyze local branch diff for changed files, behavior, and risks.
03. `review_comments_create`: Create English PR-ready comments and Persian/internal suggestions.
04. `review_followup`: Re-check planned review comments after branch changes.
05. `review_final_handoff`: Summarize final review outcome and decision.

## Skill Sequence

- 01: `review_workspace_create`
- 02: `review_diff_analysis`
- 03: `review_comments_create`
- 04: `review_followup`
- 05: `review_final_handoff`

## Input And Output Per Step

- `review_workspace_create`: inputs: Review request and branch names. outputs: 01-review-brief.md; 02-context.md; 03-diff-analysis.md; 04-en-pr-comments.md; 05-fa-pr-suggestions.md; 06-followup-log.md; 07-handoff.md; 99-metrics.md.
- `review_diff_analysis`: inputs: Existing review workspace and local git diff. outputs: 02-context.md; 03-diff-analysis.md; 99-metrics.md.
- `review_comments_create`: inputs: 03-diff-analysis.md or provided findings. outputs: 04-en-pr-comments.md; 05-fa-pr-suggestions.md; 99-metrics.md.
- `review_followup`: inputs: Existing comments and follow-up diff. outputs: 03-diff-analysis.md; 04-en-pr-comments.md; 05-fa-pr-suggestions.md; 06-followup-log.md; 99-metrics.md.
- `review_final_handoff`: inputs: Review analysis, comments, suggestions, and follow-up log. outputs: 07-handoff.md; 99-metrics.md.

## Stop Conditions

Stop when required parameters are missing, scope is unclear, the selected skill does not allow the requested action, or the task would require broad context expansion without approval.

## Validation Expectations

Follow the selected skill validation requirements and report performed or skipped validation honestly. Review-only workflows must stay local-git-driven and source-read-only.

## Next Step Decision Rules

Use the next numbered prompt only when the previous step completed successfully and the next action is still needed. If the task is blocked, ask for the missing input instead of guessing.
