# Catalog Export JSON Contract

## Purpose

Task-specific durable knowledge for STP-8019. This file captures the JSON contract that export must preserve.

## Source Of Truth

- Existing deployment JSON example: `Web.Core/Data/LiveSystemContent/Catalogs/catalog_DIN-EN-ISO-9001-2015-v1.json`
- Additional deployment JSON examples under `Web.Core/Data/LiveSystemContent/Catalogs`
- Existing DTO contract: `Web.Core/Dto/CatalogJsonImport/*`
- Existing import service: `Web.Services/OfficialCatalogJsonImportService.cs`
- Default review/evaluation model: existing catalog JSON import format.

## Required Top-Level JSON Shape

The export must serialize the same top-level object shape used by import:

- `catalogFamily`
- `catalog`
- `catalogElementTypes`
- `catalogElementTypeAttributes`
- `catalogElements`
- `catalogElementAttributeValues`

## Contract Notes

- `catalog.status` must be `2` for exported catalogs.
- `catalog.language` must be the selected catalog record language; export must not merge multilingual records.
- Export must generate complete catalog JSON. Empty JSON, placeholder JSON, partial top-level objects without catalog data, and raw database dumps are not acceptable.
- The standard export shape must be derived from multiple existing catalog JSON files and from the importer logic, not from database entities alone.
- Review must treat the import JSON format as the baseline, not raw EF/database shape.
- The export should preserve deployment-compatible metadata fields present in `CatalogImportDto`, including IDs, version, release/version fields, and group/family IDs.
- USER_REVIEW_POLICY RF-001: Do not export internal user email addresses in audit-user fields. `SysCreatedBy` and `SysUpdatedBy` on the catalog, element types, elements, and attribute values must be omitted or replaced with a neutral value such as `system`; the import service overwrites these fields during import anyway.
- USER_REVIEW_POLICY RF-001 extension resolved: `SysCreatedAt` and `SysUpdatedAt` are also overwritten by `OfficialCatalogJsonImportService` during import (`SysCreatedAt = now`, `SysUpdatedAt = null` for catalog, element types, elements, and attribute values), so export omits these audit timestamp fields too.
- Exported JSON must be pretty-printed for deployment readability.
- Do not add new top-level keys unless implementation discovers an existing deployment requirement not captured by current examples.
- Export must be readable by the existing import DTO contract without requiring schema changes.

## Validation Focus

- JSON can deserialize into `CatalogImportFileDto`.
- JSON is indented/pretty-printed.
- JSON is complete and non-empty.
- JSON is compatible with `OfficialCatalogJsonImportService` expectations.
- JSON matches the standard deployment shape observed across multiple existing catalog JSON files.
- JSON review uses the existing import format as the default model.
- Exported data contains the full catalog element graph and attribute values.
- Catalog family data is present and matches selected catalog family.
- Element type attribute mappings reference exported element types and known attribute IDs.
- Element attribute values reference exported catalog elements and known attribute IDs.
- Exported audit-user fields do not contain internal user email addresses.
- Exported audit timestamp fields are omitted.
