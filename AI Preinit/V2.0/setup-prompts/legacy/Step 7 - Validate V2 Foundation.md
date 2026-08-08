# Step 7 - Validate V2 Foundation

Validate the V2 AI Operating System foundation.

Rules:

- Do not modify source code.
- Only update docs/ai/foundation/validation.md if validation notes are needed.
- Do not rewrite the whole system.
- Report all markdown changes.

Check:

1. docs/ai/foundation/v2-approved-baseline.md exists.
2. docs/ai/skills/README.md lists all official skills.
3. repo-context-update is the only skill allowed to update docs/ai/repo-context.
4. pbi-workspace-create creates only workspace skeleton.
5. pbi-plan-create reads repo-context first and does not update repo-context.
6. phase files are defined as Plan + Execution Memory.
7. review workflow uses docs/ai/reviews/STP-XXXX.
8. review workflow files use these exact names:
   - 01-review-brief.md
   - 02-context.md
   - 03-diff-analysis.md
   - 04-en-pr-comments.md
   - 05-fa-pr-suggestions.md
   - 06-followup-log.md
   - 07-handoff.md
9. review workflow forbids source code modification.
10. markdown change reporting rule exists in all relevant skills.

Output:

- validation result
- missing items
- suggested corrections
- markdown files changed
