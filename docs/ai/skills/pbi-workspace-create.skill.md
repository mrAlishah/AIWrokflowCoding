# pbi-workspace-create Skill

This skill follows `common-skill-rules.md`.

Skill-specific rules are listed below.

## Purpose

Create the standard documentation workspace for a PBI.

This skill creates structure only. It must not plan implementation work.

## When To Use

Use after `pbi-clarification` has produced an approved PBI and the PBI is ready for analysis and future planning.

## Required Parameters

- PBI id in `STP-XXXX` format
- PBI title
- approved PBI text or source request
- requester or source, if known

## Required Inputs

Read first:

- `docs/ai/pbi/STP-XXXX/00-approved-pbi.md`, if already created by `pbi-clarification`

If `00-approved-pbi.md` contains:

```text
STATUS: BLOCKED_FOR_CLARIFICATION
```

stop. Do not create a workspace beyond the clarification file.

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
  02-implementation-plan.md
  03-codebase-index.md
  04-decision_log.md
  05-validation.md
  06-handoff.md
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

Create as an empty PBI-specific context placeholder.

`01-context.md` must not be a copy of repo-context. It should contain only the repo-context excerpts, files, risks, constraints, and validation notes relevant to the active PBI when later updated by planning.

Recommended sections:

- Repo Context Summary
- Task Context
- Open Questions

### `02-implementation-plan.md`

Create as a planning placeholder only.

`02-implementation-plan.md` is a short roadmap. It must contain phase names, goals, status, and high-level sequencing only. It must not contain detailed technical implementation plans.

Recommended sections:

- Status: `Planned Only`
- Scope
- Phases
- Verification Plan

### `03-codebase-index.md`

Create as a placeholder for task-specific navigation.

Recommended sections:

- Relevant Areas
- Files To Inspect
- Files Expected To Change
- Phase To Source Files
- Phase To Knowledge Files
- Phase To Relevant Modules
- Phase To Created Or Updated Files
- Phase To Created Or Updated Functions
- Function Purpose, Usage, Related Flow, Validation Focus, and Review Focus

### `04-decision_log.md`

Create as an empty decision log.

Use only for architecture, domain, and design decisions. Do not use for phase execution notes, review comments, todos, or temporary planning notes.

### `05-validation.md`

Create as the explicit validation requirements file.

Required sections:

- Build Verification
- Manual Test Scenarios
- Regression Checklist
- Known Risks
- Sign-off Criteria

No automated tests does not mean no validation.

### `knowledge/`

`knowledge/` is the official folder name for reusable PBI-level knowledge. It is optional for simple PBIs. Create it only when the PBI has reusable PBI-level technical knowledge, overlapping use cases, contracts, mappings, flows, validation rules, or multi-phase concepts. Do not create unnecessary knowledge files for simple PBIs.

Recommended sections:

- Decisions

### `06-handoff.md`

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
5. Create empty `phases/` and create `knowledge/` only if needed.
6. Report all changed markdown files under `Markdown Files Changed`.
