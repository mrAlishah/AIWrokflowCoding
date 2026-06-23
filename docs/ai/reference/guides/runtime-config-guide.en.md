# Runtime Config Guide

## Purpose

This guide explains how end users should understand `docs/ai/config/runtime-config.yaml`.

The runtime config is a lightweight optional configuration file. It controls runtime preferences only. It does not change skills, workflows, permissions, review guardrails, repo-context ownership, or markdown shared memory.

## Config Location

```text
docs/ai/config/runtime-config.yaml
```

Agents may read this file after `docs/ai/skills/README.md` only to apply runtime tool preferences.

## Current Shape

```yaml
version: 1

runtime:
  rtk: auto

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

## RTK Setting

`runtime.rtk` controls optional RTK terminal-output optimization.

| Value | Meaning |
|---|---|
| `auto` | Use RTK when installed and available. |
| `true` | Prefer RTK-wrapped commands when RTK is available. |
| `false` | Do not use RTK. |

Use RTK for noisy commands when enabled and available:

```text
rtk git status
rtk git diff BASE_BRANCH...HEAD
rtk git diff --name-only BASE_BRANCH...HEAD
rtk git log --oneline -20
rtk rg "pattern"
rtk dotnet test
```

Use raw commands when RTK is disabled, unavailable, incomplete, or exact raw output is required:

```text
git status
git diff BASE_BRANCH...HEAD
git diff --name-only BASE_BRANCH...HEAD
rg "pattern"
dotnet test
```

Canonical RTK governance lives in:

```text
docs/ai/skills/governance/terminal-output-optimization.md
```

## Observability Metrics Settings

`observability` controls whether markdown-based AI OS operational metrics are enabled and which metric outputs are allowed.

| Setting | Meaning |
|---|---|
| `observability.enabled: true` | Enables observability configuration for the AI OS. |
| `metrics.enabled: true` | Enables markdown-based metrics behavior. |
| `workspace_records: true` | Workspace markdown records may include metrics or usage summaries. |
| `central_dashboards: true` | Central markdown dashboards or summaries may be maintained when an approved skill owns them. |
| `final_response_status: true` | Final responses may include compact status or usage summaries when the selected skill requires them. |
| `tool_reports: true` | Tool outputs such as system-health reports may include metrics sections. |
| `exact_token_tracking: false` | Do not track or require exact token counts. |
| `external_telemetry: false` | Do not send metrics to external telemetry systems. |

These settings preserve the V2 low-token and markdown-memory model without adding external telemetry.

## How To Change RTK Behavior

Enable automatic RTK use:

```yaml
runtime:
  rtk: auto
```

Prefer RTK when available:

```yaml
runtime:
  rtk: true
```

Disable RTK:

```yaml
runtime:
  rtk: false
```

## Safety Rules

- Runtime config does not authorize reading extra docs or source files.
- Runtime config does not allow source-code changes.
- Runtime config does not weaken review-only guardrails.
- Runtime config does not make RTK mandatory.
- Runtime config does not replace markdown shared memory.
- If RTK fails, use raw commands and continue.

## When To Read This Guide

Read this guide when:

- You want to understand or change `runtime.rtk`.
- You want to understand observability metric flags.
- You are maintaining AI OS reference docs.
- A system health report asks you to review runtime config behavior.

Do not read this guide during normal PBI, review, or implementation runtime unless the user explicitly asks about runtime config.
