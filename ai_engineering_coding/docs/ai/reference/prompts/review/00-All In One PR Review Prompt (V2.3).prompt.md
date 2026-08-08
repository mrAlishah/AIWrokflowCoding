# 00 - All In One PR Review Prompt (V2.3)

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
Run the complete V2.3 local PR/code review workflow using local git diff and markdown shared memory.

Execution Rules:

- Read AGENTS.md.
- Read CLAUDE.md only if running on Claude.
- Read docs/ai/START_HERE.md.
- Read docs/ai/skills/README.md.
- Select only the approved skill: `pr_review_workflow`.
- Follow the V2.3 runtime read order from docs/ai/skills/governance/read-order.md.
- Do not read all docs/ai.
- Do not read all skills.
- Do not analyze the whole repository.

Review Guardrails:

- Use local git diff only.
- Use `git diff BASE_BRANCH...HEAD`.
- Do not call PR APIs.
- Do not create pull requests.
- Do not push commits.
- Do not modify source code.
- Do not perform fixes automatically.
- Review output must be documentation only.

Expected Workspace:

```text
docs/ai/reviews/STP-XXXX/
```

Expected updates:

- docs/ai/reviews/{STP_ID}/01-review-brief.md
- docs/ai/reviews/{STP_ID}/03-diff-analysis.md
- docs/ai/reviews/{STP_ID}/04-en-pr-comments.md
- docs/ai/reviews/{STP_ID}/05-fa-pr-suggestions.md
- docs/ai/reviews/{STP_ID}/07-handoff.md
- docs/ai/reviews/{STP_ID}/99-metrics.md

Review Priorities:

1. Correctness
2. Architecture boundaries
3. Repository conventions
4. Simplicity
5. Security
6. Regression risk
7. Test coverage
8. Scope control
9. Code comments quality
10. Minimal changes

Final response format:
Return Summary, Review Workspace, Diff Analyzed, Findings Summary, PR Comments Location, Internal Suggestions Location, Final Decision, Markdown Files Changed, Usage Summary, Recommended Next Action, and Metrics Updated when applicable.

Stop Conditions:

- Missing STP_ID
- Missing BASE_BRANCH
- Empty git diff
- Invalid REVIEW_SCOPE
- Missing review workspace
- Missing required permissions to read git diff
- Runtime read-order violation
