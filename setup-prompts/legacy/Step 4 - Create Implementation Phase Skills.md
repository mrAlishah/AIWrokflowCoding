# Step 4 - Create Implementation Phase Skills

Implement Step 4 of V2.

Goal:
Create implementation, review, fix, and handoff skills for PBI execution.

Rules:

- Only create/update docs/ai/skills/.
- Do not implement any real PBI.
- Do not modify source code.
- Skills must enforce simplicity, minimal files, minimal lines, repo conventions, and comment quality.
- Report all markdown changes.

Create/update:

docs/ai/skills/implementation-phase.skill.md
docs/ai/skills/review-phase.skill.md
docs/ai/skills/fix-phase.skill.md
docs/ai/skills/pbi-final-handoff.skill.md

implementation-phase must:

- execute only one phase
- read implementation-plan.md and selected phase file
- read only source files listed in the phase
- update the phase file after execution

review-phase must:

- review implementation diff
- check correctness, scope, architecture, standards, comments, tests
- not apply fixes unless explicitly requested

fix-phase must:

- apply only review findings
- avoid extra cleanup/refactor

pbi-final-handoff must:

- update 06-handoff.md
- summarize changed files, validation, risks, PR summary, review focus
