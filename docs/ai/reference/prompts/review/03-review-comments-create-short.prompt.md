Use skill: review_comments_create

Parameters:

STP_ID:
STP-123

FINDINGS:
Use findings from docs/ai/reviews/STP-123/03-diff-analysis.md.

SEVERITY:
important-only

Task:
Convert supported findings into English PR-ready comments and Persian/internal suggestions without inventing findings.

Key constraints:
- Do not modify source code.
- Use local git diff only.
- Do not call external PR APIs.
- Read only the selected skill.

Expected output:
- docs/ai/reviews/{STP_ID}/04-en-pr-comments.md
- docs/ai/reviews/{STP_ID}/05-fa-pr-suggestions.md
- docs/ai/reviews/{STP_ID}/99-metrics.md
- Final response required by review_comments_create
