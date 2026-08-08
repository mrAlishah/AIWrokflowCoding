# Prompt — Add Global Frontend Code Policy

Use skill: policy-plan-update

Parameters:

SCOPE:
global

INPUT_TAG:
USER_CODE_POLICY

UPDATE_MODE:
apply-global-rule

USER_INPUT:

### CP-001

Frontend JavaScript and TypeScript code must not use `var`.

Use:

- `const` by default.
- `let` only when reassignment is required.

Do not use:

- `var`

Reason:

`var` has function scope and can introduce unintended behavior.
Modern JavaScript and TypeScript code should use block-scoped declarations.

Applies To:

- Frontend
- JavaScript
- TypeScript

Instructions:

- Register this policy as an approved global coding policy.
- Treat this policy as active governance.
- Synchronize all related governance and coding-standard documents.
- Update reusable repository coding standards if applicable.
- Update any skill guidance that references repository coding conventions.
- Do not modify source code.
- Do not create implementation tasks.
- Do not create PBI workspaces.
- Report any conflicting existing policies.

Expected Output:

1. Summary
2. Policy Registered
3. Files Updated
4. Conflicts Found
5. Markdown Files Changed
6. Recommended Next Action
