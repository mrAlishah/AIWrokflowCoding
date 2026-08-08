# Repository Workflow

Reusable workflow knowledge for this repository.

## Working Rules

- Follow existing project patterns, naming, and standards.
- Keep changes scoped to the requested task.
- Preserve unrelated user changes.
- Do not modify source code during documentation-only tasks.
- Do not run `npx eslint` unless the user explicitly asks for it.

## Repo Context Update Workflow

1. Invoke `repo-context-update` explicitly.
2. Read existing `docs/ai/repo-context/*`.
3. Inspect only the repository areas needed to refresh reusable knowledge.
4. Update only `docs/ai/repo-context/*`.
5. Keep context concise and stable.
6. Report all changed markdown files.
7. Do not treat stale build-output-only folders as active modules unless source files are present.

## Backend Change Workflow

1. Locate the vertical slice by searching the domain name across controller, service, repository, DTO, validator, and mapping files.
2. Make changes in the owning layer only.
3. Register new services/repositories/validators in `Startup.cs` when following existing explicit-DI patterns.
4. Preserve tenant and permission checks.
5. Verify with targeted build/test commands proportional to risk.

## Frontend Change Workflow

1. Start from `src/router.js` for page-level work or from the relevant `src/views/<Area>` entry.
2. Follow existing view/component/store/service/composable boundaries.
3. Add matching translation keys to `en.json` and `de.json`.
4. Use existing Vuetify/DevExtreme/component patterns in the same area.
5. Verify with frontend package scripts or browser checks when UI behavior changes.

## Official Catalog JSON Import Workflow

1. Start at `Web.Services/OfficialCatalogJsonImportService.cs` for import behavior, validation, ID remapping, and catalog-family handling.
2. Check `Web.Core/Dto/CatalogJsonImport/*` for accepted JSON structure before changing frontend or backend validation.
3. Keep the controller endpoint as multipart form upload through `CatalogController.ImportOfficialCatalogJson`.
4. Keep frontend upload flow aligned across `OfficialCatalogJsonImportDialog.vue`, `catalog.js`, and `catalog-service.js`.
5. Add or update matching `l_officialCatalog.import.*` translation keys in both `en.json` and `de.json`.
6. Preserve the existing constraints: `.json` file only, exactly one catalog-family input, official catalog create permission, and super-tenant backend guard.

## Database Change Workflow

1. Inspect model, `WebSuiteContext`, affected DTOs/validators/mapping, repository queries, and seed/import logic.
2. Add EF migration under `Web.Core/Migrations`.
3. Confirm migration targets the correct context; activity log migrations live under `Web.Core/Migrations/ActivityLogsDb`.
4. Verify build and migration content before handoff.

## Deployment/CI Notes

- Azure Pipelines YAML files build backend and frontend artifacts and can generate SQL scripts with `dotnet ef migrations script`.
- `development.yml` explicitly compares backend and frontend versions before build/deploy.
- Named pipeline variants use frontend scripts such as `devWebSuiteA`, `devWebSuiteB`, and `devWebSuiteC`.
- Docker files under `docker/` define backend, frontend, database, and ingress container setup.

