# Step 6.1 - V2 Governance Corrections

# V2 Governance Corrections — Codex Prompt

You are fixing the V2 AI Operating System foundation based on the latest validation checklist result.

Goal:
Apply all required corrections from the V2 validation report so the current implementation fully matches the user's approved V2 requirements.

This is a correction-only task.

## Strict Rules

- Do not modify source code.
- Do not create a real PBI workspace.
- Do not create a real Review workspace.
- Do not run implementation or review workflow.
- Do not rewrite the whole `docs/ai` system.
- Do not rename approved V2 files or folders.
- Keep changes minimal, precise, and governance-focused.
- Only update markdown files under `docs/ai/`.
- Preserve the approved V2 structure.
- Report every markdown file changed under `Markdown Files Changed`.

## Read First

Read these files first:

```text
docs/ai/foundation/v2-validation-checklist.md
docs/ai/foundation/v2-approved-baseline.md
docs/ai/README.md
docs/ai/skills/README.md
docs/ai/repo-context/README.md
docs/ai/pbi/README.md
docs/ai/reviews/README.md
```

Then read the relevant skill files only as needed:

```text
docs/ai/skills/repo-context-update.skill.md
docs/ai/skills/pbi-workspace-create.skill.md
docs/ai/skills/pbi-plan-create.skill.md
docs/ai/skills/implementation-phase.skill.md
docs/ai/skills/review-phase.skill.md
docs/ai/skills/fix-phase.skill.md
docs/ai/skills/pbi-final-handoff.skill.md
docs/ai/skills/review-workspace-create.skill.md
docs/ai/skills/review-diff-analysis.skill.md
docs/ai/skills/review-comments-create.skill.md
docs/ai/skills/review-followup.skill.md
docs/ai/skills/review-final-handoff.skill.md
```

If any listed file is missing, report it and continue with available files.

---

# Required Corrections

## 1. Add Explicit Knowledge Separation Statement

Update the V2 baseline and main docs where appropriate to explicitly include:

```text
Repository Knowledge != PBI Knowledge != Review Knowledge != Execution Memory != Architecture Decisions
```

Define each term:

```text
Repository Knowledge = reusable codebase knowledge under docs/ai/repo-context/
PBI Knowledge = task-specific implementation knowledge under docs/ai/pbi/STP-XXXX/
Review Knowledge = PR/code review knowledge under docs/ai/reviews/STP-XXXX/
Execution Memory = phase files and follow-up logs that record what agents actually did
Architecture Decisions = design/domain/architecture decisions recorded in 04_decision_log.md
```

Make sure this separation is treated as a core V2 rule.

---

## 2. Strengthen PBI Workspace Rules

Update `docs/ai/pbi/README.md`, `docs/ai/foundation/v2-approved-baseline.md`, and relevant PBI skills so they explicitly define:

### `01-context.md`

```text
01-context.md is PBI-specific context.
It must not be a copy of repo-context.
It should contain only the repo-context excerpts, files, risks, constraints, and validation notes relevant to the active PBI.
```

### `implementation-plan.md`

```text
implementation-plan.md is a short roadmap.
It must contain phase names, goals, status, and high-level sequencing only.
It must not contain detailed technical implementation plans.
Detailed plans belong in phases/*.md.
```

### `knowledge/`

```text
knowledge/ is optional.
Create it only when the PBI has reusable PBI-level technical knowledge, overlapping use cases, contracts, mappings, flows, validation rules, or multi-phase concepts.
Do not create unnecessary knowledge files for simple PBIs.
```

### `04_decision_log.md`

```text
04_decision_log.md is only for architecture, domain, and design decisions.
It must not be used for phase execution notes, review comments, todos, or temporary planning notes.
```

### `codebase-index.md`

Require `codebase-index.md` to route:

```text
Phase → Source Files
Phase → Knowledge Files
Phase → Relevant Modules
Phase → Created/Updated Files
Phase → Created/Updated Functions
Function → Purpose
Function → Usage
Function → Related Flow
Function → Validation Focus
Function → Review Focus
```

Make sure `pbi-plan-create` is responsible for creating or updating this file during planning.

---

## 3. Add Exact Markdown Change Reporting Template Everywhere

Every relevant skill must include this exact section or equivalent wording:

```md
## Markdown Change Reporting Rule

Whenever any markdown file is created, updated, renamed, or deleted, the agent must report it under:

## Markdown Files Changed

For each file:

- File path
- Action: Created / Updated / Renamed / Deleted
- Reason
- Summary of changes
- Whether the change affects future AI context
```

Apply this to all official skills:

```text
repo-context-update
pbi-workspace-create
pbi-plan-create
implementation-phase
review-phase
fix-phase
pbi-final-handoff
review-workspace-create
review-diff-analysis
review-comments-create
review-followup
review-final-handoff
```

Also ensure this rule exists in:

```text
docs/ai/README.md
docs/ai/skills/README.md
docs/ai/foundation/v2-approved-baseline.md
```

---

## 4. Add Explicit Context Read Order and Extra File Justification

Update relevant docs and skills so agents follow this read order:

```text
1. docs/ai/skills/README.md
2. Selected skill file
3. Active workspace
   - docs/ai/pbi/STP-XXXX/*
   - or docs/ai/reviews/STP-XXXX/*
4. repo-context routing docs
   - docs/ai/repo-context/module_map.md
   - docs/ai/repo-context/file_index.md
   - docs/ai/repo-context/context_budget.md
5. Exact source files listed in phase, context, or diff
```

Add this rule:

```text
Before reading any extra file, the agent must state:
- file path
- why it is needed
- what decision, risk, or validation it helps evaluate
```

Make sure this applies to:

```text
pbi-plan-create
implementation-phase
review-phase
fix-phase
review-diff-analysis
review-comments-create
review-followup
```

---

## 5. Expand Comment Quality Rules

Update implementation, review, and fix skills to include:

```text
Comment important intent.
Comment important business logic.
Comment important validation rules.
Comment important technical decisions.
Comment compatibility rules or behavior copied from existing codebase patterns.
Avoid obvious comments.
Avoid noisy comments.
Avoid commenting every line.
```

Also include:

```text
Code should remain simple, readable, and aligned with repo conventions.
Avoid over-engineering.
Avoid broad refactoring unless explicitly requested.
Prefer minimal files and minimal lines.
```

---

## 6. Strengthen Review Workflow Details

Update review skills and review README.

### `review-diff-analysis`

Must explicitly include:

```text
Changed files
Affected modules
Affected layers
Risk areas
Behavior changes
Test impact
Missing tests
Files requiring deeper review
Files safe to ignore
```

### `review-comments-create`

Must explicitly create/update both:

```text
en_pr_comments.md
fa_pr_suggestions.md
```

`en_pr_comments.md` must include:

```text
PR.No
Status
Severity
English PR-ready comment
Suggested fix summary
```

`fa_pr_suggestions.md` must include:

```text
PR.No
Deep Persian reasoning
Suggested fixes
Pseudo-code
Alternative solutions
Personal notes
Whether to post or keep internal
```

Every item in both files must be linked by matching `PR.No`.

### `review-followup`

Must explicitly use these status values:

```text
Planned
Done
Ignore
```

Rules:

```text
Only Planned items require follow-up.
Done items must not be rechecked unless explicitly requested.
Ignore items must not be rechecked.
If a fix is incomplete, create a follow-up item like PR-001.1 and reference the parent PR.No.
```

### `review-final-handoff`

Must explicitly include:

```text
Final review decision
Blocking issues
Non-blocking issues
Resolved issues
Ignored issues
Remaining risks
Next action
Ready to merge: Yes/No
```

---

## 7. Add Common Skill Footer Template

To reduce future drift, add a compact common footer either to `docs/ai/skills/README.md` or a new file:

```text
docs/ai/skills/common-skill-rules.md
```

If creating `common-skill-rules.md`, reference it from `docs/ai/skills/README.md`.

It should include:

```text
Markdown Change Reporting Rule
Context Read Order
Extra File Justification Rule
Source Code Modification Rule
repo-context Ownership Rule
Comment Quality Rule
Simplicity Rule
```

Do not use this file as a replacement for required rules inside critical skills; use it as a shared reference.

---

# Validation After Corrections

After applying corrections, update or create:

```text
docs/ai/foundation/v2-governance-corrections.md
```

It must include:

```text
# V2 Governance Corrections

## Summary

## Files Updated

## Corrections Applied

## Remaining Gaps

## Source Code Modified
No

## Ready For Re-validation
Yes/No
```

Then provide a final response with:

```text
1. Summary
2. Files updated
3. Corrections applied by category
4. Remaining gaps, if any
5. Markdown Files Changed
6. Confirmation that source code was not modified
7. Recommended next step
```

## Final Output Requirement

If all corrections were applied successfully, recommend this next step:

```text
Re-run V2 Foundation Validation Checklist.
```
