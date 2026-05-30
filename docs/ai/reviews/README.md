# Review Workflow Guide

Use this workflow to review a coworker's branch with local git only.

## Before Starting

- The user checks out the coworker's branch manually.
- `BASE_BRANCH` is the target branch, such as `develop` or `main`.
- Review commands use local git diff only: `git diff BASE_BRANCH...HEAD`.
- The review workflow never modifies source code.
- The review workflow does not call PR APIs, create PRs, or push commits.

## Flow

1. Run `review-workspace-create`.
   - Creates `docs/ai/reviews/STP-XXXX/`.
   - Records branches, scope, and placeholders.

2. Run `review-diff-analysis`.
   - Uses `git diff BASE_BRANCH...HEAD`.
   - Analyzes changed files, behavior, risks, scope, standards, comments, and test gaps.
   - Updates `diff-analysis.md`.

3. Run `review-comments-create`.
   - Creates English PR comments in `en_pr_comments.md`.
   - Creates Persian deep suggestions in `fa_pr_suggestions.md`.
   - Links both by `PR.No`.

4. Run `review-followup`.
   - Checks only comments with status `Planned`.
   - Marks comments `Done` only when fixed in the local diff.
   - Creates follow-up comments like `PR-001.1` when needed.

5. Run `review-final-handoff`.
   - Updates `handoff.md`.
   - Summarizes the final review decision, remaining risks, and reviewer focus.

## Rules

- Write only under `docs/ai/reviews/STP-XXXX/`.
- Do not modify source code.
- Do not use PR APIs.
- Do not create PRs.
- Do not push commits.
- Report markdown changes under `Markdown Files Changed`.

