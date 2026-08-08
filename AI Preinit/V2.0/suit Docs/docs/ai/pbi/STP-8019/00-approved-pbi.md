# STP-8019 Approved PBI

## PBI ID

STP-8019

## Title

AI Catalog Reader - Export Published Catalog to JSON

## Approved Request

Implement a catalog export capability within the Super Admin catalog management area.

The feature shall allow a Super Admin user to export a published catalog as a downloadable JSON file.

The exported JSON must follow the existing catalog JSON structure already used by the system and currently available within the repository. The export must not introduce a new schema or modify the existing deployment format.

Export functionality shall only be available for catalogs that are in Published status (`catalog.status = 2`).

A new Export action shall be added to the catalog list UI. The action shall be displayed in the last action column next to the existing Publish/Withdraw actions.

When triggered:

- Validate that the current user is a Super Admin.
- Validate that the catalog is in Published status.
- Generate JSON using the existing catalog export format.
- Return the JSON as a downloadable file.
- Use the file naming convention:

```text
{Timestamp}_{CatalogName}_{Language}_{Version}.json
```

Example:

```text
20260602_101530_DIN-EN-ISO-9001_German_v1.json
```

For multilingual catalogs, the export shall only include the language associated with the selected catalog record.

The generated JSON must contain all published catalog data and remain compatible with the existing customer deployment process.

No versioning, patch management, deployment automation, audit logging, or historical export management is included in this scope.

## Acceptance Criteria

- Export action is available in the catalog list UI beside existing Publish/Withdraw actions.
- Export button visibility is correct for the intended Super Admin workflow.
- Export is available only for Super Admin users.
- Export is available only for Published catalogs.
- Published state is identified by `catalog.status = 2`.
- Exported JSON matches the existing repository catalog JSON structure.
- Export returns a direct downloadable JSON file.
- File name follows `{Timestamp}_{CatalogName}_{Language}_{Version}.json`.
- Multilingual catalogs export only the language associated with the selected catalog record.
- Generated JSON contains all published catalog data required for customer deployment compatibility.

## Constraints

- Do not introduce a new JSON schema.
- Do not modify the existing deployment format.
- Do not include versioning, patch management, deployment automation, audit logging, or historical export management.
- Existing deployment JSON examples are the source of truth.
- Existing file example: `Web.Core/Data/LiveSystemContent/Catalogs/catalog_DIN-EN-ISO-9001-2015-v1.json`.
- Existing JSON generation logic may already exist and must be reused if present.
- Multiple catalog JSON formats may exist in the repository.
- Export source data path may require investigation during planning.
- UI action placement may depend on existing component structure.
- Performance is not a primary concern for this PBI.

## Source Context

### Business Context

- Final step of the AI Catalog Reader pipeline.
- Enables deployment-ready catalog generation for customers.
- Replaces manual creation of deployment JSON files.

### Important Constraints

- Export is available only to Super Admin users.
- Export is available only for Published catalogs.
- Published state is identified by `catalog.status = 2`.
- JSON structure must match existing repository examples.
- Export is performed as direct file download.
- Export button must be added beside existing Publish/Withdraw actions.
- Language selection is based on the selected catalog record only.

### Risks

- Existing JSON generation logic may already exist and must be reused.
- Multiple catalog JSON formats may exist in the repository.
- Export source data path may not be obvious and requires investigation.
- UI action placement may depend on existing component structure.

### Assumptions

- Existing deployment JSON examples are the source of truth.
- Existing file example: `Web.Core/Data/LiveSystemContent/Catalogs/catalog_DIN-EN-ISO-9001-2015-v1.json`.
- No new JSON schema is required.
- No audit trail is required.
- No versioning concept is required.

### Validation Focus

- Export button visibility.
- Super Admin authorization.
- Published status validation.
- JSON schema compatibility.
- Download behavior.
- File naming convention.
- Data completeness and integrity.
- Correct language-specific export behavior.

### Additional Information Useful For Planning

Repository inspection is required during planning to identify:

- Existing catalog JSON schema.
- Existing catalog serialization/export services.
- Catalog status implementation.
- Catalog management UI action rendering.

Deployment team only requires compatibility with existing catalog JSON format.

## Review Before Starting

### Key Risks

- Multiple catalog JSON structures may exist.
- Existing export-related services may already be present and should be reused.
- Catalog publication state may be implemented differently across layers.
- UI action column implementation may be shared with other catalog actions.

### Key Unknowns

- Exact service responsible for catalog JSON generation.
- Exact controller/API endpoint architecture.
- Existing download handling pattern.
- Existing permission enforcement location.
- Existing catalog DTO/view model used for deployment exports.

### Areas Requiring Repository Inspection

- Catalog Management UI.
- Catalog action column rendering.
- Catalog status model.
- Permission model for Super Admin.
- Catalog serialization logic.
- Existing deployment JSON files.
- Export/download infrastructure.
- API endpoints related to catalog administration.

### Areas That Should Not Be Changed Unless Necessary

- Existing catalog JSON schema.
- Deployment file format.
- Catalog publishing workflow.
- Versioning behavior.
- Customer deployment process.
- Permission architecture.
- Existing catalog import functionality.

## Source Package

- `C:/_CONTECHNET/New folder/AI/STP-8019-Approved PBI.md`
