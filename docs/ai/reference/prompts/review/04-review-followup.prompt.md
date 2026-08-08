Use skill: review_followup

Parameters:

STP_ID:
STP-123

BASE_BRANCH:
main

CURRENT_HEAD:
HEAD

FOLLOWUP_DIFF:
Use local git diff main...HEAD.

Task:
Inspect follow-up diff, mark planned comments done only when confirmed, and keep unresolved comments planned.

Required read path:
1. AGENTS.md or CLAUDE.md
2. docs/ai/START_HERE.md
3. docs/ai/skills/README.md
4. Selected skill only: review_followup
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
- docs/ai/reviews/{STP_ID}/04-en-pr-comments.md
- docs/ai/reviews/{STP_ID}/05-fa-pr-suggestions.md
- docs/ai/reviews/{STP_ID}/06-followup-log.md

Final response format:
Return Summary, Done items, Remaining planned items, Follow-up comments, Markdown Files Changed, and Recommended next action.

Markdown Files Changed rule:
When markdown files are changed, report each changed markdown file with path, action, reason, summary, and future AI context impact.
