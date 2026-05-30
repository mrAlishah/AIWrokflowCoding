# Skills Index

This index routes work to the official V2 skills.

Common rules for all skills are defined in [common-skill-rules.md](common-skill-rules.md).

## Repository

| Skill | Purpose | When To Use | Required Parameters | Allowed File Scope | Forbidden Actions |
| --- | --- | --- | --- | --- | --- |
| `repo-context-update` | Refresh reusable repository knowledge. | Use only when explicitly invoked to update repo-context. | update reason, repository areas to inspect | `docs/ai/repo-context/*` | modifying source code; updating non repo-context files; dumping full repository trees |

## PBI Workflow

| Skill | Purpose | When To Use | Required Parameters | Allowed File Scope | Forbidden Actions |
| --- | --- | --- | --- | --- | --- |
| `pbi-workspace-create` | Create the working documentation space for a PBI. | Start of a PBI workflow. | PBI id, title, source request | PBI workspace under `docs/ai/` | modifying source code; updating repo-context |
| `pbi-plan-create` | Turn a PBI into a scoped implementation plan. | After PBI workspace creation and before implementation. | PBI id, acceptance criteria, constraints | PBI workspace under `docs/ai/` | modifying source code; updating repo-context |
| `implementation-phase` | Implement the approved PBI plan. | When the plan is ready for code or documentation changes. | PBI id, approved plan, target files | files allowed by the PBI plan | unrelated refactors; updating repo-context; changing scope without approval |
| `review-phase` | Review implemented PBI work before fixes. | After implementation and before final fixes. | PBI id, changed files, acceptance criteria | PBI workspace and changed files | broad rewrites; updating repo-context |
| `fix-phase` | Apply targeted fixes from review findings. | When review-phase identifies required fixes. | PBI id, review findings, target fixes | files required for approved fixes | unrelated cleanup; updating repo-context |
| `pbi-final-handoff` | Summarize completion and verification. | At the end of a PBI workflow. | PBI id, summary, verification results | PBI workspace under `docs/ai/` | modifying source code; updating repo-context |

## Review Workflow

| Skill | Purpose | When To Use | Required Parameters | Allowed File Scope | Forbidden Actions |
| --- | --- | --- | --- | --- | --- |
| `review-workspace-create` | Create the working documentation space for a review. | Start of a PR or code review workflow. | review id, source branch or PR, target branch | review workspace under `docs/ai/` | modifying source code; updating repo-context |
| `review-diff-analysis` | Analyze the diff for risk and behavior changes. | After review workspace creation. | review id, diff source, files changed | review workspace under `docs/ai/` | modifying source code; updating repo-context |
| `review-comments-create` | Produce actionable review comments. | After diff analysis. | review id, findings, severity | review workspace under `docs/ai/` | modifying source code; inventing findings; updating repo-context |
| `review-followup` | Re-check changes after review feedback is addressed. | When a review receives updates or responses. | review id, previous findings, new diff | review workspace under `docs/ai/` | unrelated implementation; updating repo-context |
| `review-final-handoff` | Summarize review outcome and residual risk. | At the end of a review workflow. | review id, final findings, verification notes | review workspace under `docs/ai/` | modifying source code; updating repo-context |

## Markdown Change Reporting Rule

Whenever any markdown file is created, updated, renamed, or deleted, the agent must report it under:

## Markdown Files Changed

For each file:

- File path
- Action: Created / Updated / Renamed / Deleted
- Reason
- Summary of changes
- Whether the change affects future AI context

## Context Read Order

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

Do not read the entire repository, all `docs/ai`, all skills, or the whole codebase unless explicitly required.

Before reading any extra file, state:

- file path
- why it is needed
- what decision, risk, or validation it helps evaluate
