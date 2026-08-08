Use the repository AI OS skills to run a complete code review workflow for this PBI end-to-end.

Task:
Run the full Review workflow for PBI_ID end-to-end.

Parameters:

PBI_ID:
STP-XXXX

RISK_MODE:
strict / normal

COMMENT_STYLE:
collaborative / direct / strict

BASE_BRANCH:
develop

CURRENT_BRANCH:
auto

PR_TITLE:
[...]

PR_DESCRIPTION:
[...]

REVIEW_SCOPE:
backend-only / frontend-only / full / tests-only / security-sensitive / architecture-sensitive

Diff command:
git diff develop...HEAD

Rules:

- Read AGENTS.md.
- Read docs/ai/START_HERE.md.
- Select the correct review skill sequence from docs/ai/skills/README.md.
- Execute one approved skill at a time, but orchestrate the full review workflow end-to-end.
- Use local git diff only.
- Do not call PR APIs.
- Do not create PRs.
- Do not push commits.
- Do not modify source code.
- Update review markdown memory after each step.
- Stop only if required inputs, workspace files, branch/diff data, or scope are missing.

Expected Output:

- Selected skills executed
- Review summary
- Findings by severity
- Files reviewed
- Markdown Files Changed
- Final review status
- Recommended next action
