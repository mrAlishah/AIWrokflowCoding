# Phase 1 — Add Typ to Process Schema

## Status

Done

## Goal

Add `processType` field to the Process schema in `AssetSchemaComposable.js` so the `Typ` value appears in the `Basisinformationen` card of `AssetDetailsView.vue`.

## Scope

- File: `Web-Suite/clientapp/src/Composables/AssetSchemaComposable.js`
- Three additions: import, composable call, schema entry.
- No other files.

## Target Files

- `Web-Suite/clientapp/src/Composables/AssetSchemaComposable.js`

## Planned Steps

1. Add import at top of file:
   ```javascript
   import { useProcess } from '@/Composables/ProcessComposable';
   ```

2. Inside `useAssetSchema`, add composable call after other composable destructures:
   ```javascript
   const { getProcessTypeKey } = useProcess();
   ```

3. Add `processType` as first entry in the `Process` schema array:
   ```javascript
   Process: [
     {
       label: 'l_common.type',
       value: (a) => getProcessTypeKey(a.processType),
     },
     // ... existing fields
   ],
   ```

## Architecture Note

Route `/asset/Process` → `AssetDetailsView.vue` → `useAssetSchema` → `currentSchema.left / right`.

`AssetDetailsView.vue` renders the extra fields from the schema dynamically via `v-for="field in currentSchema.left"` and `v-for="field in currentSchema.right"`. Adding the field to the schema is sufficient — no changes needed in the template.

`ProcessDetails.vue` is not involved in this flow.

## Execution Memory

- Added `import { useProcess } from '@/Composables/ProcessComposable'` after the last import line (line 27).
- Added `const { getProcessTypeKey } = useProcess()` after `getDeviceTypeText` (line 71).
- Added `{ label: 'l_common.type', value: (a) => getProcessTypeKey(a.processType) }` as first entry in `Process` schema array (line 183-186).
- No other files changed.

## Verification Performed

- Code review: `getProcessTypeKey(key)` handles `null` and `-1` by returning `''` — AC4 satisfied.
- Code review: `getProcessTypeKey(key)` returns translated text for valid enum values 0–3 — AC3 satisfied.
- Code review: `l_common.type` key already exists in both `en.json` and `de.json` — no translation gap.
- Code review: `AssetDetailsView.vue` renders schema fields dynamically — no template change needed — AC7 satisfied.
- Code review: `asset.processType` is in the DTO and asset store — data available without backend changes.
- Code review: only `AssetSchemaComposable.js` changed — no other modules affected.

## Known Risks

- None. Change is additive and isolated to the Process schema entry.
