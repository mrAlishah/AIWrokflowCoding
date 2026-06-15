# Skill: review-diff-analysis

## Purpose

Analyze a local branch diff for changed files, behavior changes, and review risks.

## Parameters

- `STP_ID`: required
- `BASE_BRANCH`: required
- `HEAD`: optional, default current branch
- `REVIEW_SCOPE`: required

## Read

- `docs/ai/reviews/{STP_ID}/01-review-brief.md`
- Local git diff: `git diff --name-only {BASE_BRANCH}...HEAD`
- Local git diff: `git diff {BASE_BRANCH}...HEAD`
- Changed files only when needed for review quality

## Steps

1. Confirm review workspace exists.
2. Inspect local git diff.
3. Identify changed files, affected modules, behavior changes, risks, validation gaps, and files needing deeper review.
4. Keep analysis concise and actionable.

## Update

- `02-context.md` when assumptions or local diff context must be durable
- `03-diff-analysis.md`
- `99-metrics.md`
- `docs/ai/reviews/metrics.md`

## Stop Conditions

- Review workspace or local diff is unavailable.
- The task requires source modification, PR API calls, PR creation, or pushing commits.
- Extra files are required but cannot be justified.

## Final Output

- Summary
- Changed files
- Key risks
- Files needing deeper review
- Markdown Files Changed
- Recommended next skill

## References

Follow:
- `docs/ai/skills/governance/common-rules.md`
- `docs/ai/skills/governance/read-order.md`
- `docs/ai/skills/governance/markdown-change-reporting.md`
- `docs/ai/skills/governance/observability.md`
