## Review Feedback

### RF-001

Source:
Web.Services/OfficialCatalogJsonExportService.cs
Human Reviewer

Comment:
CatalogGroupId = catalog.CatalogGroupId,
CatalogFamilyId = catalog.CatalogFamilyId,
ReleaseNote = catalog.ReleaseNote,
SysCreatedBy = catalog.SysCreatedBy,

Ali Seyedalikhani
1 hour ago
The exported JSON contains SysCreatedBy and SysUpdatedBy for the catalog, all element types, all elements, and all attribute values. This leaks internal user emails into the export file. When re-imported, the import service overwrites these fields anyway (sets SysCreatedBy to the importing user).
Suggestion: Consider whether these system fields should be in the export. If yes, then maybe can use 'system' for SysCreatedBy and SysUpdatedBy

Severity:
Required

Status:
Fixed

Sync Notes:
USER_REVIEW_POLICY RF-001 synced on 2026-06-04 into PBI context, implementation plan, JSON contract knowledge, phase review notes, verification handoff, and decision log. Status was updated to fixed after source behavior was changed and verified.

Fix Notes:
Fixed on 2026-06-04. `OfficialCatalogJsonExportService` no longer maps `SysCreatedBy` or `SysUpdatedBy` into the export DTOs for catalog, element types, elements, or attribute values. Because controller serialization uses `JsonIgnoreCondition.WhenWritingNull`, these audit-user fields are omitted from exported JSON. `Select-String` verification found no remaining `SysCreatedBy`/`SysUpdatedBy` references in the export service. `dotnet build Web.Services\Web.Services.csproj -c DebugFast` completed with 0 errors. Full solution build was attempted but blocked by locked output DLLs held by Visual Studio/IIS Express, not by compile errors in this fix.

Additional Issue:
The export previously mapped `SysCreatedAt` and `SysUpdatedAt` for the catalog, all element types, all elements, and all attribute values. Targeted inspection of `OfficialCatalogJsonImportService` shows these timestamp fields are overwritten during import: imported catalog, element types, elements, and attribute values receive `SysCreatedAt = now` and `SysUpdatedAt = null`. Therefore these fields are not needed for re-import behavior and should be omitted from exported JSON together with the audit-user fields. This keeps deployment exports free of internal audit metadata that the import flow does not preserve.

Additional Required Fix:
Remove or neutralize `SysCreatedAt` and `SysUpdatedAt` from the export DTO mapping for catalog, element types, elements, and attribute values, unless a concrete deployment requirement proves these timestamps must remain. Verify exported JSON no longer emits these fields and that import compatibility is preserved.

Additional Fix Notes:
Fixed on 2026-06-04. `OfficialCatalogJsonExportService` no longer maps `SysCreatedAt` or `SysUpdatedAt` into the export DTOs for catalog, element types, elements, or attribute values. Combined with the earlier `SysCreatedBy`/`SysUpdatedBy` fix, no `SysCreated*` or `SysUpdated*` audit fields are mapped by the export service. `Select-String` verification found no remaining `SysCreatedAt`/`SysUpdatedAt`/`SysCreatedBy`/`SysUpdatedBy` references in `OfficialCatalogJsonExportService.cs`. `dotnet build Web.Services\Web.Services.csproj -c DebugFast` completed with 0 errors.
