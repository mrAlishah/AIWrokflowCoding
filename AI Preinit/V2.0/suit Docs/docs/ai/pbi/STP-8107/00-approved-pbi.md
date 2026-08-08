# STP-8107 - Prevent Azure Client Secret Exposure in AD Connection UI

## PBI ID

STP-8107

## Title

Prevent Azure Client Secret Exposure in AD Connection UI

## Approved Request

Update the Active Directory integration flow to ensure that Azure client secrets are never exposed to users through the frontend UI.

The current implementation allows the decrypted `AzureClientSecret` value to flow from backend APIs through the frontend store into `ADConnectionEditor.vue`, where it is bound to the UI and can be displayed to users.

Modify the application behavior so that existing secrets are not returned to the UI for display purposes while preserving all existing Active Directory integration functionality.

## Implementation Requirements

- Prevent `AzureClientSecret` from being displayed in the AD Connection edit form.
- Ensure the frontend store does not retain or expose existing secret values received from backend APIs.
- Update the create flow to continue accepting a new secret value during connection creation.
- Update the edit flow to support replacing or resetting the secret without displaying the existing value.
- Ensure that editing non-secret fields does not overwrite, clear, or invalidate the existing secret when no new value is provided.
- Review DTOs and API responses used by the AD Connection UI and remove `AzureClientSecret` from responses intended for frontend consumption where appropriate.
- Preserve backend access to the secret for required internal operations, including authentication, health checks, and import processes.
- Verify that health check and import workflows continue to function correctly after UI changes.
- Do not modify the existing encryption mechanism, key management approach, database schema, or persistence model.
- Do not migrate existing data.
- Do not implement Azure Key Vault, Managed Identity, or secret rotation capabilities.

## Important Implementation Constraint

If backend code paths, DTO properties, or API responses are identified as potentially obsolete or no longer required for UI scenarios, they must not be deleted as part of this PBI.

Before removing any code related to `AzureClientSecret`, verify that it is not used by internal workflows, including health checks, import operations, background services, or legacy consumers.

If code appears unused or requires future cleanup, comment it and add a note indicating that it requires dependency analysis and separate removal in a future PBI.

## Acceptance Criteria

- `AzureClientSecret` is not displayed in the AD Connection edit form.
- Frontend state does not retain or expose existing secret values received from backend APIs.
- Creating a new AD Connection with a secret continues to work.
- Editing an existing AD Connection without providing a new secret preserves the existing stored secret.
- Editing an existing AD Connection with a new secret updates the stored value correctly.
- API responses intended for UI consumption do not expose the real `AzureClientSecret`.
- Backend access to the secret for authentication, health checks, and import processes remains functional.
- Health check and import workflows continue to function correctly.
- Existing encryption, key management, database schema, persistence model, and data remain unchanged.
- No backend code is removed without dependency analysis.

## Constraints

- Scope is limited to preventing secret exposure in UI, frontend state management, and API responses used by the frontend.
- Existing database encryption is considered sufficient for this PBI.
- Existing encryption mechanisms, key management, database schema, migrations, Azure Key Vault, Managed Identity, secret rotation, and data migration are out of scope.
- Backend code must not be removed unless all dependencies have been verified.
- Potentially unused code should be commented and documented rather than deleted.
- Do not run lint unless explicitly requested by the user.
- Follow existing project patterns, naming, and architecture.

## Source Context

### Business Context

The business objective is to prevent disclosure of Azure client secrets through the application UI. Existing database encryption is considered sufficient for this PBI. The focus is secure handling and non-disclosure of secrets rather than changes to secret storage architecture.

### Risks

- Editing non-secret fields may unintentionally overwrite or clear existing secrets.
- Changes to DTOs or API contracts may break health checks, import workflows, or other internal consumers.
- Multiple frontend paths may consume AD Connection data and require review.
- Internal backend consumers may rely on existing DTO structures.

### Assumptions

- The existing database encryption approach is acceptable.
- The backend must continue to access secrets for authentication and import operations.
- Users do not need to view existing secrets after they have been saved.
- Replacing an existing secret is allowed through the edit flow.

### Validation Focus

- `GetADConnections` and `GetADConnectionById` responses intended for UI consumption must not expose `AzureClientSecret`.
- The frontend must not display existing secret values.
- The frontend store must not retain existing secrets.
- Creating a new connection with a secret must continue to work.
- Editing a connection without providing a new secret must preserve the existing secret.
- Editing a connection with a new secret must update the stored value correctly.
- Health checks and import flows must continue to function correctly.
- No backend code should be removed without dependency analysis.

### Additional Information Useful For Planning

Current problematic flow:

```text
API response -> Store -> ADConnectionEditor.vue -> v-model azureClientSecret
```

Likely affected areas:

- `ADConnectionEditor.vue`
- `adImporter.js`
- `ad-import-service.js`
- `ADConnectionDto`
- `ADConnectionService.GetAllADConnections`
- `ADConnectionService.GetADConnectionById`
- `ADConnectionService.Update`
- `ADImportController.GetADConnections`
- `ADImportController.GetADConnectionById`

## Review Before Starting

### Key Risks

- Existing secrets may be overwritten during updates.
- API contract changes may impact internal consumers.
- Hidden dependencies on `AzureClientSecret` may exist.

### Key Unknowns

- Whether additional frontend screens consume AD Connection DTOs.
- Whether background processes or integrations rely on current API response structures.
- Whether shared DTOs are used by both UI and internal workflows.

### Areas Requiring Repository Inspection

- AD Connection frontend components and state management.
- DTO definitions and API contracts.
- Backend services responsible for connection retrieval and updates.
- Health check and import workflows.
- Logging and serialization paths involving AD connections.

### Areas That Should Not Be Changed Unless Necessary

- Existing encryption implementation.
- Database schema and migrations.
- Key management configuration.
- Import workflow business logic.
- Health check logic unrelated to UI exposure.
- Secret persistence behavior used by backend services.
