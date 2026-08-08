# STP-8019 Implementation Plan

## Status

Completed

## Planning Depth

Normal

## Scope

Implement export of a published official catalog as a downloadable JSON file from the Super Admin official catalog list.

In scope:

- Backend export endpoint under `CatalogController`.
- Backend export service logic that builds `CatalogImportFileDto` from the selected published catalog.
- Repository/query support for complete export data.
- Standard export format derivation from multiple existing catalog JSON examples and the current catalog JSON importer behavior.
- File name generation using the approved convention.
- Frontend official catalog action button, service/store call, and blob download.
- Translation keys for export UI text and error/success messages as needed.
- Focused verification for authorization, status validation, JSON compatibility, download behavior, and language-specific export.

## Out Of Scope

- New JSON schema.
- Catalog import changes except reuse/compatibility with existing DTO contract.
- Catalog publication workflow changes.
- Versioning, patch management, deployment automation, audit logging, or historical export management.
- Broad permission architecture refactor.
- Frontend redesign outside the existing official catalog action column.

## Phases

| Phase | Status | Goal |
| --- | --- | --- |
| Phase 1 - Backend Export Contract | Completed | Add backend export endpoint/service/query and serialize the existing catalog JSON contract. |
| Phase 2 - Frontend Export Action | Completed | Add official catalog export action, API/store wiring, download handling, and translations. |
| Phase 3 - Verification And Handoff | Completed | Verify backend/frontend behavior and update handoff notes. |

## Verification Plan

- USER_REVIEW_POLICY RF-001 resolved: exported JSON omits `SysCreatedBy` and `SysUpdatedBy` for catalog, element types, elements, and attribute values; source mapping verification confirms audit-user fields are not emitted by the export service.
- USER_REVIEW_POLICY RF-001 timestamp extension resolved: exported JSON omits `SysCreatedAt` and `SysUpdatedAt` for catalog, element types, elements, and attribute values; source mapping verification confirms audit timestamp fields are not emitted by the export service.
- Backend build or targeted test command proportional to implementation scope; use `dotnet build Web-Suite.sln -c DebugFast` if a fast full solution build is acceptable.
- Add or update focused NUnit tests when feasible for export status and authorization behavior.
- Frontend manual/browser verification for the official catalog action column and download behavior.
- Validate exported JSON top-level keys against `CatalogImportFileDto`: `catalogFamily`, `catalog`, `catalogElementTypes`, `catalogElementTypeAttributes`, `catalogElements`, `catalogElementAttributeValues`.
- Validate exported JSON is complete and not an empty placeholder or raw database dump.
- Validate standard export format against multiple existing files under `Web.Core/Data/LiveSystemContent/Catalogs` and the existing `OfficialCatalogJsonImportService` import/deployment expectations.
- Treat the existing catalog JSON import format as the default review/evaluation model for exported JSON.
- Validate export is rejected for non-published catalogs.
- Validate export is unavailable or rejected for non-Super Admin users.
- Validate filename format and selected catalog language handling.
- Validate exported JSON is pretty-printed for deployment readability.
- Do not run `npm run lint` or `npx eslint` unless explicitly requested.

## Handoff Expectations

- RF-001 resolution and verification result are recorded in `06-handoff.md`.
- Record changed source files and verification results in `06-handoff.md`.
- Record any deviations from this plan in phase execution memory.
- Use `OfficialCatalog.Read` for export permission unless a later user instruction changes this decision.
