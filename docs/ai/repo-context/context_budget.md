# Context Efficiency

Rules for loading repository context efficiently while preserving implementation quality.

## Quality First

Context efficiency must not reduce correctness, design quality, validation quality, or review quality.

Agents must read enough context to make a defensible implementation or review decision.

Do not use hard token quotas, maximum file limits, or numeric shortcuts as a reason to skip required understanding.

## Context Efficiency Principles

- Start with the most relevant shared memory file.
- Prefer repo-context routing files before source inspection.
- Prefer targeted search over broad file dumps.
- Read current source files before changing implementation behavior.
- Avoid loading full repository trees unless explicitly needed.
- Stop and request approval when the task expands beyond the approved scope.

## Scope Expansion Rule

Before reading files outside the approved scope, agents must report:

```text
Requested File:

Reason:

Expected Decision Impact:
```

Continue only when the extra context is necessary for implementation quality, validation quality, or review quality.

## Repo Context Usage

- Treat `docs/ai/repo-context/*` as reusable memory.
- Other skills may read repo-context but must not update it.
- Only `repo-context-update` may refresh repo-context files.

## Stop Conditions

Stop and request user approval when:

- additional files outside the approved scope are required
- additional phases are required
- scope expansion is detected
- validation expectations cannot be met with the available information

## Update Style

- Keep stable facts.
- Remove stale or noisy details.
- Summarize patterns instead of copying source.

