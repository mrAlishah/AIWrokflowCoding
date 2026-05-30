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
- Architecture Decisions = design, domain, and architecture decisions recorded in `04_decision_log.md`.

## PBI Workflow

PBI work follows an implementation workflow from understanding to verification.

1. Read the PBI and identify the requested outcome.
2. Read relevant shared memory under `docs/ai/`.
3. Inspect the current repository files before deciding on an implementation.
4. Follow existing project patterns, naming, and coding standards.
5. Keep changes scoped to the PBI.
6. Update markdown shared memory only when the PBI changes durable operating knowledge.
7. Verify the change with the appropriate project checks when requested or required.
8. Report changed markdown files under `Markdown Files Changed`.

## PR Review Workflow

PR review work focuses on correctness, risk, and missing verification.

1. Read the PR description, diff, and review comments.
2. Identify behavioral regressions, bugs, security issues, maintainability risks, and missing tests.
3. Prioritize findings by severity.
4. Reference exact files and lines when possible.
5. Avoid broad refactors unless they are required to address review feedback.
6. If implementing fixes, keep changes targeted and consistent with existing patterns.
7. Report changed markdown files under `Markdown Files Changed`.

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

- file path
- why it is needed
- what decision, risk, or validation it helps evaluate

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

Initial approved skill categories:

- `repo-context`: capture and maintain reusable repository knowledge.
- `pbi-workflow`: execute Product Backlog Item implementation work.
- `pr-review-workflow`: review pull requests and address review feedback.
- `quality-rules`: apply repository quality expectations and verification discipline.
- `context-optimization`: reduce repeated discovery and manage useful context.
- `markdown-change-reporting`: report all markdown documentation changes.

No skill files are created in this baseline step.
