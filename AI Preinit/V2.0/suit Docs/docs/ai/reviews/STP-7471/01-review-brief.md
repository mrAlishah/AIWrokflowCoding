# Review Brief: STP-7471

## Review Contract

- PBI_ID: STP-7471
- Review workflow: full local code review
- Risk mode: normal
- Comment style: collaborative
- Review scope: frontend-only
- Base branch: develop
- Head branch: task/STP-7471/audit-program-fe-tabs-relations
- Diff command: `git diff develop...HEAD`
- PR title: Audit Program: FE Tabs Relations & documents

## PR Description

Motivation:

Implementation of the front end for the tab relation & documents in the create/edit view for audit program.

UI:

The UI is completely the same as already existing in the Suite+ in various steps.

For the tab documents: all the documents that were already added for the catalog element in step 1 will be displayed in this view, the user is also allowed to add more documents.

## Rules

- Use local git diff only.
- Do not call PR APIs.
- Do not create PRs.
- Do not push commits.
- Do not modify source code.
- Update review markdown memory after each step.

## Status

- Workspace created.
- Next skill: `review-diff-analysis`.
