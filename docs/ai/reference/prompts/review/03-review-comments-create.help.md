# Purpose

Convert supported findings into English PR-ready comments and Persian/internal suggestions without inventing findings.

# Parameters

| Parameter | Required | Description |
|---|---|---|
| STP_ID | Yes | Review workspace ID. Example: STP-123. |
| FINDINGS | Yes | Supported findings. Example: Use findings from docs/ai/reviews/STP-123/03-diff-analysis.md.. |
| SEVERITY | Optional | Severity filter. Example: important-only. |

# Parameter Options

## STP_ID

| Option | Description |
|---|---|
| Options not documented yet. | The selected skill does not document fixed options. Use the example value or update the skill metadata. |

## FINDINGS

| Option | Description |
|---|---|
| Options not documented yet. | The selected skill does not document fixed options. Use the example value or update the skill metadata. |

## SEVERITY

| Option | Description |
|---|---|
| important-only | Only important findings. |
| all-supported | All supported findings. |

# Required Inputs

- 03-diff-analysis.md or provided findings

# Expected Outputs

- docs/ai/reviews/{STP_ID}/04-en-pr-comments.md
- docs/ai/reviews/{STP_ID}/05-fa-pr-suggestions.md
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
