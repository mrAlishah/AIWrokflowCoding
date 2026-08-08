# STP-8019 Codebase Index

## Relevant Areas

- Backend official catalog API: `Web-Suite/Controllers/CatalogController.cs`
- Backend catalog service contract: `Web.Core/Services/ICatalogService.cs`
- Backend catalog service implementation: `Web.Services/CatalogService.cs`
- Optional dedicated export service contract/implementation: `Web.Core/Services/IOfficialCatalogJsonExportService.cs`, `Web.Services/OfficialCatalogJsonExportService.cs`
- Repository contract/implementation: `Web.Core/Repositories/ICatalogRepository.cs`, `Web.Data/Repositories/CatalogRepository.cs`
- JSON contract DTOs: `Web.Core/Dto/CatalogJsonImport/*`
- Mapping reference: `Web-Suite/MappingProfiles/CatalogJsonImportProfiles.cs`
- Catalog model/status: `Web.Core/Models/Catalog.cs`
- Permission model: `Web.Core/Models/RolePermission.cs`
- DI registration: `Web-Suite/Startup.cs`
- Deployment JSON example: `Web.Core/Data/LiveSystemContent/Catalogs/catalog_DIN-EN-ISO-9001-2015-v1.json`
- Additional deployment JSON examples: other files under `Web.Core/Data/LiveSystemContent/Catalogs`
- Official catalog view shell: `Web-Suite/clientapp/src/views/OfficialCatalog/OfficialCatalogOverview.vue`
- Official catalog grid/actions: `Web-Suite/clientapp/src/components/OfficialCatalog/OfficialCatalogOverview.vue`
- Frontend catalog API wrapper: `Web-Suite/clientapp/src/services/catalog-service.js`
- Frontend catalog store: `Web-Suite/clientapp/src/store/stores/catalog.js`
- Catalog status composable: `Web-Suite/clientapp/src/Composables/CatalogComposable.js`
- Translations: `Web-Suite/clientapp/src/language/translations/en.json`, `Web-Suite/clientapp/src/language/translations/de.json`

## Files To Inspect During Implementation

- `Web-Suite/Startup.cs`: identify exact service registration section for any new export service.
- Multiple files under `Web.Core/Data/LiveSystemContent/Catalogs`: derive standard export/deployment shape from more than one existing catalog JSON file.
- `Web.Services/OfficialCatalogJsonImportService.cs`: confirm importer expectations and avoid raw database dump output.
- `Web.Core/Data/WebSuiteContext.cs`: confirm navigation configuration only if export query include behavior is unclear.
- Existing tests under `Web.NUnitTest`: inspect patterns before adding tests.

## Files Expected To Change

- `Web-Suite/Controllers/CatalogController.cs`
- `Web.Core/Services/ICatalogService.cs` or new `Web.Core/Services/IOfficialCatalogJsonExportService.cs`
- `Web.Services/CatalogService.cs` or new `Web.Services/OfficialCatalogJsonExportService.cs`
- `Web.Core/Repositories/ICatalogRepository.cs`
- `Web.Data/Repositories/CatalogRepository.cs`
- `Web-Suite/Startup.cs` if a new service is created
- `Web-Suite/clientapp/src/components/OfficialCatalog/OfficialCatalogOverview.vue`
- `Web-Suite/clientapp/src/services/catalog-service.js`
- `Web-Suite/clientapp/src/store/stores/catalog.js`
- `Web-Suite/clientapp/src/language/translations/en.json`
- `Web-Suite/clientapp/src/language/translations/de.json`
- Optional focused tests in `Web.NUnitTest`

## Files Expected To Stay Unchanged

- Existing deployment JSON files under `Web.Core/Data/LiveSystemContent/Catalogs`
- Existing catalog import DTO property names and top-level JSON keys
- Existing catalog publication/withdraw workflow except shared validation reuse if needed
- Existing migration files; no new `OfficialCatalog.Export` permission is planned
- Repo-context files

## Search Hints

- Search `ImportOfficialCatalogJson`, `ReleaseOfficialCatalog`, `WithdrawCatalog`, and `OfficialCatalogs` for backend patterns.
- Search `CatalogImportFileDto` and `CatalogJsonImport` for the import-compatible JSON contract.
- Compare multiple `catalog_*.json` deployment files for required fields and stable serialization shape.
- During review, use the existing catalog JSON import format as the default model, with `Web.Core/Data/LiveSystemContent/Catalogs` as reference examples.
- Search `catalogStatus.published`, `isWithDrawCatalogVisible`, and `action-cell-template` for UI action placement.
- Search `responseType: 'blob'`, `URL.createObjectURL`, and `content-disposition` for frontend download patterns.
- Search `SUPER_TENANT_ID`, `IsSuperAdmin`, and `OfficialCatalog.Read` for Super Admin/permission patterns; do not add `OfficialCatalog.Export`.

## Phase To Source Files

| Phase | Source Files |
| --- | --- |
| Phase 1 - Backend Export Contract | `CatalogController.cs`, service contract/implementation, repository contract/implementation, `Startup.cs`, `CatalogJsonImport` DTOs as contract reference |
| Phase 2 - Frontend Export Action | Official catalog grid component, catalog service wrapper, catalog store, translations |
| Phase 3 - Verification And Handoff | Relevant tests, generated/exported JSON sample comparison, `06-handoff.md` |

## Phase To Knowledge Files

| Phase | Knowledge Files |
| --- | --- |
| Phase 1 - Backend Export Contract | `knowledge/catalog-export-json-contract.md` |
| Phase 2 - Frontend Export Action | `knowledge/catalog-export-json-contract.md` |
| Phase 3 - Verification And Handoff | `knowledge/catalog-export-json-contract.md` |

## Phase To Relevant Modules

| Phase | Modules |
| --- | --- |
| Phase 1 - Backend Export Contract | `Web-Suite`, `Web.Core`, `Web.Services`, `Web.Data` |
| Phase 2 - Frontend Export Action | `Web-Suite/clientapp` |
| Phase 3 - Verification And Handoff | `Web.NUnitTest`, `Web-Suite/clientapp`, PBI workspace |

## Phase To Created Or Updated Files

| Phase | Created Or Updated Files |
| --- | --- |
| Phase 1 - Backend Export Contract | Existing backend files plus optional new export service files |
| Phase 2 - Frontend Export Action | Existing frontend catalog files and translation files |
| Phase 3 - Verification And Handoff | Optional tests and `06-handoff.md` |

## Phase To Created Or Updated Functions

| Function | Purpose | Usage | Related Flow | Validation Focus | Review Focus |
| --- | --- | --- | --- | --- | --- |
| `ExportOfficialCatalogJson(Guid catalogId)` | Build standard-format export result for selected catalog | Called by controller endpoint | Official catalog export backend | Super Admin, `OfficialCatalog.Read`, published status, complete pretty-printed JSON | Uses importer/deployment contract; avoids empty output and raw database dumps |
| `GetByIdForJsonExport(Guid catalogId)` | Load complete catalog graph for export | Called by export service | Repository/data access | Includes family, types, attributes, elements, values | No tracking where possible; no tenant leakage |
| `ExportOfficialCatalogJson` controller action | Return downloadable JSON file | Called by frontend API wrapper | HTTP download | Policy, status errors, file name | Correct content type and error handling |
| `exportOfficialCatalogJson(catalogId)` frontend service/store | Request blob download | Called by grid action | Frontend download | `responseType: 'blob'` and auth header | Matches existing API wrapper style |
| `onExportCatalogClicked(catalog)` | Trigger export from action column | User clicks action button | Official catalog UI | Visible only for published catalog and allowed user | No layout break; beside release/withdraw |
| `isExportCatalogVisible(catalog)` | Control export action visibility | Used in action cell template | Official catalog UI | `catalogStatus.published` and `OfficialCatalog.Read` | Client-side visibility mirrors backend checks |
