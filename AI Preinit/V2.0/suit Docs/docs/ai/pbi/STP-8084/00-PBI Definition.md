# PBI Definition

## Business Goal

نمایش فیلد `Typ` در Overview ماژول `Processes` تا کاربر بدون باز کردن مودال Edit بتواند نوع فرآیند را ببیند.

## Scope

- افزودن فیلد `Typ` به کارت `Basisinformationen`.
- محل نمایش: ستون چپ، زیر `Status`.
- نمایش مقدار ترجمه‌شده مشابه مودال Edit.
- اگر مقدار `Typ` خالی بود، مقدار خالی نمایش داده شود.
- اعمال تغییر فقط برای ماژول `Processes`.

## Out Of Scope

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

## Technical Solution

مسیر `/asset/Process` از `AssetDetailsView.vue` استفاده می‌کند. این view فیلدهای اضافه را از `AssetSchemaComposable.js` می‌خواند. راه‌حل: افزودن `processType` به Process schema در این composable.

فایل تغییر یافته: `Web-Suite/clientapp/src/Composables/AssetSchemaComposable.js`

## Validation Focus

- تست با فرآیندهایی که `Typ`های مختلف دارند، مثل `Führungsprozess` و `Kernprozess`.
- تست تغییر `Typ` در Edit Dialog و نمایش فوری مقدار جدید در Overview بعد از Save.
- تست فرآیندی که `Typ` خالی دارد.
- بررسی عدم Regression در فیلدهای موجود کارت `Basisinformationen`.
