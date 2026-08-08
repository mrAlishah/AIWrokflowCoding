# STP-8026 Maturity Catalog Contract

## Purpose

Capture the PBI-specific read contract needed to display maturity indicators in the Measures catalog relationship dialog.

## Contract Need

The Relation dialog needs:

- catalog `id`
- catalog `name`
- selected catalog `maturityLevelModel`
- `maturityLevelModel.maturityLevels`
- maturity level `id`
- maturity level `name`
- maturity level `level`
- maturity level `description`
- maturity level `colorHex`

The element tree already provides:

- `currentMaturityId`
- `targetMaturityId`

## DTO Guidance

Use a dedicated read-only DTO for `GetCatalogsInScope`.

Recommended shape:

```text
CatalogInScopeMaturityDto
- Id
- Name
- MaturityLevelModel
```

`MaturityLevelModel` may reuse `MaturityLevelModelViewDto` because it already carries `MaturityLevels` with `ColorHex`.

## DTOs Not To Change

- `CatalogIdNameMaturityDto`
- `CatalogEditDto`
- `CatalogScopeOverviewDto`
- `ScopeCreateDto`
- `ScopeOverviewDto`

These DTOs participate in catalog/scope create and update flows and should not be changed for a read-only Relation dialog display feature.

## UI Contract

The frontend should be able to keep using:

```text
selectedCatalog.maturityLevelModel.maturityLevels
```

The Relation maturity cell remains view-only and should not gain dropdown, radio, or mutation behavior.

## Validation Focus

- Field casing in JSON must match frontend expectations.
- Catalogs without a maturity model must not break the dialog.
- Maturity IDs from elements must resolve against the selected catalog's maturity levels.
- Not-set values must remain visually distinct.
