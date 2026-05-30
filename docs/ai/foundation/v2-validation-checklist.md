# V2 Validation Checklist

## Status

Needs Correction

## Summary

The V2 AI Operating System foundation mostly matches the approved baseline and the user's confirmed requirements. The current `docs/ai` structure defines shared markdown memory, stateless agents, execution-protocol skills, repository context ownership, PBI workflow, review workflow, quality rules, context cost rules, and markdown change reporting.

The latest governance corrections and official workspace naming have been applied. Naming cleanup passed, but skill rule deduplication drift was found during re-validation. No source code inspection or source code modification was needed.

## Checked Files

- `docs/ai/foundation/v2-approved-baseline.md`
- `docs/ai/foundation/v2-workspace-naming.md`
- `docs/ai/START_HERE.md`
- `docs/ai/README.md`
- `docs/ai/skills/README.md`
- `docs/ai/skills/common-skill-rules.md`
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
- `setup-prompts/README.md`
- `setup-prompts/legacy/README.md`

## Passed Checks

- Required top-level folders exist:
  - `docs/ai/`
  - `docs/ai/foundation/`
  - `docs/ai/repo-context/`
  - `docs/ai/skills/`
  - `docs/ai/pbi/`
  - `docs/ai/reviews/`
- The system clearly defines:
  - Markdown Files = Shared Memory
  - Agents = Stateless Workers
  - Skills = Execution Protocols
  - `Repository Knowledge != PBI Knowledge != Review Knowledge != Execution Memory != Architecture Decisions`
- `docs/ai/repo-context/` contains the expected files:
  - `README.md`
  - `architecture.md`
  - `module_map.md`
  - `file_index.md`
  - `codebase-index.md`
  - `domain_glossary.md`
  - `coding_standards.md`
  - `context_budget.md`
  - `test_strategy.md`
  - `workflow.md`
- repo-context is defined as reusable repository knowledge.
- `repo-context-update` is documented as the only skill allowed to update repo-context.
- Other skills treat repo-context as read-only by explicit rule or by scoped write boundaries.
- `pbi-plan-create` reads repo-context first and does not update repo-context.
- `docs/ai/skills/README.md` lists all official Repository, PBI Workflow, and Review Workflow skills.
- `docs/ai/skills/README.md` is useful for routing and references common skill rules.
- `docs/ai/START_HERE.md` provides the daily operational entry point and prevents broad documentation reads.
- PBI workspace structure is documented with the expected V2 names.
- PBI workspace naming is consistent across baseline, PBI guide, validation report, workspace naming report, and PBI skills.
- `00-approved-pbi.md` is documented as the source of truth.
- `01-context.md` is documented as PBI-specific and not a repo-context copy.
- `02-implementation-plan.md` is documented as a short roadmap, not detailed implementation.
- Phase files are documented as plan plus execution memory.
- Phase statuses are exactly:
  - `Planned Only`
  - `Planned`
  - `In Progress`
  - `Done`
- `knowledge/` is documented as optional and only for reusable PBI-level knowledge.
- `04-decision_log.md` is documented as architecture, domain, and design decisions only.
- `03-codebase-index.md` routes phases, source files, knowledge files, functions, purpose, usage, validation focus, and review focus.
- PBI skills enforce the expected workspace, planning, implementation, review, fix, and handoff boundaries.
- Review workspace structure is documented with the expected V2 names.
- Review workspace naming is consistent across baseline, Review guide, validation report, workspace naming report, and Review skills.
- Review workflow uses local git diff only and `git diff BASE_BRANCH...HEAD`.
- Review branch checkout is documented as a manual user action.
- Review skills forbid external PR APIs, PR creation, pushes, and source code modification.
- Review skills write only under `docs/ai/reviews/STP-XXXX/*`.
- Review skills define English PR comments, Persian suggestions, follow-up status handling, and final handoff requirements.
- Implementation and review skills enforce repository conventions, coding standards, architecture boundaries, comment standards, simple code, minimal files, minimal lines, no over-engineering, and no broad refactoring.
- Comment rules cover important intent, business logic, validation rules, technical decisions, and avoiding obvious or noisy comments.
- Context and token-cost rules forbid reading the entire repository, all `docs/ai`, all skills, or the whole codebase unless explicitly required.
- Context read order is documented.
- Extra file read justification is documented.
- All official skills reference `common-skill-rules.md`.
- `setup-prompts/` is separated from runtime usage and points agents back to `docs/ai/START_HERE.md`.
- Retired naming migration prompts were removed from active and legacy setup prompts.
- No references to retired naming migration documents remain in active docs or setup prompts.

## Failed Checks

- Phase 4 deduplication drift: official skill files still contain duplicated shared sections already defined in `docs/ai/skills/common-skill-rules.md`.
- Duplicated sections found in skill files include `Context Read Order` and `Markdown Change Reporting Rule`.
- Some skill files also repeat shared simplicity and comment-quality rules that should live in `common-skill-rules.md` unless they are scope-specific.

## Naming Drift

No official naming drift found.

Expected PBI names are used:

- `00-approved-pbi.md`
- `01-context.md`
- `02-implementation-plan.md`
- `03-codebase-index.md`
- `04-decision_log.md`
- `05` reserved unused
- `06-handoff.md`
- `phases/`
- `knowledge/`

Expected review names are used:

- `01-review-brief.md`
- `02-context.md`
- `03-diff-analysis.md`
- `04-en-pr-comments.md`
- `05-fa-pr-suggestions.md`
- `06-followup-log.md`
- `07-handoff.md`

## Missing Files

None.

## Inconsistent Rules

- `docs/ai/skills/common-skill-rules.md` is referenced by every official skill, but duplicated common-rule sections still exist inside the skill files.
- This does not break workflow semantics, but it increases token cost and creates future drift risk.

## Source Code Modification Risk

Low.

Documentation-only, planning, and review workflow skills forbid source code modification. Implementation and fix skills allow source changes only within selected phase or review-finding scope.

## Token Cost / Context Risk

Low.

The foundation, skills index, and common skill rules document the approved read order and forbid broad repository or documentation reads unless explicitly required. Relevant skills also require agents to justify extra file reads.

## Required Corrections

- Re-apply Phase 4 cleanup conservatively:
  - Keep `This skill follows common-skill-rules.md.` in each skill.
  - Remove duplicated `Context Read Order` and `Markdown Change Reporting Rule` sections from skill files.
  - Keep all scope-specific rules, allowed file scopes, forbidden actions, workspace names, and workflow-specific protocols.

## Optional Improvements

- Add short examples for phase file layout, `PR.No` comment format, and `06-handoff.md` output.
- Add a future validation checklist that can be reused after every governance update.

## Final Recommendation

Correct the Phase 4 skill deduplication drift, then re-run this validation checklist. Naming cleanup itself is valid and should not be reverted.
