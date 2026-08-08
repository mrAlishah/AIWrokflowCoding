# Purpose

Run the daily end-to-end local PR/code review workflow.

# Parameters

| Parameter | Required | Description |
|---|---|---|
| STP_ID | Yes | Review workspace ID. Example: STP-123. |
| BASE_BRANCH | Yes | Base branch for local diff. Example: main. |
| CURRENT_BRANCH | Optional | Head branch. Default is current branch. Example: current branch. |
| REVIEW_SCOPE | Yes | Review scope. Example: full. |
| REVIEW_MODE | Optional | Review strictness. Example: strict. |
| COMMENT_LEVEL | Optional | Comment level. Example: important-only. |
| COMMENT_STYLE | Optional | Comment tone. Example: collaborative. |
| SUGGESTION_DEPTH | Optional | Suggestion detail. Example: normal. |
| FINAL_DECISION | Optional | Initial final decision. Example: needs-followup. |

# Parameter Options

## STP_ID

| Option | Description |
|---|---|
| Options not documented yet. | The selected skill does not document fixed options. Use the example value or update the skill metadata. |

## BASE_BRANCH

| Option | Description |
|---|---|
| Options not documented yet. | The selected skill does not document fixed options. Use the example value or update the skill metadata. |

## CURRENT_BRANCH

| Option | Description |
|---|---|
| Options not documented yet. | The selected skill does not document fixed options. Use the example value or update the skill metadata. |

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
| No Source Changes | Source code modification is prohibited. |
| Local Git Diff Only | Use local git diff only. |
| No PR APIs | Do not call external PR APIs, create pull requests, or push commits. |
| Local Context Only | Read only required workspace, diff, and changed files. |
| Markdown Reporting | Report markdown changes with path, action, reason, summary, and future AI context impact. |

# Common Mistakes

- Running review against the wrong branch.
- Asking the agent to modify source code.
- Calling PR APIs instead of using local diff.
- Leaving sample IDs unchanged.

# Token Optimization Tips

- Use the short prompt for routine review work.
- Read only the selected skill and review workspace.
- Inspect changed files only when needed for review quality.
- Avoid broad repository reads.
