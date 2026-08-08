> راهنمای فارسی برای استفاده کاربر نهایی. نام skillها، parameterها و optionها عمداً انگلیسی مانده‌اند تا با prompt اجرایی و skillهای canonical یکسان باشند.

# هدف

فقط fix تأییدشده را اعمال می‌کند، حافظه مرتبط را به‌روزرسانی می‌کند و verification درخواستی را اجرا می‌کند.

# پارامترها

| پارامتر | ضروری | توضیح |
|---|---|---|
| PBI_ID | بله | شناسه workspace هدف PBI. مثال: STP-123. |
| RF_ID | بله | آیتم RF یا finding لازم. مثال: RF-001. |
| TARGET_FILES | بله | target fileهای fix تأییدشده. مثال: src/views/Settings/SettingsOverview.vue. |
| VERIFICATION | بله | درخواست verification. مثال: Run targeted manual verification. Do not run npm lint unless explicitly requested. |

# گزینه‌های پارامترها

## PBI_ID

| گزینه | توضیح |
|---|---|
| گزینه‌های ثابت هنوز مستند نشده‌اند. | skill انتخاب‌شده گزینه ثابت مستند نکرده است. از مقدار نمونه استفاده کن یا metadata مربوط به skill را به‌روزرسانی کن. |

## RF_ID

| گزینه | توضیح |
|---|---|
| گزینه‌های ثابت هنوز مستند نشده‌اند. | skill انتخاب‌شده گزینه ثابت مستند نکرده است. از مقدار نمونه استفاده کن یا metadata مربوط به skill را به‌روزرسانی کن. |

## TARGET_FILES

| گزینه | توضیح |
|---|---|
| گزینه‌های ثابت هنوز مستند نشده‌اند. | skill انتخاب‌شده گزینه ثابت مستند نکرده است. از مقدار نمونه استفاده کن یا metadata مربوط به skill را به‌روزرسانی کن. |

## VERIFICATION

| گزینه | توضیح |
|---|---|
| گزینه‌های ثابت هنوز مستند نشده‌اند. | skill انتخاب‌شده گزینه ثابت مستند نکرده است. از مقدار نمونه استفاده کن یا metadata مربوط به skill را به‌روزرسانی کن. |

# ورودی‌های لازم

- Approved findings or RF item

# خروجی‌های مورد انتظار

- Approved target files
- Relevant phase or RF file
- docs/ai/pbi/{PBI_ID}/05-validation.md

# قوانین

| قانون | توضیح |
|---|---|
| فقط skill انتخاب‌شده | بعد از START_HERE و skill index فقط skill انتخاب‌شده را بخوان. |
| بدون read گسترده | همه docs، همه skillها یا کل repository را نخوان. |
| گزارش‌دهی markdown | تغییرات markdown را با path، action، reason، summary و future AI context impact گزارش کن. |
| تغییر source کنترل‌شده | ویرایش source فقط وقتی مجاز است که skill انتخاب‌شده اجازه دهد. |
| فقط scope تأییدشده | در محدوده target fileهای تأییدشده بمان. |

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
