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
01-review-brief.md
02-context.md
03-diff-analysis.md
04-en-pr-comments.md
05-fa-pr-suggestions.md
06-followup-log.md
07-handoff.md

review-diff-analysis:

- uses git diff BASE_BRANCH...HEAD
- analyzes changed files and risks
- updates diff-analysis.md

review-comments-create:

- creates English PR comments in en-pr-comments.md
- creates Persian deep suggestions in fa-pr-suggestions.md
- links both by PR.No

Status values in en-pr-comments.md:

- Planned
- Done
- Ignore

review-followup:

- checks only Planned comments
- marks Done if fixed
- creates PR-001.1 style follow-up comments when needed

review-final-handoff:

- summarizes final review decision in handoff.md
