# Context — STP-8084

## Repo Context Summary

Source: `docs/ai/repo-context/module_map.md`, `codebase-index.md`, `coding_standards.md`, `code-policies.md`

- Frontend feature work touches: component under `src/components`, composable under `src/Composables`, translations under `src/language/translations`.
- Active code policies: CP-001 (no `var`), CP-002 (preserve existing variable names unless required), CP-003 (translation diff coverage in review).
- Frontend domain helpers use composables in `FooComposable.js`.

## Task Context

PBI: Display `Typ` field in Process Overview panel (Basisinformationen card)

Module: Processes — frontend only. No backend changes required.

### Architecture Finding

The route `/asset/Process` renders `AssetDetailsView.vue` — **not** `ProcessDetails.vue`.

`AssetDetailsView.vue` is the generic details view used for all asset types. It reads extra fields from `AssetSchemaComposable.js` via `currentSchema.left` and `currentSchema.right`.

`ProcessDetails.vue` is a separate standalone component used in a different context and is **not** involved in this PBI.

### Root Cause

The `Typ` field is missing from the Process entry in `AssetSchemaComposable.js`.

The `Process` schema in `AssetSchemaComposable.js` only contained: `target`, `number`, `sla`, `existingRequirements`. The `processType` field was never included, so it never appeared in the `Basisinformationen` card.

### Source Findings

| Item | Detail |
|---|---|
| Target file | `Web-Suite/clientapp/src/Composables/AssetSchemaComposable.js` |
| Change | Added `processType` entry to Process schema using `getProcessTypeKey(a.processType)` |
| Import added | `import { useProcess } from '@/Composables/ProcessComposable'` |
| Composable call added | `const { getProcessTypeKey } = useProcess()` |
| Translation key used | `l_common.type` — already exists in both `en.json` and `de.json` |
| `getProcessTypeKey(key)` | Accepts numeric enum (0–3), returns translated text or `''` for null/-1 |
| Layout | `currentSchema` splits fields into left/right columns — `Typ` appears in left column, below Status |
| Data | `asset.processType` (numeric 0–3) already in DTO and store |
| State update | Asset store handles live updates after Save — no additional wiring needed |
| `ProcessComposable.js` | Unchanged |
| Translation files | Unchanged — `l_common.type` key already exists |
| Backend | Unchanged |

### Out-of-Scope Note

`ProcessDetails.vue` is not part of this PBI. It was initially investigated in error.

## Open Questions

None. Source inspection confirmed full understanding of the fix.
