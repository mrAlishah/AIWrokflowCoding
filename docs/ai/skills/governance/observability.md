# Observability

Canonical ObsV1.1 rules.

## Runtime Config

Observability behavior is controlled by:

```text
docs/ai/config/runtime-config.yaml
```

Agents must read this config if it exists before creating or updating metrics.

Default:

```yaml
observability:
  enabled: true
  metrics:
    enabled: true
    workspace_records: true
    central_dashboards: true
    final_response_status: true
    tool_reports: true
    exact_token_tracking: false
    external_telemetry: false
```

## Config Values

| Setting | Allowed Values | Meaning |
|---|---|---|
| `observability.enabled` | `true`, `false` | Master switch for all V2 observability behavior. When `false`, do not write metrics records, dashboards, metrics final-response status, or optional tool observability summaries. |
| `observability.metrics.enabled` | `true`, `false` | Master switch for metrics behavior. When `false`, all metrics sub-settings are treated as disabled. |
| `observability.metrics.workspace_records` | `true`, `false` | Controls whether workspace-based PBI and Review skills append local `99-metrics.md` execution records. |
| `observability.metrics.central_dashboards` | `true`, `false` | Controls whether matching central dashboards are updated after local metrics change. |
| `observability.metrics.final_response_status` | `true`, `false` | Controls whether PBI, Review, and PR workflow final responses must include `Metrics Updated`. |
| `observability.metrics.tool_reports` | `true`, `false` | Controls whether tool skills include observability summaries in their own reports or final responses. |
| `observability.metrics.exact_token_tracking` | `false` | Exact token tracking is not allowed in V2. |
| `observability.metrics.external_telemetry` | `false` | External telemetry is not allowed in V2. |

## Local Metrics

Local metrics are active only when both `observability.enabled` and `observability.metrics.enabled` are `true`.

PBI local metrics:

```text
docs/ai/pbi/STP-XXXX/99-metrics.md
```

Review local metrics:

```text
docs/ai/reviews/STP-XXXX/99-metrics.md
```

Workspace-based PBI and Review skills append one execution record when `observability.metrics.workspace_records` is `true`.

If `observability.enabled`, `observability.metrics.enabled`, or `workspace_records` is `false`, do not create or update local metrics files.

## Central Dashboards

PBI dashboard:

```text
docs/ai/pbi/metrics.md
```

Review dashboard:

```text
docs/ai/reviews/metrics.md
```

Central dashboards are active only when `observability.enabled`, `observability.metrics.enabled`, `workspace_records`, and `central_dashboards` are all `true`.

Update the matching dashboard when appending local metrics and `observability.metrics.central_dashboards` is `true`.

If `central_dashboards` is `false`, keep local metrics if enabled but do not update the central dashboard.

## Final Response Status

When `observability.enabled`, `observability.metrics.enabled`, and `observability.metrics.final_response_status` are all `true`, all PBI, Review, and PR workflow skills must include:

```text
Metrics Updated:
```

Allowed values:

```text
Yes
No - <reason>
Not Applicable - <reason>
```

Use `Yes` when the expected metrics targets were updated.

Use `No - <reason>` when metrics were expected but could not be updated.

Use `Not Applicable - <reason>` when metrics are disabled by runtime config or the selected task does not have a metrics target.

When `observability.enabled`, `observability.metrics.enabled`, or `final_response_status` is `false`, agents may omit the final response status line, but must still obey any remaining enabled observability settings.

## Tool Reports

Tool skills do not write PBI or Review workspace metrics unless the selected tool explicitly owns that file.

`tools_system_health_check` keeps its observability and context-efficiency output in:

```text
docs/ai/reference/system-health/latest.md
```

Other tool skills report only through their final response and the required `Markdown Files Changed` section unless a separate tools dashboard is explicitly approved later.

Tool observability summaries are active only when `observability.enabled`, `observability.metrics.enabled`, and `observability.metrics.tool_reports` are all `true`.

When `observability.metrics.tool_reports` is `true`, tool skills may include estimated observability summaries in their own reports or final responses.

When `observability.enabled`, `observability.metrics.enabled`, or `tool_reports` is `false`, tool skills should omit optional observability summaries unless the selected skill explicitly requires them.

## Formulas

PBI context efficiency ratio:

```text
Files Changed / Files Read
```

Review context efficiency ratio:

```text
Source Files Reviewed / Files Read
```

## Rules

- Metrics are estimated.
- Use cost levels or summaries, not exact token counts.
- Phase information belongs in `99-metrics.md`, not central dashboards.
- Runtime config controls whether workspace records, central dashboard updates, final response metrics status, and tool report summaries are written.
- If runtime config is missing, use the defaults in this file.
- If `observability.enabled` is `false`, all metrics and observability outputs are disabled except required non-observability reporting such as `Markdown Files Changed`.
- If `observability.metrics.enabled` is `false`, all metrics outputs are disabled while other non-metrics behavior continues.
- If a metrics update is disabled by runtime config, do not write that metrics target.
- Do not add exact token tracking, API-based cost calculations, external telemetry, real-time dashboards, confidence scores, trust metrics, self-correction loops, or autonomous optimization.
