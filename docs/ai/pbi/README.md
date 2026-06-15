# PBI Workflow Guide

Use this workflow for clarifying and implementing a Product Backlog Item.

## Flow

1. Run `pbi-clarification`.
   - Converts a raw PBI into an implementation-ready approved PBI.
   - Identifies ambiguities, missing information, assumptions, risks, and Product Manager questions.
   - Writes `STATUS: BLOCKED_FOR_CLARIFICATION` when critical information is missing.

2. Run `pbi-workspace-create`.
   - Creates `docs/ai/pbi/STP-XXXX/`.
   - Records the approved PBI.
   - Creates placeholders only.
   - Does not plan or inspect source code.
   - Must not continue when `00-approved-pbi.md` contains `STATUS: BLOCKED_FOR_CLARIFICATION`.
   - Creates `99-metrics.md` for PBI-local execution metrics.

3. Run `pbi-plan-create`.
   - Reads repo-context first.
   - Creates task context, implementation plan, codebase index, validation requirements, and phase files.
   - May inspect source code only when repo-context is missing or insufficient.
   - Does not update repo-context.
   - Appends execution metrics and updates `docs/ai/pbi/metrics.md`.

4. Run `implementation-phase`.
   - Executes one selected phase.
   - Reads the implementation plan, validation file, selected phase file, and source files listed in that phase.
   - Updates the selected phase file after execution.

5. Run `review-phase`.
   - Reviews the implementation diff for correctness, scope, architecture, standards, comments, and tests.
   - Reads and updates `05-validation.md` when validation gaps or risks are found.
   - Does not apply fixes unless explicitly requested.

6. Run `fix-phase`.
   - Applies only review findings.
   - Updates `05-validation.md` when fixes change validation requirements.
   - Avoids unrelated cleanup or refactor.

7. Run `pbi-final-handoff`.
   - Updates `06-handoff.md`.
   - Summarizes changed files, validation, risks, PR summary, and review focus.

## Rules

- Keep changes scoped to the PBI.
- Follow repo conventions.
- Prefer minimal files and minimal lines.
- Define explicit validation even when automated tests do not exist.
- Report markdown changes under `Markdown Files Changed`.
- Append execution metrics to `99-metrics.md`.
- Update aggregate PBI metrics in `docs/ai/pbi/metrics.md`.

## Workspace File Rules

- `00-approved-pbi.md` is the source of truth for the approved PBI.
- `01-context.md` is PBI-specific context. It must not be a copy of repo-context. It should contain only the repo-context excerpts, files, risks, constraints, and validation notes relevant to the active PBI.
- `02-implementation-plan.md` is a short roadmap. It must contain phase names, status, current step, goals, and high-level sequencing only. It must not contain detailed technical implementation plans. Detailed plans belong in `phases/*.md`.
- The phase table in `02-implementation-plan.md` must use `| Phase | Status | Step | Goal |`.
- `Step` is independent from `Status` and records the latest completed or active workflow step for the phase, such as `planned`, `implementation`, `review`, `fix`, `review-followup`, `handoff`, or `done`.
- `03-codebase-index.md` routes phases, source files, knowledge files, relevant modules, created or updated files, created or updated functions, function purpose, usage, related flow, validation focus, and review focus.
- `04-decision_log.md` is only for architecture, domain, and design decisions. It must not be used for phase execution notes, review comments, todos, or temporary planning notes.
- `05-validation.md` stores explicit and repeatable validation requirements with build verification, manual test scenarios, regression checklist, known risks, and sign-off criteria.
- `99-metrics.md` stores PBI-local execution history, phase-level visibility, context efficiency, context expansions, estimated cost, and scope violations.
- `knowledge/` is the official folder name for reusable PBI-level knowledge. It is optional for simple PBIs. Create it only when the PBI has reusable PBI-level technical knowledge, overlapping use cases, contracts, mappings, flows, validation rules, or multi-phase concepts. Do not create unnecessary knowledge files for simple PBIs.
- `phases/*.md` files are plan plus execution memory.

## Metrics

PBI metrics are local to the PBI workspace and summarized centrally.

- Local metrics: `docs/ai/pbi/STP-XXXX/99-metrics.md`
- Dashboard: `docs/ai/pbi/metrics.md`

PBI context efficiency ratio:

```text
Files Changed / Files Read
```

Use estimated metrics. Do not track exact tokens or external telemetry.
