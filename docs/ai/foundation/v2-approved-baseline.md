# AI Multi-Agent Coding Operating System V2 Approved Baseline

## Purpose

This document defines the approved foundation baseline for V2. It is the operating reference for documentation, agent behavior, skills, repository context, workflows, and quality rules.

## Core Model

### Markdown Files = Shared Memory

Markdown files under `docs/ai/` are the shared memory of the system.

- They store durable operating knowledge.
- They record approved workflows, rules, decisions, and reusable context.
- They must be simple, readable, and easy to update.
- They are the source of truth for cross-agent continuity.

### Agents = Stateless Workers

Agents are stateless workers.

- Agents do not rely on hidden memory between tasks.
- Agents read the relevant markdown shared memory before acting.
- Agents execute the requested work using the approved workflows and skills.
- Agents write durable knowledge back to markdown when the task changes approved operating knowledge.

### Skills = Execution Protocols

Skills are execution protocols.

- A skill defines how a class of work must be performed.
- A skill is not private memory.
- A skill should be explicit, repeatable, and scoped to one operational responsibility.
- Skills may reference shared markdown memory when they need repository or workflow context.

### repo-context = Reusable Repository Knowledge

`repo-context` is reusable repository knowledge.

- It captures stable facts about the repository structure, conventions, naming, architecture, workflows, and quality expectations.
- It should prevent repeated rediscovery of the same repository facts.
- It must be updated when stable repository knowledge changes.
- It must not replace reading the current source before making code changes.

### Knowledge Separation Rule

Core V2 rule:

```text
Repository Knowledge != PBI Knowledge != Review Knowledge != Execution Memory != Architecture Decisions
```

- Repository Knowledge = reusable codebase knowledge under `docs/ai/repo-context/`.
- PBI Knowledge = task-specific implementation knowledge under `docs/ai/pbi/STP-XXXX/`.
- Review Knowledge = PR/code review knowledge under `docs/ai/reviews/STP-XXXX/`.
- Execution Memory = phase files and follow-up logs that record what agents actually did.
- Architecture Decisions = design, domain, and architecture decisions recorded in `04-decision_log.md`.

## PBI Workflow

PBI work follows an implementation workflow from understanding to verification.

```text
Raw PBI
↓
PBI Clarification
↓
Approved PBI
↓
pbi-workspace-create
```

1. Clarify the raw PBI before workspace creation.
2. Stop when critical information is missing and mark `STATUS: BLOCKED_FOR_CLARIFICATION`.
3. Read relevant shared memory under `docs/ai/`.
4. Inspect the current repository files before deciding on an implementation.
5. Follow existing project patterns, naming, and coding standards.
6. Keep changes scoped to the PBI.
7. Define explicit validation requirements.
8. Update markdown shared memory only when the PBI changes durable operating knowledge.
9. Verify the change with the appropriate project checks when requested or required.
10. Report changed markdown files under `Markdown Files Changed`.

### PBI Workspace File Naming

Official PBI workspace files under `docs/ai/pbi/STP-XXXX/` are:

```text
00-approved-pbi.md
01-context.md
02-implementation-plan.md
03-codebase-index.md
04-decision_log.md
05-validation.md
06-handoff.md
99-metrics.md
phases/
knowledge/
```

`05-validation.md` stores repeatable validation requirements for the PBI.

Required sections:

```markdown
# Build Verification

# Manual Test Scenarios

# Regression Checklist

# Known Risks

# Sign-off Criteria
```

No automated tests does not mean no validation.

`99-metrics.md` stores lightweight workspace observability records for the PBI.

It tracks estimated execution history, phase-level visibility, context efficiency, context expansions, estimated cost, and scope violations.

PBI aggregate metrics are summarized in:

```text
docs/ai/pbi/metrics.md
```

### Implementation Plan Phase Table

`02-implementation-plan.md` must use this phase table format:

```markdown
| Phase | Status | Step | Goal |
|---|---|---|---|
```

`Step` is independent from `Status`.

Each phase must always have exactly one current `Step` value.

Examples:

```text
planned
implementation
implementation-1.1
review
fix
review-followup
handoff
done
```

Skills that execute phase work must update the `Step` column.

## PR Review Workflow

PR review work focuses on correctness, risk, and missing verification.

`pr-review-workflow` is the recommended daily-use entrypoint for local PR/code review.

Lower-level review skills remain available for follow-up, debugging, specialized review, or partial re-run.

1. Read the PR description, diff, and review comments.
2. Identify behavioral regressions, bugs, security issues, maintainability risks, and missing tests.
3. Prioritize findings by severity.
4. Reference exact files and lines when possible.
5. Avoid broad refactors unless they are required to address review feedback.
6. If implementing fixes, keep changes targeted and consistent with existing patterns.
7. Report changed markdown files under `Markdown Files Changed`.

### Review Workspace File Naming

Official Review workspace files under `docs/ai/reviews/STP-XXXX/` are:

```text
01-review-brief.md
02-context.md
03-diff-analysis.md
04-en-pr-comments.md
05-fa-pr-suggestions.md
06-followup-log.md
07-handoff.md
99-metrics.md
```

Review aggregate metrics are summarized in:

```text
docs/ai/reviews/metrics.md
```

Review metrics use estimated values only and must not introduce exact token tracking, external telemetry, non-markdown dashboards, confidence scores, trust metrics, self-correction loops, or autonomous optimization.

## Quality Rules

- Follow existing repository standards, naming, and patterns.
- Keep changes small and directly related to the task.
- Prefer readable, explicit documentation over complex abstractions.
- Do not modify source code when the task is documentation-only.
- Do not create skill files unless the task explicitly approves skill creation.
- Do not run optional tooling unless it is requested or necessary for verification.
- Preserve user changes and avoid reverting unrelated work.

## Context Optimization Rules

- Read only the context needed for the task.
- Prefer durable markdown shared memory for stable operating knowledge.
- Inspect current repository files for implementation details before making changes.
- Avoid rediscovering facts already captured in approved shared memory.
- Keep new documentation concise and structured.
- Move stable repeated knowledge into shared markdown instead of relying on conversation history.
- Preserve quality over numeric context limits.
- Do not use hard token quotas or maximum file counts as a reason to skip necessary context.
- Stop and request approval when extra files, extra phases, or scope expansion are required.

### Context Read Order

Agents should read context in this order:

1. `docs/ai/skills/README.md`
2. Selected skill file
3. Active workspace:
   - `docs/ai/pbi/STP-XXXX/*`
   - or `docs/ai/reviews/STP-XXXX/*`
4. repo-context routing docs:
   - `docs/ai/repo-context/module_map.md`
   - `docs/ai/repo-context/file_index.md`
   - `docs/ai/repo-context/context_budget.md`
5. Exact source files listed in phase, context, or diff

Agents must not read the entire repository, all `docs/ai`, all skills, or the whole codebase unless explicitly required.

Before reading any extra file, the agent must state:

```text
Requested File:

Reason:

Expected Decision Impact:
```

## Markdown Change Reporting Rule

Every response that creates or updates markdown must include a `Markdown Files Changed` section.

The section must list every markdown file changed in the task.

Whenever any markdown file is created, updated, renamed, or deleted, the agent must report it under:

## Markdown Files Changed

For each file:

- File path
- Action: Created / Updated / Renamed / Deleted
- Reason
- Summary of changes
- Whether the change affects future AI context

## Official Skill List

The official V2 skill list is a governed list of approved execution protocols.

Approved skill categories:

- `repo-context`: capture and maintain reusable repository knowledge.
- `pbi-clarification`: convert raw PBIs into structured approved PBIs.
- `pbi-workflow`: execute Product Backlog Item implementation work.
- `pr-review-workflow`: review pull requests and address review feedback.
- `quality-rules`: apply repository quality expectations and verification discipline.
- `context-optimization`: reduce repeated discovery and manage useful context.
- `markdown-change-reporting`: report all markdown documentation changes.

Approved skill files are registered through `docs/ai/skills/README.md`.
