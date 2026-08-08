# Architecture

Reusable architecture knowledge for this repository.

## System Shape

Suite Plus is a combined ASP.NET Core / Vue application built around the active `Web-Suite.sln`.

- `Web-Suite` is the main ASP.NET Core Web API host and also contains the Vue client under `Web-Suite/clientapp`.
- `Web.Core` contains shared domain models, EF Core `DbContext` classes, DTOs, repository/service interfaces, validators, helpers, enums, SignalR hub contracts, and EF migrations.
- `Web.Data` contains repository implementations and data-access helpers.
- `Web.Services` contains application/business services.
- `Web.Reports` contains report DTOs, repositories, services, validators, resources, and DevExpress report artifacts.
- `MinimalAPIs/ADInfo.API` is a separate minimal API for AD information endpoints.
- `Web.NUnitTest` is the NUnit test project.
- Main projects target `net8.0`; `ADInfo.API` and `Web.NUnitTest` target `net8.0-windows`.

## Backend Boundaries

Typical backend flow:

`Controller -> IService -> Service -> IRepository -> Repository -> WebSuiteContext`

- Controllers live in `Web-Suite/Controllers`, use `[ApiController]`, `[Route("[controller]")]`, policy attributes, injected services, and explicit `try/catch` logging.
- Service interfaces live in `Web.Core/Services`; implementations live in `Web.Services`.
- Repository interfaces live in `Web.Core/Repositories`; implementations live in `Web.Data/Repositories`.
- DTOs and validators live in `Web.Core/Dto/*` and `Web.Core/Validators/*`.
- `WebSuiteContext` and `ActivityLogsDbContext` are in `Web.Core`; migrations are also under `Web.Core/Migrations`.
- `Startup.cs` is the main dependency registration point. New repositories/services/validators usually require explicit registration there.
- `Web.Core/Data/LiveSystemContent` contains built-in catalog/threat JSON content copied by the core project.

## Frontend Boundaries

Typical frontend flow:

`View/Component -> Pinia store or Composable -> service module -> axios api client -> backend controller`

- Vue source lives in `Web-Suite/clientapp/src`.
- Routes are centralized in `src/router.js` with lazy-loaded views and route `meta` permissions.
- API wrappers live in `src/services/*-service.js` and call the shared axios instance from `src/services/api.js`.
- Pinia setup stores live in `src/store/stores/*.js`.
- Domain helpers live in `src/Composables/*Composable.js`.
- UI is organized into `src/views/<Area>` and `src/components/<Area>`, often with matching `.scss` files.
- Frontend dependencies include Vue 3, Vite, Pinia, vue-i18n, Vuetify, DevExtreme, axios, SignalR, Quill, and toast/phone/input helpers.
- Translations live in `src/language/translations/en.json` and `de.json`; DevExtreme and Vuetify locale wiring is in `src/main.js`.

## Data Flow And Persistence

- EF Core uses Pomelo MySQL/MariaDB with `MariaDbServerVersion(new Version(10, 11, 2))`.
- Main connection string key: `WebSuite`; activity logs connection key: `ActivityLogsConnection`.
- `WebSuiteContext.SaveChangesAsync` runs audit logging through `IAuditService`; use `CommitWithoutLogAsync` / `SaveChangesWithNoLogAsync` only for known no-context scenarios such as scheduler work.
- Persistent runtime files and logs are based on `PersistentStorage.BasePath`; `Program.cs` fails fast if it is missing.
- Backend returns translation keys such as `l_action.notExists` in error payloads; frontend displays them through i18n/toast flows.

## Integrations

- Authentication/authorization uses JWT bearer, custom policy helpers, route permissions, refresh-token cookie flow, and Vue route guards.
- SignalR is enabled; `ProgressHub` maps to `/progressHub` and `NotificationHub` maps to `/notificationHub`.
- Swagger is configured in `Startup.cs`.
- External/service integrations include Microsoft Graph/Azure Identity, ADInfo API, i-doit/RestSharp clients, email, SMS, Excel import/export, image processing, and DevExpress reports.
- Docker deployment uses files under `docker/`; default backend settings are in `docker/backend/appsettings.default.json`.
- System import files, email templates, fonts, and threat/catalog assets are copied from `Web-Suite/Files/System` and related project content entries.

## Update Notes

- Keep this file focused on durable architecture facts.
- Do not paste source snippets or full registration lists.

