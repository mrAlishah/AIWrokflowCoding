# 00 - All In One PR Review Prompt (V2.3) - Short

Use skill: pr_review_workflow

Parameters:

STP_ID:
STP-XXXX

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
Run the complete V2.3 local PR/code review workflow using local git diff only.

Rules:

- Use local git only.
- Do not call PR APIs.
- Do not modify source code.
- Follow the V2.3 runtime read order from docs/ai/skills/governance/read-order.md.
- Update review workspace markdown files.
- Stop if required inputs or git diff are unavailable.

Expected Output:

- Findings by severity
- PR-ready comments
- Internal suggestions
- Markdown Files Changed
- Final review decision
- Recommended next action
