# Purpose

Inspect follow-up diff, mark planned comments done only when confirmed, and keep unresolved comments planned.

# Parameters

| Parameter | Required | Description |
|---|---|---|
| STP_ID | Yes | Review workspace ID. Example: STP-123. |
| BASE_BRANCH | Yes | Base branch for follow-up diff. Example: main. |
| CURRENT_HEAD | Optional | Current head ref. Example: HEAD. |
| FOLLOWUP_DIFF | Optional | Follow-up diff source. Example: Use local git diff main...HEAD.. |

# Parameter Options

## STP_ID

| Option | Description |
|---|---|
| Options not documented yet. | The selected skill does not document fixed options. Use the example value or update the skill metadata. |

## BASE_BRANCH

| Option | Description |
|---|---|
| Options not documented yet. | The selected skill does not document fixed options. Use the example value or update the skill metadata. |

## CURRENT_HEAD

| Option | Description |
|---|---|
| Options not documented yet. | The selected skill does not document fixed options. Use the example value or update the skill metadata. |

## FOLLOWUP_DIFF

| Option | Description |
|---|---|
| Options not documented yet. | The selected skill does not document fixed options. Use the example value or update the skill metadata. |

# Required Inputs

- Existing comments
- Follow-up diff

# Expected Outputs

- docs/ai/reviews/{STP_ID}/04-en-pr-comments.md
- docs/ai/reviews/{STP_ID}/05-fa-pr-suggestions.md
- docs/ai/reviews/{STP_ID}/06-followup-log.md

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
