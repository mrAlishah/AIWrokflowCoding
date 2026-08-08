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
Options: full / backend-only / frontend-only / tests-only / security-sensitive / architecture-sensitive

REVIEW_MODE:
strict
Options: strict / normal

COMMENT_LEVEL:
important-only
Options: important-only / all-supported

COMMENT_STYLE:
collaborative
Options: collaborative / direct

SUGGESTION_DEPTH:
normal
Options: normal / deep

FINAL_DECISION:
needs-followup
Options: needs-followup / ready / blocked

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
