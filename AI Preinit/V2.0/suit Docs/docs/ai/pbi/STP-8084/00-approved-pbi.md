# Approved PBI

## PBI ID

STP-8084

## Title

Display `Typ` field in Process Overview panel (Basisinformationen card)

## Approved Request

نمایش فیلد `Typ` در Overview ماژول `Processes` تا کاربر بدون باز کردن مودال Edit بتواند نوع فرآیند را ببیند.

### Scope

- افزودن فیلد `Typ` به کارت `Basisinformationen`.
- محل نمایش: ستون چپ، زیر `Status`.
- نمایش مقدار ترجمه‌شده مشابه مودال Edit.
- اگر مقدار `Typ` خالی بود، مقدار خالی نمایش داده شود.
- اعمال تغییر فقط برای ماژول `Processes`.

### Out Of Scope

- تغییر منطق ذخیره‌سازی یا انتخاب `Typ`.
- تغییر مقادیر قابل انتخاب Process Type.
- تغییر سایر ماژول‌ها.
- بازطراحی کارت `Basisinformationen`.
- تغییر `ProcessDetails.vue` — این فایل در این مسیر استفاده نمی‌شود.

## Acceptance Criteria

1. فیلد `Typ` در Overview فرآیند، داخل `Basisinformationen` نمایش داده شود.
2. مقدار `Typ` باید همان ترجمه‌ای را نشان دهد که در مودال Edit استفاده می‌شود.
3. اگر مقدار `Typ` خالی باشد، مقدار خالی نمایش داده شود.
4. پس از تغییر `Typ` در Edit Dialog و ذخیره، مقدار جدید در Overview نمایش داده شود.
5. نمایش مقدار جدید نباید نیازمند Hard Refresh باشد.
6. تغییر فقط روی ماژول `Processes` اعمال شود.
7. فیلدهای موجود مثل `Name`, `Mandant`, `Status`, `Beschreibung` دچار Regression نشوند.

## Constraints

- No changes to save logic or selectable Process Type values.
- No other modules affected.
- No redesign of `Basisinformationen` card layout.
- No backend changes required.

## Technical Solution

Route `/asset/Process` → `AssetDetailsView.vue` → `AssetSchemaComposable.js` (via `currentSchema`).

Fix: add `processType` entry to the `Process` schema in `AssetSchemaComposable.js` using `getProcessTypeKey` from `ProcessComposable.js`.

Changed file: `Web-Suite/clientapp/src/Composables/AssetSchemaComposable.js`

## Requester

malishah@i-doit.com
