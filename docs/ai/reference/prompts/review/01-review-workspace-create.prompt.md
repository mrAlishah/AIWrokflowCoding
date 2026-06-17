Use skill: review_workspace_create

Parameters:

STP_ID:
STP-123

BASE_BRANCH:
main

HEAD_BRANCH:
feature/audit-log-filters

REVIEW_SCOPE:
full

Task:
Create the standard review workspace placeholders and initialize review metrics.

Required read path:
1. AGENTS.md or CLAUDE.md
2. docs/ai/START_HERE.md
3. docs/ai/skills/README.md
4. Selected skill only: review_workspace_create
5. Active review workspace only when required
6. repo-context only if needed
7. Exact changed files only if needed

Constraints:
- Do not read all docs/ai.
- Do not read all skills.
- Do not read the entire repository.
- Before reading extra files, explain why.
- Do not introduce V3 concepts.
- Preserve compatibility mappings.
- Do not modify source code.
- Use local git diff only.
- Do not call external PR APIs.
- Do not create pull requests or push commits.

Expected updates:
- docs/ai/reviews/{STP_ID}/01-review-brief.md
- docs/ai/reviews/{STP_ID}/02-context.md
- docs/ai/reviews/{STP_ID}/99-metrics.md

Final response format:
Return Summary, Workspace path, Files created or updated, Markdown Files Changed, and Recommended next skill.

Markdown Files Changed rule:
When markdown files are changed, report each changed markdown file with path, action, reason, summary, and future AI context impact.
