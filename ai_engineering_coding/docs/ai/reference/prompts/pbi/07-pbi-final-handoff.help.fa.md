> راهنمای فارسی برای استفاده کاربر نهایی. نام skillها، parameterها و optionها عمداً انگلیسی مانده‌اند تا با prompt اجرایی و skillهای canonical یکسان باشند.

# هدف

پس از تکمیل implementation، review، fixها و validation، handoff نهایی را ایجاد می‌کند.

# پارامترها

| پارامتر | ضروری | توضیح |
|---|---|---|
| STP_ID | بله | شناسه workspace هدف PBI. مثال: STP-123. |
| CHANGED_FILES | بله | فایل‌های تغییرکرده نهایی. مثال: src/views/Settings/SettingsOverview.vue. |
| VALIDATION_RESULTS | بله | نتایج validation. مثال: Manual verification completed. |
| KNOWN_RISKS | اختیاری | ریسک‌های باقی‌مانده. مثال: No known runtime risks. |
| PR_SUMMARY | بله | خلاصه آماده PR. مثال: Adds audit-log filters. |
| REVIEW_FOCUS | بله | تمرکز reviewer. مثال: Verify filter behavior. |

# گزینه‌های پارامترها

## STP_ID

| گزینه | توضیح |
|---|---|
| گزینه‌های ثابت هنوز مستند نشده‌اند. | skill انتخاب‌شده گزینه ثابت مستند نکرده است. از مقدار نمونه استفاده کن یا metadata مربوط به skill را به‌روزرسانی کن. |

## CHANGED_FILES

| گزینه | توضیح |
|---|---|
| گزینه‌های ثابت هنوز مستند نشده‌اند. | skill انتخاب‌شده گزینه ثابت مستند نکرده است. از مقدار نمونه استفاده کن یا metadata مربوط به skill را به‌روزرسانی کن. |

## VALIDATION_RESULTS

| گزینه | توضیح |
|---|---|
| گزینه‌های ثابت هنوز مستند نشده‌اند. | skill انتخاب‌شده گزینه ثابت مستند نکرده است. از مقدار نمونه استفاده کن یا metadata مربوط به skill را به‌روزرسانی کن. |

## KNOWN_RISKS

| گزینه | توضیح |
|---|---|
| گزینه‌های ثابت هنوز مستند نشده‌اند. | skill انتخاب‌شده گزینه ثابت مستند نکرده است. از مقدار نمونه استفاده کن یا metadata مربوط به skill را به‌روزرسانی کن. |

## PR_SUMMARY

| گزینه | توضیح |
|---|---|
| گزینه‌های ثابت هنوز مستند نشده‌اند. | skill انتخاب‌شده گزینه ثابت مستند نکرده است. از مقدار نمونه استفاده کن یا metadata مربوط به skill را به‌روزرسانی کن. |

## REVIEW_FOCUS

| گزینه | توضیح |
|---|---|
| گزینه‌های ثابت هنوز مستند نشده‌اند. | skill انتخاب‌شده گزینه ثابت مستند نکرده است. از مقدار نمونه استفاده کن یا metadata مربوط به skill را به‌روزرسانی کن. |

# ورودی‌های لازم

- Completed workspace and final diff summary

# خروجی‌های مورد انتظار

- docs/ai/pbi/{STP_ID}/06-handoff.md
- docs/ai/pbi/{STP_ID}/99-metrics.md

# قوانین

| قانون | توضیح |
|---|---|
| فقط skill انتخاب‌شده | بعد از START_HERE و skill index فقط skill انتخاب‌شده را بخوان. |
| بدون read گسترده | همه docs، همه skillها یا کل repository را نخوان. |
| گزارش‌دهی markdown | تغییرات markdown را با path، action، reason، summary و future AI context impact گزارش کن. |
| بدون تغییر source code | تغییر source code ممنوع است. |

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
