Use skill: pr_review_workflow

Parameters:

STP_ID:
STP-123

BASE_BRANCH:
main

CURRENT_BRANCH:
current branch

REVIEW_SCOPE:
full

REVIEW_MODE:
strict

COMMENT_LEVEL:
important-only

COMMENT_STYLE:
collaborative

SUGGESTION_DEPTH:
normal

FINAL_DECISION:
needs-followup

Task:
Run the daily local PR/code review workflow.

Key constraints:
- Do not modify source code.
- Use local git diff only.
- Do not call external PR APIs.
- Read only the selected skill.

Expected output:
- docs/ai/reviews/{STP_ID}/03-diff-analysis.md
- docs/ai/reviews/{STP_ID}/04-en-pr-comments.md
- docs/ai/reviews/{STP_ID}/07-handoff.md
- Final response required by pr_review_workflow
