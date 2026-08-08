Use skill: pbi_clarification

Parameters:

STP_ID:
STP-123

RAW_PBI:
As a user, I need audit-log filters.

REQUESTER:
Mostafa

Task:
Clarify a raw PBI and block downstream work when critical information is missing.

Required read path:
1. AGENTS.md or CLAUDE.md
2. docs/ai/START_HERE.md
3. docs/ai/skills/README.md
4. Selected skill only: pbi_clarification
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
- docs/ai/pbi/{STP_ID}/99-metrics.md
- docs/ai/pbi/metrics.md

Final response format:
Return Summary, Clarification status, Open questions if any, Markdown Files Changed, and Recommended next skill.

Markdown Files Changed rule:
When markdown files are changed, report each changed markdown file with path, action, reason, summary, and future AI context impact.
