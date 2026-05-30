# Step 5 - Create PR Review Workflow Skills

Implement Step 5 of V2.

Goal:
Create PR/code review workflow skills for reviewing coworkers' branches.

Rules:

- Do not modify source code.
- Review workflow may only update docs/ai/reviews/STP-XXXX/.
- Must use local git diff only.
- Must not call PR APIs.
- Must not create PRs.
- Must not push commits.
- Report all markdown changes.

Create/update:

docs/ai/skills/review-workspace-create.skill.md
docs/ai/skills/review-diff-analysis.skill.md
docs/ai/skills/review-comments-create.skill.md
docs/ai/skills/review-followup.skill.md
docs/ai/skills/review-final-handoff.skill.md

review-workspace-create creates:

docs/ai/reviews/STP-XXXX/
review-brief.md
context.md
diff-analysis.md
en_pr_comments.md
fa_pr_suggestions.md
followup-log.md
handoff.md

review-diff-analysis:

- uses git diff BASE_BRANCH...HEAD
- analyzes changed files and risks
- updates diff-analysis.md

review-comments-create:

- creates English PR comments in en_pr_comments.md
- creates Persian deep suggestions in fa_pr_suggestions.md
- links both by PR.No

Status values in en_pr_comments.md:

- Planned
- Done
- Ignore

review-followup:

- checks only Planned comments
- marks Done if fixed
- creates PR-001.1 style follow-up comments when needed

review-final-handoff:

- summarizes final review decision in handoff.md
