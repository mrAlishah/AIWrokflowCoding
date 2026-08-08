# Purpose

Execute exactly one approved phase, modify only approved target files, and update phase memory.

# Parameters

| Parameter | Required | Description |
|---|---|---|
| STP_ID | Yes | Target PBI workspace ID. Example: STP-123. |
| PHASE | Yes | Selected phase. Example: phase-01. |
| TARGET_FILES | Yes | Approved target files. Example: src/views/Settings/SettingsOverview.vue. |
| VERIFICATION | Yes | Verification request. Example: Run targeted manual verification. Do not run npm lint unless explicitly requested.. |

# Parameter Options

## STP_ID

| Option | Description |
|---|---|
| Options not documented yet. | The selected skill does not document fixed options. Use the example value or update the skill metadata. |

## PHASE

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

- 02-implementation-plan.md
- Selected phase file

# Expected Outputs

- Approved target files
- docs/ai/pbi/{STP_ID}/phases/{PHASE}.md
- docs/ai/pbi/{STP_ID}/05-validation.md

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
