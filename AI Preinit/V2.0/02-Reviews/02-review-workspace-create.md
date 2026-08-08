Use skill: review-workspace-create

Parameters:

STP_ID:
STP-XXXX

BASE_BRANCH:
develop

CURRENT_BRANCH:
auto

PR_TITLE:
...

PR_DESCRIPTION:
...

REVIEW_SCOPE:
backend-only / frontend-only / full / tests-only / security-sensitive / architecture-sensitive

Rules:

- Do not call PR APIs.
- Do not create PRs.
- Do not push commits.
- Do not modify source code.
- Create only review workspace files.

Output:

- Review workspace created
- Markdown Files Changed
- Confirmation source code was not modified
