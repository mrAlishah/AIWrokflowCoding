# Skill: pr_review_workflow

## Purpose

Recommended daily-use entrypoint for end-to-end local PR/code review.

## Parameters

- `STP_ID`: required
- `BASE_BRANCH`: required
- `CURRENT_BRANCH`: optional, default auto
- `REVIEW_SCOPE`: required; `full`, `backend-only`, `frontend-only`, `tests-only`, `security-sensitive`, `architecture-sensitive`
- `REVIEW_MODE`: optional, default `strict`
- `COMMENT_LEVEL`: optional, default `important-only`
- `COMMENT_STYLE`: optional, default `collaborative`
- `SUGGESTION_DEPTH`: optional, default `normal`
- `FINAL_DECISION`: optional, default `needs-followup`

## Read

- Local git diff: `git diff --name-only {BASE_BRANCH}...HEAD`
- Local git diff: `git diff {BASE_BRANCH}...HEAD`
- Active review workspace, if it exists
- Changed files and repo-context only when needed for review quality

## Steps

1. Create or verify review workspace.
2. Analyze local git diff.
3. Generate structured review findings.
4. Generate English PR-ready comments.
5. Generate Persian/internal suggestions.
6. Generate final review handoff.
7. Update metrics.

## Update

- `docs/ai/reviews/{STP_ID}/01-review-brief.md`
- `docs/ai/reviews/{STP_ID}/02-context.md`
- `docs/ai/reviews/{STP_ID}/03-diff-analysis.md`
- `docs/ai/reviews/{STP_ID}/04-en-pr-comments.md`
- `docs/ai/reviews/{STP_ID}/05-fa-pr-suggestions.md`
- `docs/ai/reviews/{STP_ID}/07-handoff.md`
- `docs/ai/reviews/{STP_ID}/99-metrics.md`
- `docs/ai/reviews/metrics.md`

## Stop Conditions

- The user has not checked out the review branch.
- `STP_ID`, `BASE_BRANCH`, or `REVIEW_SCOPE` is missing or invalid.
- Local git diff is unavailable.
- The task requires source modification, PR API calls, PR creation, or pushing commits.

## Final Output

Use the required review workflow sections: Summary, Review Workspace, Diff Analyzed, Findings Summary, PR Comments Location, Internal Suggestions Location, Final Decision, Markdown Files Changed, Metrics Updated, Usage Summary, and Recommended Next Action.

When enabled by runtime config, `Metrics Updated` must be `Yes`, `No - <reason>`, or `Not Applicable - <reason>`.

## References

Follow canonical governance and policy:

- `docs/ai/skills/governance/common-rules.md`
- `docs/ai/skills/governance/read-order.md`
- `docs/ai/skills/governance/markdown-change-reporting.md`
- `docs/ai/skills/governance/skill-template.md`
- `docs/ai/repo-context/policy/context_budget.md`
