# STP-8019 Context

## Repo Context Summary

Suite Plus uses a backend/frontend vertical-slice pattern:

- Backend flow: `Controller -> IService -> Service -> IRepository -> Repository -> WebSuiteContext`.
- Frontend flow: `View/Component -> Pinia store or Composable -> service module -> axios api client -> backend controller`.
- Catalog-related backend work belongs in `Web-Suite/Controllers`, `Web.Core/Services`, `Web.Services`, `Web.Core/Repositories`, `Web.Data/Repositories`, DTOs under `Web.Core/Dto`, and mappings under `Web-Suite/MappingProfiles` when needed.
- Official catalog UI work belongs under `Web-Suite/clientapp/src/views/OfficialCatalog`, `src/components/OfficialCatalog`, `src/services/catalog-service.js`, `src/store/stores/catalog.js`, `src/Composables/CatalogComposable.js`, and translations in both `en.json` and `de.json`.
- Built-in deployment catalog examples live under `Web.Core/Data/LiveSystemContent/Catalogs`.
- Do not run `npm run lint` or `npx eslint` unless explicitly requested.

## PBI-Specific Context

The PBI adds a direct JSON download action for published official catalogs in the Super Admin catalog management area.

Target behavior:

- Export button appears in the official catalog list action column next to existing release/withdraw actions.
- Export is allowed only for Super Admin users.
- Export is allowed only when `catalog.status = 2`.
- `Catalog.CatalogStatus.Published = 2`.
- Exported JSON must match the existing deployment/import JSON shape, not a new schema.
- Existing deployment example: `Web.Core/Data/LiveSystemContent/Catalogs/catalog_DIN-EN-ISO-9001-2015-v1.json`.
- File name format: `{Timestamp}_{CatalogName}_{Language}_{Version}.json`.
- Multilingual handling is record-based: export only the selected catalog record language.

## Source Inspection Notes

Targeted source inspection was needed because repo-context did not identify the exact catalog files, JSON DTO contract, status enum, permission pattern, or UI action component.

Findings:

- `Web-Suite/Controllers/CatalogController.cs` owns official catalog endpoints and already has import, release, withdraw, copy, successor, and delete actions.
- `Web.Core/Services/ICatalogService.cs` and `Web.Services/CatalogService.cs` own official catalog release/withdraw logic.
- `Web.Core/Repositories/ICatalogRepository.cs` and `Web.Data/Repositories/CatalogRepository.cs` own catalog query includes. Existing `GetByIdAsNoTracking` is close to export needs but does not explicitly include `CatalogFamily`; plan a dedicated export query or verify include sufficiency during implementation.
- `Web.Core/Dto/CatalogJsonImport/*` defines the deployment JSON shape used by import and matches the example JSON top-level keys.
- `Web.Services/OfficialCatalogJsonImportService.cs` validates Super Tenant access using `IIdentityClaimService.GetTenantId() != SUPER_TENANT_ID` and throws `ForbiddenRequestException`; it imports `CatalogImportFileDto` with `System.Text.Json`.
- `Web.Core/Models/Catalog.cs` defines `CatalogStatus.Published = 2`, `ReleaseCatalog()`, and `WithdrawCatalog()`.
- `Web.Core/Models/RolePermission.cs` marks `OfficialCatalog` as Super Admin permission and currently has `Read`, `Create`, `Update`, `Delete`, `Release`, `Withdraw`, `CreateUpgrade`, and `CreatePatch`; no export permission exists.
- `Web-Suite/clientapp/src/components/OfficialCatalog/OfficialCatalogOverview.vue` owns the official catalog grid action column and release/withdraw visibility.
- `Web-Suite/clientapp/src/services/catalog-service.js` and `src/store/stores/catalog.js` own frontend official catalog API calls.
- Existing frontend downloads use axios `responseType: 'blob'`, `Blob`, `URL.createObjectURL`, and an anchor with `download`.
- Existing translations do not contain an obvious official-catalog export key; add matching keys in `en.json` and `de.json`.

## Relevant Constraints

- Do not change existing deployment JSON schema.
- Do not change catalog publication workflow.
- Do not introduce audit logging, versioning, patch management, deployment automation, or historical export management.
- Reuse existing DTO contract and import-compatible property names.
- Preserve backend Super Admin authorization; client-side visibility is not sufficient.
- Keep action placement in the existing official catalog action column.
- Keep implementation scoped to official catalog export only.
- USER_REVIEW_POLICY RF-001: Exported catalog JSON must not leak internal user email addresses through `SysCreatedBy` or `SysUpdatedBy` on the catalog, element types, elements, or attribute values. The importer overwrites these fields on import, so their export behavior must be explicitly resolved before final handoff.
- USER_REVIEW_POLICY RF-001 extension resolved: `SysCreatedAt` and `SysUpdatedAt` are also overwritten by the import service on catalog, element types, elements, and attribute values, so export omits these audit timestamp fields too.

## Risks

- Export query may miss nested attributes or catalog family data if it reuses a partial include path.
- Import service rewrites IDs and metadata on import; export must preserve deployment-compatible current catalog data.
- `CatalogImportDto.Status` is an `int`; export must ensure published status is serialized as `2`.
- User answered that export should use `OfficialCatalog.Read`; do not add a new `OfficialCatalog.Export` permission unless a later instruction changes this.
- Existing role permission enum has apparent label/action ordering oddities around `Delete` and `Release`; avoid unrelated cleanup.
- Frontend file-name parsing from response headers can be fragile; use the existing download pattern but validate file name behavior.
- RF-001 required review feedback is fixed: `SysCreatedBy`/`SysUpdatedBy` are omitted from exported JSON by not mapping them into export DTOs.
- RF-001 audit timestamp handling is fixed: `SysCreatedAt`/`SysUpdatedAt` are omitted from exported JSON by not mapping them into export DTOs.

## Resolved User Answers

- Permission: Use `OfficialCatalog.Read` plus backend Super Admin/status checks.
- JSON formatting: Pretty-print exported JSON for deployment readability.
- Export completeness/format: The export must not return an empty JSON file. It must generate complete catalog JSON using the standard catalog JSON format derived from multiple existing catalog JSON files and the existing catalog JSON importer logic. The export must be compatible with the existing catalog import/deployment flow and must not be treated as a raw database dump.
- Review/evaluation default: Treat the existing catalog JSON import format as the default model for implementation evaluation and review. The files under `Web.Core/Data/LiveSystemContent/Catalogs` are explicit reference material for that review baseline.

## Open Questions

- Exact ID/metadata normalization rules should be derived from existing deployment JSON examples and importer behavior during implementation/review. Do not default to a raw database dump.
- RF-001 resolved: exported `SysCreatedBy`/`SysUpdatedBy` values are omitted rather than replaced with `system`; do not reintroduce internal user emails into exported deployment JSON.
- RF-001 timestamp extension resolved: exported `SysCreatedAt`/`SysUpdatedAt` values are omitted for the same reason as audit-user fields; do not reintroduce internal audit metadata into exported deployment JSON.
