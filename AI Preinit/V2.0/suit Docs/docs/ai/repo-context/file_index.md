# File Index

Curated index of important repository files.

## Rules

- Include only files that are useful for repeated navigation.
- Group by purpose, not by complete directory tree.
- Keep notes short.

## Index

| Area | File | Purpose |
| --- | --- | --- |
| Solution | `Web-Suite.sln` | Main .NET solution and project list |
| Build settings | `Directory.Build.props` | Shared analyzer behavior; `DebugFast` disables analyzers |
| Editor/lint rules | `.editorconfig` | Backend/frontend indentation and C# analyzer/naming rules |
| Git hooks | `.lintstagedrc.json` | Pre-commit formatting/lint/backend checks |
| Backend host | `Web-Suite/Program.cs` | Serilog and host bootstrap |
| Backend composition | `Web-Suite/Startup.cs` | DbContexts, DI registration, auth, Swagger, SignalR, middleware |
| Backend config | `Web-Suite/appsettings.json` | Main application settings and version number |
| Backend system assets | `Web-Suite/Files/System/*` | Import spreadsheets, infrastructure mapping, BSI threats JSON, and email templates |
| Docker defaults | `docker/backend/appsettings.default.json` | Container default backend config |
| EF context | `Web.Core/Data/WebSuiteContext.cs` | Main EF model and audit-aware save behavior |
| Activity logs context | `Web.Core/Data/ActivityLogsDbContext.cs` | Activity log database context |
| Live content | `Web.Core/Data/LiveSystemContent/*` | Built-in catalog and threat JSON content |
| Migrations | `Web.Core/Migrations/*` | EF migrations for main and activity log contexts |
| Generic repository | `Web.Core/Repositories/IRepository.cs` | Repository contract |
| Generic repository | `Web.Data/Repositories/Repository.cs` | Shared repository implementation |
| API controllers | `Web-Suite/Controllers/*Controller.cs` | Backend HTTP endpoints |
| Mapping | `Web-Suite/MappingProfiles/*` | AutoMapper profiles and resolvers |
| Official catalog import | `Web-Suite/Controllers/CatalogController.cs` | `ImportOfficialCatalogJson` endpoint for official catalog JSON upload |
| Official catalog import | `Web.Core/Dto/CatalogJsonImport/*` | JSON import request and file-shape DTOs |
| Official catalog import | `Web.Core/Services/IOfficialCatalogJsonImportService.cs` | Import service contract |
| Official catalog import | `Web.Services/OfficialCatalogJsonImportService.cs` | JSON validation, catalog-family handling, ID remapping, and official catalog creation |
| Official catalog import | `Web-Suite/MappingProfiles/CatalogJsonImportProfiles.cs` | AutoMapper profiles for catalog JSON import DTOs |
| Frontend app entry | `Web-Suite/clientapp/src/main.js` | Vue, Pinia, i18n, plugins, interceptors |
| Frontend routes | `Web-Suite/clientapp/src/router.js` | Routes, lazy views, auth/permission guard |
| Frontend API client | `Web-Suite/clientapp/src/services/api.js` | Shared axios instance and error/refresh handling |
| Frontend package | `Web-Suite/clientapp/package.json` | Vite scripts, frontend version, dependencies |
| Frontend config | `Web-Suite/clientapp/vite.config.js` | Vite plugins, aliases, CSP, dev proxy |
| Frontend lint | `Web-Suite/clientapp/eslint.config.js` | ESLint flat config and custom script setup rules |
| Frontend format | `Web-Suite/clientapp/.prettierrc` | Frontend Prettier rules |
| Frontend translations | `Web-Suite/clientapp/src/language/translations/en.json` | English translation keys |
| Frontend translations | `Web-Suite/clientapp/src/language/translations/de.json` | German translation keys |
| Official catalog import UI | `Web-Suite/clientapp/src/views/OfficialCatalog/OfficialCatalogOverview.vue` | Hosts the JSON import dialog and reloads the catalog list after success |
| Official catalog import UI | `Web-Suite/clientapp/src/components/OfficialCatalog/OfficialCatalogJsonImportDialog.vue` | Dialog for selecting catalog family and JSON file |
| Official catalog import UI | `Web-Suite/clientapp/src/services/catalog-service.js`, `Web-Suite/clientapp/src/store/stores/catalog.js` | Multipart upload service and Pinia store action |
| Minimal API | `MinimalAPIs/ADInfo.API/Program.cs` | ADInfo API startup |
| Tests | `Web.NUnitTest/Web.NUnitTest.csproj` | NUnit test project |
| Tests | `Web.NUnitTest/ADImportControllerTests.cs`, `ActionServiceTests.cs`, `ClusterDatabaseIntegrationTests.cs` | Current active test files |
| CI | `development.yml`, `master.yml`, `Release.yml`, `liveSystem*.yml`, `websuiteA/B/C.yml` | Azure Pipelines build/deploy definitions and EF SQL generation |

