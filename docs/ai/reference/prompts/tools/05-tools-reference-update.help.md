# Purpose

Update user-facing reference documentation under `docs/ai/reference/` so users can understand and execute V2 workflows without reading skill files.

# Parameters

| Parameter | Required | Description |
|---|---|---|
| UPDATE_SCOPE | Optional | Reference update scope. Default: `all`. Example: `prompts-only`. |
| AREA | Optional | Reference area to update. Default: `all`. Example: `tools`. |
| CHANGE_REASON | Yes | Reason for the reference update. Example: `skill created`. |
| SOURCE_OF_TRUTH | Optional | Source used to align reference material. Default: `skills-readme`. Example: `skill-files`. |

# Parameter Options

## UPDATE_SCOPE

| Option | Description |
|---|---|
| all | Update all affected reference areas. |
| guides-only | Update guides only. |
| prompts-only | Update prompt files and prompt help only. |
| index-only | Update reference indexes only. |
| area-only | Update one selected area. |

## AREA

| Option | Description |
|---|---|
| pbi | Update PBI reference material. |
| pr | Update PR review reference material. |
| review | Update lower-level review reference material. |
| tools | Update tools reference material. |
| all | Update all affected areas. |

## CHANGE_REASON

| Option | Description |
|---|---|
| skill created | A new skill was added. |
| skill renamed | A skill invocation or file name changed. |
| workflow updated | Workflow steps changed. |
| parameters changed | Skill parameters changed. |
| health check finding | A system health report recommended reference updates. |
| user feedback | A user found reference instructions unclear. |

## SOURCE_OF_TRUTH

| Option | Description |
|---|---|
| skills-readme | Use `docs/ai/skills/README.md` as the primary index. |
| skill-files | Use selected skill files as the primary source. |
| system-health-report | Use the latest system health report as input. |
| manual-request | Use the explicit user request as input. |

# Required Inputs

- A clear `CHANGE_REASON`
- A selected `UPDATE_SCOPE`
- A selected `AREA`
- Current skill routing or selected skill files when prompts need parameter alignment

# Expected Outputs

- Updated `docs/ai/reference/README.md` when affected
- Updated `docs/ai/reference/help-index.md` when affected
- Updated files under `docs/ai/reference/guides/` when affected
- Updated files under `docs/ai/reference/prompts/` when affected
- Markdown Files Changed report

# Rules

| Rule | Description |
|---|---|
| Reference Only | Update only allowed files under `docs/ai/reference/`. |
| Non-Runtime | Keep reference documentation outside normal runtime paths. |
| No Source Changes | Do not modify source code. |
| No Workflow Changes | Do not change runtime workflow behavior. |
| No Skill Renames | Do not rename skills or remove compatibility mappings. |
| Prompt Usability | Prompts must be executable by changing parameter values only. |
| Source Of Truth | Use skill files and `docs/ai/skills/README.md`; do not invent parameters or options. |

# Common Mistakes

- Updating runtime skill behavior while improving reference docs.
- Inventing parameter options not documented by the selected skill.
- Reading all skills when a targeted area update is enough.
- Rewriting historical or system-health report content.

# Token Optimization Tips

- Use `UPDATE_SCOPE: area-only` and a specific `AREA` for targeted updates.
- Use `SOURCE_OF_TRUTH: skill-files` only when parameter details are needed.
- Do not read all skills unless `UPDATE_SCOPE: all` and `AREA: all`.
- Read only affected reference files.
