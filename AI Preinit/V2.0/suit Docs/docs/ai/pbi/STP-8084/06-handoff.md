# Handoff — STP-8084

## Summary

فیلد `Typ` (Process Type) در پنل `Basisinformationen` مسیر `/asset/Process` نمایش داده می‌شود.

فیلد قبلاً در schema وجود نداشت. با افزودن یک entry به Process schema در `AssetSchemaComposable.js` مشکل حل شد. هیچ تغییر backend، translation، یا layout لازم نبود.

---

## Changed Source Files

| فایل | تغییر |
|---|---|
| `Web-Suite/clientapp/src/Composables/AssetSchemaComposable.js` | ۳ خط اضافه شد: import، composable call، schema entry |

### Exact Diff

```diff
+import { useProcess } from '@/Composables/ProcessComposable';

+  const { getProcessTypeKey } = useProcess();

   Process: [
+    {
+      label: 'l_common.type',
+      value: (a) => getProcessTypeKey(a.processType),
+    },
     {
       label: 'l_common.target',
```

---

## Validation Results

| Acceptance Criteria | نتیجه | توضیح |
|---|---|---|
| AC1 — فیلد `Typ` در Basisinformationen نمایش داده شود | ✅ | entry به schema اضافه شد |
| AC2 — مقدار ترجمه‌شده مشابه Edit Dialog | ✅ | از `getProcessTypeKey` استفاده می‌شود که همان translation keys `l_process.type.*` را به کار می‌برد |
| AC3 — مقدار خالی → نمایش خالی | ✅ | `getProcessTypeKey` برای `null` و `-1` مقدار `''` برمی‌گرداند |
| AC4 — پس از Edit→Save مقدار جدید فوری نمایش داده شود | ✅ | `AssetDetailsView.vue` از asset store می‌خواند که بعد از Save آپدیت می‌شود |
| AC5 — Hard Refresh لازم نباشد | ✅ | store-driven rendering، نیازی به reload نیست |
| AC6 — فقط ماژول Processes تأثیر بگیرد | ✅ | تغییر محدود به Process schema entry در `AssetSchemaComposable.js` |
| AC7 — Regression در فیلدهای موجود نباشد | ✅ | تغییر additive است — فیلدهای موجود دست‌نخورده هستند |

---

## Remaining Risks

| ID | شدت | توضیح | وضعیت |
|---|---|---|---|
| RF-01 | Optional | `getProcessTypeKey` مقدار `undefined` را با guard صریح نمی‌گیرد — fallback `\|\| ''` درست عمل می‌کند اما guard ناقص است | قابل قبول — رفتار صحیح است |

---

## Suggested PR Description

**Title:**
```
feat(STP-8084): display process type in Basisinformationen overview panel
```

**Body:**
```
## Summary

- Added `processType` (Typ) field to the Process schema in `AssetSchemaComposable.js`
- The field now appears in the Basisinformationen card at `/asset/Process`
- Displays the translated process type value (e.g. "Kernprozess", "Führungsprozess")
- Empty/null values render as empty — no placeholder shown

## Changes

- `Web-Suite/clientapp/src/Composables/AssetSchemaComposable.js`
  - Import `useProcess` from `ProcessComposable`
  - Destructure `getProcessTypeKey`
  - Add `l_common.type` entry to Process schema

## No changes to

- Backend / API
- Translation files (`l_common.type` already existed in en.json + de.json)
- `ProcessDetails.vue` (not used at `/asset/Process`)
- Any other module

## Test Plan

1. Open `/asset/Process` → select any Process with a Typ set → confirm Typ shows translated value
2. Open a Process with no Typ → confirm field is empty
3. Edit Typ in Edit Dialog → Save → confirm Overview updates without hard refresh
4. Confirm Name, Mandant, Status, Beschreibung fields show no regression
```

---

## Recommended Next Action

PR erstellen auf Branch `bugfix/STP-8084/display-type-in-process-overview-panel`.
