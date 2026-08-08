# 00-All In One PR Review Prompt (V2.3).help.md

## Purpose

Execute the complete V2.3 PR review workflow through the `pr_review_workflow` skill.

This prompt orchestrates:

- review_workspace_create
- review_diff_analysis
- review_comments_create
- review_followup (optional)
- review_final_handoff

The review process is documentation-only and must never modify source code.

---

## Runtime Read Order

```text
AGENTS.md / CLAUDE.md
→ docs/ai/START_HERE.md
→ docs/ai/skills/README.md
→ pr_review_workflow
→ active review workspace
→ repo-context (if needed)
→ changed files only (if needed)
```

Do not read:

```text
docs/ai/reference/**
all docs/ai
all skills
whole repository
```

---

## Parameter Reference

| Parameter      | Required | Allowed Values                                                                                 | Description                    |
| -------------- | -------- | ---------------------------------------------------------------------------------------------- | ------------------------------ |
| STP_ID         | Yes      | STP-XXXX                                                                                       | Review workspace identifier    |
| BASE_BRANCH    | Yes      | develop / main / release/\*                                                                    | Branch used for git diff       |
| CURRENT_BRANCH | No       | auto / branch-name                                                                             | Current review branch          |
| PR_TITLE       | Yes      | Free text                                                                                      | Pull request title             |
| PR_DESCRIPTION | Yes      | Free text                                                                                      | Review-oriented PR description |
| REVIEW_SCOPE   | Yes      | full / backend-only / frontend-only / tests-only / security-sensitive / architecture-sensitive | Limits review scope            |
| RISK_MODE      | No       | normal / strict                                                                                | Review strictness level        |
| COMMENT_STYLE  | No       | collaborative / direct / strict                                                                | Tone of PR comments            |
| REVIEW_MODE    | No       | standard / deep                                                                                | Review depth                   |
| FOLLOWUP_MODE  | No       | disabled / enabled                                                                             | Enables follow-up validation   |

---

## Review Workspace

```text
docs/ai/reviews/STP-XXXX/
```

Expected files:

```text
review-brief.md
context.md
diff-analysis.md
en_pr_comments.md
fa_pr_suggestions.md
followup-log.md
handoff.md
```

---

## Review Priorities

1. Correctness
2. Architecture boundaries
3. Repository conventions
4. Simplicity
5. Security
6. Regression risk
7. Test coverage
8. Scope control
9. Comment quality
10. Minimal changes

---

## Guardrails

Allowed:

- Read local git diff
- Read repo-context when needed
- Update review markdown files

Forbidden:

- Modify source code
- Call PR APIs
- Create pull requests
- Push commits
- Read the whole repository

---

## Git Diff Command

```bash
git diff BASE_BRANCH...HEAD
```

---

## Final Decision Values

```text
Approved
Approved With Minor Comments
Changes Required
Blocked
```

---

## Stop Conditions

Stop immediately if:

- STP_ID is missing
- BASE_BRANCH is missing
- REVIEW_SCOPE is invalid
- Git diff is empty
- Review workspace is unavailable
- Runtime read order is violated
- Local git access is unavailable
