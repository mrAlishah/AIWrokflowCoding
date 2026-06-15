# Review Workflow Guide

Use this workflow to review a coworker's branch with local git only.

`pr-review-workflow` is the recommended daily-use entrypoint for end-to-end PR/code review.

Lower-level review skills remain available for follow-up, debugging, specialized review, or partial re-run.

## Before Starting

- The user checks out the coworker's branch manually.
- `BASE_BRANCH` is the target branch, such as `develop` or `main`.
- Review commands use local git diff only: `git diff BASE_BRANCH...HEAD`.
- The review workflow never modifies source code.
- The review workflow does not call PR APIs, create PRs, or push commits.

## Flow

Daily use:

1. Run `pr-review-workflow`.
   - Creates or verifies `docs/ai/reviews/STP-XXXX/`.
   - Uses local git diff only.
   - Generates diff analysis, English PR-ready comments, Persian/internal suggestions, final handoff, and metrics.
   - Does not modify source code.

Lower-level use:

1. Run `review-workspace-create`.
   - Creates `docs/ai/reviews/STP-XXXX/`.
   - Records branches, scope, and placeholders.
   - Creates `99-metrics.md` for review-local execution metrics.

2. Run `review-diff-analysis`.
   - Uses `git diff BASE_BRANCH...HEAD`.
   - Analyzes changed files, affected modules, affected layers, behavior changes, risk areas, test impact, missing tests, files requiring deeper review, and files safe to ignore.
   - Updates `03-diff-analysis.md`.
   - Appends execution metrics and updates `docs/ai/reviews/metrics.md`.

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
   - Appends final metrics with phase `N/A`.

## Rules

- Write only under `docs/ai/reviews/STP-XXXX/`.
- `pr-review-workflow` may also update `docs/ai/reviews/metrics.md`.
- Do not modify source code.
- Do not use PR APIs.
- Do not create PRs.
- Do not push commits.
- Report markdown changes under `Markdown Files Changed`.
- Append execution metrics to `99-metrics.md`.
- Update aggregate review metrics in `docs/ai/reviews/metrics.md`.

## Workspace File Rules

- `01-review-brief.md` = review contract, branch, base, scope, title, and description.
- `02-context.md` = review-specific context.
- `03-diff-analysis.md` = local diff analysis.
- `04-en-pr-comments.md` = English PR-ready comments only.
- `05-fa-pr-suggestions.md` = Persian reasoning, suggested fixes, pseudo-code, alternatives, and personal notes.
- `06-followup-log.md` = follow-up status tracking.
- `07-handoff.md` = final review summary and decision.
- `99-metrics.md` = review-local execution history, context efficiency, context expansions, estimated cost, and scope violations.

## Metrics

Review metrics are local to the review workspace and summarized centrally.

- Local metrics: `docs/ai/reviews/STP-XXXX/99-metrics.md`
- Dashboard: `docs/ai/reviews/metrics.md`

Review context efficiency ratio:

```text
Source Files Reviewed / Files Read
```

Use estimated metrics. Do not track exact tokens or external telemetry.
