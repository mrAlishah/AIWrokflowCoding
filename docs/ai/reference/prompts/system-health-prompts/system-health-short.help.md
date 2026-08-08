# Purpose

Run the short runtime-only V2 AI Operating System health check prompt.

# Parameters

| Parameter | Required | Description |
|---|---|---|
| CHECK_SCOPE | Optional | Audit scope. Example: runtime-only. |
| CHECK_COMPATIBILITY | Optional | Whether to check compatibility. Example: true. |
| REPORT_MODE | Optional | Report output mode. Example: latest-only. |
| ANALYSIS_DEPTH | Optional | Analysis depth. Example: standard. |

# Parameter Options

## CHECK_SCOPE

| Option | Description |
|---|---|
| runtime-only | Check runtime routing and active skills only. |
| full | Full AI OS health check. |

## CHECK_COMPATIBILITY

| Option | Description |
|---|---|
| true | Enabled. |
| false | Disabled. |

## REPORT_MODE

| Option | Description |
|---|---|
| latest-only | Write latest.md only. |
| latest-and-history | Write latest and history copy. |

## ANALYSIS_DEPTH

| Option | Description |
|---|---|
| standard | Faster standard review. |
| deep | Detailed validation. |

# Required Inputs

- Current runtime docs

# Expected Outputs

- docs/ai/reference/system-health/latest.md

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
