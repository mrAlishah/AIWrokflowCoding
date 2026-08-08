# Purpose

Apply only the approved fix, update related memory, and run requested verification.

# Parameters

| Parameter | Required | Description |
|---|---|---|
| PBI_ID | Yes | Target PBI workspace ID. Example: STP-123. |
| RF_ID | Yes | Required RF item or finding ID. Example: RF-001. |
| TARGET_FILES | Yes | Approved fix target files. Example: src/views/Settings/SettingsOverview.vue. |
| VERIFICATION | Yes | Verification request. Example: Run targeted manual verification. Do not run npm lint unless explicitly requested.. |

# Parameter Options

## PBI_ID

| Option | Description |
|---|---|
| Options not documented yet. | The selected skill does not document fixed options. Use the example value or update the skill metadata. |

## RF_ID

| Option | Description |
|---|---|
| Options not documented yet. | The selected skill does not document fixed options. Use the example value or update the skill metadata. |

## TARGET_FILES

| Option | Description |
|---|---|
| Options not documented yet. | The selected skill does not document fixed options. Use the example value or update the skill metadata. |

## VERIFICATION

| Option | Description |
|---|---|
| Options not documented yet. | The selected skill does not document fixed options. Use the example value or update the skill metadata. |

# Required Inputs

- Approved findings or RF item

# Expected Outputs

- Approved target files
- Relevant phase or RF file
- docs/ai/pbi/{PBI_ID}/05-validation.md

# Rules

| Rule | Description |
|---|---|
| Selected Skill Only | Read only the selected skill after START_HERE and the skill index. |
| No Broad Reads | Do not read all docs, all skills, or the whole repository. |
| Markdown Reporting | Report markdown changes with path, action, reason, summary, and future AI context impact. |
| Controlled Source Changes | Source edits are allowed only when the selected skill permits them. |
| Approved Scope Only | Stay inside approved target files. |

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
