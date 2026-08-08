# Purpose

Summarize final review state, issue categories, final decision, validation, and residual risk.

# Parameters

| Parameter | Required | Description |
|---|---|---|
| STP_ID | Yes | Review workspace ID. Example: STP-123. |
| FINAL_STATUS | Yes | Final review status. Example: needs-followup. |
| REMAINING_RISKS | Optional | Residual risks. Example: No known remaining risks.. |
| VALIDATION_PERFORMED | Yes | Validation performed. Example: Local diff review completed.. |
| RECOMMENDED_DECISION | Yes | Recommended decision. Example: needs-followup. |

# Parameter Options

## STP_ID

| Option | Description |
|---|---|
| Options not documented yet. | The selected skill does not document fixed options. Use the example value or update the skill metadata. |

## FINAL_STATUS

| Option | Description |
|---|---|
| ready | Ready to proceed. |
| needs-followup | Needs follow-up. |
| blocked | Blocked. |

## REMAINING_RISKS

| Option | Description |
|---|---|
| Options not documented yet. | The selected skill does not document fixed options. Use the example value or update the skill metadata. |

## VALIDATION_PERFORMED

| Option | Description |
|---|---|
| Options not documented yet. | The selected skill does not document fixed options. Use the example value or update the skill metadata. |

## RECOMMENDED_DECISION

| Option | Description |
|---|---|
| ready | Ready to proceed. |
| needs-followup | Needs follow-up. |
| blocked | Blocked. |

# Required Inputs

- Review analysis
- Comments and suggestions
- Follow-up log

# Expected Outputs

- docs/ai/reviews/{STP_ID}/07-handoff.md
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
