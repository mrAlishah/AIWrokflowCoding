# STP-8107 Handoff

## PBI Summary

Prevent the `AzureClientSecret` from being exposed through the AD Connection UI.
The existing flow returned the decrypted secret in API responses, which flowed through the frontend store into the editor form and was visible to users.

This PBI adds backend sanitization, frontend state protection, update-preservation logic, and targeted regression tests. No encryption, schema, migrations, or backend integration logic was changed.

---

## Implementation Status

All three phases complete.

| Phase                          | Status | Description                                                                                                                                  |
| ------------------------------ | ------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| 01 - Backend UI Contract       | Done   | Added UI-safe service methods; sanitized secret from UI-facing responses; preserved secret on update without new secret; adjusted validation |
| 02 - Frontend Secret Handling  | Done   | Store strips secret from edit state for existing records; editor secret field optional on edit, required on create                           |
| 03 - Validation And Regression | Done   | Four targeted NUnit tests added for backend sanitization and update-preservation behaviors                                                   |

---

## Changed Source Files

| File                                                                        | Change                                                                                                                                                                                                                                                                                                                                                            |
| --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Web-Suite/Controllers/ADImportController.cs`                               | `GetADConnections` and `GetADConnectionById` call the new `ForUI` service methods; all `Log.Error` calls use the structured `(ex, message)` Serilog overload                                                                                                                                                                                                      |
| `Web.Core/Services/IADConnectionService.cs`                                 | Added `GetAllADConnectionsAndClearSecretsForUI` and `GetADConnectionByIdAndClearSecretsForUI` to the interface                                                                                                                                                                                                                                                    |
| `Web.Core/Validators/ADConnectionValidators/ADConnectionDtoValidator.cs`    | `AzureClientSecret` validation uses `.When(...)` so update-without-secret passes; uniqueness check reconstructs the stored secret when none is supplied; inline comment documents the three-case intent                                                                                                                                                           |
| `Web.Services/ADConnectionService.cs`                                       | Added `GetAllADConnectionsAndClearSecretsForUI`, `GetADConnectionByIdAndClearSecretsForUI`, `ClearAzureClientSecret(s)` helpers; `Update` captures the existing encrypted secret before `_mapper.Map` to survive AutoMapper overwrite; `GetAllADConnectionsWithHealthCheck` clears secrets after the health check runs; ordering comment documents the dependency |
| `Web-Suite/clientapp/src/store/stores/adImporter.js`                        | `UPDATE_AD_CONNECTION_TO_EDIT` strips `azureClientSecret` from edit state for any record with an `id`                                                                                                                                                                                                                                                             |
| `Web-Suite/clientapp/src/components/Import/ADImport/ADConnectionEditor.vue` | Secret field uses computed `secretFieldLabel` and `secretFieldRules`; required with `*` on create, optional on edit                                                                                                                                                                                                                                               |
| `Web.NUnitTest/ADImportControllerTests.cs`                                  | Added `GetADConnections_ReturnsNullSecret`, `GetADConnectionById_ReturnsNullSecret`, `UpdateADConnection_WithoutNewSecret_PreservesExistingSecret`, `UpdateADConnection_WithNewSecret_EncryptsAndStoresNewSecret`                                                                                                                                                 |

---

## Validation Performed

| Check                                             | Method                  | Result                                                                                                                        |
| ------------------------------------------------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `dotnet build Web-Suite.sln`                      | Automated (phase 01)    | 0 errors — passed                                                                                                             |
| Backend secret-strip logic                        | Code inspection         | Verified `ClearAzureClientSecret(s)` sets `AzureClientSecret = null` on DTO after decrypt/map                                 |
| Update-without-secret preserves existing          | NUnit test + inspection | `existingAzureClientSecret` captured before `_mapper.Map`; restored when incoming secret is empty                             |
| Update-with-secret encrypts new value             | NUnit test + inspection | `EncryptionHelper.Encrypt` called on new value; replaces stored encrypted secret                                              |
| Health-check-then-clear ordering                  | Code inspection         | `ClearAzureClientSecrets` called after `CheckMultipleADConnections` — secret available during check, stripped before response |
| Frontend store does not retain secret             | Code inspection         | `UPDATE_AD_CONNECTION_TO_EDIT` strips `azureClientSecret` for records with `id`                                               |
| Editor validation: edit optional, create required | Code inspection         | `secretFieldRules` computed returns `[]` on edit, enforced rule on create                                                     |

## Validation Not Performed

| Check                                                                                | Reason                                                                             |
| ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| `dotnet test`                                                                        | `dotnet` not available in this environment — must be run by developer before PR    |
| Browser / network response inspection                                                | Environment has no running application — manual verification required by developer |
| Frontend build / lint                                                                | Not requested per project convention                                               |
| Wizard components (`ADImportWizard.vue`, `ChooseConnection.vue`, `ChooseGroups.vue`) | Not in phase scope — not inspected                                                 |

---

## Remaining Risks

| Risk                                               | Severity   | Notes                                                                                                                                         |
| -------------------------------------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `dotnet test` not run                              | Medium     | Four new tests added; must pass before merge                                                                                                  |
| Manual UI verification pending                     | Medium     | Developer must confirm: secret field empty on edit, `azureClientSecret: null` in network responses, create/edit/health-check flows functional |
| Wizard components not inspected                    | Low        | If any wizard component binds or displays `azureClientSecret`, it requires a follow-up PBI                                                    |
| `CheckMultipleADConnections` reads secret from DTO | Assumption | Comment added in service; if the implementation changes to read from DB instead, ordering comment should be updated                           |
| Zero-GUID `id` on new records                      | Very Low   | Store `id` guard uses truthy check; safe because new records have absent `id`, not zero-GUID string — documented by comment                   |

---

## Suggested PR Description

### Title

`feat(STP-8107): prevent Azure client secret exposure in AD Connection UI`

### Body

```
## What

Prevent the decrypted AzureClientSecret from being returned in UI-facing API
responses and retained in frontend state.

## Why

The existing flow returned the real secret through GetADConnections /
GetADConnectionById into the frontend store and editor form, where it was
visible to users. Existing database encryption is unaffected.

## Backend changes (phase 01)

- Added GetAllADConnectionsAndClearSecretsForUI and GetADConnectionByIdAndClearSecretsForUI service methods
  that call the existing internal methods and strip AzureClientSecret before
  returning to the controller.
- GetAllADConnectionsWithHealthCheck now strips secrets after the health check
  (the check still reads the decrypted secret from the DTO).
- Update preserves the existing encrypted secret when the incoming DTO carries
  no new secret value (edit without replacing the secret).
- ADConnectionDtoValidator.When condition now allows update-without-secret to
  pass validation while still requiring a secret on create.

## Frontend changes (phase 02)

- Store UPDATE_AD_CONNECTION_TO_EDIT strips azureClientSecret from edit state
  for any record that has an id, preventing the null backend value from being
  retained.
- ADConnectionEditor secret field is optional on edit (empty = preserve
  existing) and required on create.

## Tests (phase 03)

- Four NUnit tests added to ADImportControllerTests covering: UI-facing list
  returns null secret, UI-facing detail returns null secret, update without
  new secret preserves existing encrypted secret, update with new secret
  encrypts and stores the new value.

## Not changed

- Encryption mechanism, key management, database schema, migrations, import
  workflow business logic, health check logic unrelated to secret exposure.

## Manual verification required

- Network response for GetADConnections and GetADConnectionById must show
  azureClientSecret: null.
- AD Connection edit form must show empty secret field for existing records.
- Create, edit-without-secret, edit-with-new-secret, health check, and import
  flows must remain functional.
```

---

## Recommended Review Focus

- `ADConnectionService.Update` — pre-capture of `existingAzureClientSecret` before `_mapper.Map`; conditional encrypt-or-preserve logic.
- `ADConnectionDtoValidator` — `When` condition for `AzureClientSecret`; three-case comment should match actual behavior.
- `adImporter.js UPDATE_AD_CONNECTION_TO_EDIT` — `id` truthy guard; confirm it does not fire on new-record objects.
- `ADConnectionEditor.vue` — `secretFieldRules` computed; confirm create path still enforces required.
- New NUnit tests — confirm test setup correctly simulates AutoMapper overwrite in the update-without-secret case.

---

## Follow-Up Items

- Inspect `ADImportWizard.vue`, `ChooseConnection.vue`, `ChooseGroups.vue` to confirm they do not bind or display `azureClientSecret`.
- Run `dotnet test` and all four new tests before merge.
- Perform manual UI and network verification as listed in the Validation Not Performed section.

---

## Intentionally Retained Methods — Why They Were Not Removed

### `IADConnectionService.GetAllADConnections()` — retained in interface, not removed

This method remains on the interface and as a public method on `ADConnectionService` because it is consumed internally by two other service methods:

- `ADConnectionService.GetAllADConnectionsAndClearSecretsForUI()` — calls it to obtain the full decrypted list, then strips secrets before returning to the UI.
- `ADConnectionService.GetAllADConnectionsWithHealthCheck()` — calls it to obtain the full decrypted list so the health check can authenticate using the real secret.

No controller or external service calls it directly. It could be made `private` in a future cleanup PBI without breaking any external contract, but that change is outside the scope of STP-8107 and carries no security benefit — the method is never exposed to the UI.

### `IADConnectionService.GetADConnectionById(Guid)` — retained in interface, must not be removed

This method must remain on the public interface because `ADUserService` depends on it directly in three places:

- `ADUserService.FetchAzureAdGroups` (`ADUserService.cs:73`) — retrieves the connection including the decrypted secret to authenticate against the Azure AD Groups API.
- `ADUserService.CheckADHealthConnection` (`ADUserService.cs:83`) — retrieves the connection to perform the single-connection health check.
- `ADUserService.CreateADAzureUser` (`ADUserService.cs:223`) — retrieves the connection to authenticate during the user import flow.

All three callers require the real decrypted secret for backend-only operations. Removing or replacing this method with the `ForUI` variant would break Azure AD group fetching, health checks, and user import. It must remain as-is.
