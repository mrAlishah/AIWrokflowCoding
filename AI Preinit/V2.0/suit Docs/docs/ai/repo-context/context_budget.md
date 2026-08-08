# Context Budget

Rules for loading repository context efficiently.

## Defaults

- Start with the most relevant shared memory file.
- Read current source files before changing implementation behavior.
- Prefer targeted search over broad file dumps.
- Avoid loading full repository trees unless explicitly needed.

## Repo Context Usage

- Treat `docs/ai/repo-context/*` as reusable memory.
- Other skills may read repo-context but must not update it.
- Only `repo-context-update` may refresh repo-context files.

## Preferred Loading Patterns

- Backend feature: `codebase-index.md` -> `module_map.md` -> specific controller/service/repository/DTO/validator/mapping files.
- Frontend feature: `codebase-index.md` -> route -> view/component -> store -> service wrapper -> composable -> translations.
- DB feature: `architecture.md` -> model/context/migration files -> repository/service call sites.
- Report feature: `module_map.md` -> `Web.Reports` service/repository/DTO/report files -> API caller.
- Built-in catalog/content change: `module_map.md` -> `Web.Core/Data/LiveSystemContent` or `Web-Suite/Files/System` -> importer/seeder call sites.
- Official Catalog JSON import change: `module_map.md` -> `Web.Services/OfficialCatalogJsonImportService.cs` -> `Web.Core/Dto/CatalogJsonImport/*` -> `Web-Suite/Controllers/CatalogController.cs` endpoint -> `Web-Suite/MappingProfiles/CatalogJsonImportProfiles.cs` -> `OfficialCatalogJsonImportDialog.vue`/catalog store/service.
- CI/tooling: `file_index.md` -> relevant `.csproj`, package file, YAML, or config.

## Avoid Unless Needed

- Full `Startup.cs` dumps after the relevant registration section is known.
- Full migration snapshots.
- Full translation files; use targeted key searches.
- Full generated report designer files unless changing report layout/resources.
- Log directories and runtime files.
- `bin`/`obj` folders, including stale top-level module-looking directories that contain only build output.

## Update Style

- Keep stable facts.
- Remove stale or noisy details.
- Summarize patterns instead of copying source.

