Use skill: pbi_workspace_create

Parameters:

STP_ID:
STP-123

TITLE:
Audit Log Filters

APPROVED_PBI:
Use the approved PBI already present in 00-approved-pbi.md.

REQUESTER:
Mostafa

Task:
Create the standard PBI workspace after clarification.

Required read path:
1. AGENTS.md or CLAUDE.md
2. docs/ai/START_HERE.md
3. docs/ai/skills/README.md
4. Selected skill only: pbi_workspace_create
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
- docs/ai/pbi/{STP_ID}/00-approved-pbi.md
- docs/ai/pbi/{STP_ID}/01-context.md
- docs/ai/pbi/{STP_ID}/02-implementation-plan.md
- docs/ai/pbi/{STP_ID}/99-metrics.md

Final response format:
Return Summary, Workspace path, Files created or updated, Markdown Files Changed, and Recommended next skill.

Markdown Files Changed rule:
When markdown files are changed, report each changed markdown file with path, action, reason, summary, and future AI context impact.
