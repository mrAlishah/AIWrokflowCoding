# Purpose

Refresh stable reusable repo-context knowledge for listed repository areas only.

# Parameters

| Parameter        | Required | Description                                                                                                 |
| ---------------- | -------- | ----------------------------------------------------------------------------------------------------------- |
| UPDATE_REASON    | Yes      | Reason for updating repo-context. Example: Document stable routing changes after settings workflow update.. |
| REPOSITORY_AREAS | Yes      | Repository areas to inspect. Example: settings module and audit-log workflow.                               |
| INSPECTION_SCOPE | Optional | Inspection scope. Example: targeted.                                                                        |

# Parameter Options

## UPDATE_REASON

| Option                      | Description                                                                                             |
| --------------------------- | ------------------------------------------------------------------------------------------------------- |
| Options not documented yet. | The selected skill does not document fixed options. Use the example value or update the skill metadata. |

## REPOSITORY_AREAS

| Option                      | Description                                                                                             |
| --------------------------- | ------------------------------------------------------------------------------------------------------- |
| Options not documented yet. | The selected skill does not document fixed options. Use the example value or update the skill metadata. |

## INSPECTION_SCOPE

| Option   | Description                                       |
| -------- | ------------------------------------------------- |
| targeted | Inspect only listed areas.                        |
| standard | Inspect listed areas plus directly related files. |

# Required Inputs

- Existing repo-context
- Targeted repository files when needed

# Expected Outputs

- docs/ai/repo-context/\*
- docs/ai/repo-context/policy/\* when relevant

# Rules

| Rule                | Description                                                                               |
| ------------------- | ----------------------------------------------------------------------------------------- |
| No Source Changes   | Source code modification is prohibited.                                                   |
| No Workflow Changes | Runtime workflow behavior must remain unchanged.                                          |
| Targeted Context    | Read only the selected skill and required docs or targeted files.                         |
| Markdown Reporting  | Report markdown changes with path, action, reason, summary, and future AI context impact. |

# Common Mistakes

- Using a tools prompt to change runtime workflow behavior.
- Reading the whole repository without a targeted reason.
- Leaving sample IDs unchanged.
- Removing compatibility mappings.

# Token Optimization Tips

- Use short prompts for routine checks.
- Use full deep health checks only after AI OS changes.
- Keep reports and reference material outside daily runtime.
- Use targeted inspection scopes.
