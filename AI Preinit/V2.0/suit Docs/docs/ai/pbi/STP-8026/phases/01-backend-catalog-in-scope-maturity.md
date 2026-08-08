# Phase 01 - Backend Catalog-In-Scope Maturity DTO And Query

## Status

Done

## Goal

Return catalog maturity model levels from `GetCatalogsInScope` without changing catalog or scope CRUD DTOs.

## Scope

- Add a dedicated read-only DTO for catalogs returned by `GetCatalogsInScope`.
- Update service and repository contracts to use the read DTO path.
- Keep the repository query lean and focused on catalog metadata plus `MaturityLevelModel.MaturityLevels`.
- Add AutoMapper mapping for the new read DTO.

## Target Files Or Areas

- `Web.Core/Dto/Catalog/CatalogInScopeMaturityDto.cs`
- `Web.Core/Services/ICatalogService.cs`
- `Web.Core/Repositories/ICatalogRepository.cs`
- `Web.Services/CatalogService.cs`
- `Web.Data/Repositories/CatalogRepository.cs`
- `Web-Suite/MappingProfiles/Profiles.cs`
- `Web-Suite/Controllers/CatalogController.cs`

## Planned Steps

1. Create a read-only DTO under `Web.Core/Dto/Catalog/` with `Id`, `Name`, and `MaturityLevelModel`.
2. Use `MaturityLevelModelViewDto` for `MaturityLevelModel` unless implementation reveals a strong reason for a smaller nested DTO.
3. Change `ICatalogService.GetCatalogsInScope` to return the new read DTO collection.
4. Change `CatalogService.GetCatalogsInScope` to map catalogs to the new read DTO collection.
5. Change `ICatalogRepository.GetCatalogsInScope` to load catalogs by `ScopeId` with `MaturityLevelModel.MaturityLevels`.
6. Remove unnecessary element/attribute includes from this specific catalog-in-scope query if no implementation blocker is found.
7. Add or update AutoMapper mapping from `Catalog` to the new read DTO.
8. Keep `CatalogController.GetCatalogsInScope` endpoint route unchanged.

## Execution Memory

- Created `CatalogInScopeMaturityDto` as the dedicated read-only DTO for catalogs returned by `GetCatalogsInScope`.
- Changed `ICatalogService.GetCatalogsInScope` and `CatalogService.GetCatalogsInScope` to return `IEnumerable<CatalogInScopeMaturityDto>`.
- Kept `ICatalogRepository.GetCatalogsInScope` returning domain `Catalog` entities, following existing repository patterns.
- Updated `CatalogRepository.GetCatalogsInScope` to use a lean query by `ScopeId` and include only `MaturityLevelModel.MaturityLevels`.
- Removed `SetIsPatchAvailable`, `SetIsUpgradeAvailable`, and `LoadElementAttributeValues` from this service path because the new DTO does not expose those fields and the Relation dialog loads element data separately.
- Added AutoMapper mapping from `Catalog` to `CatalogInScopeMaturityDto`.
- Updated `CatalogController.GetCatalogsInScope` action result type while keeping the route unchanged.

## Files Changed

- `Web.Core/Dto/Catalog/CatalogInScopeMaturityDto.cs`
- `Web.Core/Services/ICatalogService.cs`
- `Web.Services/CatalogService.cs`
- `Web.Data/Repositories/CatalogRepository.cs`
- `Web-Suite/MappingProfiles/Profiles.cs`
- `Web-Suite/Controllers/CatalogController.cs`

## Verification Notes

Performed:

- `dotnet build` completed successfully with `0 Error(s)`.
- Build produced existing dependency/security/DevExpress reference warnings.
- `rg` confirmed `GetCatalogsInScope` backend references now use `CatalogInScopeMaturityDto` at the service/controller boundary.
- No catalog/scope CRUD DTOs were modified.

Not performed in this phase:

- Runtime API response inspection.
- Frontend Relation dialog verification.

## Risks

- Runtime verification is still needed to confirm JSON casing and nested `maturityLevelModel.maturityLevels` shape for the frontend.
- Frontend phase still needs to verify the Relation dialog consumes the enriched response correctly.
- Build warnings remain, but they were not introduced by this phase.

## Review Notes

Review mode: strict

Findings:

- No required source-code fixes found for phase-01.

Review coverage:

- Correctness: the backend response path now returns a dedicated read DTO with catalog `Id`, `Name`, and `MaturityLevelModel`.
- Architecture: existing scope/catalog CRUD DTOs were not changed.
- Simplicity: changes are limited to DTO, service contract, service mapping, repository query, controller action result type, and AutoMapper profile.
- Naming: `CatalogInScopeMaturityDto` is clear and specific to the endpoint use case.
- Scope control: frontend and unrelated CRUD paths were not modified.
- Test coverage: backend build passed; runtime API response and frontend consumption remain for later phases.

Required fixes:

- None for phase-01.

Optional improvements:

- Runtime-inspect `/Catalog/GetCatalogsInScope` during phase-02 or verification to confirm JSON shape and nested maturity level fields.
- If payload size becomes a concern, replace `MaturityLevelModelViewDto` with a smaller nested read DTO containing only fields needed by the Relation dialog.
