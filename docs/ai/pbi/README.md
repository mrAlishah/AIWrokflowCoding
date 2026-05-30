# PBI Workflow Guide

Use this workflow for implementing an approved Product Backlog Item.

## Flow

1. ChatGPT creates the Approved PBI.
   - The approved PBI defines the requested outcome, acceptance criteria, and constraints.

2. Run `pbi-workspace-create`.
   - Creates `docs/ai/pbi/STP-XXXX/`.
   - Records the approved PBI.
   - Creates placeholders only.
   - Does not plan or inspect source code.

3. Run `pbi-plan-create`.
   - Reads repo-context first.
   - Creates task context, implementation plan, codebase index, and phase files.
   - May inspect source code only when repo-context is missing or insufficient.
   - Does not update repo-context.

4. Run `implementation-phase`.
   - Executes one selected phase.
   - Reads only the implementation plan, selected phase file, and source files listed in that phase.
   - Updates the selected phase file after execution.

5. Run `review-phase`.
   - Reviews the implementation diff for correctness, scope, architecture, standards, comments, and tests.
   - Does not apply fixes unless explicitly requested.

6. Run `fix-phase`.
   - Applies only review findings.
   - Avoids unrelated cleanup or refactor.

7. Run `pbi-final-handoff`.
   - Updates `06_handoff.md`.
   - Summarizes changed files, validation, risks, PR summary, and review focus.

## Rules

- Keep changes scoped to the PBI.
- Follow repo conventions.
- Prefer minimal files and minimal lines.
- Report markdown changes under `Markdown Files Changed`.

## Workspace File Rules

- `00-approved-pbi.md` is the source of truth for the approved PBI.
- `01-context.md` is PBI-specific context. It must not be a copy of repo-context. It should contain only the repo-context excerpts, files, risks, constraints, and validation notes relevant to the active PBI.
- `implementation-plan.md` is a short roadmap. It must contain phase names, goals, status, and high-level sequencing only. It must not contain detailed technical implementation plans. Detailed plans belong in `phases/*.md`.
- `codebase-index.md` routes phases, source files, knowledge files, relevant modules, created or updated files, created or updated functions, function purpose, usage, related flow, validation focus, and review focus.
- `04_decision_log.md` is only for architecture, domain, and design decisions. It must not be used for phase execution notes, review comments, todos, or temporary planning notes.
- `knowledge/` is optional. Create it only when the PBI has reusable PBI-level technical knowledge, overlapping use cases, contracts, mappings, flows, validation rules, or multi-phase concepts. Do not create unnecessary knowledge files for simple PBIs.
- `phases/*.md` files are plan plus execution memory.
