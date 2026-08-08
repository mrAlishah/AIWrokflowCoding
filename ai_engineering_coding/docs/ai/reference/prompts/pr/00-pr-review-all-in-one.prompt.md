# 00 - PR Review All In One

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
Run the complete daily local PR/code review workflow using `pr_review_workflow`.

Rules:

- Execute only `pr_review_workflow`.
- Use local git diff only.
- Do not modify source code.
- Do not call PR APIs.
- Do not create pull requests or push commits.
- Follow the runtime read order from `docs/ai/skills/governance/read-order.md`.

Expected output:

- Review workspace
- Diff analysis
- PR-ready comments
- Internal suggestions
- Final handoff
- Markdown Files Changed report
