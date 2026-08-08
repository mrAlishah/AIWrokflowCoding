# Phase 2 - Frontend Export Action

## Status

Completed

## Goal

Add the export action to the official catalog list UI and wire it to the backend JSON download endpoint.

## Scope

- Add export button beside existing release/withdraw actions in the official catalog grid action column.
- Add frontend service/store call using authenticated axios request with `responseType: 'blob'`.
- Trigger browser download using existing blob/object URL pattern.
- Add translation keys in English and German.
- Keep UI changes limited to official catalog management.

## Target Files Or Areas

- `Web-Suite/clientapp/src/components/OfficialCatalog/OfficialCatalogOverview.vue`
- `Web-Suite/clientapp/src/services/catalog-service.js`
- `Web-Suite/clientapp/src/store/stores/catalog.js`
- `Web-Suite/clientapp/src/Composables/CatalogComposable.js` if status/helper reuse is needed
- `Web-Suite/clientapp/src/language/translations/en.json`
- `Web-Suite/clientapp/src/language/translations/de.json`

## Planned Steps

1. Add service function for the export endpoint and return the full axios response so headers can provide the filename.
2. Add store action that delegates to the service.
3. Add `isExportCatalogVisible(catalog)` using `catalogStatus.published` and `OfficialCatalog.Read`.
4. Add export tooltip/button in `action-cell-template` next to release/withdraw actions.
5. Add `onExportCatalogClicked(catalog)` to request the blob, derive file name from `content-disposition` or fallback to approved convention, create an anchor, click it, and revoke the object URL.
6. Add translation keys for export action and any export error/success text in both languages.
7. Keep grid action width/layout stable if a new icon increases action count.

## Execution Memory

Completed 2026-06-02.

### Files Changed

- `Web-Suite/clientapp/src/services/catalog-service.js` — Added `exportOfficialCatalogJson(catalogId)`: GET `/Catalog/ExportOfficialCatalogJson/{catalogId}` with `responseType: 'blob'` and auth header. Returns the full axios response so the controller provides the filename.
- `Web-Suite/clientapp/src/store/stores/catalog.js` — Added `exportOfficialCatalogJson(payload)` action and exposed it in the return object.
- `Web-Suite/clientapp/src/components/OfficialCatalog/OfficialCatalogOverview.vue` — Added `isExportCatalogVisible` (status published + `OfficialCatalog.Read`), `onExportCatalogClicked` (blob download with `content-disposition` filename extraction and fallback), and export tooltip/button with `mdi-download-outline` icon in the action cell template before the delete button. Actions column width increased from `120px` to `145px`.
- `Web-Suite/clientapp/src/language/translations/en.json` — Added `l_officialCatalog.export.action: "Export JSON"`.
- `Web-Suite/clientapp/src/language/translations/de.json` — Added `l_officialCatalog.export.action: "JSON exportieren"`.

### Review Fix Applied (2026-06-02)

- **Fix 1 (fallback filename):** Replaced `catalog_${catalog.id}.json` fallback with `buildExportFallbackFileName(catalog)` helper. Builds `{yyyyMMdd_HHmmss}_{safeName}_{language}_{safeVersion}.json` from the catalog row fields — matching the approved `{Timestamp}_{CatalogName}_{Language}_{Version}.json` convention. Language uses the same `{ 1: 'German', 2: 'English' }` map as the backend fallback with numeric string for unmapped values. Name and version are sanitized with `replace(/[^\w\-.]/g, '_')`.

### Deviations From Plan

- No store state was added because the export is a one-shot blob download with no persistent UI state to track.
- `isExportCatalogVisible` is inlined in the component (not added to `CatalogComposable.js`) because it is UI-only and not shared with other components.

### Notes For Next Agent

- Phase 3 is verification and handoff. Backend build verification (`dotnet build Web-Suite.sln -c DebugFast`) is still outstanding from Phase 1.
- Frontend was not manually tested (no browser available). Key things to verify: button appears only for published catalogs, download triggers, filename is correct, non-published catalogs show no export button.
- The `content-disposition` header extraction regex handles `filename=value` and `filename="value"` forms.

## Verification Notes

- Verify button appears only for published catalogs.
- Verify button placement is beside release/withdraw actions.
- Verify click downloads `.json`.
- Verify filename matches convention.
- Verify no export action appears for in-editing or withdrawn catalogs.
- Verify non-Super Admin users cannot access the page/action through normal routing and backend still rejects direct API calls.
