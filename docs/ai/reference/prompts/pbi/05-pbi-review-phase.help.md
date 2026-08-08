# Purpose

Review implemented PBI work and return findings first without modifying source code.

# Parameters

| Parameter | Required | Description |
|---|---|---|
| PBI_ID | Yes | Target PBI workspace ID. Example: STP-123. |
| PHASE | Yes | Phase under review. Example: phase-01. |
| DIFF_OR_CHANGED_FILES | Yes | Diff summary or changed files. Example: src/views/Settings/SettingsOverview.vue. |
| REVIEW_MODE | Optional | Review strictness. Example: normal. |

# Parameter Options

## PBI_ID

| Option | Description |
|---|---|
| Options not documented yet. | The selected skill does not document fixed options. Use the example value or update the skill metadata. |

## PHASE

| Option | Description |
|---|---|
| Options not documented yet. | The selected skill does not document fixed options. Use the example value or update the skill metadata. |

## DIFF_OR_CHANGED_FILES

| Option | Description |
|---|---|
| Options not documented yet. | The selected skill does not document fixed options. Use the example value or update the skill metadata. |

## REVIEW_MODE

| Option | Description |
|---|---|
| normal | Standard review. |
| strict | Stricter review. |

# Required Inputs

- Implementation diff or changed files

# Expected Outputs

- PBI review notes when needed
- docs/ai/pbi/{PBI_ID}/05-validation.md
- docs/ai/pbi/{PBI_ID}/99-metrics.md

# Rules

| Rule | Description |
|---|---|
| Selected Skill Only | Read only the selected skill after START_HERE and the skill index. |
| No Broad Reads | Do not read all docs, all skills, or the whole repository. |
| Markdown Reporting | Report markdown changes with path, action, reason, summary, and future AI context impact. |
| No Source Changes | Source code modification is prohibited. |
| Local Git Diff Only | Use local git diff and do not call PR APIs. |

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
