## Recommended Parameters

PBI_ID: STP-8107

PBI_TITLE:

Prevent Azure Client Secret Exposure in AD Connection UI

PBI_DESCRIPTION:

Update the Active Directory integration flow to ensure that Azure client secrets are never exposed to users through the frontend UI.

The current implementation allows the decrypted `AzureClientSecret` value to flow from backend APIs through the frontend store into `ADConnectionEditor.vue`, where it is bound to the UI and can be displayed to users.

Modify the application behavior so that existing secrets are not returned to the UI for display purposes while preserving all existing Active Directory integration functionality.

Implementation requirements:

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

Important implementation constraint:

If backend code paths, DTO properties, or API responses are identified as potentially obsolete or no longer required for UI scenarios, they must not be deleted as part of this PBI.

Before removing any code related to `AzureClientSecret`, verify that it is not used by internal workflows, including health checks, import operations, background services, or legacy consumers.

If code appears unused or requires future cleanup, comment it and add a note indicating that it requires dependency analysis and separate removal in a future PBI.

SOURCE_CONTEXT:

- Business context:
  - The business objective is to prevent disclosure of Azure client secrets through the application UI.
  - Existing database encryption is considered sufficient for this PBI.
  - The focus is secure handling and non-disclosure of secrets rather than changes to secret storage architecture.

- Important constraints:
  - The scope is limited to preventing secret exposure in UI, frontend state management, and API responses used by the frontend.
  - Existing encryption mechanisms, key management, and database schema must remain unchanged.
  - Azure Key Vault, Managed Identity, secret rotation, and data migration are explicitly out of scope.
  - Backend code must not be removed unless all dependencies have been verified.
  - Potentially unused code should be commented and documented rather than deleted.

- Risks:
  - Editing non-secret fields may unintentionally overwrite or clear existing secrets.
  - Changes to DTOs or API contracts may break health checks, import workflows, or other internal consumers.
  - Multiple frontend paths may consume AD Connection data and require review.
  - Internal backend consumers may rely on existing DTO structures.

- Assumptions:
  - The existing database encryption approach is acceptable.
  - The backend must continue to access secrets for authentication and import operations.
  - Users do not need to view existing secrets after they have been saved.
  - Replacing an existing secret is allowed through the edit flow.

- Validation focus:
  - `GetADConnections` and `GetADConnectionById` responses intended for UI consumption must not expose `AzureClientSecret`.
  - The frontend must not display existing secret values.
  - The frontend store must not retain existing secrets.
  - Creating a new connection with a secret must continue to work.
  - Editing a connection without providing a new secret must preserve the existing secret.
  - Editing a connection with a new secret must update the stored value correctly.
  - Health checks and import flows must continue to function correctly.
  - No backend code should be removed without dependency analysis.

- Additional information useful for planning:
  - The current flow is:
    `API response -> Store -> ADConnectionEditor.vue -> v-model azureClientSecret`
  - Likely affected areas include:
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

List:

- Key risks:
  - Existing secrets may be overwritten during updates.
  - API contract changes may impact internal consumers.
  - Hidden dependencies on `AzureClientSecret` may exist.

- Key unknowns:
  - Whether additional frontend screens consume AD Connection DTOs.
  - Whether background processes or integrations rely on current API response structures.
  - Whether shared DTOs are used by both UI and internal workflows.

- Areas requiring repository inspection:
  - AD Connection frontend components and state management.
  - DTO definitions and API contracts.
  - Backend services responsible for connection retrieval and updates.
  - Health check and import workflows.
  - Logging and serialization paths involving AD connections.

- Areas that should not be changed unless necessary:
  - Existing encryption implementation.
  - Database schema and migrations.
  - Key management configuration.
  - Import workflow business logic.
  - Health check logic unrelated to UI exposure.
  - Secret persistence behavior used by backend services.

## Final Codex Prompt

Use skill: pbi-workspace-create

Parameters:

PBI_ID: STP-8107

PBI_TITLE:

Prevent Azure Client Secret Exposure in AD Connection UI

PBI_DESCRIPTION:

Update the Active Directory integration flow to ensure that Azure client secrets are never exposed to users through the frontend UI.

The current implementation allows the decrypted `AzureClientSecret` value to flow from backend APIs through the frontend store into `ADConnectionEditor.vue`, where it is bound to the UI and can be displayed to users.

Modify the application behavior so that existing secrets are not returned to the UI for display purposes while preserving all existing Active Directory integration functionality.

Implementation requirements:

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

Important implementation constraint:

If backend code paths, DTO properties, or API responses are identified as potentially obsolete or no longer required for UI scenarios, they must not be deleted as part of this PBI.

Before removing any code related to `AzureClientSecret`, verify that it is not used by internal workflows, including health checks, import operations, background services, or legacy consumers.

If code appears unused or requires future cleanup, comment it and add a note indicating that it requires dependency analysis and separate removal in a future PBI.

SOURCE_CONTEXT:

- Business objective is to prevent Azure client secrets from being exposed in the UI.
- Existing encryption is considered sufficient.
- UI, frontend state, and API responses used by the UI are in scope.
- Encryption mechanisms, key management, database schema, and migrations are out of scope.
- Health checks and import workflows must remain fully functional.
- Backend code must not be deleted without dependency analysis.
- Potentially obsolete code should be commented and documented for future cleanup.

Important:

Use `docs/ai/skills/README.md` to locate the relevant skill.

Create only the PBI workspace.

Do not perform planning.

Do not perform implementation.

Do not modify source code.

Create and initialize only the required markdown workspace structure.

Report all markdown changes under:

## Markdown Files Changed

Final output should contain:

1. Summary

2. Workspace created

3. Markdown Files Changed

4. Open questions

5. Recommended next skill
