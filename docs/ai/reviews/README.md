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
   - Analyzes changed files, affected modules, affected layers, behavior changes, risk areas, test impact, missing tests, files requiring deeper review, and files safe to ignore.
   - Updates `03-diff-analysis.md`.

3. Run `review-comments-create`.
   - Creates English PR comments in `04-en-pr-comments.md`.
   - Creates Persian deep suggestions in `05-fa-pr-suggestions.md`.
   - Links both by `PR.No`.
   - English comments include `PR.No`, status, severity, PR-ready comment, and suggested fix summary.
   - Persian suggestions include deep reasoning, suggested fixes, pseudo-code, alternatives, personal notes, and whether to post or keep internal.

4. Run `review-followup`.
   - Checks only comments with status `Planned`.
   - Marks comments `Done` only when fixed in the local diff.
   - Creates follow-up comments like `PR-001.1` when needed.
   - Does not recheck `Done` or `Ignore` items unless explicitly requested.

5. Run `review-final-handoff`.
   - Updates `07-handoff.md`.
   - Summarizes final review decision, blocking issues, non-blocking issues, resolved issues, ignored issues, remaining risks, next action, and ready-to-merge status.

## Rules

- Write only under `docs/ai/reviews/STP-XXXX/`.
- Do not modify source code.
- Do not use PR APIs.
- Do not create PRs.
- Do not push commits.
- Report markdown changes under `Markdown Files Changed`.

## Workspace File Rules

- `01-review-brief.md` = review contract, branch, base, scope, title, and description.
- `02-context.md` = review-specific context.
- `03-diff-analysis.md` = local diff analysis.
- `04-en-pr-comments.md` = English PR-ready comments only.
- `05-fa-pr-suggestions.md` = Persian reasoning, suggested fixes, pseudo-code, alternatives, and personal notes.
- `06-followup-log.md` = follow-up status tracking.
- `07-handoff.md` = final review summary and decision.
