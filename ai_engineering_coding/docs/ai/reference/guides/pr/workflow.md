# PR Review Workflow

## Workflow Overview

PR Review work follows one selected skill at a time. Use prompts in numbered order only when the task actually needs each step.

## Step By Step Flow

01. `pr_review_workflow`: Run the daily full local PR/code review workflow.

## Skill Sequence

- 01: `pr_review_workflow`

## Input And Output Per Step

- `pr_review_workflow`: inputs: Checked-out review branch and local git diff. outputs: 01-review-brief.md; 03-diff-analysis.md; 04-en-pr-comments.md; 05-fa-pr-suggestions.md; 07-handoff.md; 99-metrics.md.

## Stop Conditions

Stop when required parameters are missing, scope is unclear, the selected skill does not allow the requested action, or the task would require broad context expansion without approval.

## Validation Expectations

Follow the selected skill validation requirements and report performed or skipped validation honestly. Review-only workflows must stay local-git-driven and source-read-only.

## Next Step Decision Rules

Use the next numbered prompt only when the previous step completed successfully and the next action is still needed. If the task is blocked, ask for the missing input instead of guessing.
