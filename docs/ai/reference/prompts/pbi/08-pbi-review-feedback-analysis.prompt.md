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

Required read path:
1. AGENTS.md or CLAUDE.md
2. docs/ai/START_HERE.md
3. docs/ai/skills/README.md
4. Selected skill only: pbi_review_feedback_analysis
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
- docs/ai/pbi/{PBI_ID}/phases/review-feedback.md
- docs/ai/pbi/{PBI_ID}/phases/RF-*.md
- docs/ai/pbi/{PBI_ID}/99-metrics.md

Final response format:
Return Summary, RF items created or updated, Recommended user decisions, Files updated, Markdown Files Changed, and Recommended next prompt.

Markdown Files Changed rule:
When markdown files are changed, report each changed markdown file with path, action, reason, summary, and future AI context impact.
