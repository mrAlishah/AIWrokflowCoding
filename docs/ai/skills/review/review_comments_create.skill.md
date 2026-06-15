# Skill: review_comments_create

## Purpose

Create English PR-ready comments and Persian/internal suggestions from local diff analysis.

## Parameters

- `STP_ID`: required
- `FINDINGS`: required or read from `03-diff-analysis.md`
- `SEVERITY`: optional per finding

## Read

- `03-diff-analysis.md`
- Source snippets referenced by findings only when needed

## Steps

1. Convert supported findings into concise English PR-ready comments.
2. Create Persian/internal suggestions with deeper reasoning.
3. Link English and Persian items by `PR.No`.
4. Use only supported findings; do not invent findings.

## Update

- `04-en-pr-comments.md`
- `05-fa-pr-suggestions.md`
- `99-metrics.md`
- `docs/ai/reviews/metrics.md`

## Stop Conditions

- Diff analysis is missing.
- Findings are unsupported by the diff.
- The task requires source modification, PR API calls, PR creation, or pushing commits.

## Final Output

- Summary
- PR comments location
- Internal suggestions location
- Markdown Files Changed
- Recommended next skill

## References

Follow:
- `docs/ai/skills/governance/common-rules.md`
- `docs/ai/skills/governance/read-order.md`
- `docs/ai/skills/governance/markdown-change-reporting.md`
- `docs/ai/skills/governance/observability.md`
