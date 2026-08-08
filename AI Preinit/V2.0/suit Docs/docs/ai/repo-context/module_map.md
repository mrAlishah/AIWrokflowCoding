# Module Map

Reusable module knowledge for this repository.

## Major Modules

| Module | Responsibility | Notes |
| --- | --- | --- |
| `Web-Suite` | Main ASP.NET Core API host, controllers, startup/DI, mapping profiles, static files, SPA hosting | Project name is `Web.Api`; references Core, Data, Services, Reports |
| `Web-Suite/clientapp` | Vue 3 frontend | Vite build; Vuetify, DevExtreme, Pinia, vue-i18n |
| `Web.Core` | Shared contracts and domain | DTOs, models, EF contexts, interfaces, validators, migrations, enums, helpers |
| `Web.Data` | Repository implementations | Mostly `Repository<TEntity>` plus domain repositories |
| `Web.Services` | Business/application services | Implements `Web.Core/Services` interfaces; uses repositories, AutoMapper, identity, schedulers, integrations |
| `Web.Reports` | Report generation | DevExpress reports, report DTOs, repositories, services, validators, resources |
| `MinimalAPIs/ADInfo.API` | Separate minimal API | JWT protected AD info endpoints via `ConfigureADInfoEndpoints()` |
| `Web.NUnitTest` | Test project | NUnit/NSubstitute; current active coverage is limited |
| `Web.Core/Data/LiveSystemContent` | Built-in catalog and threat content | JSON files are copied by `Web.Core.csproj`; inspect for official catalog/content import work |
| `Web-Suite/Files/System` | Runtime system assets | Import spreadsheets, infrastructure mapping, BSI threats JSON, email templates, and copied fonts/assets |
| `docker` | Container deployment assets | Backend/frontend/database/ingress compose and defaults |

## Official Catalog JSON Import

- Official Catalog JSON import is a cross-layer catalog slice rooted at `CatalogController.ImportOfficialCatalogJson`.
- Backend flow: multipart form request -> `CatalogJsonImportRequestDto` -> `IOfficialCatalogJsonImportService` -> `OfficialCatalogJsonImportService` -> catalog repositories -> `CatalogJsonImportProfiles`.
- The import service is registered explicitly in `Startup.cs` as `IOfficialCatalogJsonImportService`.
- Frontend flow: `OfficialCatalogOverview.vue` opens `OfficialCatalogJsonImportDialog.vue`; the dialog builds `FormData`; `catalog.js` calls `catalog-service.js`; API endpoint is `POST /Catalog/ImportOfficialCatalogJson`.
- The request must include a `.json` file and exactly one catalog-family selector: existing `CatalogFamilyId` or new `CatalogFamilyName`.
- Import is official-catalog only and guarded by `OfficialCatalog.Create`; the service additionally requires the super tenant.
- Import creates a new official catalog in editing status, rewrites imported catalog/type/element IDs to new GUIDs, preserves hierarchy by remapping parent IDs, assigns `CatalogGroupId`/`OriginCatalogId`, release version `1.0`, and official release type.
- Validation rejects invalid file/type/JSON, unsupported structure, missing element types, unknown attributes, invalid catalog-family choice, and missing catalog family.

## Non-Active Or Stale Areas

- `SuitePlusMonitorService` and `MariaDb.Migrations` currently contain only `bin`/`obj` output in this workspace snapshot, not source projects.
- `MVPProjects/AICatalogImporter` is not present in this workspace snapshot.

## Ownership Boundaries

- Backend feature work usually touches one vertical slice: controller in `Web-Suite`, DTO/interface/model/validator in `Web.Core`, repository in `Web.Data`, service in `Web.Services`, and optional mapping profile in `Web-Suite/MappingProfiles`.
- Frontend feature work usually touches one vertical slice: route in `src/router.js`, view/component under `src/views` or `src/components`, service wrapper under `src/services`, Pinia store under `src/store/stores`, composable under `src/Composables`, and translation keys under `src/language/translations`.
- Database shape changes belong in `Web.Core/Models`, `Web.Core/Data`, and EF migrations under `Web.Core/Migrations`.
- Report changes should stay in `Web.Reports` plus API controller/service call sites only when needed.
- Do not update `docs/ai/pbi/*` or `docs/ai/reviews/*` during repo-context updates.

## Cross-Module Dependencies

- `Web-Suite` depends on `Web.Core`, `Web.Data`, `Web.Services`, and `Web.Reports`.
- `Web.Services` depends on `Web.Core` and `Web.Data`.
- `Web.Data` depends on `Web.Core`.
- `Web.NUnitTest` references `Web.Api`, `Web.Core`, and `Web.Services`.
- The frontend uses `VITE_APP_BASE_API`; Vite dev proxy rewrites `/api` to `http://localhost:50598`.
- CI checks backend and frontend version equality between `Web-Suite/appsettings.json` `AppSettings.VersionNumber` and `Web-Suite/clientapp/package.json` `version`.
- Pipeline YAML files generate idempotent `WebSuiteContext` SQL scripts under `Web.Core/AutoMigrations/WebSuiteContext.sql`.

