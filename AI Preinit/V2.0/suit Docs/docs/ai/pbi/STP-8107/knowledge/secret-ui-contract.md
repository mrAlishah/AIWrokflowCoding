# STP-8107 Secret UI Contract

## Purpose

This PBI treats Azure Client Secret as write-only from the UI perspective after initial save.

## Contract

- UI-facing read responses must not expose the real `AzureClientSecret`.
- Frontend state must not retain existing real secret values.
- Create flow may submit a new secret.
- Edit flow may submit a replacement secret.
- Edit flow with no replacement secret must preserve the existing stored secret.
- Backend-only flows may still decrypt or resolve the secret internally for authentication, health checks, and import operations.

## Non-Goals

- No encryption refactor.
- No database schema change.
- No data migration.
- No Azure Key Vault or Managed Identity work.
- No secret rotation workflow.

## Validation Rules

- UI/network inspection should show no real secret in AD Connection read responses used by the frontend.
- Existing connection edit UI should not render the current stored secret.
- Backend operations that require the real secret must continue to work.
