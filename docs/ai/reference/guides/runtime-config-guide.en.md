# Runtime Config Guide

## Purpose

This guide is written for users who are new to `runtime-config.yaml` and want to understand what every option means, when to change it, and how it affects agent behavior.

`runtime-config.yaml` is like driving settings for the agent. It does not choose the skill for the agent, and it does not grant permission to modify source code. It only tells the agent how much context to read while running the selected skill, how to handle terminal output, whether to prefer RTK, and whether to write metrics or observability records.

## Config Files

| File | Role | When It Is Used |
|---|---|---|
| `docs/ai/config/runtime-config.yaml` | Active config | Only this file is read during runtime. |
| `docs/ai/config/runtime-config.low_cost.yaml` | Low-cost preset | Use when speed and low cost matter more than deep analysis. |
| `docs/ai/config/runtime-config.balanced.yaml` | Balanced preset | Use for normal professional daily work. |
| `docs/ai/config/runtime-config.deep_review.yaml` | Deep-review preset | Use for complex review, architecture work, audits, or maintenance. |
| `docs/ai/config/README.md` | Config folder guide | Use to understand the config folder structure. |

Important: preset files are not active by themselves. To activate a preset, copy its contents into `runtime-config.yaml`.

## Golden Rule

Runtime config is preference, not permission.

That means:

- If the selected skill does not allow source-code changes, config cannot allow them.
- If the task is review-only, config cannot allow fixing code.
- If `reference_docs: true`, reference docs are still read only when the task and governance allow them.
- If `deep_review` is active, the agent still must not read the whole repository without a task-relevant reason.

## Current Active Config

```yaml
version: 1

runtime:
  rtk: true

context:
  mode: conservative
  reference_docs: false
  repo_context: when_skill_requires
  source_reading: targeted
  diff_first: true
  prefer_existing_summaries: true
  broad_scan: false
  extra_file_justification: true
  context_expansion_notice: true
  final_response_detail: concise

terminal:
  output:
    prefer_summary: true
    raw_output_on_error: true
    raw_output_when_requested: true
    summarize_success_output: true

observability:
  enabled: true
  metrics:
    enabled: true
    workspace_records: true
    central_dashboards: true
    final_response_status: true
    tool_reports: false
    exact_token_tracking: false
    external_telemetry: false
```

## YAML Structure

| Section | Simple Purpose | What It Affects |
|---|---|---|
| `version` | Config schema version | Validation and compatibility |
| `runtime` | Runtime tool preferences such as RTK | How some terminal commands are run |
| `context` | How much and what kind of context the agent reads | Token cost, analysis quality, number of files read |
| `terminal` | How much command output the agent reports | Noisy vs summarized terminal output |
| `observability` | Metrics and execution reporting | Metrics files, dashboards, final responses |

## version

```yaml
version: 1
```

| Value | Meaning | When To Change |
|---|---|---|
| `1` | Current runtime config schema version | Do not change for V2.3. |

This value is used for validation. In V2.3 the correct value is `1`.

## runtime.rtk

```yaml
runtime:
  rtk: true
```

RTK is an optional terminal-output optimization tool. It can make noisy command output, such as long `git diff` or test output, easier to read.

| Value | Meaning | Best For | Effect |
|---|---|---|---|
| `auto` | The agent may use RTK when it is installed and available. | Safe general use | If RTK is not available, raw commands are used. |
| `true` | The agent should prefer RTK. | When RTK is installed and you want cleaner output | Noisy commands may be wrapped with RTK. |
| `false` | The agent must not use RTK. | When you want complete raw output or RTK has problems | All commands are run raw. |

Difference between `auto` and `true`:

- `auto`: RTK is allowed but not strongly preferred.
- `true`: RTK should be preferred, but if RTK is unavailable or broken, the workflow must continue with raw commands.

## context.mode

```yaml
context:
  mode: conservative
```

This setting controls the agent's general context posture.

| Value | Meaning | Use When | Cost / Quality Effect |
|---|---|---|---|
| `conservative` | Read the least context. | Simple tasks, one selected skill, small reviews | Lower cost, lower risk of unnecessary file reads |
| `balanced` | Allow more targeted context when needed. | Normal professional daily use | Balanced cost and quality |
| `deep` | Allow broader but still task-relevant context. | Complex review, audits, architecture-sensitive work, maintenance | Higher cost, better traceability |

Simple examples:

- Use `conservative` for a lightweight PBI plan.
- Use `balanced` for a medium local diff review.
- Use `deep` for an AI OS audit or architecture review.

## context.reference_docs

```yaml
context:
  reference_docs: false
```

This setting controls whether `docs/ai/reference/**` may be read by default.

| Value | Meaning | Recommendation |
|---|---|---|
| `false` | Reference docs are not read during normal runtime. | Keep this for daily work. |
| `true` | The agent may read reference docs more readily if the task allows it. | Use only for guides, prompt/help maintenance, validation, history, decisions, or AI OS maintenance. |

Important difference:

- `false` means normal PBI or review execution should not read user guides or ready prompts.
- `true` does not allow reading all reference docs by itself. The task must still be relevant.

For ordinary work, keep this `false`.

## context.repo_context

```yaml
context:
  repo_context: when_skill_requires
```

`repo-context` is reusable repository knowledge, such as policies, coding standards, workflows, and stable information used across tasks.

| Value | Meaning | Best For | Example |
|---|---|---|---|
| `never` | Do not read repo-context unless the selected skill explicitly requires it. | Lowest cost and very narrow tasks | Modify only one named file where policy is irrelevant. |
| `on_demand` | Read repo-context only when stable repository knowledge affects the decision. | Good default for most professional tasks | Read coding standards before changing a code pattern. |
| `when_skill_requires` | Read repo-context when the selected skill says it is needed or when the task depends on repository policy. | Strict skill-driven execution | Running a repo-context update or policy update skill. |

Difference between `on_demand` and `when_skill_requires`:

- `on_demand`: the agent may decide that repo-context is needed for quality.
- `when_skill_requires`: the agent is more conservative and usually reads repo-context only when the skill or task clearly requires it.

For beginners, `on_demand` is easier. For stricter low-context workflows, `when_skill_requires` is safer.

## context.source_reading

```yaml
context:
  source_reading: targeted
```

This setting controls how freely the agent may read source files.

| Value | Meaning | Best For | Risk / Cost |
|---|---|---|---|
| `exact_only` | Read only exact files named or clearly required by the task. | Small tasks, narrow reviews, lowest context cost | May be insufficient for complex issues. |
| `targeted` | Read a small set of directly related files when needed. | Medium reviews, limited bugfixes, nearby dependency understanding | Medium cost, better quality. |
| `expanded_when_needed` | Allow broader but still task-relevant source context. | Complex planning, deep review, architecture, audits | Higher cost, better traceability. |

Difference by example:

- `exact_only`: read only `OrderService.cs` because the task named it.
- `targeted`: also read its direct interface and direct test file.
- `expanded_when_needed`: also read related flow files, a few callers, and relevant policy when needed for the decision.

This setting does not allow reading the whole repository. Even `expanded_when_needed` must remain task-relevant.

## context.diff_first

```yaml
context:
  diff_first: true
```

This is especially important for review work.

| Value | Meaning | Effect |
|---|---|---|
| `true` | Review workflows inspect the local git diff first. | Faster, more focused review of actual changes. |
| `false` | The agent may read other files before inspecting the diff. | Usually not recommended for V2 review workflows. |

For PR review or local review, `true` is the right default.

## context.prefer_existing_summaries

```yaml
context:
  prefer_existing_summaries: true
```

This tells the agent to prefer existing summaries and markdown memory before reading more source files.

| Value | Meaning | Effect |
|---|---|---|
| `true` | Read workspace summaries, repo-context, and existing markdown memory first. | Lower token cost and better continuity. |
| `false` | Go to primary files sooner. | May consume more context. |

For a markdown-memory system, `true` is usually better.

## context.broad_scan

```yaml
context:
  broad_scan: false
```

`broad_scan` means broad reading, such as all docs, all skills, all workspaces, or the whole repository.

| Value | Meaning | Recommendation |
|---|---|---|
| `false` | Broad scanning is not allowed by default. | Correct default for lower cost and lower risk. |
| `true` | Broad scanning is easier to allow. | Use only for explicit full audit, cleanup, validation, or maintenance. |

If the user did not ask for a full audit or full docs/repository scan, keep this `false`.

## context.extra_file_justification

```yaml
context:
  extra_file_justification: true
```

This setting requires the agent to explain why it needs to read a file outside the normal scope.

| Value | Meaning | Effect |
|---|---|---|
| `true` | The agent should explain why an extra file is needed before reading it. | More transparency and control. |
| `false` | The agent can expand context more freely without prior explanation. | Faster but less transparent. |

Typical explanation format:

```text
Requested File:
Reason:
Expected Decision Impact:
```

For professional usage, `true` is better.

## context.context_expansion_notice

```yaml
context:
  context_expansion_notice: true
```

This setting tells the agent to notify the user when it materially expands context.

| Value | Meaning | Effect |
|---|---|---|
| `true` | The agent explains why more context became necessary. | Better control and auditability. |
| `false` | The agent may expand context without a notice. | Shorter updates but less transparency. |

For professional multi-agent use, `true` is better.

## context.final_response_detail

```yaml
context:
  final_response_detail: concise
```

This setting controls the default detail level of the final response.

| Value | Meaning | Best For |
|---|---|---|
| `concise` | Short, high-signal response | Daily work, low-cost mode, result-focused tasks |
| `standard` | Moderate detail with validation notes | General professional use |
| `detailed` | More explanation and traceability | Deep review, audits, sensitive decisions |

If the selected skill or user requires a specific final response format, that format takes priority.

## terminal.output.prefer_summary

```yaml
terminal:
  output:
    prefer_summary: true
```

| Value | Meaning | Effect |
|---|---|---|
| `true` | Summarize command output unless exact output is needed. | Cleaner and shorter conversation. |
| `false` | Report more complete command output. | Useful for precise debugging, but noisier. |

## terminal.output.raw_output_on_error

```yaml
terminal:
  output:
    raw_output_on_error: true
```

| Value | Meaning | Effect |
|---|---|---|
| `true` | Preserve raw output when a command fails and the output is needed for diagnosis. | Better debugging. |
| `false` | Errors may also be summarized. | Shorter, but important details may be lost. |

For software development, `true` is usually better.

## terminal.output.raw_output_when_requested

```yaml
terminal:
  output:
    raw_output_when_requested: true
```

| Value | Meaning | Effect |
|---|---|---|
| `true` | If the user asks for full output, the agent should provide raw output. | More user control. |
| `false` | Output may still be summarized even when requested. | Usually not recommended. |

## terminal.output.summarize_success_output

```yaml
terminal:
  output:
    summarize_success_output: true
```

| Value | Meaning | Effect |
|---|---|---|
| `true` | Summarize successful command output. | Good for long successful test/build logs. |
| `false` | Report successful output more fully. | Useful when complete success logs matter. |

## observability.enabled

```yaml
observability:
  enabled: true
```

This is the master switch for all observability behavior.

| Value | Meaning | Effect |
|---|---|---|
| `true` | Observability is enabled. | Metrics and statuses may be written according to sub-settings. |
| `false` | Observability is fully disabled. | Metrics, dashboards, final-response metrics status, and optional tool observability summaries are not written. |

If the goal is lowest cost and minimal file changes, `false` can be appropriate.

## observability.metrics.enabled

```yaml
observability:
  metrics:
    enabled: true
```

This is the master switch for metrics behavior.

| Value | Meaning | Effect |
|---|---|---|
| `true` | Metrics are enabled if `observability.enabled` is also true. | Local metrics and dashboards may be active according to sub-settings. |
| `false` | Metrics are disabled. | Metrics are not written even if the sub-settings are true. |

If `observability.enabled: false`, this setting has no practical effect.

## observability.metrics.workspace_records

```yaml
observability:
  metrics:
    workspace_records: true
```

| Value | Meaning | Effect |
|---|---|---|
| `true` | PBI and Review skills may update local workspace `99-metrics.md`. | Each workspace can keep execution history. |
| `false` | Local workspace metrics are not written. | Fewer workspace file changes. |

## observability.metrics.central_dashboards

```yaml
observability:
  metrics:
    central_dashboards: true
```

| Value | Meaning | Effect |
|---|---|---|
| `true` | Central dashboards such as `docs/ai/pbi/metrics.md` or `docs/ai/reviews/metrics.md` may be updated. | Creates a cross-workspace metrics overview. |
| `false` | Central dashboards are not updated. | Fewer changes and simpler maintenance. |

This usually matters only when `workspace_records: true` is also enabled.

## observability.metrics.final_response_status

```yaml
observability:
  metrics:
    final_response_status: true
```

| Value | Meaning | Effect |
|---|---|---|
| `true` | Final responses may include `Metrics Updated:`. | The user can see whether metrics were updated. |
| `false` | This status can be omitted or treated as unnecessary. | Shorter final responses. |

Common final response values:

```text
Metrics Updated:
Yes
No - <reason>
Not Applicable - <reason>
```

## observability.metrics.tool_reports

```yaml
observability:
  metrics:
    tool_reports: false
```

| Value | Meaning | Effect |
|---|---|---|
| `true` | Tool skills such as system health may include observability summaries in reports. | More complete maintenance reports. |
| `false` | Tool reports should omit optional observability summaries unless a selected skill requires them. | Lower report volume and cost. |

## observability.metrics.exact_token_tracking

```yaml
observability:
  metrics:
    exact_token_tracking: false
```

This must always remain `false`.

| Value | Meaning |
|---|---|
| `false` | V2 does not use exact token tracking. |

`true` is not allowed. This system uses estimates, cost levels, and summaries instead of exact token accounting.

## observability.metrics.external_telemetry

```yaml
observability:
  metrics:
    external_telemetry: false
```

This must always remain `false`.

| Value | Meaning |
|---|---|
| `false` | Metrics are not sent to an external telemetry system. |

`true` is not allowed. V2 must remain local and markdown-based.

## Preset Comparison

| Preset | context.mode | repo_context | source_reading | observability | final_response_detail | Best For |
|---|---|---|---|---|---|---|
| `low_cost` | `conservative` | `when_skill_requires` | `exact_only` | Off | `concise` | Lowest cost and simple tasks |
| `balanced` | `balanced` | `on_demand` | `targeted` | On | `standard` | Normal professional daily use |
| `deep_review` | `deep` | `on_demand` | `expanded_when_needed` | On | `detailed` | Complex review and maintenance |

## Beginner Selection Guide

| If Your Goal Is | Recommendation |
|---|---|
| Work quickly with low cost | `low_cost` |
| You are not sure which preset is best | `balanced` |
| You are doing architecture review or audit | `deep_review` |
| You are maintaining reference guides or prompts | `balanced` or `deep_review` |
| You only need to work on one exact file | `low_cost` or the current active config |

## Common Change Examples

Lowest-cost mode:

```yaml
context:
  mode: conservative
  repo_context: when_skill_requires
  source_reading: exact_only
  final_response_detail: concise

observability:
  enabled: false
```

Balanced review:

```yaml
context:
  mode: balanced
  repo_context: on_demand
  source_reading: targeted
  final_response_detail: standard
```

Deep review:

```yaml
context:
  mode: deep
  repo_context: on_demand
  source_reading: expanded_when_needed
  final_response_detail: detailed
```

## Be Careful Changing These

| Option | Why To Be Careful |
|---|---|
| `context.reference_docs` | If set to true accidentally, the agent may read extra reference material during ordinary work. |
| `context.broad_scan` | If set to true, context cost and unnecessary-read risk increase. |
| `exact_token_tracking` | Must remain false in V2. |
| `external_telemetry` | Must remain false in V2. |

## Canonical Governance

Canonical allowed values and behavior are defined here:

```text
docs/ai/skills/governance/runtime-config-schema.md
docs/ai/skills/governance/context-management.md
docs/ai/skills/governance/terminal-output-optimization.md
docs/ai/skills/governance/observability.md
```

## When To Read This Guide

Read this guide when:

- You want to change `runtime-config.yaml`.
- You are not sure whether `low_cost`, `balanced`, or `deep_review` is best.
- You want to understand why the agent read more files or summarized terminal output.
- You want to enable or disable metrics or final response status.
- You are maintaining AI OS reference docs.

Do not read this guide during normal PBI, review, or implementation runtime unless the user explicitly asks about runtime config.
