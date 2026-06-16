# 00 - All In One PR Review Prompt (V2.3)

Use skill: pr_review_workflow

Task:

Run the complete V2.3 PR Review workflow end-to-end using local git diff and markdown shared memory.

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

STOP_ON_BLOCKER:
true / false

---

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

---

Review Guardrails:

- Use local git diff only.

- Use:

  git diff BASE_BRANCH...HEAD

- Do not call PR APIs.

- Do not create pull requests.

- Do not push commits.

- Do not modify source code.

- Do not perform fixes automatically.

- Review output must be documentation only.

---

Required Workflow:

1. Execute `review_workspace_create`
2. Execute `review_diff_analysis`
3. Execute `review_comments_create`
4. Execute `review_followup` only if FOLLOWUP_MODE=enabled
5. Execute `review_final_handoff`

Update markdown shared memory after every step.

---

Expected Workspace:

docs/ai/reviews/STP-XXXX/

Required files:

- review-brief.md
- context.md
- diff-analysis.md
- en_pr_comments.md
- fa_pr_suggestions.md
- followup-log.md
- handoff.md

---

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

---

Expected Output:

- Executed skills
- Files reviewed
- Changed files summary
- Findings by severity
- Blocking issues
- PR-ready comments
- Internal suggestions
- Markdown Files Changed
- Final review decision
- Recommended next action

---

Final Decision Values:

- Approved
- Approved With Minor Comments
- Changes Required
- Blocked

---

Stop Conditions:

Stop immediately if one of the following occurs:

- Missing STP_ID
- Missing BASE_BRANCH
- Empty git diff
- Invalid REVIEW_SCOPE
- Missing review workspace
- Missing required permissions to read git diff
- Runtime read-order violation
