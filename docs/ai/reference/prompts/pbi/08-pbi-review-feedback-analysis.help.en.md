# Purpose

Analyze human feedback, group overlapping comments, and create RF items without fixing code.

# Parameters

| Parameter | Required | Description |
|---|---|---|
| PBI_ID | Yes | Target PBI workspace ID. Example: STP-123. |
| INPUT_MODE | Optional | Feedback source. Example: prompt. |
| REVIEW_FEEDBACK | Yes | Human feedback text. Example: Reviewer asked to extract filter options into a helper.. |
| SOURCE_LABEL | Optional | Traceability label. Example: PR review. |
| ANALYSIS_DEPTH | Optional | Analysis depth. Example: standard. |
| DEFAULT_STATUS | Optional | Initial RF status. Example: Proposed. |

# Parameter Options

## PBI_ID

| Option | Description |
|---|---|
| Options not documented yet. | The selected skill does not document fixed options. Use the example value or update the skill metadata. |

## INPUT_MODE

| Option | Description |
|---|---|
| prompt | Feedback is pasted in REVIEW_FEEDBACK. |
| file | Feedback comes from a file. |
| existing-review-feedback | Use existing workspace feedback. |

## REVIEW_FEEDBACK

| Option | Description |
|---|---|
| Options not documented yet. | The selected skill does not document fixed options. Use the example value or update the skill metadata. |

## SOURCE_LABEL

| Option | Description |
|---|---|
| Options not documented yet. | The selected skill does not document fixed options. Use the example value or update the skill metadata. |

## ANALYSIS_DEPTH

| Option | Description |
|---|---|
| standard | Normal analysis. |
| deep | Deeper duplicate grouping. |

## DEFAULT_STATUS

| Option | Description |
|---|---|
| Proposed | Default new RF status. |
| Required | Explicitly required. |
| Ignored | Explicitly ignored. |
| Done | Already done. |
| Blocked | Cannot proceed. |

# Required Inputs

- Existing PBI workspace
- Human feedback

# Expected Outputs

- docs/ai/pbi/{PBI_ID}/phases/review-feedback.md
- docs/ai/pbi/{PBI_ID}/phases/RF-*.md
- docs/ai/pbi/{PBI_ID}/99-metrics.md

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
