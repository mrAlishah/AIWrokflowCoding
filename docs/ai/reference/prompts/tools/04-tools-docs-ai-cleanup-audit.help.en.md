# Purpose

Audit the target docs/ai area for cleanup and context-cost risks without changing active workflow behavior.

# Parameters

| Parameter | Required | Description |
|---|---|---|
| CLEANUP_SCOPE | Yes | Docs area to audit. Example: docs/ai/reference. |
| CLEANUP_MODE | Yes | Cleanup mode. Example: audit-only. |
| TARGET_AREA | Yes | Target area inside cleanup scope. Example: prompts. |
| MAX_INSPECTION_DEPTH | Optional | Inspection depth. Example: standard. |
| INCLUDE_DONE_WORKSPACES | Optional | Whether to inspect completed workspaces. Example: false. |
| OUTPUT_MODE | Yes | Output mode. Example: report. |
| ALLOW_MARKDOWN_UPDATES | Optional | Whether markdown updates are allowed. Example: false. |

# Parameter Options

## CLEANUP_SCOPE

| Option | Description |
|---|---|
| Options not documented yet. | The selected skill does not document fixed options. Use the example value or update the skill metadata. |

## CLEANUP_MODE

| Option | Description |
|---|---|
| audit-only | Only audit and report findings. |

## TARGET_AREA

| Option | Description |
|---|---|
| Options not documented yet. | The selected skill does not document fixed options. Use the example value or update the skill metadata. |

## MAX_INSPECTION_DEPTH

| Option | Description |
|---|---|
| standard | Normal targeted inspection. |
| deep | More detailed inspection. |

## INCLUDE_DONE_WORKSPACES

| Option | Description |
|---|---|
| true | Enabled. |
| false | Disabled. |

## OUTPUT_MODE

| Option | Description |
|---|---|
| report | Write an audit report. |
| plan | Write a cleanup plan. |

## ALLOW_MARKDOWN_UPDATES

| Option | Description |
|---|---|
| true | Enabled. |
| false | Disabled. |

# Required Inputs

- Targeted docs/ai areas

# Expected Outputs

- Cleanup report or cleanup plan under docs/ai/reference/history/foundation/

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
