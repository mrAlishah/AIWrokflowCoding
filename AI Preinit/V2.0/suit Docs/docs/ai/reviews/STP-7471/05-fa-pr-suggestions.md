# Persian PR Suggestions: STP-7471

## Skill

Use skill: `review-comments-create`

## Suggestions

### PR-005

- Status: Planned
- Severity: P2
- Post or keep internal: Post

Deep Persian reasoning:

در diff کلیدهای مخصوص Audit برای remove dialog relation اضافه شده‌اند، اما خود `AuditRelation.vue` هنوز از کلیدهای `l_riskManagement.riskSphere.relation.*` استفاده می‌کند. این یعنی UI مربوط به Audit ممکن است متن Risk Sphere نشان بدهد و translationهای جدید Audit بدون استفاده بمانند.

Suggested fixes:

- همه کلیدهای `removeDialogText` در `AuditRelation.vue` از namespace مربوط به `l_audit.relation.*` استفاده کنند.
- بعد از اصلاح، دوباره check شود که کلیدهای اضافه‌شده در هر دو زبان وجود دارند و در code reference شده‌اند.

Pseudo-code:

```js
const removeDialogText = reactive({
  multipleTitle: t('l_audit.relation.removeMultipleDialogTitle'),
  bannerTitle: t('l_audit.relation.removeBannerTitle'),
  multipleBannerTitle: t('l_audit.relation.removeMultipleBannerTitle'),
  description: t('l_audit.relation.removeDialogDescription'),
  multipleDescription: t('l_audit.relation.removeMultipleDialogDescription'),
});
```

Alternative solutions:

- اگر قرار است relation list متن‌ها را از جای دیگری بسازد، translationهای اضافه‌شده باید حذف یا reason استفاده آینده آن‌ها در PR مشخص شود.

Personal notes:

این مورد از نظر functional بحرانی نیست، ولی برای UI و localization اشتباه دامنه‌ای ایجاد می‌کند.

### PR-001

- Status: Planned
- Severity: P1
- Post or keep internal: Post

Deep Persian reasoning:

در حال حاضر متد `fetchAuditPrograms` پاسخ واقعی API را دور می‌ریزد و هم در مسیر موفقیت و هم در مسیر خطا داده‌های ثابت `DUMMY_AUDIT_PROGRAMS` را داخل store می‌گذارد. این رفتار باعث می‌شود کاربر هیچ وقت داده واقعی Audit Program را در grid نبیند و حتی خطای API هم پنهان شود.

Suggested fixes:

- مقدار برگشتی `AuditService.getAllAuditPrograms()` در متغیر `response` یا `auditPrograms` ذخیره شود.
- در مسیر موفقیت همان داده واقعی وارد `UPDATE_AUDIT_PROGRAMS` شود.
- fallback با dummy data حذف شود یا فقط پشت feature/dev guard قرار بگیرد.
- خطا مطابق الگوی پروژه مدیریت شود.

Pseudo-code:

```js
const fetchAuditPrograms = async () => {
  const response = await AuditService.getAllAuditPrograms();
  UPDATE_AUDIT_PROGRAMS(response);
};
```

Alternative solutions:

- اگر API هنوز آماده نیست، این بخش با status مشخص یا feature flag محدود شود تا behavior production گمراه‌کننده نباشد.

Personal notes:

این مورد باید قبل از merge اصلاح شود، چون صفحه overview را از نظر داده عملا غیرقابل اعتماد می‌کند.

### PR-002

- Status: Planned
- Severity: P1
- Post or keep internal: Post

Deep Persian reasoning:

کامپوننت جدید Audit Relation مقدار `relationTargetType.securityIncident` را پاس می‌دهد، اما در `RelationComposable` چنین کلیدی وجود ندارد. بنابراین مقدار `owner-type` برای `RelationEditor` برابر `undefined` می‌شود. برای ماژول Audit باید target type واقعی Audit اضافه و استفاده شود، نه security incident.

Suggested fixes:

- در `RelationComposable` مقدار `audit` به enum و آیتم‌های relation target اضافه شود، اگر backend چنین target type ای دارد.
- در `AuditRelation.vue` مقدار `owner-type` به `relationTargetType.audit` تغییر کند.
- branch مربوط به انتخاب target هم فقط از کلیدهای تعریف‌شده استفاده کند.

Pseudo-code:

```js
const relationTargetType = EnumOneBased(
  'asset',
  'action',
  'catalogElement',
  'riskSphereApproval',
  'ropa',
  'audit',
);
```

```vue
:owner-type="relationTargetType.audit"
```

Alternative solutions:

- اگر audit relation target type هنوز backend contract ندارد، relation creation در این تب باید تا آماده شدن contract غیرفعال یا scope آن شفاف شود.

Personal notes:

اضافه شدن ترجمه‌های `l_relation.*.audit` نشان می‌دهد قصد استفاده از target type Audit وجود داشته، اما composable کامل نشده است.

### PR-003

- Status: Planned
- Severity: P1
- Post or keep internal: Post

Deep Persian reasoning:

طبق توضیح PR، تب Documents باید سندهایی را که قبلا برای catalog element در مرحله ۱ اضافه شده‌اند نمایش دهد و امکان اضافه کردن سندهای بیشتر را هم بدهد. در diff فعلی تب Catalog Elements هنوز placeholder است و تب Documents فقط از `auditProgramToEdit.documents` می‌خواند. هیچ اتصال مشخصی بین انتخاب catalog element و documents وجود ندارد.

Suggested fixes:

- منبع انتخاب catalog element پیاده‌سازی یا به کامپوننت موجود متصل شود.
- بعد از انتخاب catalog element، اسناد آن به مدل audit program تزریق یا با آن merge شود.
- هنگام اضافه کردن سندهای جدید، duplicateها کنترل شوند و اسناد catalog element از دست نروند.

Pseudo-code:

```js
const syncDocumentsFromCatalogElements = (catalogElements) => {
  const catalogDocuments = catalogElements.flatMap((item) => item.documents || []);
  auditProgramToEdit.value.documents = mergeUniqueById(
    auditProgramToEdit.value.documents,
    catalogDocuments,
  );
};
```

Alternative solutions:

- اگر تب Catalog Elements در PBI دیگری تکمیل می‌شود، این PR باید واضحا documents behavior را به همان dependency محدود کند و تب فعلی را کامل اعلام نکند.

Personal notes:

این مورد مستقیما با acceptance behavior توضیح داده‌شده در PR درگیر است، پس صرف وجود UI کافی نیست.

### PR-004

- Status: Planned
- Severity: P2
- Post or keep internal: Post

Deep Persian reasoning:

ترتیب enum وضعیت‌ها با لیست labelها یکی نیست. `EnumOneBased('started', 'notStarted', 'completed')` باعث می‌شود `started=1` و `notStarted=2` شود، اما لیست statusها key 1 را Not started و key 2 را Started نشان می‌دهد. نتیجه این است که label و icon می‌توانند برای یک status متفاوت باشند.

Suggested fixes:

- ترتیب enum با لیست statusها یکسان شود.
- بهتر است label و icon از یک ساختار واحد ساخته شوند تا این mismatch دوباره رخ ندهد.

Pseudo-code:

```js
const auditStatus = computed(() =>
  EnumOneBased('notStarted', 'started', 'completed'),
);
```

Alternative solutions:

- یک آرایه status واحد تعریف شود و هم enum lookup و هم select items از همان ساخته شوند.

Personal notes:

این bug داده را خراب نمی‌کند، اما UI status را گمراه‌کننده نشان می‌دهد و بهتر است قبل از merge اصلاح شود.
