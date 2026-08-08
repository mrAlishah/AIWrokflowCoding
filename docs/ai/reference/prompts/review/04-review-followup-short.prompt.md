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

Key constraints:
- Do not modify source code.
- Use local git diff only.
- Do not call external PR APIs.
- Read only the selected skill.

Expected output:
- docs/ai/reviews/{STP_ID}/04-en-pr-comments.md
- docs/ai/reviews/{STP_ID}/05-fa-pr-suggestions.md
- docs/ai/reviews/{STP_ID}/06-followup-log.md
- Final response required by review_followup
