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

Key constraints:
- Do not modify source code.
- Use local git diff only.
- Do not call external PR APIs.
- Read only the selected skill.

Expected output:
- docs/ai/reviews/{STP_ID}/01-review-brief.md
- docs/ai/reviews/{STP_ID}/02-context.md
- docs/ai/reviews/{STP_ID}/99-metrics.md
- Final response required by review_workspace_create
