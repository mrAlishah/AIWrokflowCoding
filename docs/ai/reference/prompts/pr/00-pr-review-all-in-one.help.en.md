# Purpose

Run the complete daily local PR/code review workflow through `pr_review_workflow`.

This is the supported all-in-one prompt because `pr_review_workflow` is a single approved skill that owns the end-to-end PR review workflow.

# Parameters

| Parameter | Required | Description |
|---|---|---|
| STP_ID | Yes | Review workspace ID. Example: STP-123. |
| BASE_BRANCH | Yes | Base branch for local diff. Example: main. |
| CURRENT_BRANCH | Optional | Head branch. Default is current branch. |
| REVIEW_SCOPE | Yes | Review scope. Example: full. |
| REVIEW_MODE | Optional | Review strictness. Default is strict. |
| COMMENT_LEVEL | Optional | Comment level. Default is important-only. |
| COMMENT_STYLE | Optional | Comment tone. Default is collaborative. |
| SUGGESTION_DEPTH | Optional | Suggestion detail. Default is normal. |
| FINAL_DECISION | Optional | Initial final decision. Default is needs-followup. |

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

## REVIEW_MODE

| Option | Description |
|---|---|
| strict | Default strict review. |
| normal | Standard review. |

## COMMENT_LEVEL

| Option | Description |
|---|---|
| important-only | Only important findings. |
| all-supported | All supported findings. |

## COMMENT_STYLE

| Option | Description |
|---|---|
| collaborative | Default collaborative wording. |
| direct | More direct wording. |

## SUGGESTION_DEPTH

| Option | Description |
|---|---|
| normal | Default detail. |
| deep | More detailed suggestions. |

## FINAL_DECISION

| Option | Description |
|---|---|
| needs-followup | Default when follow-up may be needed. |
| ready | No blocking issues. |
| blocked | Review cannot complete. |

# Required Inputs

- Checked-out review branch
- Local git diff

# Expected Outputs

- Review workspace
- Diff analysis
- PR-ready comments
- Internal suggestions
- Final handoff

# Rules

| Rule | Description |
|---|---|
| One Skill | Execute only `pr_review_workflow`. |
| No Source Changes | Source code modification is prohibited. |
| Local Git Diff Only | Use local git diff only. |
| No PR APIs | Do not call PR APIs, create pull requests, or push commits. |

# Common Mistakes

- Using lower-level review launchers when daily full review is needed.
- Asking the review to modify source code.
- Calling PR APIs instead of using local diff.

# Token Optimization Tips

- Use the short prompt for routine PR reviews.
- Read changed files only when needed for review quality.
