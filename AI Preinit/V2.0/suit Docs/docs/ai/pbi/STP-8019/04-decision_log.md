# STP-8019 Decision Log

## Decisions

### Use Existing Import DTOs As Export Contract

- Decision: Export should serialize `CatalogImportFileDto` and related `CatalogJsonImport` DTOs rather than creating a new schema.
- Reason: The PBI requires compatibility with existing deployment JSON and no new schema.
- Impact: Backend export logic must map the current catalog graph into the existing import-compatible top-level shape.

### Keep Export Record-Based For Language Handling

- Decision: Export only the selected catalog record and its `Language` field.
- Reason: The PBI says multilingual catalogs export only the selected catalog record language.
- Impact: No cross-language merge, grouping, or language selection dialog is planned.

### Prefer Server-Side Super Admin And Status Validation

- Decision: Client visibility must be treated as convenience only; backend export must enforce Super Admin and `CatalogStatus.Published`.
- Reason: The PBI explicitly requires validation when export is triggered.
- Impact: Direct API calls for non-Super Admin or non-published catalogs must be rejected.

### Use OfficialCatalog.Read For Export Permission

- Decision: Reuse `OfficialCatalog.Read` for the export endpoint and frontend visibility.
- Reason: USER_ANSWER selected `OfficialCatalog.Read`.
- Impact: Do not add a new `OfficialCatalog.Export` permission or related migration/permission seeding unless a later instruction changes this.

### Pretty-Print Exported JSON

- Decision: Serialize exported catalog JSON with pretty-print/indented formatting.
- Reason: USER_ANSWER requires pretty-printed JSON for deployment readability.
- Impact: Backend serialization should use indented output while preserving the existing import-compatible schema.

### Derive Complete Export Format From Existing Deployment JSON And Importer

- Decision: Export must generate complete, non-empty catalog JSON in the standard deployment/import format.
- Reason: USER_ANSWER states the export must be derived from multiple existing catalog JSON files and existing catalog JSON importer logic, and must not be a raw database dump.
- Impact: Implementation must inspect more than one existing `Web.Core/Data/LiveSystemContent/Catalogs/*.json` file and `OfficialCatalogJsonImportService` before finalizing mapping behavior.

### Use Import JSON Format As Review Baseline

- Decision: The existing catalog JSON import format is the default model for evaluation and review of the export output.
- Reason: User explicitly requested that the import JSON format and catalog JSON files under `Web.Core/Data/LiveSystemContent/Catalogs` be considered for evaluation/review.
- Impact: Review should compare exported JSON against importer expectations and multiple catalog JSON examples, not against raw EF/database shape.

## Pending Decisions

### ID Preservation Versus Normalization

- Question: Should export preserve database IDs exactly as stored, or normalize fields to match deployment examples if existing data differs?
- Current state: Resolve concrete ID/metadata behavior by deriving the standard format from deployment JSON examples and importer behavior.
- Impact: Implementation must not choose raw database dump behavior by default.

### Audit User Field Export Policy

- Question: Should exported `SysCreatedBy`/`SysUpdatedBy` values be omitted, or replaced with a neutral value such as `system`?
- Decision: Omit `SysCreatedBy` and `SysUpdatedBy` from exported JSON by not mapping them into export DTOs.
- Reason: USER_REVIEW_POLICY RF-001 requires that exported catalog JSON must not leak internal user email addresses, and the import service overwrites these fields during import.
- Impact: Export preserves timestamps and deployment-compatible structural metadata, but audit-user values are not emitted for catalog, element types, elements, or attribute values.

### Audit Timestamp Field Export Policy

- Question: Should exported `SysCreatedAt`/`SysUpdatedAt` values remain in deployment JSON?
- Decision: Omit `SysCreatedAt` and `SysUpdatedAt` from exported JSON by not mapping them into export DTOs.
- Reason: RF-001 was extended after inspection showed `OfficialCatalogJsonImportService` overwrites these fields during import with `SysCreatedAt = now` and `SysUpdatedAt = null` for catalog, element types, elements, and attribute values.
- Impact: Export omits audit timestamps together with audit-user fields while preserving structural catalog data required for import/deployment compatibility.
