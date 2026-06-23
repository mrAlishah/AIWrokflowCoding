# Skill: review_workspace_create

## Purpose

Create the standard review workspace for local PR/code review.

## Parameters

- `STP_ID`: required
- `BASE_BRANCH`: required
- `HEAD_BRANCH`: required or current branch
- `REVIEW_SCOPE`: required

## Read

- User-provided review request
- Current branch name when needed

## Steps

1. Confirm `STP_ID`.
2. Create workspace placeholders.
3. Record base branch, head branch, and review scope.
4. Initialize review metrics.

## Update

- `01-review-brief.md`
- `02-context.md`
- `03-diff-analysis.md`
- `04-en-pr-comments.md`
- `05-fa-pr-suggestions.md`
- `06-followup-log.md`
- `07-handoff.md`
- `99-metrics.md`
- `docs/ai/reviews/metrics.md`

## Stop Conditions

- Invalid `STP_ID`.
- The request requires source modification, PR API calls, PR creation, pushing commits, or repo-context updates.

## Final Output

- Summary
- Workspace path
- Files created or updated
- Markdown Files Changed
- Metrics Updated: Yes / No / Not Applicable; if No, include reason.
- Recommended next skill

## References

Follow canonical governance and policy:

- `docs/ai/skills/governance/common-rules.md`
- `docs/ai/skills/governance/read-order.md`
- `docs/ai/skills/governance/markdown-change-reporting.md`
- `docs/ai/skills/governance/skill-template.md`
- `docs/ai/repo-context/policy/context_budget.md`
