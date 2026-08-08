# Implementation Plan — STP-8084

## Status

Done

## Scope

Frontend-only change. Add `processType` field to the Process schema in `AssetSchemaComposable.js` so it appears in the `Basisinformationen` card of `AssetDetailsView.vue`.

No backend changes. No translation additions. No layout changes.

## Out of Scope

- Backend changes
- Translation additions
- Layout redesign
- `ProcessDetails.vue` — not involved in this PBI
- Other modules

## Phases

| Phase | Goal | Status |
|---|---|---|
| Phase 1 — Add Typ to Process schema | Add `processType` field to Process schema in `AssetSchemaComposable.js` | Done |

## Verification Plan

1. Open a Process with a non-null `processType` → `Typ` shows translated value (e.g. "Kernprozess").
2. Open a Process with `processType = null` or `-1` → `Typ` row is empty.
3. Edit → change `Typ` → Save → Overview shows new value immediately without hard refresh.
4. Confirm no regression on `Name`, `Mandant`, `Status`, `Beschreibung`.
5. Confirm no other modules affected.

## Handoff Expectations

Single phase. After Phase 1 is Done, proceed to review-phase or pbi-final-handoff.
