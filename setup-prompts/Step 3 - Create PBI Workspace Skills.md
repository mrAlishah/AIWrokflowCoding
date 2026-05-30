# Step 3 - Create PBI Workspace Skills

Implement Step 3 of V2.

Goal:
Create PBI workspace creation and planning skills.

Rules:

- Do not modify source code.
- Only update docs/ai/.
- pbi-workspace-create must not do planning.
- pbi-plan-create must read repo-context first.
- pbi-plan-create may inspect source code only if repo-context is missing or insufficient.
- pbi-plan-create must not update repo-context.
- Report all markdown changes.

Create/update:

docs/ai/skills/pbi-workspace-create.skill.md
docs/ai/skills/pbi-plan-create.skill.md

pbi-workspace-create must create:

docs/ai/pbi/STP-XXXX/
00-approved-pbi.md
01-context.md
02-implementation-plan.md
03-codebase-index.md
04-decision-log.md
06-handoff.md
phases/
knowledge/

pbi-plan-create must update:

- 01-context.md
- 02-implementation-plan.md
- 03-codebase-index.md
- phases/\*.md
- knowledge/\* only if needed
- 04-decision_log.md only if decisions exist

Phase statuses:

- Planned Only
- Planned
- In Progress
- Done

Phase files must be:
Plan + Execution Memory
