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
```

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

Read runtime config if available. If `runtime.rtk=false`, do not use RTK. If `runtime.rtk=true` or `auto`, prefer RTK-wrapped terminal commands when RTK is available. If RTK is unavailable, incomplete, or exact raw output is required, use raw commands and continue.
