# STP-8026 Codebase Index

## Relevant Areas

- Frontend Relation catalog assignment dialog.
- Frontend Catalog store/service.
- Frontend MaturityLevelModel store/service.
- Backend Catalog controller/service/repository.
- Backend maturity DTOs and mapping profiles.

## Files To Inspect

- `Web-Suite/clientapp/src/components/Relation/RelationAssignCatalogElementsDialog.vue`
- `Web-Suite/clientapp/src/components/Relation/MaturityCell.vue`
- `Web-Suite/clientapp/src/components/Requirements/CatalogElementsTreeView.vue`
- `Web-Suite/clientapp/src/components/Requirements/MaturityCell.vue`
- `Web-Suite/clientapp/src/store/stores/catalog.js`
- `Web-Suite/clientapp/src/services/catalog-service.js`
- `Web-Suite/clientapp/src/store/stores/maturityLevelModel.js`
- `Web-Suite/clientapp/src/services/maturityLevelModel-service.js`
- `Web-Suite/Controllers/CatalogController.cs`
- `Web.Services/CatalogService.cs`
- `Web.Core/Services/ICatalogService.cs`
- `Web.Data/Repositories/CatalogRepository.cs`
- `Web.Core/Repositories/ICatalogRepository.cs`
- `Web.Core/Dto/Catalog/CatalogIdNameMaturityDto.cs`
- `Web.Core/Dto/Catalog/CatalogDto.cs`
- `Web.Core/Dto/MaturityLevelModel/MaturityLevelModelViewDto.cs`
- `Web.Core/Dto/MaturityLevelModel/MaturityLevelModelUpSertDto.cs`
- `Web.Core/Dto/MaturityLevelDto.cs`
- `Web-Suite/Controllers/MaturityLevelModelController.cs`
- `Web.Services/MaturityLevelModelService.cs`
- `Web.Data/Repositories/MaturityLevelModelRepository.cs`
- `Web-Suite/MappingProfiles/Profiles.cs`

## Files Expected To Change

Planned backend enrichment files:

- `Web.Core/Dto/Catalog/CatalogInScopeMaturityDto.cs`
- `Web.Core/Services/ICatalogService.cs`
- `Web.Core/Repositories/ICatalogRepository.cs`
- `Web.Services/CatalogService.cs`
- `Web.Data/Repositories/CatalogRepository.cs`
- `Web-Suite/MappingProfiles/Profiles.cs`
- `Web-Suite/clientapp/src/components/Relation/RelationAssignCatalogElementsDialog.vue`

Files expected to stay unchanged:

- `Web.Core/Dto/Catalog/CatalogIdNameMaturityDto.cs`
- `Web.Core/Dto/Catalog/CatalogEditDto.cs`
- `Web.Core/Dto/Catalog/CatalogScopeOverviewDto.cs`
- `Web.Core/Dto/Scope/ScopeCreateDto.cs`
- `Web.Core/Dto/Scope/ScopeOverviewDto.cs`
- `Web-Suite/clientapp/src/components/Requirements/CatalogElementsTreeView.vue`
- `Web-Suite/clientapp/src/components/Requirements/MaturityCell.vue`
- `Web-Suite/clientapp/src/components/Relation/MaturityCell.vue`

## Phase To Source Files

- Backend catalog-in-scope maturity DTO and query:
  - `Web.Core/Dto/Catalog/CatalogInScopeMaturityDto.cs`
  - `Web.Core/Services/ICatalogService.cs`
  - `Web.Core/Repositories/ICatalogRepository.cs`
  - `Web.Services/CatalogService.cs`
  - `Web.Data/Repositories/CatalogRepository.cs`
  - `Web-Suite/MappingProfiles/Profiles.cs`
- Frontend Relation dialog maturity consumption:
  - `Web-Suite/clientapp/src/components/Relation/RelationAssignCatalogElementsDialog.vue`
- Verification and handoff:
  - source files changed during implementation
  - PBI phase files

## Phase To Knowledge Files

- Backend catalog-in-scope maturity DTO and query:
  - `docs/ai/pbi/STP-8026/knowledge/maturity-catalog-contract.md`
- Frontend Relation dialog maturity consumption:
  - `docs/ai/pbi/STP-8026/knowledge/maturity-catalog-contract.md`
- Verification and handoff:
  - `docs/ai/pbi/STP-8026/knowledge/maturity-catalog-contract.md`

## Phase To Relevant Modules

- `Web-Suite/clientapp`
- `Web-Suite`
- `Web.Services`
- `Web.Core`
- `Web.Data`

## Phase To Created Or Updated Files

Expected during implementation:

- `Web.Core/Dto/Catalog/CatalogInScopeMaturityDto.cs`
- `Web.Core/Services/ICatalogService.cs`
- `Web.Core/Repositories/ICatalogRepository.cs`
- `Web.Services/CatalogService.cs`
- `Web.Data/Repositories/CatalogRepository.cs`
- `Web-Suite/MappingProfiles/Profiles.cs`
- `Web-Suite/clientapp/src/components/Relation/RelationAssignCatalogElementsDialog.vue`

## Phase To Created Or Updated Functions

- `ICatalogService.GetCatalogsInScope`
- `ICatalogRepository.GetCatalogsInScope`
- `CatalogService.GetCatalogsInScope`
- `CatalogRepository.GetCatalogsInScope`
- AutoMapper map from `Catalog` to `CatalogInScopeMaturityDto`
- Relation dialog `maturityLevels` computed property, if needed

## Function Purpose, Usage, Related Flow, Validation Focus, and Review Focus

- `ICatalogService.GetCatalogsInScope`
  - Purpose: expose a read-only contract for catalogs assigned to a scope.
  - Usage: called by `CatalogController.GetCatalogsInScope`.
  - Related flow: Relation dialog catalog dropdown.
  - Validation focus: return type includes maturity model levels without affecting CRUD DTOs.
  - Review focus: no accidental full `CatalogDto` payload.
- `ICatalogRepository.GetCatalogsInScope`
  - Purpose: load catalogs assigned to a scope with only metadata needed for the relation dialog.
  - Usage: called by `CatalogService.GetCatalogsInScope`.
  - Related flow: selected scope -> catalog list -> selected catalog maturity levels.
  - Validation focus: includes `MaturityLevelModel.MaturityLevels`; does not unnecessarily include element trees.
  - Review focus: EF query remains lean and read-only.
- `CatalogService.GetCatalogsInScope`
  - Purpose: prepare read DTOs for frontend catalog selection.
  - Usage: called by controller endpoint.
  - Related flow: Relation assignment dialog.
  - Validation focus: maps to dedicated read DTO.
  - Review focus: no side effects or CRUD DTO reuse.
- Relation dialog `maturityLevels` computed property
  - Purpose: provide maturity levels for current/target filters and view-only cells.
  - Usage: consumed by filter controls and `Relation/MaturityCell.vue`.
  - Related flow: selected catalog changes -> maturity indicators render.
  - Validation focus: handles missing model/levels safely.
  - Review focus: no edit behavior introduced.

## Investigation Search Hints

- `GetCatalogsInScope`
- `CatalogIdNameMaturityDto`
- `MaturityLevelModelViewDto`
- `MaturityLevelModelUpSertDto`
- `selectedCatalog.value.maturityLevelModel.maturityLevels`
- `fetchCatalogsInScope`
- `FetchCatalogElementsForTreeView`
- `currentMaturityId`
- `targetMaturityId`

## Backend Enrichment Impact Files

Files to avoid changing unless explicitly planned:

- `Web.Core/Dto/Catalog/CatalogIdNameMaturityDto.cs`
- `Web.Core/Dto/Catalog/CatalogEditDto.cs`
- `Web.Core/Dto/Catalog/CatalogScopeOverviewDto.cs`
- `Web.Core/Dto/Scope/ScopeCreateDto.cs`
- `Web.Core/Dto/Scope/ScopeOverviewDto.cs`
- scope create/update mappings in `Web-Suite/MappingProfiles/Profiles.cs`

Files likely involved if backend enrichment is selected:

- `Web.Core/Dto/Catalog/[new read DTO].cs`
- `Web.Core/Services/ICatalogService.cs`
- `Web.Core/Repositories/ICatalogRepository.cs`
- `Web.Services/CatalogService.cs`
- `Web.Data/Repositories/CatalogRepository.cs`
- `Web-Suite/Controllers/CatalogController.cs`
- `Web-Suite/MappingProfiles/Profiles.cs`
- `Web-Suite/clientapp/src/components/Relation/RelationAssignCatalogElementsDialog.vue`
