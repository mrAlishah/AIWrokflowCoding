# repo-context-update Skill

## Purpose

`repo-context-update` refreshes reusable repository knowledge in `docs/ai/repo-context/`.

This is the only skill allowed to update repo-context files.

## Invocation Rule

Inspect the repository only when this skill is explicitly invoked.

Do not perform repository-wide inspection as part of normal task execution unless the user requests `repo-context-update`.

## Write Scope

This skill may update only:

- `docs/ai/repo-context/*`

It must not update source code or other documentation areas unless a later approved instruction changes this scope.

## Read-Only Rule For Other Skills

All other skills must treat `docs/ai/repo-context/*` as read-only shared memory.

Other skills may read repo-context to understand stable repository knowledge, but they must not edit it.

## Update Responsibilities

When invoked, this skill should capture:

- important repository structure
- architecture boundaries
- module responsibilities
- curated important files
- naming conventions
- coding standards
- test strategy
- workflow notes
- context loading and optimization guidance

## Context Optimization Rules

- Avoid dumping full repository trees.
- Avoid copying large code blocks.
- Prefer summaries of stable patterns.
- Keep file indexes curated and short.
- Remove stale, duplicate, or low-value details.
- Record enough context to reduce future rediscovery.

## Execution Protocol

1. Confirm the user explicitly invoked `repo-context-update`.
2. Read existing `docs/ai/repo-context/*` files.
3. Inspect only the repository areas needed to improve reusable knowledge.
4. Update the relevant repo-context markdown files.
5. Keep all updates concise and operational.
6. Report every changed markdown file under `Markdown Files Changed`.

## Markdown Change Reporting Rule

Whenever any markdown file is created, updated, renamed, or deleted, the agent must report it under:

## Markdown Files Changed

For each file:

- File path
- Action: Created / Updated / Renamed / Deleted
- Reason
- Summary of changes
- Whether the change affects future AI context
