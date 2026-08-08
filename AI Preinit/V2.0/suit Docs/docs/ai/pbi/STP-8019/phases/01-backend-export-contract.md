# Phase 1 - Backend Export Contract

## Status

Completed

## Goal

Add backend support for exporting a published official catalog as an import-compatible JSON download.

## Scope

- Add or extend service contract for official catalog JSON export.
- Inspect multiple existing catalog JSON examples and the catalog JSON importer to derive the standard export format.
- Query the complete catalog graph needed by the existing deployment JSON shape.
- Build `CatalogImportFileDto` from existing catalog data.
- Validate Super Admin and `CatalogStatus.Published`.
- Return JSON as downloadable file with approved filename format.
- Serialize JSON with indentation for deployment readability.
- Keep import JSON DTO property names unchanged.

## Target Files Or Areas

- `Web-Suite/Controllers/CatalogController.cs`
- `Web.Core/Services/ICatalogService.cs` or new `Web.Core/Services/IOfficialCatalogJsonExportService.cs`
- `Web.Services/CatalogService.cs` or new `Web.Services/OfficialCatalogJsonExportService.cs`
- `Web.Core/Repositories/ICatalogRepository.cs`
- `Web.Data/Repositories/CatalogRepository.cs`
- `Web-Suite/Startup.cs` if adding a new service
- `Web.Core/Dto/CatalogJsonImport/*` as contract reference
- `Web.Core/Models/Catalog.cs` as status reference

## Planned Steps

1. Use `OfficialCatalog.Read` with backend Super Admin/status checks; do not add a new `OfficialCatalog.Export` permission.
2. Add backend endpoint, preferably `GET /Catalog/ExportOfficialCatalogJson/{catalogId}` or equivalent route consistent with existing catalog routes.
3. Implement export service logic that rejects non-Super Admin users and non-published catalogs.
4. Inspect multiple existing deployment JSON files under `Web.Core/Data/LiveSystemContent/Catalogs` and review `OfficialCatalogJsonImportService` so the export matches the standard import/deployment format.
5. Add repository query for complete export data, including catalog family, catalog element types and their attributes, catalog elements, element types, element attribute values, and required metadata.
6. Map the catalog graph into `CatalogImportFileDto` with top-level keys and field behavior matching the derived standard deployment format; do not emit empty placeholder JSON or a raw database dump.
7. Serialize with `System.Text.Json` using pretty-print/indented output and return `application/json` file content.
8. Generate filename as `{Timestamp}_{CatalogName}_{Language}_{Version}.json`; sanitize catalog name/version for filesystem safety.
9. Preserve current catalog data and do not mutate the catalog during export.

## Execution Memory

Completed 2026-06-02.

### Files Changed

- `Web.Core/Services/IOfficialCatalogJsonExportService.cs` — Created. New service interface returning `(CatalogImportFileDto file, string fileName, BaseResult result)` tuple.
- `Web.Services/OfficialCatalogJsonExportService.cs` — Created. Validates Super Admin via `SUPER_TENANT_ID` and `CatalogStatus.Published`. Builds full `CatalogImportFileDto` from catalog graph. Generates filename `{timestamp}_{name}_{language}_{version}.json` with filesystem-safe sanitization.
- `Web.Core/Repositories/ICatalogRepository.cs` — Added `GetByIdForJsonExport(Guid catalogId)` to interface.
- `Web.Data/Repositories/CatalogRepository.cs` — Implemented `GetByIdForJsonExport`: AsNoTracking query including `CatalogFamily`, `CatalogElementTypes` + `Attributes`, and `Elements` + `Attributes` with `AsSplitQuery`.
- `Web-Suite/Controllers/CatalogController.cs` — Added `IOfficialCatalogJsonExportService` constructor injection. Added `GET /Catalog/ExportOfficialCatalogJson/{catalogId}` endpoint with `OfficialCatalog.Read` policy. Serializes with `JsonSerializerOptions { WriteIndented = true }`, returns `application/json` file. Catches `ForbiddenRequestException` separately.
- `Web-Suite/Startup.cs` — Registered `IOfficialCatalogJsonExportService` → `OfficialCatalogJsonExportService` as scoped.

### Review Fixes Applied (2026-06-02)

- **Fix 1 (JSON format):** Added `PropertyNamingPolicy = JsonNamingPolicy.CamelCase` and `DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull` to the serializer options in `CatalogController.ExportOfficialCatalogJson`. Top-level `CatalogImportFileDto` properties retain their explicit `[JsonPropertyName]` attributes (which take precedence); all nested DTO fields now serialize as camelCase with null fields omitted, matching deployment JSON shape.
- **Fix 2 (filename):** Updated `BuildFileName` in `OfficialCatalogJsonExportService` to use `yyyyMMdd_HHmmss` timestamp format (date/time separated by underscore) and added `ResolveLanguageName` switch to map `catalog.Language` int to `German`/`English` name tokens. Falls back to numeric string for unmapped values.
- **Fix 3 (build):** `dotnet` CLI is not available in this environment — build verification still not executable.

### Review Fixes Applied (2026-06-04)

- **RF-001 (audit-user email leakage):** Removed `SysCreatedBy` and `SysUpdatedBy` mapping from `OfficialCatalogJsonExportService` for catalog, element types, elements, and attribute values. Controller serialization already uses `JsonIgnoreCondition.WhenWritingNull`, so these audit-user fields are omitted from exported JSON and no internal user emails are emitted.
- **RF-001 verification:** `Select-String` found no remaining `SysCreatedBy`/`SysUpdatedBy` references in `OfficialCatalogJsonExportService.cs`. `dotnet build Web.Services\Web.Services.csproj -c DebugFast` completed with 0 errors. Full solution build was attempted but blocked by locked output DLLs held by Visual Studio/IIS Express.
- **RF-001 timestamp extension:** Removed `SysCreatedAt` and `SysUpdatedAt` mapping from `OfficialCatalogJsonExportService` for catalog, element types, elements, and attribute values. These fields are overwritten by import and are omitted from exported JSON together with audit-user fields.
- **RF-001 timestamp verification:** `Select-String` found no remaining `SysCreatedAt`/`SysUpdatedAt`/`SysCreatedBy`/`SysUpdatedBy` references in `OfficialCatalogJsonExportService.cs`. `dotnet build Web.Services\Web.Services.csproj -c DebugFast` completed with 0 errors.

### Deviations From Plan

- Used a result tuple `(file, fileName, BaseResult)` return type instead of throwing custom exceptions for not-found/not-published, consistent with existing `OfficialCatalogJsonImportService` result pattern.
- Serialization done in controller (not service) to keep service return type clean and allow controller-level `File()` response construction; this is consistent with how the import endpoint works.
- `dotnet build` could not be run (dotnet CLI not available in environment). Static review performed instead.

### Risks

- `dotnet` CLI not available in workspace — build verification was not possible. Next agent should run `dotnet build Web-Suite.sln -c DebugFast` to confirm compilation.
- `CatalogFamily` navigation property requires the `CatalogFamily` table to have a proper FK configured in `WebSuiteContext`. The existing `GetByIdAsNoTracking` does not include `CatalogFamily`, so this is a new include. If EF navigation is not configured, the include will silently return null.

### Notes For Next Agent

- Phase 2 adds frontend: official catalog action button, `catalog-service.js` API call with `responseType: 'blob'`, store wiring, and translation keys.
- The backend endpoint route is `GET /Catalog/ExportOfficialCatalogJson/{catalogId}`.
- Endpoint uses `OfficialCatalog.Read` permission — no new permission was added.
- The response content type is `application/json` with a `Content-Disposition: attachment; filename=...` header (set automatically by ASP.NET `File()` helper).
- Filename format: `{yyyyMMddHHmmss}_{sanitizedName}_{language}_{sanitizedVersion}.json`.

## Verification Notes

- Verify published catalog exports with `catalog.status = 2`.
- Verify non-published catalog returns an error and no file.
- Verify non-Super Admin access is rejected server-side.
- Verify exported JSON can deserialize into `CatalogImportFileDto`.
- Verify exported JSON is pretty-printed.
- Verify exported JSON is complete, non-empty, and compatible with existing import/deployment flow.
- Verify exported JSON is not a raw database dump and matches the standard shape derived from multiple existing catalog JSON files.
- Use the existing catalog JSON import format as the default review baseline.
- Compare top-level keys against `Web.Core/Data/LiveSystemContent/Catalogs/catalog_DIN-EN-ISO-9001-2015-v1.json`.
