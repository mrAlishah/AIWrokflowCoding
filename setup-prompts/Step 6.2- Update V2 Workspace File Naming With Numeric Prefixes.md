# Step 6.2 - Update V2 Workspace File Naming With Numeric Prefixes

You are updating the V2 AI Operating System documentation and skill instructions to enforce the newly approved numeric-prefix file naming for PBI and Review workspaces.

Goal:
Update all relevant V2 docs, README files, skill files, templates, examples, validation checklist references, and workflow instructions so the official workspace file names use the new approved names.

This is a documentation/governance correction task.

## Strict Rules

- Do not modify source code.
- Do not create a real PBI workspace.
- Do not create a real Review workspace.
- Do not run implementation.
- Do not run review.
- Do not rename real STP workspace files unless they are only example/template files created for documentation validation.
- Only update markdown documentation and skill instructions under `docs/ai/`.
- Preserve V2 architecture and workflow semantics.
- Do not break logical relationships between files.
- Update all references consistently.
- Report every markdown file changed under `Markdown Files Changed`.

## Read First

Read:

```text
docs/ai/foundation/v2-approved-baseline.md
docs/ai/foundation/v2-validation-checklist.md
docs/ai/README.md
docs/ai/skills/README.md
docs/ai/skills/common-skill-rules.md
docs/ai/pbi/README.md
docs/ai/reviews/README.md
```

Then read all official skill files listed in:

```text
docs/ai/skills/README.md
```

If any listed file is missing, report it and continue with available files.

---

# Required Official Naming

## PBI Workspace Official Names

Every PBI workspace under:

```text
docs/ai/pbi/STP-XXXX/
```

must use exactly these official names:

```text
01-context.md
02-implementation-plan.md
03-codebase-index.md
04-decision_log.md
06-handoff.md

phases/
knowledge/
```

Important:

- `00-approved-pbi.md` is no longer part of the official PBI workspace structure.
- Replace old references to `00-approved-pbi.md` with the new approved structure.
- If approved PBI requirements are referenced, document that they belong inside `01-context.md` under an `Approved PBI / Requirements Source` section, unless another explicitly approved file is introduced later.
- Replace old references to `implementation-plan.md` with `02-implementation-plan.md`.
- Replace old references to `codebase-index.md` with `03-codebase-index.md`.
- Replace old references to `04_decision_log.md` with `04-decision_log.md`.
- Replace old references to `06_handoff.md` with `06-handoff.md`.
- The missing `05` slot is intentional/reserved. Document it as `05 reserved for future PBI review/log file` if needed.
- Do not rename `phases/` or `knowledge/`.

## Review Workspace Official Names

Every Review workspace under:

```text
docs/ai/reviews/STP-XXXX/
```

must use exactly these official names:

```text
01-review-brief.md
02-context.md
03-diff-analysis.md
04-en-pr-comments.md
05-fa-pr-suggestions.md
06-followup-log.md
07-handoff.md
```

Important:

- Replace old references to `review-brief.md` with `01-review-brief.md`.
- Replace old references to `context.md` with `02-context.md`.
- Replace old references to `diff-analysis.md` with `03-diff-analysis.md`.
- Replace old references to `en_pr_comments.md` with `04-en-pr-comments.md`.
- Replace old references to `fa_pr_suggestions.md` with `05-fa-pr-suggestions.md`.
- Replace old references to `followup-log.md` with `06-followup-log.md`.
- Replace old references to `handoff.md` with `07-handoff.md`.

---

# Preserve File Responsibilities

Do not change file meanings.

## PBI Responsibilities Must Remain

```text
01-context.md
= PBI-specific context and approved requirements source.
It must include or reference the approved PBI definition.
It must not be a copy of repo-context.

02-implementation-plan.md
= short roadmap only.
It contains phase names, goals, status, and high-level sequencing.
Detailed implementation belongs in phases/*.md.

03-codebase-index.md
= PBI route/index for phases, source files, knowledge files, functions, purpose, usage, related flow, validation focus, and review focus.

04-decision_log.md
= architecture/domain/design decisions only.

06-handoff.md
= final PBI handoff, PR-ready summary, validation, risks, review focus.
```

## Review Responsibilities Must Remain

```text
01-review-brief.md
= review contract, branch/base/scope/title/description.

02-context.md
= review-specific context.

03-diff-analysis.md
= local diff analysis.

04-en-pr-comments.md
= English PR-ready comments only.

05-fa-pr-suggestions.md
= Persian reasoning, suggested fixes, pseudo-code, alternatives, personal notes.

06-followup-log.md
= follow-up status tracking.

07-handoff.md
= final review summary and decision.
```

---

# Update Required Areas

Update all references in:

```text
docs/ai/foundation/v2-approved-baseline.md
docs/ai/foundation/v2-validation-checklist.md
docs/ai/README.md
docs/ai/pbi/README.md
docs/ai/reviews/README.md
docs/ai/skills/README.md
docs/ai/skills/common-skill-rules.md
```

Update all relevant official skill files, especially:

```text
docs/ai/skills/pbi-workspace-create.skill.md
docs/ai/skills/pbi-plan-create.skill.md
docs/ai/skills/implementation-phase.skill.md
docs/ai/skills/review-phase.skill.md
docs/ai/skills/fix-phase.skill.md
docs/ai/skills/pbi-final-handoff.skill.md

docs/ai/skills/review-workspace-create.skill.md
docs/ai/skills/review-diff-analysis.skill.md
docs/ai/skills/review-comments-create.skill.md
docs/ai/skills/review-followup.skill.md
docs/ai/skills/review-final-handoff.skill.md
```

Also search documentation for outdated names and update them:

```text
00-approved-pbi.md
implementation-plan.md
codebase-index.md
04_decision_log.md
06_handoff.md

review-brief.md
context.md
diff-analysis.md
en_pr_comments.md
fa_pr_suggestions.md
followup-log.md
handoff.md

04-en_pr_comments.md
05-fa_pr_suggestions.md
04-en-pr-comments.md
05-fa-pr-suggestions.md
```

Be careful:

- Do not replace generic words like “context”, “handoff”, or “diff analysis” when they are not file names.
- Only replace actual file path/name references.
- Preserve Markdown formatting.
- Preserve V2 governance rules.
- Preserve repo-context ownership rules.
- Preserve Plan + Execution Memory semantics for phases.

---

# Workflow Consistency Requirements

After the update, confirm that all workflow instructions use the new names.

## PBI Workflow Consistency

Confirm that:

```text
pbi-workspace-create
creates:
01-context.md
02-implementation-plan.md
03-codebase-index.md
04-decision_log.md
06-handoff.md
phases/
knowledge/
```

Confirm that:

```text
pbi-plan-create
updates:
01-context.md
02-implementation-plan.md
03-codebase-index.md
phases/*.md
knowledge/* only if needed
04-decision_log.md only if decisions exist
```

Confirm that:

```text
implementation-phase
reads:
02-implementation-plan.md
selected phases/*.md
source files listed in the selected phase
```

Confirm that:

```text
review-phase
reads:
02-implementation-plan.md
selected phases/*.md
current git diff
```

Confirm that:

```text
fix-phase
reads:
review findings
selected phase file
current git diff
```

If a review log file is needed in future, document that slot `05` is reserved and not currently part of the official PBI structure.

Confirm that:

```text
pbi-final-handoff
updates:
06-handoff.md
04-decision_log.md if needed
```

## Review Workflow Consistency

Confirm that:

```text
review-workspace-create
creates:
01-review-brief.md
02-context.md
03-diff-analysis.md
04-en-pr-comments.md
05-fa-pr-suggestions.md
06-followup-log.md
07-handoff.md
```

Confirm that:

```text
review-diff-analysis
updates:
03-diff-analysis.md
02-context.md if needed
```

Confirm that:

```text
review-comments-create
updates:
04-en-pr-comments.md
05-fa-pr-suggestions.md
```

Confirm that:

```text
review-followup
updates:
06-followup-log.md
04-en-pr-comments.md if new comments are needed
05-fa-pr-suggestions.md if internal suggestions change
```

Confirm that:

```text
review-final-handoff
updates:
07-handoff.md
```

---

# Validation After Update

Create or update:

```text
docs/ai/foundation/v2-file-naming-update.md
```

It must include:

```text
# V2 File Naming Update

## Summary

## Old Names Replaced

## New Official PBI Names

## New Official Review Names

## Files Updated

## Workflow Consistency Check

## Outdated References Remaining

## Validation Result

## Remaining Risks

## Source Code Modified
No

## Ready For Re-validation
Yes/No
```

Validation result must explicitly say whether:

```text
Ready For Re-validation: Yes
```

or:

```text
Ready For Re-validation: No
```

---

# Final Response

Return:

1. Summary
2. Naming changes applied
3. Files updated
4. Workflow consistency check
5. Any outdated references remaining
6. Validation result
7. Markdown Files Changed
8. Confirmation that source code was not modified
9. Recommended next step

## Markdown Change Reporting Rule

Whenever any markdown file is created, updated, renamed, or deleted, report it under:

## Markdown Files Changed

For each file:

- File path
- Action: Created / Updated / Renamed / Deleted
- Reason
- Summary of changes
- Whether the change affects future AI context

```

```
