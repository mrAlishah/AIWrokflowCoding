# Codebase Index — STP-8084

## Relevant Areas

- Processes module — frontend schema composable only

## Architecture Note

Route `/asset/Process` → `AssetDetailsView.vue` → reads fields from `AssetSchemaComposable.js` via `currentSchema.left` / `currentSchema.right`.

`ProcessDetails.vue` is a separate component and is **not** part of this PBI.

## Files To Inspect

| File | Reason |
|---|---|
| `Web-Suite/clientapp/src/Composables/AssetSchemaComposable.js` | Defines per-type field schemas for `AssetDetailsView.vue` — target file |
| `Web-Suite/clientapp/src/Composables/ProcessComposable.js` | Provides `getProcessTypeKey` for translating processType enum |
| `Web-Suite/clientapp/src/components/Asset/AssetDetailsView.vue` | Renders Basisinformationen card using `currentSchema` |

## Files Changed

| File | Change |
|---|---|
| `Web-Suite/clientapp/src/Composables/AssetSchemaComposable.js` | Added `useProcess` import, `getProcessTypeKey` call, and `processType` field to Process schema |

## Files Unchanged

- `Web-Suite/clientapp/src/Composables/ProcessComposable.js` — already exports `getProcessTypeKey`
- `Web-Suite/clientapp/src/components/Asset/AssetDetailsView.vue` — no change needed
- `Web-Suite/clientapp/src/components/Asset/Process/ProcessDetails.vue` — not involved
- `Web-Suite/clientapp/src/language/translations/en.json` — `l_common.type` already exists
- `Web-Suite/clientapp/src/language/translations/de.json` — `l_common.type` already exists
- All backend files

## Phase To Source Files

| Phase | Source Files |
|---|---|
| Phase 1 | `AssetSchemaComposable.js` |

## Phase To Relevant Modules

| Phase | Module |
|---|---|
| Phase 1 | `Web-Suite/clientapp/src/Composables/` |

## Phase To Created Or Updated Files

| Phase | File | Action |
|---|---|---|
| Phase 1 | `Web-Suite/clientapp/src/Composables/AssetSchemaComposable.js` | Updated |

## Function Reference

| Function | File | Purpose | Usage |
|---|---|---|---|
| `getProcessTypeKey(key)` | `ProcessComposable.js` | Accepts numeric 0–3 or null/-1, returns translated text or `''` | Called in Process schema `value` function |
