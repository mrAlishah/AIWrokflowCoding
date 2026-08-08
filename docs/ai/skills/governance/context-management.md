# Context Management

## Purpose

Define runtime context preferences that reduce token cost while preserving decision quality.

This file controls how agents interpret `context` settings in:

```text
docs/ai/config/runtime-config.yaml
```

## Runtime Config

Default:

```yaml
context:
  mode: conservative
  reference_docs: false
  repo_context: on_demand
  source_reading: exact_only
  diff_first: true
  prefer_existing_summaries: true
  broad_scan: false
  extra_file_justification: true
  context_expansion_notice: true
  final_response_detail: concise
```

Agents must read this config if it exists before expanding context beyond the selected skill, active workspace, repo-context, or exact source files.

## Config Values

| Setting | Allowed Values | Meaning |
|---|---|---|
| `context.mode` | `conservative`, `balanced`, `deep` | Controls default context posture. `conservative` minimizes reads, `balanced` allows moderate expansion, and `deep` allows broader task-relevant context when quality requires it. |
| `context.reference_docs` | `true`, `false` | Controls whether `docs/ai/reference/**` may be read by default. Runtime workflows should keep this `false`. |
| `context.repo_context` | `never`, `on_demand`, `when_skill_requires` | Controls repo-context reading. |
| `context.source_reading` | `exact_only`, `targeted`, `expanded_when_needed` | Controls source-file reading breadth. |
| `context.diff_first` | `true`, `false` | Controls whether review workflows inspect local diff before broader file context. |
| `context.prefer_existing_summaries` | `true`, `false` | Controls whether agents prefer workspace summaries, repo-context, and existing markdown memory before source expansion. |
| `context.broad_scan` | `true`, `false` | Controls whether broad scans are allowed by default. Keep `false` for low token cost. |
| `context.extra_file_justification` | `true`, `false` | Controls whether agents must state why an out-of-scope file is needed before reading it. |
| `context.context_expansion_notice` | `true`, `false` | Controls whether agents report when context scope expands materially. |
| `context.final_response_detail` | `concise`, `standard`, `detailed` | Controls default final-response verbosity unless the selected skill or user requires a specific format. |

## Mode Behavior

| Mode | Behavior |
|---|---|
| `conservative` | Read selected skill, active workspace, repo-context only on demand, and exact files only. Avoid broad scans. |
| `balanced` | Allow targeted extra files when they materially improve quality. Still avoid all-docs, all-skills, or whole-repo reads. |
| `deep` | Allow broader task-relevant context for audits, planning, complex review, or system maintenance. Still do not read unrelated files. |

## Repo-Context Behavior

| Value | Behavior |
|---|---|
| `never` | Do not read repo-context unless the selected skill explicitly requires it. |
| `on_demand` | Read repo-context only when stable repository knowledge affects the task. |
| `when_skill_requires` | Read repo-context when the selected skill lists it or the task depends on repository policy. |

## Source Reading Behavior

| Value | Behavior |
|---|---|
| `exact_only` | Read only exact files named by the task, active diff, selected skill, or workspace. |
| `targeted` | Read a small set of directly related files when needed for quality. |
| `expanded_when_needed` | Allow broader but still task-relevant source context for complex planning or review. |

## Broad Scan Rule

When `context.broad_scan` is `false`, do not read all docs, all skills, all workspaces, or the whole repository by default.

Broad scans are allowed only when the user explicitly asks for a full audit, cleanup, validation, or system maintenance task that requires them.

## Extra File Rule

When `context.extra_file_justification` is `true`, before reading files outside the normal scope, report:

```text
Requested File:
Reason:
Expected Decision Impact:
```

Skip the file when it does not materially change implementation quality, validation quality, review quality, risk assessment, or user-facing behavior.

## Final Response Detail

Use `context.final_response_detail` as the default response style:

| Value | Behavior |
|---|---|
| `concise` | Prefer short, high-signal summaries. |
| `standard` | Include moderate detail and validation notes. |
| `detailed` | Include expanded reasoning when the task needs traceability. |

User-required output formats and selected skill final-response formats take priority over this preference.

## Relationship To Runtime Read Order

This config refines the canonical read order in `docs/ai/skills/governance/read-order.md`.

It does not authorize reading reference docs, source code, all docs, all skills, or the whole repository unless the selected task and governance allow it.

## Relationship To Quality

Quality still takes priority over context minimization.

Do not use context settings as hard quotas or as a reason to skip required understanding.

## Final Instruction For Agents

Read runtime config if available. Apply `context.*` settings before expanding context. Keep the normal runtime path minimal, prefer existing summaries, justify extra files when configured, and fall back to broader context only when quality requires it.
