# 00-All In One PR Review Prompt (V2.3).short.prompt.md

Use skill: pr_review_workflow

Parameters:

STP_ID:
STP-XXXX

BASE_BRANCH:
develop / main / release/\*

CURRENT_BRANCH:
auto / branch-name

PR_TITLE:
[required]

PR_DESCRIPTION:
[required]

REVIEW_SCOPE:
full / backend-only / frontend-only / tests-only / security-sensitive / architecture-sensitive

RISK_MODE:
normal / strict

COMMENT_STYLE:
collaborative / direct / strict

REVIEW_MODE:
standard / deep

FOLLOWUP_MODE:
disabled / enabled

Task:

Run the complete V2.3 PR review workflow using local git diff only.

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
