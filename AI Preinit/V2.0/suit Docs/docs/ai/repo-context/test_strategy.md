# Test Strategy

Reusable verification knowledge for this repository.

## Test Types

| Test Type | Command or Location | Notes |
| --- | --- | --- |
| Backend build | `dotnet build Web-Suite.sln` | Full solution build; analyzers run except in `DebugFast` |
| Fast backend build | `dotnet build Web-Suite.sln -c DebugFast` | Uses repository `DebugFast` config with analyzers disabled |
| Backend tests | `dotnet test Web.NUnitTest/Web.NUnitTest.csproj` | NUnit/NSubstitute project; current active test coverage is limited |
| Frontend dev server | `npm run dev` from `Web-Suite/clientapp` | Vite dev server; proxy target is backend `http://localhost:50598` |
| Frontend build | `npm run build` from `Web-Suite/clientapp` | Vite production build |
| Frontend env builds | `npm run devWebSuiteA`, `npm run devWebSuiteB`, `npm run devWebSuiteC` from `Web-Suite/clientapp` | Vite build modes for named deployment variants |
| Frontend lint | `npm run lint` from `Web-Suite/clientapp` | Use only when requested or needed; do not use `npx eslint` unless explicitly requested |
| Pre-commit checks | `.lintstagedrc.json` | Formats/lints frontend staged files and runs backend code checker for C# |
| CI version check | `development.yml` and sibling pipelines | Backend `AppSettings.VersionNumber` must match frontend package `version` |
| CI migration script | Pipeline YAML files | Generate idempotent `Web.Core/AutoMigrations/WebSuiteContext.sql` via `dotnet ef migrations script` |

## Verification Rules

- Run only checks that are requested or proportional to the change.
- For narrow backend changes, prefer targeted `dotnet build`/`dotnet test` on affected projects when possible.
- For frontend changes, prefer package scripts from `Web-Suite/clientapp`; avoid ad hoc lint commands.
- For DB changes, include migration/build verification and inspect generated migration content.
- For auth/permission or routing changes, verify both backend policy and frontend route/meta behavior.

## Coverage Expectations

- Add or update tests when changing business rules, validation, query behavior, schedulers, imports, reports, or permission-sensitive flows.
- Current test files include `ADImportControllerTests.cs`, `ActionServiceTests.cs`, and `ClusterDatabaseIntegrationTests.cs`; inspect contents before assuming coverage breadth or isolation level.
- UI behavior often needs manual/browser verification because no frontend test framework was confirmed.

