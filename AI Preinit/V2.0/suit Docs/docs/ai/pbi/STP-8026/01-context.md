# STP-8026 Context

## Repo Context Summary

Repository context was insufficient for the PBI-specific DTO/API questions, so targeted source inspection was performed.

Relevant repository shape:

- Backend catalog APIs live under `Web-Suite/Controllers`, `Web.Services`, `Web.Core/Services`, `Web.Core/Dto`, and `Web.Data/Repositories`.
- Frontend catalog APIs are routed through `Web-Suite/clientapp/src/services/catalog-service.js` and `Web-Suite/clientapp/src/store/stores/catalog.js`.
- Maturity level metadata is exposed through the existing `MaturityLevelModel` API and DTOs.

## Task Context

The approved PBI requires view-only maturity indicators in the Measures catalog relationship dialog. Planning must inspect the Requirements reference implementation and relevant DTO/API paths before selecting an implementation approach.

## Selected Planning Direction

Use backend enrichment for `GetCatalogsInScope` with a dedicated read-only DTO and a lean repository query.

Rationale:

- The Relation dialog already expects `selectedCatalog.maturityLevelModel.maturityLevels`.
- The root data gap is in the catalog list response, not in the element tree response.
- The existing `MaturityLevelModelViewDto` / `MaturityLevelDto` shape already carries the maturity level metadata needed for colors and tooltips.
- A dedicated read DTO avoids changing scope/catalog CRUD DTOs.
- A lean query avoids increasing payload by adding maturity includes to the current broad element include query.

Out of scope for this PBI:

- Changing maturity calculation logic.
- Changing Requirements behavior.
- Adding edit/dropdown behavior to Relation maturity cells.
- Changing scope create/update DTOs.
- Changing catalog edit DTOs.

## Source Inspection Notes

### Open Question Answers

#### Does `CatalogIdNameMaturityDto` satisfy the dialog requirements?

No. `CatalogIdNameMaturityDto` is not sufficient for maturity color/tooltip rendering.

Findings:

- `Web.Core/Dto/Catalog/CatalogIdNameMaturityDto.cs` contains `Id`, `Name`, `FamilyId`, and `MaturityLevelModel`.
- Its `MaturityLevelModel` type is `MaturityLevelModelUpSertDto`.
- `MaturityLevelModelUpSertDto` contains only `Id`, `Name`, and `LicenseId`.
- It does not include `maturityLevels`, `colorHex`, `level`, or maturity descriptions.
- The Relation dialog requires `selectedCatalog.maturityLevelModel.maturityLevels` to resolve `currentMaturityId` and `targetMaturityId` into displayable color and tooltip data.

Conclusion: `CatalogIdNameMaturityDto` can identify the assigned maturity model but cannot render the indicators by itself. It would need to use `MaturityLevelModelViewDto` or another DTO carrying level metadata.

#### Is maturity metadata available in another API layer?

Yes. The existing `MaturityLevelModel` API returns maturity models with full maturity levels.

Findings:

- `MaturityLevelModelController` exposes `GET /MaturityLevelModel`.
- `MaturityLevelModelService.GetByTenantId()` returns `IEnumerable<MaturityLevelModelViewDto>`.
- `MaturityLevelModelViewDto` includes `ICollection<MaturityLevelDto> MaturityLevels`.
- `MaturityLevelDto` includes `Id`, `Name`, `Level`, `Description`, `ColorHex`, `MaturityLevelModelId`, and `MaturityLevelModelName`.
- `MaturityLevelModelRepository.GetByTenantId()` includes `MaturityLevels.OrderBy(x => x.Level)`.
- The frontend already has `maturityLevelModel-service.js` and `maturityLevelModel` Pinia store for loading these models.

Conclusion: A reusable API/data source already exists for full maturity metadata, but the Relation dialog does not currently consume it.

#### Are other consumers dependent on `GetCatalogsInScope`?

Only one direct frontend consumer was found for the endpoint path and store action.

Findings:

- Backend endpoint: `CatalogController.GetCatalogsInScope`.
- Service contract: `ICatalogService.GetCatalogsInScope(Guid scopeId)` currently returns `Task<IEnumerable<IdAndNameDto>>`.
- Service implementation maps catalogs to `IEnumerable<IdAndNameDto>`.
- Frontend API call: `catalog-service.js` posts to `/Catalog/getCatalogsInScope`.
- Frontend store action: `catalog.js` action `fetchCatalogsInScope`.
- Direct component consumer found: `RelationAssignCatalogElementsDialog.vue`.
- `Scope/SelectCatalogDialog.vue` has a prop named `catalogsInScope`, but no direct endpoint/store call was found.

Conclusion: Contract change risk appears narrower than initially suspected, but backend service/interface return type changes still touch shared catalog service contracts. A minimal endpoint-specific DTO update or a separate endpoint should be weighed during planning.

#### Are other maturity models/DTOs reusable?

Yes. `MaturityLevelModelViewDto` and `MaturityLevelDto` are the strongest reuse candidates.

Findings:

- `CatalogDto` already uses `MaturityLevelModelViewDto`, which carries full maturity levels.
- `CatalogRepository.GetById()` already includes `MaturityLevelModel.ThenInclude(MaturityLevels)`.
- `CatalogScopeOverviewDto`, `CatalogEditDto`, and `CatalogIdNameMaturityDto` use `MaturityLevelModelUpSertDto`, which does not carry levels.
- The Relation-specific `MaturityCell.vue` is already view-only and only needs `cellMaturityId` plus a `maturityLevels` array.
- Requirements `MaturityCell.vue` includes edit behavior via a menu/radio group and should not be copied directly into Relation because the PBI requires view-only behavior.

Conclusion: Reuse the existing full maturity DTO shape (`MaturityLevelModelViewDto` / `MaturityLevelDto`) or load existing maturity models in the frontend and attach/resolve them by model id. Do not reuse Requirements `MaturityCell` wholesale because it contains editing behavior.

### Relevant Line References

- `Web.Core/Dto/Catalog/CatalogIdNameMaturityDto.cs:11` uses `MaturityLevelModelUpSertDto`.
- `Web.Core/Dto/MaturityLevelModel/MaturityLevelModelUpSertDto.cs:7` through `Web.Core/Dto/MaturityLevelModel/MaturityLevelModelUpSertDto.cs:9` define only `Id`, `Name`, and `LicenseId`.
- `Web.Core/Dto/MaturityLevelModel/MaturityLevelModelViewDto.cs:10` includes `MaturityLevels`.
- `Web.Services/CatalogService.cs:313` returns `IEnumerable<IdAndNameDto>` for `GetCatalogsInScope`.
- `Web.Services/CatalogService.cs:322` maps catalogs to `IdAndNameDto`.
- `Web.Data/Repositories/CatalogRepository.cs:246` defines `GetCatalogsInScope`; this query does not include `MaturityLevelModel`.
- `Web-Suite/clientapp/src/components/Relation/RelationAssignCatalogElementsDialog.vue:407` computes `maturityLevels`.
- `Web-Suite/clientapp/src/components/Relation/RelationAssignCatalogElementsDialog.vue:410` reads `selectedCatalog.value.maturityLevelModel.maturityLevels`.
- `Web-Suite/clientapp/src/components/Relation/RelationAssignCatalogElementsDialog.vue:486` and `Web-Suite/clientapp/src/components/Relation/RelationAssignCatalogElementsDialog.vue:671` fetch catalogs in scope.

### Planning Implications

- The root issue is not element maturity IDs; those are returned by `FetchCatalogElementsForTreeView` as `currentMaturityId` and `targetMaturityId`.
- The missing data is the selected catalog's full maturity model levels.
- The lowest-risk planning options are:
  - enrich `GetCatalogsInScope` with a small DTO that includes `MaturityLevelModelViewDto`, after adding repository includes, or
  - keep `GetCatalogsInScope` unchanged and resolve full maturity metadata from the existing `MaturityLevelModel` store/API in the Relation dialog.
- The plan must preserve Relation dialog view-only behavior and avoid copying Requirements editing behavior.

## Backend Enrichment Impact Analysis

### Scope Of Proposed Backend Change

The backend enrichment option should not change existing create/update/delete DTOs. It should either:

- introduce a dedicated read-only DTO for `GetCatalogsInScope`, for example `CatalogInScopeMaturityDto`, containing only catalog id/name and full maturity metadata needed for display, or
- change `GetCatalogsInScope` to return an existing read DTO only if the returned shape remains intentionally small.

Do not expand `CatalogIdNameMaturityDto` for this use case unless the scope-create side effects are intentionally accepted.

### DTO Reference Impact

`CatalogIdNameMaturityDto` references:

- `Web.Core/Dto/Scope/ScopeCreateDto.cs`
- `Web-Suite/MappingProfiles/Profiles.cs` via `CreateMap<CatalogIdNameMaturityDto, Catalog>()`

`CatalogIdNameMaturityDto` is an input DTO for scope creation. Changing its `MaturityLevelModel` property from `MaturityLevelModelUpSertDto` to `MaturityLevelModelViewDto`, or adding required fields to it, could affect:

- scope create request binding,
- AutoMapper mapping to `Catalog`,
- frontend `ScopeEditor.vue` create payloads,
- validation and model-state behavior for scope create.

Conclusion: avoid changing `CatalogIdNameMaturityDto` for `GetCatalogsInScope`. Create a separate output DTO if backend enrichment is selected.

### Catalog CRUD Impact

Catalog update uses `CatalogEditDto`, not `GetCatalogsInScope`.

Relevant flow:

- `CatalogController.UpdateCatalog` accepts `CatalogEditDto`.
- `CatalogService.Update(CatalogEditDto)` loads the existing catalog through `_catalogRepository.GetById`.
- `CatalogRepository.GetById` already includes `MaturityLevelModel.ThenInclude(MaturityLevels)`.
- If the maturity model changes, `CatalogService.Update` deletes old maturity attribute values tied to the previous model.
- `CatalogRepository.Update(Catalog, CatalogEditDto)` writes `MaturityLevelModelId = catalogDto.MaturityLevelModel?.Id`.

Conclusion: returning a richer read DTO from `GetCatalogsInScope` does not directly affect catalog create/update/delete. The risk appears only if shared DTOs used by catalog edit are modified, which the plan should avoid.

### Scope Create/Update Impact

Scope create and update are the main areas connected to catalog maturity assignments.

Create flow:

- `ScopeController.CreateScope` accepts `ScopeCreateDto`.
- `ScopeCreateDto.Catalogs` is `List<CatalogIdNameMaturityDto>`.
- `ScopeService.Create` maps `ScopeCreateDto` to `Scope`.
- Each selected catalog is copied into the scope.
- `copiedCatalog.MaturityLevelModelId = cat.MaturityLevelModelId`.

Update flow:

- `ScopeController.UpdateScope` accepts `ScopeOverviewDto`.
- `ScopeOverviewDto.Catalogs` is `List<CatalogScopeOverviewDto>`.
- `CatalogScopeOverviewDto.MaturityLevelModel` is `MaturityLevelModelUpSertDto`.
- `ScopeService.RemoveMaturityAttributeValues` compares old and new `MaturityLevelModelId`.
- When the model changes, maturity attribute values for old levels are deleted.
- `ScopeService.UpdateMaturityModel` persists the catalog's new maturity model.

Conclusion: scope CRUD depends on `CatalogIdNameMaturityDto`, `CatalogScopeOverviewDto`, and `MaturityLevelModelUpSertDto`. Backend enrichment for Relation should not change these DTOs. A new read-only DTO for `GetCatalogsInScope` avoids scope CRUD regression.

### Existing `GetCatalogsInScope` Contract Impact

Current backend contract:

- `ICatalogService.GetCatalogsInScope(Guid scopeId)` returns `Task<IEnumerable<IdAndNameDto>>`.
- `CatalogService.GetCatalogsInScope` maps catalogs to `IdAndNameDto`.
- `CatalogController.GetCatalogsInScope` returns that list.

Current frontend consumers:

- `catalog-service.js` calls `/Catalog/getCatalogsInScope`.
- `catalog.js` stores the response in `state.catalogsInScope`.
- `RelationAssignCatalogElementsDialog.vue` is the only direct component consumer found.
- `Scope/SelectCatalogDialog.vue` has a `catalogsInScope` prop, but does not call this endpoint/store action directly.

Conclusion: changing the return type of `GetCatalogsInScope` to a richer DTO is likely low-risk for current direct consumers, because the Relation dialog already expects `selectedCatalog.maturityLevelModel.maturityLevels`. Still, service/interface return type changes should be kept local and intentional.

### Repository Query Impact

`CatalogRepository.GetCatalogsInScope` currently includes:

- elements,
- element attributes,
- element type attributes.

It does not include:

- `MaturityLevelModel`,
- `MaturityLevelModel.MaturityLevels`.

For the Relation dialog catalog dropdown and maturity-level resolution, full element data is not needed in `GetCatalogsInScope`; element data is loaded separately through `FetchCatalogElementsForTreeView`.

Conclusion: if backend enrichment is selected, prefer a lean query/read method for catalogs in scope with maturity model levels, instead of adding another include to the already broad `GetCatalogsInScope` element query. This reduces payload and avoids unnecessary EF include complexity.

### Risk Assessment

- Low risk: adding a new read-only DTO and mapping from `Catalog` to that DTO for `GetCatalogsInScope`.
- Low to medium risk: changing `ICatalogService.GetCatalogsInScope` return type, because compile-time references must be updated but direct consumers are narrow.
- Medium risk: reusing and modifying `CatalogIdNameMaturityDto`, because it is part of scope create input.
- Medium risk: returning full `CatalogDto`, because it can include elements, element types, scopes, licensed tenants, and more data than the dialog needs.
- Low risk: adding repository include for `MaturityLevelModel.MaturityLevels` if the query remains read-only, but this should be paired with narrowing unnecessary includes.

### Recommended Planning Direction

For backend enrichment, prefer:

1. Create a new small read DTO under `Web.Core/Dto/Catalog/`.
2. Include `Id`, `Name`, and `MaturityLevelModel` using `MaturityLevelModelViewDto` or a smaller maturity model read DTO if payload size matters.
3. Add an AutoMapper map from `Catalog` to the new read DTO.
4. Adjust `ICatalogService.GetCatalogsInScope` / `CatalogService.GetCatalogsInScope` / `CatalogController.GetCatalogsInScope` to return that DTO.
5. Update `CatalogRepository.GetCatalogsInScope` or add a dedicated repository method to include only catalog metadata plus `MaturityLevelModel.MaturityLevels`.
6. Do not modify `CatalogIdNameMaturityDto`, `CatalogEditDto`, `CatalogScopeOverviewDto`, or scope CRUD DTOs.

## Open Questions

No blocking open questions remain for planning.
