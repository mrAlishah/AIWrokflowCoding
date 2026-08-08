Use skill: review_diff_analysis

Parameters:

STP_ID:
STP-123

BASE_BRANCH:
main

HEAD:
HEAD

REVIEW_SCOPE:
full
Options: full / backend-only / frontend-only / tests-only / security-sensitive / architecture-sensitive

Task:
Inspect local git diff and identify changed files, behavior changes, risks, validation gaps, and files needing deeper review.

Key constraints:
- Do not modify source code.
- Use local git diff only.
- Do not call external PR APIs.
- Read only the selected skill.

Expected output:
- docs/ai/reviews/{STP_ID}/02-context.md
- docs/ai/reviews/{STP_ID}/03-diff-analysis.md
- docs/ai/reviews/{STP_ID}/99-metrics.md
- Final response required by review_diff_analysis
