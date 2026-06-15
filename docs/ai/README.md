# AI Coding System Documentation

This directory is the shared documentation memory for the AI Multi-Agent Coding Operating System.

## V2 Approved Baseline

The approved V2 foundation baseline is defined in:

- [foundation/v2-approved-baseline.md](foundation/v2-approved-baseline.md)

## V2.1 Essential Additions

V2.1 preserves the V2 principles and adds three operational improvements:

- Raw PBIs must pass through `pbi-clarification` before `pbi-workspace-create`.
- PBI workspaces use `05-validation.md` for explicit validation requirements.
- Context efficiency is quality-preserving and must not rely on hard numeric quotas.

## ObsV1.1 Lightweight Workspace Observability

ObsV1.1 adds markdown-only execution metrics for local troubleshooting and aggregate workflow visibility.

- PBI local metrics: `docs/ai/pbi/STP-XXXX/99-metrics.md`
- PBI dashboard: `docs/ai/pbi/metrics.md`
- Review local metrics: `docs/ai/reviews/STP-XXXX/99-metrics.md`
- Review dashboard: `docs/ai/reviews/metrics.md`

Metrics are estimated and work-item local. Do not use exact token tracking, external telemetry, API-based cost calculation, or non-markdown dashboards.

Context efficiency formulas:

```text
PBI = Files Changed / Files Read
Review = Source Files Reviewed / Files Read
```

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
- Architecture Decisions = design, domain, and architecture decisions recorded in `04-decision_log.md`.

## Markdown Change Reporting Rule

Whenever any markdown file is created, updated, renamed, or deleted, the agent must report it under:

## Markdown Files Changed

For each file:

- File path
- Action: Created / Updated / Renamed / Deleted
- Reason
- Summary of changes
- Whether the change affects future AI context
