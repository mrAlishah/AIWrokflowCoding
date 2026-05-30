# pbi-plan-create Skill

## Purpose

Create a scoped implementation plan for an existing PBI workspace.

This skill turns the approved PBI into task context, phase plans, and task-specific codebase navigation.

## When To Use

Use after `pbi-workspace-create` has created the PBI workspace and before implementation begins.

## Required Parameters

- PBI id in `STP-XXXX` format
- acceptance criteria
- constraints
- planning scope
- available repo-context files

## Required Inputs

Read first:

- `docs/ai/pbi/STP-XXXX/00-approved-pbi.md`
- `docs/ai/repo-context/README.md`
- relevant files under `docs/ai/repo-context/*`

## Source Inspection Rule

Read repo-context before inspecting source code.

This skill may inspect source code only when repo-context is missing, incomplete, stale, or insufficient for the PBI plan.

If source inspection is needed, keep it targeted to the PBI and summarize findings in the PBI workspace.

## Context Read Order

1. `docs/ai/skills/README.md`
2. `docs/ai/skills/pbi-plan-create.skill.md`
3. Active workspace: `docs/ai/pbi/STP-XXXX/*`
4. repo-context routing docs:
   - `docs/ai/repo-context/module_map.md`
   - `docs/ai/repo-context/file_index.md`
   - `docs/ai/repo-context/context_budget.md`
5. Exact source files listed in phase, context, or repo-context gaps

Before reading any extra file, state:

- file path
- why it is needed
- what decision, risk, or validation it helps evaluate

## Allowed File Scope

This skill may update only:

- `docs/ai/pbi/STP-XXXX/01-context.md`
- `docs/ai/pbi/STP-XXXX/02-implementation-plan.md`
- `docs/ai/pbi/STP-XXXX/03-codebase-index.md`
- `docs/ai/pbi/STP-XXXX/phases/*.md`
- `docs/ai/pbi/STP-XXXX/knowledge/*` only if needed
- `docs/ai/pbi/STP-XXXX/04-decision_log.md` only if decisions exist

## Repo Context Rule

This skill must not update `docs/ai/repo-context/*`.

If repo-context is missing or insufficient, record the gap in the PBI workspace. Do not fix repo-context from this skill.

## Phase Statuses

Use only these phase statuses:

- `Planned Only`
- `Planned`
- `In Progress`
- `Done`

## Phase File Rule

Phase files must be both plan and execution memory.

Each phase file should include:

- Phase name
- Status
- Goal
- Scope
- Target files or areas
- Planned steps
- Execution memory
- Verification notes

## Planning Outputs

### `01-context.md`

Update with:

- repo-context summary
- PBI-specific context
- relevant constraints
- source inspection notes, only if inspection was needed
- open questions or risks

`01-context.md` must not be a copy of repo-context. Include only excerpts, files, risks, constraints, and validation notes relevant to the active PBI.

### `02-implementation-plan.md`

Update with:

- implementation status
- scope
- out-of-scope items
- phases
- verification plan
- handoff expectations

Keep this file as a short roadmap with phase names, goals, status, and high-level sequencing only. Detailed technical implementation plans belong in `phases/*.md`.

### `03-codebase-index.md`

Update with:

- task-specific relevant areas
- files to inspect
- files expected to change
- files expected to stay unchanged
- search hints
- Phase to Source Files
- Phase to Knowledge Files
- Phase to Relevant Modules
- Phase to Created or Updated Files
- Phase to Created or Updated Functions
- Function to Purpose
- Function to Usage
- Function to Related Flow
- Function to Validation Focus
- Function to Review Focus

### `phases/*.md`

Create one concise phase file per implementation phase.

Each phase starts as `Planned` unless it is a placeholder for later planning, in which case use `Planned Only`.

### `knowledge/*`

Add only when the PBI needs extra task-specific durable knowledge that does not belong in repo-context.

`knowledge/` is optional. Create knowledge files only when the PBI has reusable PBI-level technical knowledge, overlapping use cases, contracts, mappings, flows, validation rules, or multi-phase concepts. Do not create unnecessary knowledge files for simple PBIs.

### `04-decision_log.md`

Update only when actual planning decisions exist.

Use only for architecture, domain, and design decisions. Do not use for phase execution notes, review comments, todos, or temporary planning notes.

## Forbidden Actions

- Do not modify source code.
- Do not update repo-context.
- Do not run implementation.
- Do not run review or fix phases.
- Do not create broad repository indexes.
- Do not dump full source files or full directory trees.

## Execution Protocol

1. Confirm the PBI workspace exists.
2. Read the approved PBI.
3. Read repo-context first.
4. Inspect source code only if repo-context is missing or insufficient.
5. Build a concise implementation plan.
6. Create phase files as plan plus execution memory.
7. Record decisions only when decisions exist.
8. Report all changed markdown files under `Markdown Files Changed`.

## Markdown Change Reporting Rule

Whenever any markdown file is created, updated, renamed, or deleted, the agent must report it under:

## Markdown Files Changed

For each file:

- File path
- Action: Created / Updated / Renamed / Deleted
- Reason
- Summary of changes
- Whether the change affects future AI context
