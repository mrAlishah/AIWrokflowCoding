# Phase 1 Review - Backend Export Contract

## Review Metadata

- PBI: STP-8019
- Phase: phase-01
- Review mode: strict
- Reviewed on: 2026-06-02
- Scope: correctness, architecture, simplicity, naming, test coverage, scope control

## Findings

### Required Fixes

No required source-code fixes remain for Phase 1 after RF-001 audit field fixes.

Resolved RF-001 timestamp extension:

1. Exported JSON no longer maps audit timestamps that import overwrites.
   - Source: `phases/review-feedback.md`
   - Affected implementation area: `Web.Services/OfficialCatalogJsonExportService.cs`
   - Fix: Removed `SysCreatedAt` and `SysUpdatedAt` mapping for catalog, element types, elements, and attribute values.
   - Result: With controller serialization using `JsonIgnoreCondition.WhenWritingNull`, these audit timestamp fields are omitted from exported JSON.
   - Verification: `Select-String` found no remaining `SysCreatedAt`/`SysUpdatedAt`/`SysCreatedBy`/`SysUpdatedBy` references in `OfficialCatalogJsonExportService.cs`; `dotnet build Web.Services\Web.Services.csproj -c DebugFast` completed with 0 errors.

Resolved RF-001:

1. Exported JSON no longer maps internal audit-user fields.
   - Source: `phases/review-feedback.md`
   - Affected implementation area: `Web.Services/OfficialCatalogJsonExportService.cs`
   - Fix: Removed `SysCreatedBy` and `SysUpdatedBy` mapping for catalog, element types, elements, and attribute values.
   - Result: With controller serialization using `JsonIgnoreCondition.WhenWritingNull`, these audit-user fields are omitted from exported JSON instead of exposing internal user emails.
   - Verification: `Select-String` found no remaining `SysCreatedBy`/`SysUpdatedBy` references in `OfficialCatalogJsonExportService.cs`; `dotnet build Web.Services\Web.Services.csproj -c DebugFast` completed with 0 errors.

Resolved findings from the prior strict review:

1. JSON serialization now matches the existing deployment JSON field format.
   - Source: `Web-Suite/Controllers/CatalogController.cs`
   - Evidence: export serialization now sets `WriteIndented = true`, `PropertyNamingPolicy = JsonNamingPolicy.CamelCase`, and `DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull`.
   - Result: Top-level `CatalogImportFileDto` names remain controlled by explicit `JsonPropertyName` attributes, while nested DTO fields serialize as camelCase and omit null values like the repository JSON examples.

2. Export filename now matches the approved example convention.
   - Source: `Web.Services/OfficialCatalogJsonExportService.cs`
   - Evidence: `DateTime.UtcNow.ToString("yyyyMMdd_HHmmss")` and `ResolveLanguageName(catalog.Language)` map `1 => German` and `2 => English`.
   - Result: The filename convention aligns with the approved example shape.

3. Backend build verification now succeeds.
   - Command: `dotnet build Web-Suite.sln -c DebugFast`
   - Result: Build completed with `0 Error(s)` and existing warning noise.
   - Notes: Initial sandboxed run failed on NuGet network access (`NU1301`); rerun with approved network access succeeded. No frontend lint was run.

### Optional Improvements

- Consider moving JSON serializer options into a reusable helper or constant if future catalog import/export work will reuse the same deployment JSON contract.
- Consider returning a more specific HTTP status for missing catalog versus non-published catalog if existing API conventions support it; the current `BaseResult`/`BadRequest` pattern is acceptable for scope control.
- Manual/API verification is still useful in Phase 3 for runtime behavior: successful file download, not-published rejection, missing catalog response, non-Super Admin rejection, and actual exported JSON comparison against deployment examples.

## Review Notes

- Architecture and scope are controlled: the endpoint uses `OfficialCatalog.Read`, the service enforces `SUPER_TENANT_ID`, and the export is built from `CatalogImportFileDto` rather than raw EF entity serialization.
- The repository query includes catalog family, element types with attributes, and elements with attribute values using `AsNoTracking` and `AsSplitQuery`, which matches the Phase 1 data graph need.
- Source code was reviewed only; source code was not modified by this review.

## Recommended Next Skill

Use `implementation-phase` for `phase-02` or proceed to the next planned frontend export action work. Use Phase 3 verification for runtime/API checks after frontend integration.
