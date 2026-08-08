# Code Policies

Approved global code policies for this repository.

This file is the canonical source for active code policies. Skills and governance files should reference this file instead of duplicating full policy text.

## Segments

- Cross-Cutting
- Frontend
- Backend
- Tests
- Review

## Cross-Cutting

## CP-008 - Agent Git Actions Require Explicit User Request

Status:
Active

Applies To:

- Agent Workflow
- Git
- Review
- Implementation

Rule:

Agents must not commit, push, create pull requests, or publish branches unless the user explicitly requests that exact action for the current task.

Agents may inspect git status, diffs, logs, and changed files when needed for the selected skill or task.

Reason:

Commits, pushes, and pull requests change collaboration state outside the local code edit itself. Keeping those actions explicit prevents accidental publication, review noise, and loss of user control.

Review Guidance:

Check final handoffs for unexpected commits, pushes, PR creation, or branch publication. Treat unrequested git publication as a workflow violation.

## CP-011 - Preserve Deep Subsystem Knowledge

Status:
Active

Applies To:

- Agent Workflow
- Repository Context
- Architecture
- Implementation
- Review

Rule:

When a task explicitly requires deep inspection of a subsystem, first announce the subsystem being inspected. Capture durable, reusable findings in:

```text
docs/ai/repo-context/knowledges/knowledge_<Name>.md
```

Use a concise, stable Snake case `<name>` that identifies the subsystem. Create or update this file only through `tools_repo_context_update`.

For any later task that needs knowledge of that subsystem, read the matching `knowledge_<name>.md` before inspecting source files. Update it through `tools_repo_context_update` when new stable knowledge is confirmed. Do not record transient task details, credentials, or secrets.

Reason:

Deep subsystem inspection is expensive. A durable, discoverable knowledge file reduces repeated exploration, preserves confirmed architectural context, and keeps subsequent work consistent.

Review Guidance:

When deep subsystem inspection occurs, confirm the subsystem was announced, the matching knowledge file was created or refreshed through `tools_repo_context_update`, and later work uses that file when relevant. Check that the knowledge remains concise, reusable, and free of secrets.

## Frontend

## CP-001 - No `var` in Frontend JavaScript and TypeScript

Status:
Active

Applies To:

- Frontend
- JavaScript
- TypeScript

Rule:

Frontend JavaScript and TypeScript code must not use `var`.

Use:

- `const` by default.
- `let` only when reassignment is required.

Do not use:

- `var`

Reason:

`var` has function scope and can introduce unintended behavior. Modern JavaScript and TypeScript code should use block-scoped declarations.

## Backend

No active backend-specific code policies yet.

## Tests

No active test-specific code policies yet.

## Review

Review must check active code policies that apply to the changed files.

For CP-001, review frontend JavaScript and TypeScript changes for `var` usage and prefer `const` by default, with `let` only when reassignment is required.
