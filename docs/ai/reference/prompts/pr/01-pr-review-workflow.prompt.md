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
Run a full local git diff review, create or update the review workspace, generate findings, comments, suggestions, handoff, and metrics.

Required read path:
1. AGENTS.md or CLAUDE.md
2. docs/ai/START_HERE.md
3. docs/ai/skills/README.md
4. Selected skill only: pr_review_workflow
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
- docs/ai/reviews/{STP_ID}/03-diff-analysis.md
- docs/ai/reviews/{STP_ID}/04-en-pr-comments.md
- docs/ai/reviews/{STP_ID}/05-fa-pr-suggestions.md
- docs/ai/reviews/{STP_ID}/07-handoff.md
- docs/ai/reviews/{STP_ID}/99-metrics.md

Final response format:
Return Summary, Review Workspace, Diff Analyzed, Findings Summary, PR Comments Location, Internal Suggestions Location, Final Decision, Markdown Files Changed, Usage Summary, Recommended Next Action, and Metrics Updated when applicable.

Markdown Files Changed rule:
When markdown files are changed, report each changed markdown file with path, action, reason, summary, and future AI context impact.
