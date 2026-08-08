# STP-8019 Handoff

## Summary

Export of a published official catalog as a downloadable import-compatible JSON file. A Super Admin user on the official catalog list clicks the export button for a published catalog and receives a correctly named, pretty-printed JSON file that matches the existing deployment/import contract.

USER_REVIEW_POLICY RF-001 is fixed: exported JSON no longer maps `SysCreatedBy`/`SysUpdatedBy` or `SysCreatedAt`/`SysUpdatedAt` fields for catalog, element types, elements, or attribute values.

## Implementation Status

All three phases completed. Build not verified (dotnet CLI unavailable in workspace). Frontend not browser-tested (no browser available).

## Changed Source Files

### Backend

| File | Change |
| --- | --- |
| `Web.Core/Services/IOfficialCatalogJsonExportService.cs` | New. Export service interface returning `(CatalogImportFileDto file, string fileName, BaseResult result)`. |
| `Web.Services/OfficialCatalogJsonExportService.cs` | New. Validates `SUPER_TENANT_ID` and `CatalogStatus.Published`, builds `CatalogImportFileDto` from catalog graph, generates filename. |
| `Web.Core/Repositories/ICatalogRepository.cs` | Added `GetByIdForJsonExport(Guid catalogId)`. |
| `Web.Data/Repositories/CatalogRepository.cs` | Implemented `GetByIdForJsonExport`: `AsNoTracking` with `CatalogFamily`, `CatalogElementTypes` + `Attributes`, `Elements` + `Attributes`, `AsSplitQuery`. |
| `Web-Suite/Controllers/CatalogController.cs` | Added `IOfficialCatalogJsonExportService` injection. Added `GET /Catalog/ExportOfficialCatalogJson/{catalogId}` with `OfficialCatalog.Read` policy. Serializes with `WriteIndented`, `CamelCase`, `WhenWritingNull`. Catches `ForbiddenRequestException` → 403. |
| `Web-Suite/Startup.cs` | Registered `IOfficialCatalogJsonExportService` → `OfficialCatalogJsonExportService` as scoped. |

### Frontend

| File | Change |
| --- | --- |
| `Web-Suite/clientapp/src/services/catalog-service.js` | Added `exportOfficialCatalogJson(catalogId)`: authenticated GET with `responseType: 'blob'`. |
| `Web-Suite/clientapp/src/store/stores/catalog.js` | Added `exportOfficialCatalogJson` action and exposed in return. |
| `Web-Suite/clientapp/src/components/OfficialCatalog/OfficialCatalogOverview.vue` | Added `isExportCatalogVisible` (published + `OfficialCatalog.Read`), `onExportCatalogClicked` (blob download with header and fallback filename), `buildExportFallbackFileName`, export tooltip/button (`mdi-download-outline`), actions column width 120 → 145px. |
| `Web-Suite/clientapp/src/language/translations/en.json` | Added `l_officialCatalog.export.action: "Export JSON"`. |
| `Web-Suite/clientapp/src/language/translations/de.json` | Added `l_officialCatalog.export.action: "JSON exportieren"`. |

## Verification Results

### JSON Contract (static, confirmed)

- Top-level keys match `CatalogImportFileDto` and all three checked deployment examples: `catalogFamily`, `catalog`, `catalogElementTypes`, `catalogElementTypeAttributes`, `catalogElements`, `catalogElementAttributeValues`.
- All nested DTO field names serialized to camelCase match deployment JSON field names exactly across three files checked.
- Null fields (`parentId`, `sysUpdatedAt`, `sysUpdatedBy`, `releaseNote`) omitted via `WhenWritingNull` — matches deployment format where those fields are absent.
- Output is pretty-printed (`WriteIndented = true`).
- RF-001 fixed: `SysCreatedBy`/`SysUpdatedBy` and `SysCreatedAt`/`SysUpdatedAt` are no longer mapped by `OfficialCatalogJsonExportService`, so audit metadata fields are omitted from exported JSON.

### Authorization paths (static, confirmed)

| Path | Result |
| --- | --- |
| Non-Super Admin tenant | `ForbiddenRequestException` thrown in service → controller returns 403 |
| Catalog not found | `BaseResult { IsSuccessfull = false }` → controller returns 400 |
| Catalog status not Published | `BaseResult { IsSuccessfull = false }` → controller returns 400 |
| Published catalog, Super Admin | Export file returned with `application/json` content type and `Content-Disposition: attachment` |

### Filename convention (static, confirmed)

Format: `{yyyyMMdd_HHmmss}_{sanitizedName}_{languageName}_{sanitizedVersion}.json`

Examples produced by the sanitize/resolve logic:
- `DIN-EN-ISO-9001`, language 1, version `2015` → `20260602_101530_DIN-EN-ISO-9001_German_2015.json`
- `NIS-2`, language 2, version `v1` → `20260602_101530_NIS-2_English_v1.json`

Backend and frontend fallback use the same convention and same language map (`1 → German`, `2 → English`).

### Translation files (runtime parse, confirmed)

Both `en.json` and `de.json` parse as valid JSON with `l_officialCatalog.export.action` present.

### Build

`dotnet` CLI not available in workspace. Build was not run. This is the primary remaining risk.

RF-001 targeted verification on 2026-06-04: `dotnet build Web.Services\Web.Services.csproj -c DebugFast` completed with 0 errors. Full solution build was attempted but blocked by locked output DLLs held by Visual Studio/IIS Express.

RF-001 timestamp extension verification on 2026-06-04: `Select-String` found no remaining `SysCreatedAt`/`SysUpdatedAt`/`SysCreatedBy`/`SysUpdatedBy` references in `OfficialCatalogJsonExportService.cs`; `dotnet build Web.Services\Web.Services.csproj -c DebugFast` completed with 0 errors.

### Frontend browser test

Not run. No browser available in workspace.

## Deviations From Plan

- No focused NUnit tests were added. The existing test project has all test classes commented out and no active test infrastructure for service-layer unit tests. Adding isolated tests would require non-trivial mock scaffolding that is out of scope for this PBI.
- Serialization is handled in the controller (not service), keeping the service return type clean. Consistent with how the import endpoint is structured.
- `isExportCatalogVisible` is inlined in the component rather than added to `CatalogComposable.js` because it is not shared.

## Remaining Risks

| Risk | Severity | Notes |
| --- | --- | --- |
| Backend build unverified | High | `dotnet build Web-Suite.sln -c DebugFast` must be run before deployment. DI registration and interface implementations are consistent with static review but compile-time issues cannot be ruled out without a build. |
| Frontend browser test not run | Medium | Action visibility, download trigger, filename output, and column layout need manual verification against a running instance with a published catalog. |
| `content-disposition` CORS exposure | Low | If the proxy/CORS config does not include `Access-Control-Expose-Headers: Content-Disposition`, the primary filename path falls back to the client-side convention. The fallback produces a conformant filename so the user experience degrades gracefully. |
| `CatalogFamily` EF navigation | Low | The `GetByIdForJsonExport` query includes `CatalogFamily` via a new include. If the FK is configured, this loads correctly. If not, `catalogFamily` serializes as null and is omitted from the output. The importer accepts a null/missing `catalogFamily` field. |
