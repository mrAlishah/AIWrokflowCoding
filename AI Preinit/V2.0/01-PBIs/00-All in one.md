Use the repository AI OS skills to run a complete code implementation workflow for this PBI end-to-end.

Task:
Implement PBI end-to-end without running review-phase skills.

Parameters:

PBI_ID:
STP-XXXX

PLANNING_DEPTH:
normal / light / deep

FIX_SCOPE:
required-and-safe-cleanup

PBI_TITLE:
[PBI Title]

PBI Definition:
[Paste or reference the approved PBI definition here]

Rules:

- Read AGENTS.md.
- Read docs/ai/START_HERE.md.
- Read docs/ai/skills/README.md.
- Execute one approved skill at a time, but orchestrate the full PBI implementation workflow.
- Do not rely on chat history.
- Use markdown files as shared memory.
- Read repo-context first.
- Inspect source code only when repo-context is missing, insufficient, or the selected skill requires exact source context.
- Do not read the whole repository.
- Do not run review-phase.
- Do not run fix-phase.
- Do not run npm run lint or npx eslint unless explicitly requested.
- Keep implementation simple, minimal, and aligned with existing project conventions.

Workflow:

1. Understand the PBI Definition.
2. Read relevant repo-context.
3. If the PBI Definition is unclear, incomplete, risky, or has missing acceptance criteria, stop and ask focused questions.
4. After user approval, run pbi-workspace-create.
5. Run pbi-plan-create.
6. Research only the files needed for the approved PBI.
7. Create a clear implementation plan and phase breakdown.
8. Execute implementation phases in order using implementation-phase.
9. Update each phase file after execution with files changed, validation performed, risks, and execution memory.
10. Continue phase by phase until all planned implementation phases are Done.
11. Stop before review.

Required Output:

- Selected skills executed
- Questions asked, if any
- Workspace created
- Implementation plan summary
- Phases created
- Phases completed
- Files changed
- Validation performed
- Known risks
- Markdown Files Changed
- Final implementation status
- Recommended next action
