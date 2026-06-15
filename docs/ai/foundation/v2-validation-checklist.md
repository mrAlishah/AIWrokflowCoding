# V2 Validation Checklist

## Status

Ready

## Summary

The V2 AI Operating System foundation matches the approved baseline and the user's confirmed requirements. The current `docs/ai` structure defines shared markdown memory, stateless agents, execution-protocol skills, repository context ownership, PBI workflow, review workflow, quality rules, context efficiency rules, validation rules, and markdown change reporting.

The V2.1 Essential update is included: mandatory PBI clarification, explicit `05-validation.md`, and quality-preserving context efficiency without hard numeric quotas.

ObsV1.1 Lightweight Workspace Observability is included: local `99-metrics.md` files, central markdown dashboards, estimated metrics, and context efficiency ratios without exact token tracking or external telemetry.

V2.3 Docs/AI Context Optimization is included: global rules are centralized in `docs/ai/governance/`, skill files use the compact V2.3 section model, and README files are routing-focused.

The latest validation re-run confirmed that root-level `AGENTS.md` and `CLAUDE.md` exist and align with the Claude compatibility contract. No source code inspection or source code modification was needed.

## Checked Files

- `docs/ai/foundation/v2-approved-baseline.md`
- `docs/ai/foundation/v2-workspace-naming.md`
- `AGENTS.md`
- `CLAUDE.md`
- `docs/ai/START_HERE.md`
- `docs/ai/README.md`
- `docs/ai/governance/common-rules.md`
- `docs/ai/governance/context-efficiency.md`
- `docs/ai/governance/markdown-reporting.md`
- `docs/ai/governance/observability.md`
- `docs/ai/skills/README.md`
- `docs/ai/skills/common-skill-rules.md`
- `docs/ai/skills/docs-ai-cleanup-audit.skill.md`
- `docs/ai/skills/policy-plan-update.skill.md`
- `docs/ai/skills/review-feedback-analysis.skill.md`
- `docs/ai/repo-context/README.md`
- `docs/ai/repo-context/code-policies.md`
- `docs/ai/repo-context/coding_standards.md`
- `docs/ai/pbi/README.md`
- `docs/ai/pbi/metrics.md`
- `docs/ai/reviews/README.md`
- `docs/ai/reviews/metrics.md`
- `docs/ai/skills/repo-context-update.skill.md`
- `docs/ai/skills/pbi-clarification.skill.md`
- `docs/ai/skills/pbi-workspace-create.skill.md`
- `docs/ai/skills/pbi-plan-create.skill.md`
- `docs/ai/skills/implementation-phase.skill.md`
- `docs/ai/skills/review-phase.skill.md`
- `docs/ai/skills/fix-phase.skill.md`
- `docs/ai/skills/pbi-final-handoff.skill.md`
- `docs/ai/skills/review-workspace-create.skill.md`
- `docs/ai/skills/pr-review-workflow.skill.md`
- `docs/ai/skills/review-diff-analysis.skill.md`
- `docs/ai/skills/review-comments-create.skill.md`
- `docs/ai/skills/review-followup.skill.md`
- `docs/ai/skills/review-final-handoff.skill.md`
- `setup-prompts/README.md`
- `setup-prompts/legacy/README.md`
- `docs/ai/foundation/review-feedback-workflow-validation.md`
- `docs/ai/foundation/claude-compatibility-validation.md`

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
- `AGENTS.md` is the shared agent entry contract.
- `CLAUDE.md` is the Claude-specific adapter.
- Claude compatibility requires `AGENTS.md`, `CLAUDE.md`, `docs/ai/START_HERE.md`, and `docs/ai/skills/README.md` as the cold-start entry set.
- `docs/ai/START_HERE.md` distinguishes cold-start agent entry from daily runtime routing.
- Claude must select one approved skill and execute one skill at a time.
- Claude has explicit stop conditions for unclear scope, missing workspaces, disallowed updates, source code safety, and insufficient tool access.
- `docs/ai/foundation/claude-compatibility-validation.md` reports Claude compatibility as ready for pilot.
- `docs/ai/repo-context/` contains the expected files:
  - `README.md`
  - `architecture.md`
  - `module_map.md`
  - `file_index.md`
  - `codebase-index.md`
  - `domain_glossary.md`
  - `coding_standards.md`
  - `code-policies.md`
  - `context_budget.md`
  - `test_strategy.md`
  - `workflow.md`
- repo-context is defined as reusable repository knowledge.
- `repo-context-update` is documented as the only skill allowed to update repo-context.
- `docs-ai-cleanup-audit` is documented as audit/planning only for long-term `docs/ai` cleanup.
- `docs-ai-cleanup-audit` is registered in `docs/ai/skills/README.md`.
- `docs-ai-cleanup-audit` is routed from `docs/ai/START_HERE.md` only for long-term docs cleanup or context-cost audit.
- `docs-ai-cleanup-audit` recommends merge, archive, or delete actions only and does not execute them.
- `docs-ai-cleanup-audit` forbids source code modification, markdown deletion, archiving, renaming, active governance rewriting, repo-context content updates, and PBI/Review workspace creation.
- `policy-plan-update` is documented as the official skill for syncing tagged user answers or policy changes into related planning files.
- `policy-plan-update` is registered in `docs/ai/skills/README.md`.
- `policy-plan-update` is routed from `docs/ai/START_HERE.md` for user answers or policy updates.
- `policy-plan-update` forbids source code modification, implementation, review, PBI/Review workspace creation, broad scope changes, and repo-context updates unless explicitly allowed by `SCOPE`.
- `policy-plan-update` preserves PBI ownership rules for `01-context.md`, `02-implementation-plan.md`, `03-codebase-index.md`, `04-decision_log.md`, `phases/*.md`, and `knowledge/*`.
- `review-feedback-analysis` is documented as the official documentation-only skill for converting human post-PR feedback into RF items inside an existing PBI workspace.
- `review-feedback-analysis` is registered in `docs/ai/skills/README.md`.
- `review-feedback-analysis` resolves workspace files from `PBI_ID` and does not require repeated file paths in user prompts.
- `review-feedback-analysis` creates or updates only PBI review feedback markdown files and does not modify source code.
- RF status values are exactly:
  - `Proposed`
  - `Required`
  - `Ignored`
  - `Done`
  - `Blocked`
- `policy-plan-update` supports `INPUT_TAG: USER_REVIEW_FEEDBACK`.
- `policy-plan-update` can sync RF statuses without requiring `INPUT_SOURCE`, `UPDATE_MODE`, review-feedback path, or RF file paths.
- `policy-plan-update` detects `Required`, `Ignored`, `Blocked`, and `Done` RF items and syncs them into the post-PR review feedback plan.
- `policy-plan-update` supports `INPUT_TAG: USER_CODE_POLICY` with `UPDATE_MODE: apply-global-rule`.
- `policy-plan-update` may update reusable repository policy files under `docs/ai/repo-context/` only for approved global code policy synchronization.
- CP-001 is registered canonically in `docs/ai/repo-context/code-policies.md`.
- `docs/ai/repo-context/code-policies.md` is organized by policy segments: Frontend, Backend, Tests, and Review.
- `AGENTS.md` references `docs/ai/repo-context/code-policies.md` as the active code policy source.
- `CLAUDE.md` extends `AGENTS.md` instead of duplicating it.
- `CLAUDE.md` allows Claude to orchestrate PBI and review workflows only when explicitly asked.
- `CLAUDE.md` requires Claude to execute one approved skill at a time during orchestration.
- `CLAUDE.md` preserves phase boundaries, markdown memory updates, repo-context ownership, and review workflow source-code safety.
- `docs/ai/skills/common-skill-rules.md` references `docs/ai/repo-context/code-policies.md` as the active code policy source.
- `docs/ai/repo-context/coding_standards.md` points to `docs/ai/repo-context/code-policies.md` and does not duplicate full policy text.
- CP-001 requires frontend JavaScript and TypeScript to use `const` by default, `let` only when reassignment is required, and no `var`.
- `implementation-phase`, `fix-phase`, and `review-phase` reference active code policies where they enforce repository coding conventions.
- `fix-phase` supports `PBI_ID` plus `RF_ID` and only applies RF fixes when the RF status is `Required`.
- `review-phase` supports `PBI_ID`, `RF_ID`, and `REVIEW_MODE` for verifying one RF fix.
- `common-skill-rules.md` defines the workspace resolution rule for stable identifiers such as `PBI_ID`, `RF_ID`, and `TAG`.
- `docs/ai/foundation/review-feedback-workflow-validation.md` reports the review feedback workflow as ready for pilot.
- Other skills treat repo-context as read-only by explicit rule or by scoped write boundaries.
- `pbi-plan-create` reads repo-context first and does not update repo-context.
- `pbi-clarification` is registered as the mandatory pre-workspace skill for raw PBIs.
- `pbi-clarification` writes `00-approved-pbi.md` and blocks downstream planning with `STATUS: BLOCKED_FOR_CLARIFICATION` when critical information is missing.
- PBI workspace structure includes `05-validation.md`.
- `05-validation.md` contains build verification, manual test scenarios, regression checklist, known risks, and sign-off criteria.
- `pbi-workspace-create`, `pbi-plan-create`, `implementation-phase`, `review-phase`, `fix-phase`, and `pbi-final-handoff` read or maintain `05-validation.md` according to their workflow role.
- PBI workspace structure includes `99-metrics.md`.
- Review workspace structure includes `99-metrics.md`.
- `docs/ai/pbi/metrics.md` provides the aggregate PBI metrics dashboard.
- `docs/ai/reviews/metrics.md` provides the aggregate Review metrics dashboard.
- Operational PBI skills append execution records to `docs/ai/pbi/STP-XXXX/99-metrics.md` and update `docs/ai/pbi/metrics.md`.
- Operational review skills append execution records to `docs/ai/reviews/STP-XXXX/99-metrics.md` and update `docs/ai/reviews/metrics.md`.
- PBI context efficiency ratio is `Files Changed / Files Read`.
- Review context efficiency ratio is `Source Files Reviewed / Files Read`.
- Phase information is kept only in `99-metrics.md` and not in central dashboards.
- Metrics use estimates and do not require exact token tracking, API-based cost calculations, external telemetry, or non-markdown dashboards.
- Global common rules are centralized in `docs/ai/governance/common-rules.md`.
- Context reading rules are centralized in `docs/ai/governance/context-efficiency.md`.
- Markdown change reporting rules are centralized in `docs/ai/governance/markdown-reporting.md`.
- ObsV1.1 rules are centralized in `docs/ai/governance/observability.md`.
- Skill files use the V2.3 section model: Purpose, Parameters, Read, Steps, Update, Stop Conditions, Final Output, References.
- README files act as routing/index files and avoid long duplicated policy text.
- `docs/ai/skills/common-skill-rules.md` remains only as a compatibility pointer to governance files.
- `docs/ai/skills/README.md` lists all official Repository, PBI Workflow, and Review Workflow skills.
- `docs/ai/skills/README.md` is a short routing index and references common skill rules.
- `docs/ai/skills/README.md` does not duplicate the full markdown change reporting rule or common context read order.
- `docs/ai/START_HERE.md` provides the daily operational entry point and prevents broad documentation reads.
- `docs/ai/START_HERE.md` defines the runtime path as `AGENTS.md -> optional agent-specific file -> START_HERE.md -> skills/README.md -> selected skill -> active workspace -> repo-context only if needed`.
- `docs/ai/START_HERE.md` forbids daily agents from reading foundation docs, setup prompts, or validation reports unless the task requires them.
- PBI workspace structure is documented with the expected V2 names.
- PBI workspace naming is consistent across baseline, PBI guide, validation report, workspace naming report, and PBI skills.
- `00-approved-pbi.md` is documented as the source of truth.
- `01-context.md` is documented as PBI-specific and not a repo-context copy.
- `02-implementation-plan.md` is documented as a short roadmap, not detailed implementation.
- `02-implementation-plan.md` phase tables use `Phase | Status | Step | Goal`.
- `Step` is independent from `Status` and records the latest completed or active workflow step for each phase.
- `implementation-phase`, `review-phase`, `fix-phase`, and `pbi-final-handoff` update the relevant phase `Step` value.
- Phase status values remain unchanged.
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
- `pr-review-workflow` is registered as the recommended daily-use review entrypoint.
- `pr-review-workflow` maps to existing lower-level review skills without renaming or removing them.
- Lower-level review skills remain available for follow-up, debugging, specialized review, and partial re-run.
- Review workflow uses local git diff only and `git diff BASE_BRANCH...HEAD`.
- Review branch checkout is documented as a manual user action.
- Review skills forbid external PR APIs, PR creation, pushes, and source code modification.
- Review skills write only under `docs/ai/reviews/STP-XXXX/*` plus the aggregate dashboard `docs/ai/reviews/metrics.md`.
- Review skills define English PR comments, Persian suggestions, follow-up status handling, and final handoff requirements.
- Implementation and review skills enforce repository conventions, coding standards, architecture boundaries, comment standards, simple code, minimal files, minimal lines, no over-engineering, and no broad refactoring.
- Comment rules cover important intent, business logic, validation rules, technical decisions, and avoiding obvious or noisy comments.
- Context and token-cost rules forbid reading the entire repository, all `docs/ai`, all skills, or the whole codebase unless explicitly required.
- Context efficiency rules preserve quality and explicitly avoid hard token quotas, maximum file limits, and strict context quotas.
- Context read order is documented.
- Extra file read justification is documented.
- All official skills reference `common-skill-rules.md`.
- Duplicated markdown change reporting sections were removed from official skill files because the rule is covered by `common-skill-rules.md`.
- Skill-specific context read order sections were retained where they define execution sequencing and file boundaries.
- `setup-prompts/` is separated from runtime usage and points agents back to `docs/ai/START_HERE.md`.
- Retired naming migration prompts were removed from active and legacy setup prompts.
- No references to retired naming migration documents remain in active docs or setup prompts.
- `docs/ai/foundation/content-cleanup-plan.md` is marked as audit and cleanup planning, not daily runtime context.
- `docs/ai/foundation/content-cleanup-plan.md` references `docs-ai-cleanup-audit` as the future cleanup audit path.
- Foundation governance now requires re-running this checklist after governance edits involving skills, naming, workflow, foundation, `START_HERE.md`, or common rules.

## Failed Checks

None.

## Naming Drift

No official naming drift found.

Expected PBI names are used:

- `00-approved-pbi.md`
- `01-context.md`
- `02-implementation-plan.md`
- `03-codebase-index.md`
- `04-decision_log.md`
- `05-validation.md`
- `06-handoff.md`
- `99-metrics.md`
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
- `99-metrics.md`

## Missing Files

None.

## Inconsistent Rules

None found.

## Source Code Modification Risk

Low.

Documentation-only, planning, and review workflow skills forbid source code modification. Implementation and fix skills allow source changes only within selected phase or review-finding scope.

## Token Cost / Context Risk

Low.

The foundation, skills index, and common skill rules document the approved read order and forbid broad repository or documentation reads unless explicitly required. Relevant skills also require agents to justify extra file reads. Context efficiency is quality-preserving and avoids hard token quotas or maximum file counts. ObsV1.1 captures estimated local metrics for troubleshooting without adding exact token tracking or external telemetry.

## Required Corrections

None.

## Optional Improvements

- Add short examples for phase file layout, `PR.No` comment format, `05-validation.md`, `99-metrics.md`, and `06-handoff.md` output.
- Pilot `review-feedback-analysis` with one real completed PBI before tightening RF parsing rules further.

## Final Recommendation

V2 foundation is ready. Proceed with active workflow usage through `AGENTS.md`, `CLAUDE.md`, and `docs/ai/START_HERE.md`, or continue with the next approved governance improvement.
