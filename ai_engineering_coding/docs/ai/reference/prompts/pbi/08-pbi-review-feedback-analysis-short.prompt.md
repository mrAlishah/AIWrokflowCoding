Use skill: pbi_review_feedback_analysis

Parameters:

PBI_ID:
STP-123

INPUT_MODE:
prompt
Options: prompt / file / existing-review-feedback

REVIEW_FEEDBACK:
Reviewer asked to extract filter options into a helper.

SOURCE_LABEL:
PR review

ANALYSIS_DEPTH:
standard
Options: standard / deep

DEFAULT_STATUS:
Proposed
Options: Proposed / Required / Ignored / Done / Blocked

Task:
Analyze human feedback, group overlapping comments, and create RF items without fixing code.

Key constraints:
- Read only the selected skill.
- Use repo-context only if needed.
- Do not modify source code.

Expected output:
- docs/ai/pbi/{PBI_ID}/phases/review-feedback.md
- docs/ai/pbi/{PBI_ID}/phases/RF-*.md
- docs/ai/pbi/{PBI_ID}/99-metrics.md
- Final response required by pbi_review_feedback_analysis
