# AI Coding System Documentation

This directory is the shared documentation memory for the AI Multi-Agent Coding Operating System.

## V2 Approved Baseline

The approved V2 foundation baseline is defined in:

- [foundation/v2-approved-baseline.md](foundation/v2-approved-baseline.md)

## Documentation Rules

- Markdown files are shared memory.
- Keep documentation simple, readable, and operational.
- Update documentation when repository knowledge, workflow rules, or approved practices change.
- Report markdown changes in every response under `Markdown Files Changed`.

## Knowledge Separation

Core V2 rule:

```text
Repository Knowledge != PBI Knowledge != Review Knowledge != Execution Memory != Architecture Decisions
```

- Repository Knowledge = reusable codebase knowledge under `docs/ai/repo-context/`.
- PBI Knowledge = task-specific implementation knowledge under `docs/ai/pbi/STP-XXXX/`.
- Review Knowledge = PR/code review knowledge under `docs/ai/reviews/STP-XXXX/`.
- Execution Memory = phase files and follow-up logs that record what agents actually did.
- Architecture Decisions = design, domain, and architecture decisions recorded in `04_decision_log.md`.

## Markdown Change Reporting Rule

Whenever any markdown file is created, updated, renamed, or deleted, the agent must report it under:

## Markdown Files Changed

For each file:

- File path
- Action: Created / Updated / Renamed / Deleted
- Reason
- Summary of changes
- Whether the change affects future AI context
