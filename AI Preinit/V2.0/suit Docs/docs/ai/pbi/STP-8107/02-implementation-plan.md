# STP-8107 Implementation Plan

## Status

Done

## Scope

- Prevent real `AzureClientSecret` values from being displayed in the AD Connection edit UI.
- Prevent frontend state from retaining existing secret values received from UI-facing API responses.
- Keep create flow able to submit a new secret.
- Keep edit flow able to replace/reset the secret without showing the existing secret.
- Preserve existing stored secret when editing non-secret fields without entering a new secret.
- Keep backend-only secret access functional for authentication, health checks, and import workflows.

## Out Of Scope

- Encryption implementation changes.
- Key management changes.
- Database schema or migration changes.
- Existing data migration.
- Azure Key Vault.
- Managed Identity.
- Azure secret rotation.
- Broad AD Import redesign.
- Removing backend code without dependency analysis.

## Phases

| Phase | Status | Goal |
| --- | --- | --- |
| 01 - Backend UI Contract | Done | Confirm UI-facing AD Connection API behavior and prevent secret exposure while preserving backend-only secret use. |
| 02 - Frontend Secret Handling | Done | Update AD Connection UI/store behavior so existing secrets are not retained or displayed, while create/reset still works. |
| 03 - Validation And Regression | Done | Verify no UI/API exposure, no secret loss on edit, and no regression in health check/import flows. |

## Verification Plan

- Inspect network responses for UI-facing AD Connection endpoints and confirm real `AzureClientSecret` is absent.
- Confirm AD Connection edit UI does not show the existing secret.
- Confirm create with a new secret still succeeds.
- Confirm edit without a new secret preserves the existing backend secret.
- Confirm edit with a new secret updates the stored secret.
- Confirm health check/import flows still work.
- Run only proportional checks. Do not run `npm run lint` or `npx eslint` unless the user explicitly requests it.

## Handoff Expectations

- Summarize exact files changed.
- Report whether source inspection found additional UI consumers.
- Report verification performed and any checks intentionally not run.
- Record any cleanup candidates without deleting code outside scope.
