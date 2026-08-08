# Review — Phase 1 — STP-8084

## Skill

review-phase

## Review Mode

strict

## Reviewed File

`Web-Suite/clientapp/src/Composables/AssetSchemaComposable.js`

## Status

Review Complete

---

## Findings

### RF-01 — Correctness: `getProcessTypeKey` handles `undefined` incorrectly

**Severity:** Required

**Location:** `ProcessComposable.js` lines 14–19 (called from `AssetSchemaComposable.js` line 185)

**Detail:**

```javascript
const getProcessTypeKey = (key) => {
  if (key === -1 || key === null) {
    return '';
  }
  return getProcessTypeItems().find((item) => item.key === key)?.text || '';
};
```

The guard only checks for `-1` and `null`. It does **not** guard against `undefined`.

In `AssetSchemaComposable.js` the call is:
```javascript
value: (a) => getProcessTypeKey(a.processType),
```

If `a.processType` is `undefined` (asset loaded without the field, or a partial DTO), the guard is bypassed. `undefined === -1` is `false`, `undefined === null` is `false`, so the code falls through to `find()` where `item.key === undefined` is never true — returning `''` via the `|| ''` fallback. Functionally this renders correctly as empty, but it bypasses the explicit guard silently.

The existing fallback `|| ''` saves AC3/AC4 from breaking. This is a **correctness concern** rather than a runtime bug, but it should be fixed to match the guard's intent.

**Required fix:** Add `undefined` to the guard in `getProcessTypeKey`.

```javascript
if (key === -1 || key === null || key === undefined) {
  return '';
}
```

---

### RF-02 — Architecture: `useProcess()` call position inside `useAssetSchema`

**Severity:** Optional

**Location:** `AssetSchemaComposable.js` line 71

**Detail:**

```javascript
const { getProcessTypeKey } = useProcess();
```

`useProcess()` calls `useI18n()` internally. All other composable calls in `useAssetSchema` follow the same pattern (called at the top of the function, inside `<script setup>` context). This is correct — Vue's composable rules are satisfied because `useAssetSchema` itself is called from `<script setup>` in `AssetDetailsView.vue`.

The placement at line 71 (after `getDeviceTypeText`, at the end of the composable destructures block) is consistent with the pattern used for all other domain composables in this file. No issue.

**Finding:** No action required.

---

### RF-03 — Simplicity: `value` function for `processType` is consistent with existing pattern

**Severity:** Informational

**Location:** `AssetSchemaComposable.js` line 185

**Detail:**

```javascript
value: (a) => getProcessTypeKey(a.processType),
```

All other type fields in this file follow the same `value: (a) => getSomeTypeText(a.field)` pattern. This entry is consistent. No change needed.

---

### RF-04 — Naming: `l_common.type` is the correct translation key

**Severity:** Informational

**Location:** `AssetSchemaComposable.js` line 184

**Detail:**

`l_common.type` is used for the Type label across many other asset types in this file (e.g. Server, Software, Client). Using the same key for Process is correct and consistent.

Translation exists in both `en.json` and `de.json`. No translation gap.

---

### RF-05 — Scope Control: `ProcessDetails.vue` correctly left unchanged

**Severity:** Informational

**Detail:**

`ProcessDetails.vue` was investigated during implementation but correctly identified as out of scope. The file was restored to its original state. No drift in scope.

---

### RF-06 — Test Coverage: No automated tests

**Severity:** Optional

**Detail:**

There are no unit tests for `AssetSchemaComposable.js` or `ProcessComposable.js` in `Web.NUnitTest`. The repository's test coverage for frontend composables is currently limited (per repo-context `test_strategy.md`). No test is required by this PBI, but the absence is noted.

---

## Summary

| ID | Severity | Title | Action |
|---|---|---|---|
| RF-01 | **Required** | `getProcessTypeKey` does not guard `undefined` | Fix guard in `ProcessComposable.js` |
| RF-02 | Optional | `useProcess()` call position | No action — consistent with pattern |
| RF-03 | Informational | `value` function pattern | No action — consistent |
| RF-04 | Informational | Translation key correct | No action |
| RF-05 | Informational | `ProcessDetails.vue` scope correct | No action |
| RF-06 | Optional | No automated tests | No action required by PBI |

---

## Required Fixes

### RF-01 Fix

**File:** `Web-Suite/clientapp/src/Composables/ProcessComposable.js`
**Line:** 15

Change:
```javascript
if (key === -1 || key === null) {
```
To:
```javascript
if (key === -1 || key === null || key === undefined) {
```

---

## Optional Improvements

- RF-06: Add a unit test for `getProcessTypeKey` covering: valid enum values (0–3), `-1`, `null`, `undefined`, and out-of-range values.

---

## Recommended Next Skill

- If RF-01 fix is approved: `fix-phase`
- If RF-01 is accepted as-is (fallback `|| ''` is sufficient): `pbi-final-handoff`
