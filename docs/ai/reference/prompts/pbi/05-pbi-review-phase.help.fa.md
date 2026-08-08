> راهنمای فارسی برای استفاده کاربر نهایی. نام skillها، parameterها و optionها عمداً انگلیسی مانده‌اند تا با prompt اجرایی و skillهای canonical یکسان باشند.

# هدف

کار پیاده‌سازی‌شده PBI را review می‌کند و بدون تغییر source code، ابتدا findings را برمی‌گرداند.

# پارامترها

| پارامتر | ضروری | توضیح |
|---|---|---|
| PBI_ID | بله | شناسه workspace هدف PBI. مثال: STP-123. |
| PHASE | بله | phase تحت review. مثال: phase-01. |
| DIFF_OR_CHANGED_FILES | بله | خلاصه diff یا فایل‌های تغییرکرده. مثال: src/views/Settings/SettingsOverview.vue. |
| REVIEW_MODE | اختیاری | سطح سخت‌گیری review. مثال: normal. |

# گزینه‌های پارامترها

## PBI_ID

| گزینه | توضیح |
|---|---|
| گزینه‌های ثابت هنوز مستند نشده‌اند. | skill انتخاب‌شده گزینه ثابت مستند نکرده است. از مقدار نمونه استفاده کن یا metadata مربوط به skill را به‌روزرسانی کن. |

## PHASE

| گزینه | توضیح |
|---|---|
| گزینه‌های ثابت هنوز مستند نشده‌اند. | skill انتخاب‌شده گزینه ثابت مستند نکرده است. از مقدار نمونه استفاده کن یا metadata مربوط به skill را به‌روزرسانی کن. |

## DIFF_OR_CHANGED_FILES

| گزینه | توضیح |
|---|---|
| گزینه‌های ثابت هنوز مستند نشده‌اند. | skill انتخاب‌شده گزینه ثابت مستند نکرده است. از مقدار نمونه استفاده کن یا metadata مربوط به skill را به‌روزرسانی کن. |

## REVIEW_MODE

| گزینه | توضیح |
|---|---|
| normal | review استاندارد. |
| strict | Stricter review. |

# ورودی‌های لازم

- Implementation diff or changed files

# خروجی‌های مورد انتظار

- PBI review notes when needed
- docs/ai/pbi/{PBI_ID}/05-validation.md
- docs/ai/pbi/{PBI_ID}/99-metrics.md

# قوانین

| قانون | توضیح |
|---|---|
| فقط skill انتخاب‌شده | بعد از START_HERE و skill index فقط skill انتخاب‌شده را بخوان. |
| بدون read گسترده | همه docs، همه skillها یا کل repository را نخوان. |
| گزارش‌دهی markdown | تغییرات markdown را با path، action، reason، summary و future AI context impact گزارش کن. |
| بدون تغییر source code | تغییر source code ممنوع است. |
| فقط local git diff | از local git diff استفاده کن و PR API صدا نزن. |

# خطاهای رایج

- بدون تغییر گذاشتن شناسه‌های نمونه.
- اجرای چند skill در یک prompt.
- استفاده از نام‌های invocation قدیمی.
- درخواست read گسترده context بدون دلیل.

# نکته‌های بهینه‌سازی context

- برای کارهای معمول از short prompt استفاده کن.
- مقدار parameterها را مشخص و کوتاه نگه دار.
- فقط skill انتخاب‌شده و active workspace را بخوان.
- فقط در صورت نیاز از repo-context استفاده کن.
