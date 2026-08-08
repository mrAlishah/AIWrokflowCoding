# Runtime Config Schema

## Purpose

Define allowed keys and values for:

```text
docs/ai/config/runtime-config.yaml
```

Preset example files may use the same schema:

```text
docs/ai/config/runtime-config.low_cost.yaml
docs/ai/config/runtime-config.balanced.yaml
docs/ai/config/runtime-config.deep_review.yaml
```

This schema supports validation by `tools_system_health_check`.

## Required Root Keys

| Key | Required | Meaning |
|---|---|---|
| `version` | Yes | Runtime config schema version. Current value: `1`. |
| `runtime` | Yes | Runtime tool preferences. |
| `context` | Yes | Context-cost and context-expansion preferences. |
| `terminal` | Yes | Terminal output preferences. |
| `observability` | Yes | Metrics and observability preferences. |

## Runtime

| Key | Allowed Values | Default |
|---|---|---|
| `runtime.rtk` | `auto`, `true`, `false` | `auto` |

## Context

| Key | Allowed Values | Default |
|---|---|---|
| `context.mode` | `conservative`, `balanced`, `deep` | `conservative` |
| `context.reference_docs` | `true`, `false` | `false` |
| `context.repo_context` | `never`, `on_demand`, `when_skill_requires` | `on_demand` |
| `context.source_reading` | `exact_only`, `targeted`, `expanded_when_needed` | `exact_only` |
| `context.diff_first` | `true`, `false` | `true` |
| `context.prefer_existing_summaries` | `true`, `false` | `true` |
| `context.broad_scan` | `true`, `false` | `false` |
| `context.extra_file_justification` | `true`, `false` | `true` |
| `context.context_expansion_notice` | `true`, `false` | `true` |
| `context.final_response_detail` | `concise`, `standard`, `detailed` | `concise` |

## Terminal

| Key | Allowed Values | Default |
|---|---|---|
| `terminal.output.prefer_summary` | `true`, `false` | `true` |
| `terminal.output.raw_output_on_error` | `true`, `false` | `true` |
| `terminal.output.raw_output_when_requested` | `true`, `false` | `true` |
| `terminal.output.summarize_success_output` | `true`, `false` | `true` |

## Observability

| Key | Allowed Values | Default |
|---|---|---|
| `observability.enabled` | `true`, `false` | `true` |
| `observability.metrics.enabled` | `true`, `false` | `true` |
| `observability.metrics.workspace_records` | `true`, `false` | `true` |
| `observability.metrics.central_dashboards` | `true`, `false` | `true` |
| `observability.metrics.final_response_status` | `true`, `false` | `true` |
| `observability.metrics.tool_reports` | `true`, `false` | `true` |
| `observability.metrics.exact_token_tracking` | `false` | `false` |
| `observability.metrics.external_telemetry` | `false` | `false` |

## Validation Rules

- Unknown keys should be reported as optional findings unless they conflict with runtime behavior.
- Missing required root keys should be reported as required findings.
- Invalid allowed values should be reported as required findings.
- `exact_token_tracking` must remain `false`.
- `external_telemetry` must remain `false`.
- Config preferences must not override safety rules, source-code permissions, review-only guardrails, markdown reporting, or reference boundary rules.
