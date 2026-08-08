# PBI Workflow

## Workflow Overview

PBI work follows one selected skill at a time. Use prompts in numbered order only when the task actually needs each step. Step 08 is a specialized feedback-analysis step used after human review feedback.

## Step By Step Flow

01. `pbi_clarification`: Clarify a raw PBI before workspace creation.
02. `pbi_workspace_create`: Create the standard PBI workspace after clarification.
03. `pbi_plan_create`: Create the implementation plan, phase files, validation plan, and codebase navigation.
04. `pbi_implementation_phase`: Execute one approved phase with the smallest practical change.
05. `pbi_review_phase`: Review implemented PBI work or one review feedback fix.
06. `pbi_fix_phase`: Apply targeted fixes for approved review findings.
07. `pbi_final_handoff`: Create final handoff after implementation, review, and fixes.
08. `pbi_review_feedback_analysis`: Convert human post-PR/code review feedback into structured RF items.

## Skill Sequence

- 01: `pbi_clarification`
- 02: `pbi_workspace_create`
- 03: `pbi_plan_create`
- 04: `pbi_implementation_phase`
- 05: `pbi_review_phase`
- 06: `pbi_fix_phase`
- 07: `pbi_final_handoff`
- 08: `pbi_review_feedback_analysis`

## Input And Output Per Step

- `pbi_clarification`: inputs: raw PBI. outputs: approved PBI and metrics.
- `pbi_workspace_create`: inputs: approved PBI. outputs: PBI workspace files.
- `pbi_plan_create`: inputs: approved PBI and acceptance criteria. outputs: plan, validation, phases, and context.
- `pbi_implementation_phase`: inputs: selected phase and target files. outputs: implementation and phase memory.
- `pbi_review_phase`: inputs: implementation diff or RF scope. outputs: findings and review memory.
- `pbi_fix_phase`: inputs: approved findings or RF item. outputs: targeted fixes and validation updates.
- `pbi_final_handoff`: inputs: changed files and validation. outputs: final handoff.
- `pbi_review_feedback_analysis`: inputs: human review feedback. outputs: RF items and routing.

## Stop Conditions

Stop when required parameters are missing, scope is unclear, the selected skill does not allow the requested action, or the task would require broad context expansion without approval.

## Validation Expectations

Follow the selected skill validation requirements and report performed or skipped validation honestly.

## Next Step Decision Rules

Use the next numbered prompt only when the previous step completed successfully and the next action is still needed. If the task is blocked, ask for the missing input instead of guessing.
