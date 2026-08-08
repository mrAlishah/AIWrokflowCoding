# Codebase Index

Compact codebase navigation guide.

## Entry Points

- Backend host: `Web-Suite/Program.cs`
- Backend startup and DI: `Web-Suite/Startup.cs`
- Main EF context: `Web.Core/Data/WebSuiteContext.cs`
- Frontend app bootstrap: `Web-Suite/clientapp/src/main.js`
- Frontend routing and guards: `Web-Suite/clientapp/src/router.js`
- Frontend axios behavior: `Web-Suite/clientapp/src/services/api.js`
- Minimal AD API: `MinimalAPIs/ADInfo.API/Program.cs`

## Common Change Areas

| Task Type | Start Here | Notes |
| --- | --- | --- |
| Backend endpoint | Matching `Web-Suite/Controllers/*Controller.cs` | Then inspect service interface/implementation and repository |
| Backend business rule | Matching `Web.Services/*Service.cs` | Check DTOs, validators, identity/tenant checks, repository calls |
| Data query | Matching `Web.Data/Repositories/*Repository.cs` | Watch tracking vs `AsNoTracking`, includes, tenant filters |
| New backend entity/field | `Web.Core/Models`, `Web.Core/Data/WebSuiteContext.cs` | Usually requires DTOs, validators, mapping, migration |
| Validation | `Web.Core/Validators/*` | FluentValidation with explicit registrations in `Startup.cs` |
| Frontend page | `Web-Suite/clientapp/src/router.js` and `src/views/<Area>` | Follow existing lazy route and permission patterns |
| Frontend API call | `src/services/*-service.js` | Use shared `api` and `authHeader()` patterns |
| Frontend state | `src/store/stores/<area>.js` | Setup stores use `reactive`, `computed`, and action functions |
| Frontend domain helpers | `src/Composables/*Composable.js` | Common place for option lists, formatting, calculations |
| Translations | `src/language/translations/en.json` and `de.json` | Add matching keys in both languages |
| Reports | `Web.Reports` | Keep report DTO/repository/service/resource changes together |
| Built-in catalog/content | `Web.Core/Data/LiveSystemContent` | Official catalog and threat JSON files copied by project content rules |
| Official catalog JSON import | `Web.Services/OfficialCatalogJsonImportService.cs` | Then inspect `Web.Core/Dto/CatalogJsonImport/*`, `CatalogController.ImportOfficialCatalogJson`, and `CatalogJsonImportProfiles` |
| System import/template assets | `Web-Suite/Files/System` | Asset import spreadsheets, infrastructure mapping, BSI threats, email templates |
| ADInfo minimal API | `MinimalAPIs/ADInfo.API` | Endpoint registration is abstracted behind `ConfigureADInfoEndpoints()` |
| Tests | `Web.NUnitTest` | NUnit/NSubstitute; inspect current active tests before adding patterns |

## Search Hints

- Backend vertical names repeat across folders: `ActionController`, `IActionService`, `ActionService`, `IActionRepository`, `ActionRepository`, `ActionDto`, `ActionDtoValidator`.
- Asset-management features often have parallel files under `AssetManagement` folders in controllers, DTOs, repositories, services, validators, views, components, stores, services, and composables.
- Official Catalog JSON import uses `CatalogJsonImport` DTO names, `OfficialCatalogJsonImportService`, `CatalogJsonImportProfiles`, `OfficialCatalogJsonImportDialog.vue`, and `catalogStore.importOfficialCatalogJson`.
- Emergency planning and cluster/backup features have service folders under `Web.Services` plus matching report/service/repository files.
- Permission strings follow `Feature.Action` patterns such as `Action.Read`, `Settings.Read`, `AssetTree.Update`.
- Translation keys usually begin with `l_` and are returned by backend errors or used in frontend composables/components.
- Frontend service files use kebab/camel mixed historical names such as `action-service.js`, `riskManagement-service.js`, `featurePackage-service.js`; follow the nearby file's naming style.

## Context Loading Order

1. Read this file, `module_map.md`, and `file_index.md`.
2. For backend work, read the specific controller, service interface, service implementation, repository interface, repository implementation, DTO, validator, and mapping profile for the feature.
3. For frontend work, read the route entry, relevant view/component, store, service wrapper, composable, and translation keys.
4. For DB changes, read the model, context configuration, current migrations, and any affected seed/import code.
5. For build/test changes, read the relevant `.csproj`, package file, pipeline YAML, and existing test file.

