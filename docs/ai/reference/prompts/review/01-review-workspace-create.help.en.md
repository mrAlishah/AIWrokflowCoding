# Purpose

Create the standard review workspace placeholders and initialize review metrics.

# Parameters

| Parameter | Required | Description |
|---|---|---|
| STP_ID | Yes | Review workspace ID. Example: STP-123. |
| BASE_BRANCH | Yes | Base branch. Example: main. |
| HEAD_BRANCH | Yes | Head branch under review. Example: feature/audit-log-filters. |
| REVIEW_SCOPE | Yes | Review scope. Example: full. |

# Parameter Options

## STP_ID

| Option | Description |
|---|---|
| Options not documented yet. | The selected skill does not document fixed options. Use the example value or update the skill metadata. |

## BASE_BRANCH

| Option | Description |
|---|---|
| Options not documented yet. | The selected skill does not document fixed options. Use the example value or update the skill metadata. |

## HEAD_BRANCH

| Option | Description |
|---|---|
| Options not documented yet. | The selected skill does not document fixed options. Use the example value or update the skill metadata. |

## REVIEW_SCOPE

| Option | Description |
|---|---|
| full | Review all changed areas. |
| backend-only | Review backend changes only. |
| frontend-only | Review frontend changes only. |
| tests-only | Review tests only. |
| security-sensitive | Security-sensitive review. |
| architecture-sensitive | Architecture-sensitive review. |

# Required Inputs

- Review request
- Branch names

# Expected Outputs

- docs/ai/reviews/{STP_ID}/01-review-brief.md
- docs/ai/reviews/{STP_ID}/02-context.md
- docs/ai/reviews/{STP_ID}/99-metrics.md

# Rules

| Rule | Description |
|---|---|
| No Source Changes | Source code modification is prohibited. |
| Local Git Diff Only | Use local git diff only. |
| No PR APIs | Do not call external PR APIs, create pull requests, or push commits. |
| Local Context Only | Read only required workspace, diff, and changed files. |
| Markdown Reporting | Report markdown changes with path, action, reason, summary, and future AI context impact. |

# Common Mistakes

- Running review against the wrong branch.
- Asking the agent to modify source code.
- Calling PR APIs instead of using local diff.
- Leaving sample IDs unchanged.

# Token Optimization Tips

- Use the short prompt for routine review work.
- Read only the selected skill and review workspace.
- Inspect changed files only when needed for review quality.
- Avoid broad repository reads.
