# V2 Validation Checklist

## Status

Ready With Corrections

## Summary

The V2 foundation is structurally present and the main workflow boundaries are documented. The repository knowledge layer, skills index, PBI workflow, and review workflow files exist with the expected naming and broad scope rules.

Corrections are still needed for stricter checklist compliance around knowledge separation terminology, markdown reporting format, context/token-cost rules, detailed comment standards, and a few workflow-specific details.

## Checked Files

- `docs/ai/foundation/v2-approved-baseline.md`
- `docs/ai/README.md`
- `docs/ai/skills/README.md`
- `docs/ai/repo-context/README.md`
- `docs/ai/pbi/README.md`
- `docs/ai/reviews/README.md`
- `docs/ai/skills/repo-context-update.skill.md`
- `docs/ai/skills/pbi-workspace-create.skill.md`
- `docs/ai/skills/pbi-plan-create.skill.md`
- `docs/ai/skills/implementation-phase.skill.md`
- `docs/ai/skills/review-phase.skill.md`
- `docs/ai/skills/fix-phase.skill.md`
- `docs/ai/skills/pbi-final-handoff.skill.md`
- `docs/ai/skills/review-workspace-create.skill.md`
- `docs/ai/skills/review-diff-analysis.skill.md`
- `docs/ai/skills/review-comments-create.skill.md`
- `docs/ai/skills/review-followup.skill.md`
- `docs/ai/skills/review-final-handoff.skill.md`

## Passed Checks

- Required top-level folders exist under `docs/ai/`.
- `v2-approved-baseline.md` exists and defines Markdown files as shared memory, agents as stateless workers, skills as execution protocols, and repo-context as reusable repository knowledge.
- `docs/ai/repo-context/` contains the expected repo-context files.
- `repo-context-update` is documented as the only skill allowed to update `docs/ai/repo-context/*`.
- Other current skills either explicitly forbid repo-context updates or are scoped away from repo-context.
- `pbi-plan-create` reads repo-context first and does not update repo-context.
- `docs/ai/skills/README.md` lists all official Repository, PBI Workflow, and Review Workflow skills.
- PBI workspace structure uses the expected V2 file and folder names.
- `pbi-workspace-create` creates a skeleton only and forbids planning, source inspection, and source modification.
- Phase files are defined as plan plus execution memory.
- Phase statuses are limited to `Planned Only`, `Planned`, `In Progress`, and `Done`.
- Review workspace structure uses `docs/ai/reviews/STP-XXXX/`.
- Review workflow file names match the requested V2 names.
- Review workflow uses local git diff and `git diff BASE_BRANCH...HEAD`.
- Review workflow forbids PR APIs, PR creation, pushes, and source code modification.
- No outdated official review names such as `00_review_brief.md`, `04_pr_comments.md`, or `05_suggestions.md` were found.

## Failed Checks

- The baseline does not explicitly define the separation statement: `Repository Knowledge != PBI Knowledge != Review Knowledge != Execution Memory != Architecture Decisions`.
- `01-context.md` is not explicitly described as PBI-specific and not a repo-context copy.
- `implementation-plan.md` is not explicitly constrained to be a short roadmap rather than detailed implementation.
- `knowledge/` is not explicitly described as optional and only for reusable PBI knowledge.
- `04_decision_log.md` is not explicitly limited to architecture, domain, and design decisions.
- `codebase-index.md` does not yet explicitly route phases, source files, knowledge files, functions, purpose, usage, validation focus, and review focus.
- `review-diff-analysis` does not explicitly mention affected modules or test impact, although it covers changed files and validation gaps.
- `review-comments-create` does not explicitly require Persian suggestions to include suggested fixes, pseudo-code, alternatives, and personal notes.
- `review-final-handoff` does not explicitly require blocking issues, non-blocking issues, resolved issues, and next action.
- Relevant skills report markdown changes, but they do not include the exact required `## Markdown Files Changed` template with action, reason, summary, and future-context impact.

## Naming Drift

No official naming drift found.

Expected PBI names are used:

- `00-approved-pbi.md`
- `01-context.md`
- `implementation-plan.md`
- `codebase-index.md`
- `04_decision_log.md`
- `06_handoff.md`
- `phases/`
- `knowledge/`

Expected review names are used:

- `review-brief.md`
- `context.md`
- `diff-analysis.md`
- `en_pr_comments.md`
- `fa_pr_suggestions.md`
- `followup-log.md`
- `handoff.md`

## Missing Files

None.

## Inconsistent Rules

- The broad markdown reporting rule exists, but the stricter required reporting block is not consistently defined in each relevant skill.
- Comment quality rules exist in implementation and fix skills, but the full checklist language is not present: comment important intent, business logic, validation rules, and technical decisions; avoid obvious or noisy comments.
- Context optimization exists broadly, but the selected-skill read order is not explicitly documented across skills.

## Source Code Modification Risk

Low.

The review workflow forbids source modification. PBI implementation and fix skills may modify source files only within selected phase or review-finding scope. Documentation-only and planning skills forbid source modification.

## Token Cost / Context Risk

Medium.

The foundation and repo-context rules discourage broad reads, full repository trees, and unrelated source inspection. However, the checklist-required read order is not fully documented:

1. `skills/README.md`
2. selected skill
3. active workspace
4. repo-context routing docs
5. exact source files listed in phase, context, or diff

Skills also do not explicitly require agents to justify extra file reads by stating file path, why it is needed, and what decision it helps make.

## Required Corrections

- Add the explicit knowledge separation statement to the foundation baseline.
- Strengthen PBI workspace rules for `01-context.md`, `implementation-plan.md`, `knowledge/`, `04_decision_log.md`, and `codebase-index.md`.
- Add the exact `## Markdown Files Changed` reporting template to all relevant skills.
- Add explicit context read-order and extra-file-read justification rules.
- Expand comment quality rules to cover intent, business logic, validation rules, technical decisions, and noisy comments.
- Expand review skill details for affected modules, test impact, Persian suggestions, and final handoff categories.

## Optional Improvements

- Add a short common skill footer template to reduce drift across future skills.
- Add a central context-budget rule reference from each workflow guide.
- Add examples for `PR.No`, phase file layout, and final handoff format.

## Final Recommendation

Proceed to a correction step before using V2 as the final approved operating baseline. The current foundation is usable for routing and workflow structure, but it is not fully compliant with the stricter validation checklist.

