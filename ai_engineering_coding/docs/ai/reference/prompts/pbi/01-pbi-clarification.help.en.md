# Purpose

Clarify a raw PBI and block downstream work when critical information is missing.

# Parameters

| Parameter | Required | Description |
|---|---|---|
| STP_ID | Optional | Target PBI ID. Example: STP-123. |
| RAW_PBI | Yes | Raw PBI text. Example: As a user, I need audit-log filters.. |
| REQUESTER | Optional | Requester name. Example: Mostafa. |

# Parameter Options

## STP_ID

| Option | Description |
|---|---|
| Options not documented yet. | The selected skill does not document fixed options. Use the example value or update the skill metadata. |

## RAW_PBI

| Option | Description |
|---|---|
| Options not documented yet. | The selected skill does not document fixed options. Use the example value or update the skill metadata. |

## REQUESTER

| Option | Description |
|---|---|
| Options not documented yet. | The selected skill does not document fixed options. Use the example value or update the skill metadata. |

# Required Inputs

- Raw PBI input

# Expected Outputs

- docs/ai/pbi/{STP_ID}/00-approved-pbi.md
- docs/ai/pbi/{STP_ID}/99-metrics.md
- docs/ai/pbi/metrics.md

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
