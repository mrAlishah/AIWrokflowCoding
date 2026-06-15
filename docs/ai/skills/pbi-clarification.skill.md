# pbi-clarification Skill

This skill follows `common-skill-rules.md`.

Skill-specific rules are listed below.

## Purpose

Transform a raw PBI into an implementation-ready approved PBI.

This skill is mandatory before `pbi-workspace-create`.

## When To Use

Use when a PBI is raw, newly provided, ambiguous, incomplete, or not yet structured for implementation.

## Required Parameters

- PBI id in `STP-XXXX` format, if known
- raw PBI text or source request
- requester or source, if known

## Allowed File Scope

This skill may create or update only:

- `docs/ai/pbi/STP-XXXX/00-approved-pbi.md`
- `docs/ai/pbi/STP-XXXX/99-metrics.md`
- `docs/ai/pbi/metrics.md`

It must not modify source code.
It must not create implementation tasks.
It must not create phase files.
It must not update repo-context.

## Required Output File

Create or update:

```text
docs/ai/pbi/STP-XXXX/00-approved-pbi.md
```

## Required Sections

`00-approved-pbi.md` must contain:

```markdown
# Business Goal

# Current Behavior

# Expected Behavior

# In Scope

# Out Of Scope

# Acceptance Criteria

# Assumptions

# Open Questions

# Risks
```

## Clarification Rules

Identify and document:

- ambiguities
- missing information
- assumptions
- risks
- questions for Product Managers or the requester

If critical implementation information is missing, write:

```text
STATUS: BLOCKED_FOR_CLARIFICATION
```

When this status exists, planning and implementation skills must not continue.

## Quality Rules

- Preserve the user's intent.
- Do not invent acceptance criteria.
- Do not convert assumptions into facts.
- Ask focused questions in Persian when the user communicates in Persian.
- Keep the approved PBI concise and implementation-ready.

## Forbidden Actions

- Do not modify source code.
- Do not create implementation phases.
- Do not run planning, implementation, review, fix, or handoff workflows.
- Do not update repo-context.
- Do not create broad repository indexes.

## Execution Protocol

1. Confirm or derive the PBI id.
2. Read the raw PBI.
3. Read only the repo-context needed to understand the problem.
4. Identify ambiguities, assumptions, missing information, risks, and acceptance criteria gaps.
5. If critical information is missing, update `00-approved-pbi.md` with `STATUS: BLOCKED_FOR_CLARIFICATION` and focused questions.
6. If the PBI is clear, update `00-approved-pbi.md` with the required sections.
7. Append execution metrics to `99-metrics.md` with phase `N/A`.
8. Update `docs/ai/pbi/metrics.md`.
9. Report all changed markdown files under `Markdown Files Changed`.
