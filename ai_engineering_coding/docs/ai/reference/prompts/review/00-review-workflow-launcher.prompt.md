# 00 - Review Workflow Launcher

Use skill: review_workspace_create

Parameters:

STP_ID:
STP-XXXX

BASE_BRANCH:
main

HEAD_BRANCH:
current branch

REVIEW_SCOPE:
full
Options: full / backend-only / frontend-only / tests-only / security-sensitive / architecture-sensitive

Task:
Start the lower-level review workflow by creating the review workspace.

After the workspace is ready, prepare the next ready-to-run prompt for `review_diff_analysis`, but do not execute it.

Workflow order:

```text
review_workspace_create
-> review_diff_analysis
-> review_comments_create
-> review_followup if needed
-> review_final_handoff
```

Rules:

- Execute only `review_workspace_create` in this run.
- Do not modify source code.
- Use local git review context only.
- Do not call PR APIs.
- Do not create pull requests or push commits.
- Follow the runtime read order from `docs/ai/skills/governance/read-order.md`.

Expected output:

- Review workspace initialized.
- Next prompt for `review_diff_analysis`.
- Markdown Files Changed report.
