# Purpose

Classify tagged user input and update only related planning, RF, or approved policy files.

# Parameters

| Parameter | Required | Description |
|---|---|---|
| SCOPE | Yes | Update scope. Example: pbi. |
| STP_ID | Yes | Workspace ID for workspace updates. Example: STP-123. |
| INPUT_TAG | Yes | Type of user input. Example: USER_REVIEW_FEEDBACK. |
| UPDATE_MODE | Optional | How to apply tagged input. Example: apply-workspace-update. |
| USER_INPUT | Yes | Tagged user input. Example: Mark RF-001 as Required and keep RF-002 as Proposed.. |

# Parameter Options

## SCOPE

| Option | Description |
|---|---|
| pbi | Update PBI planning or RF files. |
| review | Update review planning files. |
| repo-context | Update repo-context related planning. |
| global | Apply approved global policy update. |

## STP_ID

| Option | Description |
|---|---|
| Options not documented yet. | The selected skill does not document fixed options. Use the example value or update the skill metadata. |

## INPUT_TAG

| Option | Description |
|---|---|
| USER_REVIEW_FEEDBACK | Human review feedback or RF status change. |
| USER_CODE_POLICY | Approved code policy input. |

## UPDATE_MODE

| Option | Description |
|---|---|
| apply-workspace-update | Apply to related workspace files. |
| apply-global-rule | Apply approved global policy rule. |

## USER_INPUT

| Option | Description |
|---|---|
| Options not documented yet. | The selected skill does not document fixed options. Use the example value or update the skill metadata. |

# Required Inputs

- Active workspace, RF files, or policy files depending on scope

# Expected Outputs

- Related PBI planning files
- Related review feedback files
- docs/ai/repo-context/policy/code-policies.md when SCOPE is global

# Rules

| Rule | Description |
|---|---|
| No Source Changes | Source code modification is prohibited. |
| No Workflow Changes | Runtime workflow behavior must remain unchanged. |
| Targeted Context | Read only the selected skill and required docs or targeted files. |
| Markdown Reporting | Report markdown changes with path, action, reason, summary, and future AI context impact. |

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
