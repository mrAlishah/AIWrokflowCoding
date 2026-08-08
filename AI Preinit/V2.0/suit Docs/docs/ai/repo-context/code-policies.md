# Code Policies

Approved global code policies for this repository.

This file is the canonical source for active code policies. Skills and governance files should reference this file instead of duplicating full policy text.

## Segments

- Frontend
- Backend
- Tests
- Review

## Frontend

## CP-001 - No `var` in Frontend JavaScript and TypeScript

Status:
Active

Applies To:

- Frontend
- JavaScript
- TypeScript

Rule:

Frontend JavaScript and TypeScript code must not use `var`.

Use:

- `const` by default.
- `let` only when reassignment is required.

Do not use:

- `var`

Reason:

`var` has function scope and can introduce unintended behavior. Modern JavaScript and TypeScript code should use block-scoped declarations.

## Backend

No active backend-specific code policies yet.

## Tests

No active test-specific code policies yet.

## Review

Review must check active code policies that apply to the changed files.

For CP-001, review frontend JavaScript and TypeScript changes for `var` usage and prefer `const` by default, with `let` only when reassignment is required.

For CP-003, review translation changes in frontend diffs by checking both language files and source-code usage.

## CP-002 - Preserve Existing Variable Names Unless Required

Status:
Active

Applies To:

- Frontend
- Backend
- JavaScript
- TypeScript
- C#

Rule:

Do not rename existing variables, parameters, refs, methods, or local identifiers as part of a fix unless the rename is required to correct a confirmed bug, resolve a direct naming conflict, or match an existing API contract.

When a different source API name is required, prefer a local alias that preserves the existing local identifier when that keeps the diff smaller and behavior correct.

Reason:

Unnecessary renames increase diff size, make review harder, and can hide the actual behavioral fix.

Review Guidance:

Review source changes for avoidable identifier renames. Ask for the old identifier to be preserved when the rename is not required for correctness or repository conventions.

## CP-003 - Review Frontend Translation Diff Coverage

Status:
Active

Applies To:

- Frontend
- Review
- Translation JSON
- Vue
- JavaScript

Rule:

When a frontend review includes translation changes, reviewers must check every translation key added or changed in the diff.

For each changed translation key, verify:

- The key exists in both `Web-Suite/clientapp/src/language/translations/en.json` and `Web-Suite/clientapp/src/language/translations/de.json`.
- The key is referenced by the relevant frontend code when it is intended to be used by the feature.
- Added translation keys without code usage are either justified as shared/future keys or reported as review findings.
- Code references to new translation keys use existing repository i18n patterns such as `t('l_...')`.

Reason:

Translation drift causes missing labels, dead translation entries, and review blind spots. Checking both language files and source usage keeps feature UI text consistent and prevents unused or incomplete localization changes from being merged unnoticed.

Review Guidance:

Use the local diff as the source of changed translation keys. Compare changed keys across `en.json` and `de.json`, then search the frontend source outside translation files for code references. Report missing language entries, missing code usage, or copied wrong-domain translation keys when the feature is expected to use the new keys.
