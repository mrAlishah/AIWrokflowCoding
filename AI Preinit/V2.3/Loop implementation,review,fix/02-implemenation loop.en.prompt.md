Run an implementation loop for STP-8050 according to the repository Skills and AGENTS.md instructions.

Parameters:

PBI_ID:
STP-123

Work basis:
docs/ai/pbi/STP-8050/02-implementation-plan.md

Execute the phases in the exact order defined in the plan. For each phase:

1. Implement
   - Implement only the work required for the current phase.
   - Follow the existing project patterns, naming, structure, and coding standards.
   - Do not introduce unrelated refactors, unnecessary renames, or behavior changes outside the phase scope.
   - Read additional source/context files only when they are directly needed for the current phase.

2. Review
   - Review the changes made in the current phase before moving on.
   - Check for bugs, regression risks, mismatch with the plan, inconsistency with project patterns, and validation gaps.
   - Clearly identify any required/blocking issue.

3. Fix
   - Fix only required or blocking issues.
   - Review the fixed area again.
   - Do not move to the next phase while any required/blocking issue remains.

Continue this loop until all phases in 02-implementation-plan.md are complete.

Rules:

- Follow the existing repository patterns and naming conventions.
- Keep changes minimal and scoped.
- Do not run npm run lint or npx eslint unless I explicitly approve it.
- Do not perform unrelated cleanup or refactoring.
- Preserve existing behavior unless the plan explicitly requires a change.

Completion criteria:

- All phases from 02-implementation-plan.md are implemented.
- The final review has no required/blocking issues.
- The implementation matches the plan and phase files.
- If build, tests, or validation are needed but not run, explain exactly why.

Final summary must include:

- Completed phases
- Changed files
- Issues found and fixed during the review loop
- Validation performed or not performed
- Remaining risks, if any
