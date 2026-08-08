# STP-8107 Codebase Index

## Relevant Areas

- AD Import frontend editor, store, and API wrapper.
- AD Import backend controller endpoints.
- AD Connection DTO/validation/service methods used by list, detail, create, update, health check, and import flows.
- Backend Azure AD integration paths that need real secrets internally.

## Files To Inspect

Before edits, inspect these targeted files:

- `Web-Suite/clientapp/src/components/Import/ADImport/ADConnectionEditor.vue`
- `Web-Suite/clientapp/src/store/stores/adImporter.js`
- `Web-Suite/clientapp/src/services/ad-import-service.js`
- `Web-Suite/clientapp/src/views/Import/ADImport/ADImportOverview.vue`
- `Web.Core/Dto/ADImport/ADConnectionDto.cs`
- `Web.Core/Validators/ADConnectionValidators/ADConnectionDtoValidator.cs`
- `Web.Core/Services/IADConnectionService.cs`
- `Web.Services/ADConnectionService.cs`
- `Web.Services/AzureAdInfoService.cs`
- `Web.Services/ADUserService.cs`
- `Web-Suite/Controllers/ADImportController.cs`
- `Web-Suite/MappingProfiles/Profiles.cs`
- `Web.NUnitTest/ADImportControllerTests.cs`

Inspect only if needed after the first pass:

- `Web.Data/Repositories/ADConnectionRepository.cs`
- `Web.Core/Repositories/IADConnectionRepository.cs`
- `Web.Services/AuditLogs/AuditService.cs`
- `Web-Suite/clientapp/src/components/Import/ADImport/ADImportWizard.vue`
- `Web-Suite/clientapp/src/components/Import/ADImport/ChooseConnection.vue`
- `Web-Suite/clientapp/src/components/Import/ADImport/ChooseGroups.vue`

## Files Expected To Change

Likely:

- `Web-Suite/clientapp/src/components/Import/ADImport/ADConnectionEditor.vue`
- `Web-Suite/clientapp/src/store/stores/adImporter.js`
- `Web.Core/Dto/ADImport/ADConnectionDto.cs` or an additional UI-safe DTO if local patterns support it
- `Web.Services/ADConnectionService.cs`
- `Web-Suite/Controllers/ADImportController.cs`
- `Web.Core/Validators/ADConnectionValidators/ADConnectionDtoValidator.cs`

Possible:

- `Web-Suite/clientapp/src/services/ad-import-service.js`
- `Web-Suite/MappingProfiles/Profiles.cs`
- `Web.NUnitTest/ADImportControllerTests.cs`
- Translation files only if the UI needs new visible text:
  - `Web-Suite/clientapp/src/language/translations/en.json`
  - `Web-Suite/clientapp/src/language/translations/de.json`

## Files Expected To Stay Unchanged

- `Web.Core/Helpers/EncryptionHelper.cs`
- `Web.Core/Models/ADConnection.cs`
- `Web.Core/Data/WebSuiteContext.cs`
- `Web.Core/Migrations/*`
- `Web.Core/Data/WebSuiteSeeder.cs`
- Azure Key Vault, Managed Identity, deployment, and key-management configuration files

## Search Hints

- Search terms: `AzureClientSecret`, `azureClientSecret`, `ADConnectionDto`, `GetADConnections`, `GetADConnectionById`, `GetADConnectionsWithHealthCheck`, `CreateADConnection`, `UpdateADConnection`.
- Frontend flow likely follows: component -> Pinia store -> `ad-import-service.js`.
- Backend flow likely follows: controller -> `IADConnectionService` -> `ADConnectionService` -> repository/integration service.

## Phase To Source Files

| Phase | Source Files |
| --- | --- |
| 01 - Backend UI Contract | `ADImportController.cs`, `ADConnectionService.cs`, `IADConnectionService.cs`, `ADConnectionDto.cs`, `ADConnectionDtoValidator.cs`, `AzureAdInfoService.cs`, `ADUserService.cs`, `Profiles.cs` |
| 02 - Frontend Secret Handling | `ADConnectionEditor.vue`, `adImporter.js`, `ad-import-service.js`, `ADImportOverview.vue`, optional AD Import wizard components |
| 03 - Validation And Regression | `ADImportControllerTests.cs`, changed backend/frontend files, targeted manual network/UI verification |

## Phase To Knowledge Files

| Phase | Knowledge Files |
| --- | --- |
| 01 - Backend UI Contract | `knowledge/secret-ui-contract.md` |
| 02 - Frontend Secret Handling | `knowledge/secret-ui-contract.md` |
| 03 - Validation And Regression | `knowledge/secret-ui-contract.md` |

## Phase To Relevant Modules

| Phase | Modules |
| --- | --- |
| 01 - Backend UI Contract | `Web-Suite`, `Web.Core`, `Web.Services` |
| 02 - Frontend Secret Handling | `Web-Suite/clientapp` |
| 03 - Validation And Regression | `Web.NUnitTest`, `Web-Suite/clientapp`, `Web-Suite`, `Web.Services` |

## Phase To Created Or Updated Files

Planned only. To be filled during execution memory updates.

## Phase To Created Or Updated Functions

Planned only. To be filled during execution memory updates.

## Function To Purpose

Planned only. To be filled during execution memory updates.

## Function To Usage

Planned only. To be filled during execution memory updates.

## Function To Related Flow

Planned only. To be filled during execution memory updates.

## Function To Validation Focus

Planned only. To be filled during execution memory updates.

## Function To Review Focus

Planned only. To be filled during execution memory updates.
