# Purpose

Start the PBI workflow safely with `pbi_clarification`.

This is a launcher prompt. It does not execute the whole PBI workflow in one run. It starts the workflow and prepares the next prompt when the PBI is ready.

# Parameters

| Parameter | Required | Description |
|---|---|---|
| STP_ID | Optional | Target PBI ID when known. Example: STP-123. |
| RAW_PBI | Yes | Raw PBI text, user story, feature request, or rough requirement. |
| REQUESTER | Optional | Requester name. Example: Mostafa. |

# Parameter Options

## STP_ID

| Option | Description |
|---|---|
| Options not documented yet. | Use a stable workspace ID such as `STP-123`, or leave it derivable when the skill allows it. |

## RAW_PBI

| Option | Description |
|---|---|
| Free text | Paste the raw PBI or user story. |

## REQUESTER

| Option | Description |
|---|---|
| Free text | Person requesting the work. |

# Required Inputs

- Raw PBI or user story
- Optional target STP ID

# Expected Outputs

- Clarified PBI or clarification questions
- Next ready-to-run prompt for `pbi_workspace_create` when ready

# Rules

| Rule | Description |
|---|---|
| One Skill | Execute only `pbi_clarification` in this run. |
| No Source Changes | Source code modification is prohibited. |
| No Auto-Chaining | Prepare the next prompt, but do not execute it. |
| Local Context Only | Read only the selected skill and required context. |

# Common Mistakes

- Asking the agent to run the entire PBI workflow in one prompt.
- Skipping clarification for an unclear PBI.
- Creating a workspace before the PBI is ready.

# Token Optimization Tips

- Keep RAW_PBI concise.
- Put long background details in the task only when they affect acceptance criteria.
- Run one PBI skill per request.
