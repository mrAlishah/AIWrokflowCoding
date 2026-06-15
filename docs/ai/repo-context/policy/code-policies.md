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
