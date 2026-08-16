# Runtime Config

## Purpose

`runtime-config.yaml` stores optional runtime preferences for the V3 AI Engineering Operating System.

It helps agents reduce context cost, control terminal output, and enable or disable observability without changing skills or prompts.

## Runtime Rule

Agents may read this file after `docs/ai/skills/README.md` when applying runtime preferences.

This file does not change skill routing, workflow behavior, source-code permissions, review-only guardrails, or the reference boundary.

## Main Sections

- `runtime`: terminal tool preferences such as RTK.
- `context`: context-cost and context-expansion preferences.
- `terminal`: terminal output summarization preferences.
- `observability`: metrics and observability preferences.

## Presets

Preset examples live beside `runtime-config.yaml`:

| Preset | File | Use |
|---|---|---|
| `low_cost` | `runtime-config.low_cost.yaml` | Lowest token cost with reasonable quality. |
| `balanced` | `runtime-config.balanced.yaml` | Balanced context cost and review quality. |
| `deep_review` | `runtime-config.deep_review.yaml` | Higher-quality review with broader targeted context. |

Only `runtime-config.yaml` is active by default. To use a preset, copy its contents into `runtime-config.yaml`.

## Disable Observability

To disable all observability and metrics output:

```yaml
observability:
  enabled: false
```

To disable only metrics:

```yaml
observability:
  enabled: true
  metrics:
    enabled: false
```

## Validation

Allowed values are defined in:

```text
docs/ai/skills/governance/runtime-config-schema.md
```

Canonical behavior rules live in:

- `docs/ai/skills/governance/context-management.md`
- `docs/ai/skills/governance/terminal-output-optimization.md`
- `docs/ai/skills/governance/observability.md`
