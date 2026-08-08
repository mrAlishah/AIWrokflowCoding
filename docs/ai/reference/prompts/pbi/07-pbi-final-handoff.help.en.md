# Purpose

Create final handoff after implementation, review, fixes, and validation are complete.

# Parameters

| Parameter | Required | Description |
|---|---|---|
| STP_ID | Yes | Target PBI workspace ID. Example: STP-123. |
| CHANGED_FILES | Yes | Final changed files. Example: src/views/Settings/SettingsOverview.vue. |
| VALIDATION_RESULTS | Yes | Validation results. Example: Manual verification completed.. |
| KNOWN_RISKS | Optional | Residual risks. Example: No known runtime risks.. |
| PR_SUMMARY | Yes | PR-ready summary. Example: Adds audit-log filters.. |
| REVIEW_FOCUS | Yes | Reviewer focus. Example: Verify filter behavior.. |

# Parameter Options

## STP_ID

| Option | Description |
|---|---|
| Options not documented yet. | The selected skill does not document fixed options. Use the example value or update the skill metadata. |

## CHANGED_FILES

| Option | Description |
|---|---|
| Options not documented yet. | The selected skill does not document fixed options. Use the example value or update the skill metadata. |

## VALIDATION_RESULTS

| Option | Description |
|---|---|
| Options not documented yet. | The selected skill does not document fixed options. Use the example value or update the skill metadata. |

## KNOWN_RISKS

| Option | Description |
|---|---|
| Options not documented yet. | The selected skill does not document fixed options. Use the example value or update the skill metadata. |

## PR_SUMMARY

| Option | Description |
|---|---|
| Options not documented yet. | The selected skill does not document fixed options. Use the example value or update the skill metadata. |

## REVIEW_FOCUS

| Option | Description |
|---|---|
| Options not documented yet. | The selected skill does not document fixed options. Use the example value or update the skill metadata. |

# Required Inputs

- Completed workspace and final diff summary

# Expected Outputs

- docs/ai/pbi/{STP_ID}/06-handoff.md
- docs/ai/pbi/{STP_ID}/99-metrics.md

# Rules

| Rule | Description |
|---|---|
| Selected Skill Only | Read only the selected skill after START_HERE and the skill index. |
| No Broad Reads | Do not read all docs, all skills, or the whole repository. |
| Markdown Reporting | Report markdown changes with path, action, reason, summary, and future AI context impact. |
| No Source Changes | Source code modification is prohibited. |

# Common Mistakes

- Leaving sample IDs unchanged.
- Running multiple skills in one prompt.
- Using old invocation names.
- Asking for broad context reads without a reason.

# Token Optimization Tips

- Use the short prompt for routine work.
- Keep parameter values specific and concise.
- Read only the selected skill and active workspace.
- Use repo-context only when needed.
