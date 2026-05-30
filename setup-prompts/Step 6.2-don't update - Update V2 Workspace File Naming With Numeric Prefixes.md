# Step 6.2 - Update V2 Workspace File Naming With Numeric Prefixes

You are updating the V2 AI Operating System documentation and skill instructions to enforce numeric prefixes for PBI and Review workspace files.

Goal:
Update all relevant V2 docs, README files, skill files, templates, examples, validation checklist references, and workflow instructions so the official workspace file names use the new approved numeric-prefix naming.

This is a documentation/governance correction task.

## Strict Rules

- Do not modify source code.
- Do not create a real PBI workspace.
- Do not create a real Review workspace.
- Do not run implementation.
- Do not run review.
- Do not rename real STP workspace files unless they are example/template files created only for docs validation.
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

Then read all official skill files listed in `docs/ai/skills/README.md`.

## Required Naming Update

### PBI Workspace Official Names

Every PBI workspace under:

```text
docs/ai/pbi/STP-XXXX/
```

must use exactly these official names:

```text
00-approved-pbi.md
01-context.md
02-implementation-plan.md
03-codebase-index.md
04-decision_log.md
06-handoff.md

phases/
knowledge/
```

Important:

- Replace old references to `implementation-plan.md` with `02-implementation-plan.md`.
- Replace old references to `codebase-index.md` with `03-codebase-index.md`.
- Keep `04-decision_log.md` exactly as written.
- Keep `06-handoff.md` exactly as written.
- The missing `05` slot is intentional/reserved. Document it as unused/reserved if needed.
- Do not rename `phases/` or `knowledge/`.

### Review Workspace Official Names

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
- Replace old references to `en-pr-comments.md` with `04-en-pr-comments.md`.
- Replace old references to `fa-pr-suggestions.md` with `05-fa-pr-suggestions.md`.
- Replace old references to `followup-log.md` with `06-followup-log.md`.
- Replace old references to `handoff.md` with `07-handoff.md`.

## Preserve File Responsibilities

Do not change file meanings.

### PBI Responsibilities Must Remain

```text
00-approved-pbi.md
= approved requirements / source of truth

01-context.md
= PBI-specific context, not a copy of repo-context

02-implementation-plan.md
= short roadmap only

03-codebase-index.md
= PBI route/index for phases, source files, knowledge files, functions, purpose, usage, validation focus, review focus

04-decision_log.md
= architecture/domain/design decisions only

06-handoff.md
= final PBI handoff, PR-ready summary, validation, risks, review focus
```

### Review Responsibilities Must Remain

```text
01-review-brief.md
= review contract, branch/base/scope/title/description

02-context.md
= review-specific context

03-diff-analysis.md
= local diff analysis

04-en-pr-comments.md
= English PR-ready comments only

05-fa-pr-suggestions.md
= Persian reasoning, suggested fixes, pseudo-code, alternatives, personal notes

06-followup-log.md
= follow-up status tracking

07-handoff.md
= final review summary and decision
```

## Update Required Areas

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

Update all relevant skill files, especially:

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
implementation-plan.md
codebase-index.md
review-brief.md
context.md
diff-analysis.md
en_pr_comments.md
fa_pr_suggestions.md
followup-log.md
handoff.md
```

Be careful:

- Do not replace generic words like “context” when they are not file names.
- Only replace actual file path/name references.
- Preserve Markdown formatting.

## Required Validation After Update

After updates, verify:

### PBI Naming

No official docs or skills still describe the PBI workspace as:

```text
implementation-plan.md
codebase-index.md
```

They must now use:

```text
02-implementation-plan.md
03-codebase-index.md
```

### Review Naming

No official docs or skills still describe the Review workspace as:

```text
review-brief.md
context.md
diff-analysis.md
en_pr_comments.md
fa_pr_suggestions.md
followup-log.md
handoff.md
```

They must now use:

```text
01-review-brief.md
02-context.md
03-diff-analysis.md
04-en-pr-comments.md
05-fa-pr-suggestions.md
06-followup-log.md
07-handoff.md
```

### Workflow Consistency

Confirm that:

- `pbi-workspace-create` creates the new PBI file names.
- `pbi-plan-create` updates `01-context.md`, `02-implementation-plan.md`, `03-codebase-index.md`, phases, knowledge, and `04-decision_log.md` if needed.
- `implementation-phase`, `review-phase`, and `fix-phase` read `02-implementation-plan.md`.
- `pbi-final-handoff` updates `06-handoff.md`.
- `review-workspace-create` creates the new Review file names.
- `review-diff-analysis` updates `03-diff-analysis.md`.
- `review-comments-create` updates `04-en-pr-comments.md` and `05-fa-pr-suggestions.md`.
- `review-followup` updates `06-followup-log.md`.
- `review-final-handoff` updates `07-handoff.md`.

## Output Report

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

## Validation Result

## Remaining Risks

## Source Code Modified
No

## Ready For Re-validation
Yes/No
```

## Final Response

Return:

1. Summary
2. Naming changes applied
3. Files updated
4. Any outdated references remaining
5. Validation result
6. Markdown Files Changed
7. Confirmation that source code was not modified
8. Recommended next step

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
