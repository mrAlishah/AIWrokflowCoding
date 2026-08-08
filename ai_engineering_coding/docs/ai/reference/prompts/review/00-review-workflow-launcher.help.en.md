# Purpose

Start the lower-level review workflow with `review_workspace_create`.

This is a launcher prompt. It creates the review workspace and prepares the next prompt, but it does not execute all review skills in one run.

# Parameters

| Parameter | Required | Description |
|---|---|---|
| STP_ID | Yes | Review workspace ID. Example: STP-123. |
| BASE_BRANCH | Yes | Base branch for local diff. Example: main. |
| HEAD_BRANCH | Yes | Head branch under review. Example: current branch. |
| REVIEW_SCOPE | Yes | Review scope. Example: full. |

# Parameter Options

## REVIEW_SCOPE

| Option | Description |
|---|---|
| full | Review all changed areas. |
| backend-only | Review backend changes only. |
| frontend-only | Review frontend changes only. |
| tests-only | Review tests only. |
| security-sensitive | Security-sensitive review. |
| architecture-sensitive | Architecture-sensitive review. |

# Required Inputs

- Review workspace ID
- Base branch
- Head branch or current branch

# Expected Outputs

- Review workspace placeholders
- Next ready-to-run prompt for `review_diff_analysis`

# Rules

| Rule | Description |
|---|---|
| One Skill | Execute only `review_workspace_create` in this run. |
| No Source Changes | Source code modification is prohibited. |
| Local Review Only | Keep review local and git-diff driven. |
| No PR APIs | Do not call PR APIs, create pull requests, or push commits. |

# Common Mistakes

- Running all lower-level review skills in one launcher prompt.
- Using the review launcher when `pr_review_workflow` is better.
- Asking the review workflow to fix code.

# Token Optimization Tips

- Use `pr_review_workflow` for daily full review.
- Use this launcher only when you need lower-level step control.
