Use skill: pbi_plan_create

Parameters:

STP_ID:
STP-123

ACCEPTANCE_CRITERIA:
Users can filter audit logs by date, actor, and action type.

CONSTRAINTS:
Follow existing patterns and avoid unrelated refactors.

PLANNING_SCOPE:
light
Options: light / standard / deep

Task:
Create the implementation plan, phase files, validation plan, and codebase navigation without changing source code.

Required read path:
1. AGENTS.md or CLAUDE.md
2. docs/ai/START_HERE.md
3. docs/ai/skills/README.md
4. Selected skill only: pbi_plan_create
5. Active workspace only when required
6. repo-context only if needed
7. Exact source files only if needed

Constraints:
- Do not read all docs/ai.
- Do not read all skills.
- Do not read the entire repository.
- Before reading extra files, explain why.
- Do not introduce V3 concepts.
- Preserve compatibility mappings.
- Do not modify source code.

Expected updates:
- docs/ai/pbi/{STP_ID}/01-context.md
- docs/ai/pbi/{STP_ID}/02-implementation-plan.md
- docs/ai/pbi/{STP_ID}/phases/*.md

Final response format:
Return Summary, Plan status, Phase list, Validation summary, Markdown Files Changed, and Recommended next skill.

Markdown Files Changed rule:
When markdown files are changed, report each changed markdown file with path, action, reason, summary, and future AI context impact.
