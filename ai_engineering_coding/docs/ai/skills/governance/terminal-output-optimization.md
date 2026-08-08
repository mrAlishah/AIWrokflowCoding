# Terminal Output Optimization

## Purpose

RTK is an optional runtime terminal-output optimization for noisy commands.

It may reduce terminal noise when available, but it is not a required dependency and must never block workflow execution.

## Runtime Config Location

Runtime terminal behavior is controlled by:

```text
docs/ai/config/runtime-config.yaml
```

Agents must read this config only if the file exists.

## Allowed `runtime.rtk` Values

| Value | Meaning |
|---|---|
| `auto` | Use RTK when installed and available. |
| `true` | Prefer RTK-wrapped commands when RTK is available. |
| `false` | Do not use RTK. |

Default:

```yaml
version: 1

runtime:
  rtk: auto

terminal:
  output:
    prefer_summary: true
    raw_output_on_error: true
    raw_output_when_requested: true
    summarize_success_output: true
```

## Terminal Output Values

| Setting | Allowed Values | Meaning |
|---|---|---|
| `terminal.output.prefer_summary` | `true`, `false` | Prefer concise summaries of terminal output when exact raw output is not needed. |
| `terminal.output.raw_output_on_error` | `true`, `false` | Include raw command output when a command fails and the output is needed for diagnosis. |
| `terminal.output.raw_output_when_requested` | `true`, `false` | Provide raw output when the user explicitly asks for it. |
| `terminal.output.summarize_success_output` | `true`, `false` | Summarize successful noisy command output instead of relaying long raw logs. |

## When To Use RTK

When `runtime.rtk` is `true` or `auto`, agents may prefer RTK-wrapped commands for noisy terminal output if RTK is installed and available.

Examples:

```text
rtk git status
rtk git diff BASE_BRANCH...HEAD
rtk git diff --name-only BASE_BRANCH...HEAD
rtk git log --oneline -20
rtk npm test
rtk npm run test
rtk pnpm test
rtk dotnet test
rtk rg "pattern"
rtk fd "pattern"
```

## When Not To Use RTK

Do not use RTK when:

- `runtime.rtk` is `false`.
- RTK is unavailable.
- RTK output is incomplete.
- Exact raw terminal output is required.
- The command is not noisy enough to need wrapping.

## Fallback Behavior

Use raw commands when RTK is disabled, unavailable, incomplete, or exact output is required.

Examples:

```text
git status
git diff BASE_BRANCH...HEAD
git diff --name-only BASE_BRANCH...HEAD
npm test
pnpm test
dotnet test
rg "pattern"
fd "pattern"
```

RTK failure must not stop the workflow. Fall back to raw commands and continue.

## Output Summarization

When `terminal.output.prefer_summary` is `true`, summarize terminal output unless exact raw output is required.

When `terminal.output.summarize_success_output` is `true`, summarize successful noisy command output and report only the relevant result, path, status, or error-free completion.

When `terminal.output.raw_output_on_error` is `true`, preserve raw error output when it is needed to diagnose a failure.

When `terminal.output.raw_output_when_requested` is `true`, provide raw output if the user explicitly asks for it.

## Relationship To Runtime Read Order

The normal runtime read path remains unchanged.

If `docs/ai/config/runtime-config.yaml` exists, agents may read it after `docs/ai/skills/README.md` to apply terminal-output preferences. This config read does not authorize reading unrelated docs or expanding task context.

## Relationship To Review-Only Guardrails

RTK does not change review-only restrictions.

Review workflows remain local-git-driven and must not modify source code, call PR APIs, create pull requests, or push commits.

## Relationship To Markdown Shared Memory

RTK does not replace markdown shared memory, skills, repo-context, review workspaces, PBI workspaces, or governance files.

RTK only affects optional terminal command wrapping.

## Final Instruction For Agents

Read runtime config if available. If `runtime.rtk=false`, do not use RTK. If `runtime.rtk=true` or `auto`, prefer RTK-wrapped terminal commands when RTK is available. If RTK is unavailable, incomplete, or exact raw output is required, use raw commands and continue. Apply `terminal.output.*` settings when deciding whether to summarize or preserve command output.
