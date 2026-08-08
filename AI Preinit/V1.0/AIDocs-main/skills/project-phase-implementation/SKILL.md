---
name: project-phase-implementation
description: Use for implementing, hardening, documenting, or reviewing a numbered project phase.
---

# Project Phase Implementation

Implement one numbered phase in the current project.

## Inputs

- Phase number, for example `3`, `9.1`, or `12`.
- Phase name/scope when provided.
- Action: plan, implement, harden, review, or document.
- If the number is missing, ask one short question.

## Start

Begin with:

```text
Definition of Phase <number>: <phase name>.
```

Then explain scope in 1-2 concise sentences.

## Rules

- Stay inside phase/task scope.
- Read `AGENTS.md`.
- Inspect the closest existing code and relevant docs only.
- Follow existing project patterns before editing.
- Keep diffs small and reviewable.
- Do not refactor unrelated files.
- Do not add new infrastructure unless requested.
- Add useful English comments only for important validation, external boundaries, file operations, security-sensitive logic, or non-obvious behavior.

## Workflow

1. Read `AGENTS.md`.
2. Read `docs/implementation-plan.md`.
3. Inspect the closest existing code.
4. Implement the smallest correct change.
5. Update the relevant phase log under `docs/phases`.
6. Update directly affected docs.
7. Run the relevant validation command.
8. Report changed files, explanation, validation, risks, and a simple English commit comment.

## Final Response

- Changed files
- Short explanation
- Validation
- Risks
- Git commit comment
