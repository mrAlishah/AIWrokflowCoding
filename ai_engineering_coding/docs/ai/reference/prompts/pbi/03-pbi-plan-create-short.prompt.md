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

Key constraints:
- Read only the selected skill.
- Use repo-context only if needed.
- Do not modify source code.

Expected output:
- docs/ai/pbi/{STP_ID}/01-context.md
- docs/ai/pbi/{STP_ID}/02-implementation-plan.md
- docs/ai/pbi/{STP_ID}/phases/*.md
- Final response required by pbi_plan_create
