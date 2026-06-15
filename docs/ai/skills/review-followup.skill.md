# Skill: review-followup

## Purpose

Re-check planned review comments after the reviewed branch changes.

## Parameters

- `STP_ID`: required
- `BASE_BRANCH`: required
- `CURRENT_HEAD`: optional
- `FOLLOWUP_DIFF`: optional when local git diff is available

## Read

- `04-en-pr-comments.md`
- `05-fa-pr-suggestions.md`
- `06-followup-log.md`
- Local git diff: `git diff {BASE_BRANCH}...HEAD`
- Source files needed to verify `Planned` comments

## Steps

1. Identify comments with status `Planned`.
2. Inspect the follow-up diff.
3. Mark fixed comments `Done` only when confirmed.
4. Keep unresolved comments `Planned`.
5. Add follow-up comments only when needed.

## Update

- `03-diff-analysis.md` when follow-up analysis must be recorded
- `04-en-pr-comments.md`
- `05-fa-pr-suggestions.md`
- `06-followup-log.md`
- `99-metrics.md`
- `docs/ai/reviews/metrics.md`

## Stop Conditions

- Follow-up diff is unavailable.
- Existing comments are missing or malformed.
- The task requires source modification, PR API calls, PR creation, or pushing commits.

## Final Output

- Summary
- Done items
- Remaining planned items
- Follow-up comments
- Markdown Files Changed
- Recommended next action

## References

Follow:
- `docs/ai/skills/governance/common-rules.md`
- `docs/ai/skills/governance/read-order.md`
- `docs/ai/skills/governance/markdown-change-reporting.md`
- `docs/ai/skills/governance/observability.md`
