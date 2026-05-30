# V2 Foundation Validation Checklist — Codex Prompt

You are validating the currently implemented AI Multi-Agent Coding Operating System V2.

Goal:
Check whether the current repository implementation of `docs/ai` matches the V2 Approved Baseline and the user's confirmed requirements.

Important:
This is a validation-only task.

Rules:

- Do not modify source code.
- Do not modify markdown files unless explicitly needed to create a validation report.
- Prefer creating/updating only:
  - `docs/ai/foundation/v2-validation-checklist.md`

- Do not run implementation.
- Do not create PBI or Review workspaces.
- Do not rewrite existing skills.
- Do not read the whole repository.
- Do not read all source code.
- Validate structure, content, naming, boundaries, and workflow consistency.
- Report every markdown file created or updated under `Markdown Files Changed`.

Read first:

- `docs/ai/foundation/v2-approved-baseline.md`
- `docs/ai/README.md`
- `docs/ai/skills/README.md`
- `docs/ai/repo-context/README.md`
- `docs/ai/pbi/README.md`
- `docs/ai/reviews/README.md`
- all skill files listed in `docs/ai/skills/README.md`

If a listed file does not exist, report it as missing.

Do not read source code unless a validation item explicitly requires checking whether repo-context points to real paths. If source inspection is needed, inspect only file existence or minimal paths.

## Validation Checklist

Check the following:

### 1. Global V2 Structure

Verify these folders exist:

```text
docs/ai/
docs/ai/foundation/
docs/ai/repo-context/
docs/ai/skills/
docs/ai/pbi/
docs/ai/reviews/
```

Verify the system clearly defines:

```text
Markdown Files = Shared Memory
Agents = Stateless Workers
Skills = Execution Protocols
Repository Knowledge != PBI Knowledge != Review Knowledge != Execution Memory != Architecture Decisions
```

### 2. repo-context Layer

Verify `docs/ai/repo-context/` exists and contains or defines the expected files:

```text
README.md
architecture.md
module_map.md
file_index.md
codebase-index.md
domain_glossary.md
coding_standards.md
context_budget.md
test_strategy.md
workflow.md
```

Verify:

- repo-context is defined as reusable repository knowledge.
- only `repo-context-update` may update repo-context.
- all other skills treat repo-context as read-only.
- repo-context-update is documented as the only ownership skill.
- pbi-plan-create uses repo-context first before source inspection.

### 3. Skills Index

Verify `docs/ai/skills/README.md` lists all official skills:

Repository:

```text
repo-context-update
```

PBI Workflow:

```text
pbi-workspace-create
pbi-plan-create
implementation-phase
review-phase
fix-phase
pbi-final-handoff
```

Review Workflow:

```text
review-workspace-create
review-diff-analysis
review-comments-create
review-followup
review-final-handoff
```

Verify the README helps agents select one skill without reading all skill files.

### 4. PBI Workflow

Verify PBI workspace is documented as:

```text
docs/ai/pbi/STP-XXXX/

00-approved-pbi.md
01-context.md
implementation-plan.md
codebase-index.md
04_decision_log.md
06_handoff.md

phases/
knowledge/
```

Verify:

- `00-approved-pbi.md` is the source of truth.
- `01-context.md` is PBI-specific and not a repo-context copy.
- `implementation-plan.md` is a short roadmap, not detailed implementation.
- `phases/` files are Plan + Execution Memory.
- phase statuses are exactly:
  - Planned Only
  - Planned
  - In Progress
  - Done

- `knowledge/` is optional and only for reusable PBI knowledge.
- `04_decision_log.md` is for architecture/domain/design decisions only.
- `codebase-index.md` routes phases, source files, knowledge files, functions, purpose, usage, validation focus, and review focus.

### 5. PBI Skills

Verify:

#### pbi-workspace-create

- creates only workspace skeleton.
- does not do planning.
- does not inspect source code.
- does not modify source code.

#### pbi-plan-create

- reads repo-context first.
- only inspects source code if repo-context is missing, outdated, or insufficient.
- does not update repo-context.
- creates/updates:
  - `01-context.md`
  - `implementation-plan.md`
  - `codebase-index.md`
  - `phases/*.md`
  - `knowledge/*` only if needed
  - `04_decision_log.md` only if decisions exist.

#### implementation-phase

- executes only one phase.
- reads only implementation-plan, selected phase file, and listed source files.
- updates the phase file after execution.

#### review-phase

- reviews implementation diff.
- checks correctness, scope, architecture, standards, comments, tests, simplicity.
- does not fix unless explicitly requested.

#### fix-phase

- applies only review findings.
- avoids unrelated cleanup or refactor.

#### pbi-final-handoff

- updates `06_handoff.md`.
- includes PR-ready summary, risks, validation, changed files, review focus.

### 6. PR / Code Review Workflow

Verify Review workspace is documented as:

```text
docs/ai/reviews/STP-XXXX/

review-brief.md
context.md
diff-analysis.md
en_pr_comments.md
fa_pr_suggestions.md
followup-log.md
handoff.md
```

Important:
These exact file names must be used.
Old names such as `00_review_brief.md`, `04_pr_comments.md`, or `05_suggestions.md` should be reported as outdated if they remain as the official structure.

Verify:

- review workflow uses local git diff only.
- review branch is manually checked out by the user.
- review uses `git diff BASE_BRANCH...HEAD`.
- review skills do not call external PR APIs.
- review skills do not modify source code.
- review skills only update `docs/ai/reviews/STP-XXXX/*`.

### 7. Review Skills

Verify:

#### review-workspace-create

- creates the review workspace.
- writes review brief and placeholders.
- does not analyze full diff deeply.
- does not modify source code.

#### review-diff-analysis

- analyzes local diff.
- identifies changed files, affected modules, risk areas, test impact.
- updates `diff-analysis.md`.

#### review-comments-create

- creates both:
  - `en_pr_comments.md`
  - `fa_pr_suggestions.md`

- English comments are short, actionable, PR-ready.
- Persian suggestions include deeper reasoning, suggested fixes, pseudo-code, alternatives, personal notes.
- items are linked by matching `PR.No`.

#### review-followup

- checks only items with `Status: Planned`.
- updates status to:
  - Planned
  - Done
  - Ignore

- creates follow-up comments like `PR-001.1` when needed.

#### review-final-handoff

- summarizes final review decision.
- includes blocking issues, non-blocking issues, resolved issues, remaining risks, and next action.

### 8. Quality Rules

Verify implementation and review skills enforce:

```text
Repository naming conventions
Coding standards
Architecture boundaries
Comment standards
Simple code
Minimal files
Minimal lines
No over-engineering
No broad refactoring
```

Verify comment rules say:

- comment important intent.
- comment important business logic.
- comment important validation rules.
- comment important technical decisions.
- avoid obvious/noisy comments.

### 9. Context / Token Cost Rules

Verify skills instruct agents not to:

```text
Read entire repository
Read all docs/ai
Read all skills
Analyze whole codebase
```

Verify correct read order is documented:

```text
1. skills/README.md
2. selected skill
3. active workspace
4. repo-context routing docs
5. exact source files listed in phase/context/diff
```

Verify agents must justify extra file reads by stating:

- file path
- why it is needed
- what decision it helps make.

### 10. Markdown Change Reporting Rule

Verify all relevant skills include:

```text
## Markdown Files Changed

- File path
- Action: Created / Updated / Renamed / Deleted
- Reason
- Summary of changes
- Whether the change affects future AI context
```

### 11. Naming Consistency

Check for naming drift.

Expected V2 names:

PBI:

```text
00-approved-pbi.md
01-context.md
implementation-plan.md
codebase-index.md
04_decision_log.md
06_handoff.md
phases/
knowledge/
```

Review:

```text
review-brief.md
context.md
diff-analysis.md
en_pr_comments.md
fa_pr_suggestions.md
followup-log.md
handoff.md
```

Report any older names still used as official names.

### 12. Final Validation Report

Create or update:

```text
docs/ai/foundation/v2-validation-checklist.md
```

The report must include:

```text
# V2 Validation Checklist

## Status
Ready / Not Ready / Ready With Corrections

## Summary

## Checked Files

## Passed Checks

## Failed Checks

## Naming Drift

## Missing Files

## Inconsistent Rules

## Source Code Modification Risk

## Token Cost / Context Risk

## Required Corrections

## Optional Improvements

## Final Recommendation
```

Final response must include:

1. Validation status
2. Key failures, if any
3. Required corrections
4. Optional improvements
5. Markdown Files Changed
6. Confirmation that source code was not modified
7. Recommended next step

```

```
