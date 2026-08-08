# Purpose

Create the implementation plan, phase files, validation plan, and codebase navigation without changing source code.

# Parameters

| Parameter | Required | Description |
|---|---|---|
| STP_ID | Yes | Target PBI workspace ID. Example: STP-123. |
| ACCEPTANCE_CRITERIA | Yes | Acceptance criteria. Example: Users can filter audit logs by date, actor, and action type.. |
| CONSTRAINTS | Optional | Planning constraints. Example: Follow existing patterns and avoid unrelated refactors.. |
| PLANNING_SCOPE | Yes | Planning scope. Example: light. |

# Parameter Options

## STP_ID

| Option | Description |
|---|---|
| Options not documented yet. | The selected skill does not document fixed options. Use the example value or update the skill metadata. |

## ACCEPTANCE_CRITERIA

| Option | Description |
|---|---|
| Options not documented yet. | The selected skill does not document fixed options. Use the example value or update the skill metadata. |

## CONSTRAINTS

| Option | Description |
|---|---|
| Options not documented yet. | The selected skill does not document fixed options. Use the example value or update the skill metadata. |

## PLANNING_SCOPE

| Option | Description |
|---|---|
| light | Small plan. |
| standard | Normal plan. |
| deep | Detailed plan. |

# Required Inputs

- 00-approved-pbi.md

# Expected Outputs

- docs/ai/pbi/{STP_ID}/01-context.md
- docs/ai/pbi/{STP_ID}/02-implementation-plan.md
- docs/ai/pbi/{STP_ID}/phases/*.md

# Rules

| Rule | Description |
|---|---|
| Selected Skill Only | Read only the selected skill after START_HERE and the skill index. |
| No Broad Reads | Do not read all docs, all skills, or the whole repository. |
| Markdown Reporting | Report markdown changes with path, action, reason, summary, and future AI context impact. |
| No Source Changes | Source code modification is prohibited. |

# Common Mistakes

- Leaving sample IDs unchanged.
- Running multiple skills in one prompt.
- Using old invocation names.
- Asking for broad context reads without a reason.

# Token Optimization Tips

- Use the short prompt for routine work.
- Keep parameter values specific and concise.
- Read only the selected skill and active workspace.
- Use repo-context only when needed.
