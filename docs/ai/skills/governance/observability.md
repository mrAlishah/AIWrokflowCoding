# Observability

Canonical ObsV1.1 rules.

## Local Metrics

PBI local metrics:

```text
docs/ai/pbi/STP-XXXX/99-metrics.md
```

Review local metrics:

```text
docs/ai/reviews/STP-XXXX/99-metrics.md
```

Each operational skill appends one execution record.

## Central Dashboards

PBI dashboard:

```text
docs/ai/pbi/metrics.md
```

Review dashboard:

```text
docs/ai/reviews/metrics.md
```

Update the matching dashboard when appending local metrics.

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
- Do not add exact token tracking, API-based cost calculations, external telemetry, real-time dashboards, confidence scores, trust metrics, self-correction loops, or autonomous optimization.
