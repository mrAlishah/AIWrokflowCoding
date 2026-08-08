برای `tools_reference_update` بهتر است چند Prompt استاندارد داشته باشی؛ چون همیشه همه بخش‌های Reference تغییر نمی‌کنند.

## استفاده کامل (پس از Refactor یا تغییرات بزرگ)

```text
Use skill: tools_reference_update

Parameters:

UPDATE_SCOPE:
all

AREA:
all

CHANGE_REASON:
system refactor

SOURCE_OF_TRUTH:
skills-readme
```

### زمانی استفاده کن که:

- Skill جدید اضافه شده است.
- Skill حذف یا Rename شده است.
- Workflow تغییر کرده است.
- Naming Convention تغییر کرده است.
- Governance تغییر کرده است.
- ساختار `docs/ai` تغییر کرده است.
- Health Check پیشنهاد به‌روزرسانی داده است.

---

## فقط به‌روزرسانی Promptها

```text
Use skill: tools_reference_update

Parameters:

UPDATE_SCOPE:
prompts-only

AREA:
pbi

CHANGE_REASON:
skill parameters changed

SOURCE_OF_TRUTH:
skill-files
```

### زمانی استفاده کن که:

- پارامترهای Skill تغییر کرده‌اند.
- Promptها ابهام دارند.
- گزینه‌های جدید به پارامترها اضافه شده‌اند.

---

## فقط به‌روزرسانی Guideها

```text
Use skill: tools_reference_update

Parameters:

UPDATE_SCOPE:
guides-only

AREA:
review

CHANGE_REASON:
workflow updated

SOURCE_OF_TRUTH:
skill-files
```

### زمانی استفاده کن که:

- Workflow تغییر کرده است.
- فایل‌های خروجی تغییر کرده‌اند.
- راهنمای کاربر نیاز به بازنویسی دارد.

---

## فقط به‌روزرسانی Indexها

```text
Use skill: tools_reference_update

Parameters:

UPDATE_SCOPE:
index-only

AREA:
all

CHANGE_REASON:
new reference files created

SOURCE_OF_TRUTH:
manual-request
```

### زمانی استفاده کن که:

- فایل‌های جدید به `reference/` اضافه شده‌اند.
- ساختار پوشه‌ها تغییر کرده است.

---

## فقط یک Area مشخص

مثال برای PBI:

```text
Use skill: tools_reference_update

Parameters:

UPDATE_SCOPE:
area-only

AREA:
pbi

CHANGE_REASON:
health check finding

SOURCE_OF_TRUTH:
system-health-report
```

### زمانی استفاده کن که:

- فقط یک Area نیاز به اصلاح دارد.
- Health Check یک مشکل موضعی پیدا کرده است.

---

## چرخه پیشنهادی نگهداری

پس از هر تغییر در سیستم:

```text
Change
↓
tools_reference_update
↓
tools_system_health_check
↓
Commit
```

---

## قانون انتخاب SOURCE_OF_TRUTH

| مقدار                  | زمان استفاده                |
| ---------------------- | --------------------------- |
| `skills-readme`        | تغییرات ساختاری یا کلی      |
| `skill-files`          | تغییر پارامترها یا Workflow |
| `system-health-report` | اصلاح موارد گزارش‌شده       |
| `manual-request`       | درخواست مستقیم کاربر        |

---

## خروجی مورد انتظار

پس از اجرا، Skill باید:

- Guideها را به‌روزرسانی کند.
- Promptهای Full را اصلاح کند.
- Promptهای Short را اصلاح کند.
- Help فایل‌ها را تکمیل کند.
- Indexها را Sync کند.
- Parameter Optionها را مستندسازی کند.
- اطمینان دهد کاربر بدون خواندن Skill بتواند Prompt را اجرا کند.
