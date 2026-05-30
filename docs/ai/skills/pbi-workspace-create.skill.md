# pbi-workspace-create Skill

## Purpose

Create the standard documentation workspace for a PBI.

This skill creates structure only. It must not plan implementation work.

## When To Use

Use at the start of a PBI workflow when a PBI has been approved for analysis and future planning.

## Required Parameters

- PBI id in `STP-XXXX` format
- PBI title
- approved PBI text or source request
- requester or source, if known

## Allowed File Scope

This skill may create or update only the PBI workspace:

- `docs/ai/pbi/STP-XXXX/*`

It must not update `docs/ai/repo-context/*`.

## Required Workspace Structure

Create:

```text
docs/ai/pbi/STP-XXXX/
  00-approved-pbi.md
  01-context.md
  implementation-plan.md
  codebase-index.md
  04_decision_log.md
  06_handoff.md
  phases/
  knowledge/
```

## File Templates

### `00-approved-pbi.md`

Store the approved PBI exactly enough to preserve the requested outcome.

Recommended sections:

- PBI ID
- Title
- Approved Request
- Acceptance Criteria
- Constraints

### `01-context.md`

Create as an empty context placeholder.

Recommended sections:

- Repo Context Summary
- Task Context
- Open Questions

### `implementation-plan.md`

Create as a planning placeholder only.

Recommended sections:

- Status: `Planned Only`
- Scope
- Phases
- Verification Plan

### `codebase-index.md`

Create as a placeholder for task-specific navigation.

Recommended sections:

- Relevant Areas
- Files To Inspect
- Files Expected To Change

### `04_decision_log.md`

Create as an empty decision log.

Recommended sections:

- Decisions

### `06_handoff.md`

Create as an empty handoff placeholder.

Recommended sections:

- Summary
- Verification
- Remaining Work

## Forbidden Actions

- Do not modify source code.
- Do not inspect source code for planning.
- Do not create implementation phases beyond placeholders.
- Do not update repo-context.
- Do not make technical decisions.
- Do not run tests or tooling.

## Execution Protocol

1. Confirm the PBI id is in `STP-XXXX` format.
2. Create the workspace directory and required files.
3. Record the approved PBI in `00-approved-pbi.md`.
4. Add only placeholders to the remaining files.
5. Create empty `phases/` and `knowledge/` directories.
6. Report all changed markdown files under `Markdown Files Changed`.

