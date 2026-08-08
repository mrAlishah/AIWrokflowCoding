> راهنمای فارسی برای استفاده کاربر نهایی. نام skillها، parameterها و optionها عمداً انگلیسی مانده‌اند تا با prompt اجرایی و skillهای canonical یکسان باشند.

# هدف

feedback انسانی را تحلیل می‌کند، commentهای هم‌پوشان را گروه‌بندی می‌کند و بدون fix کردن code، آیتم‌های RF می‌سازد.

# پارامترها

| پارامتر | ضروری | توضیح |
|---|---|---|
| PBI_ID | بله | شناسه workspace هدف PBI. مثال: STP-123. |
| INPUT_MODE | اختیاری | منبع feedback. مثال: prompt. |
| REVIEW_FEEDBACK | بله | متن feedback انسانی. مثال: Reviewer asked to extract filter options into a helper. |
| SOURCE_LABEL | اختیاری | برچسب traceability. مثال: PR review. |
| ANALYSIS_DEPTH | اختیاری | عمق تحلیل. مثال: standard. |
| DEFAULT_STATUS | اختیاری | وضعیت اولیه RF. مثال: Proposed. |

# گزینه‌های پارامترها

## PBI_ID

| گزینه | توضیح |
|---|---|
| گزینه‌های ثابت هنوز مستند نشده‌اند. | skill انتخاب‌شده گزینه ثابت مستند نکرده است. از مقدار نمونه استفاده کن یا metadata مربوط به skill را به‌روزرسانی کن. |

## INPUT_MODE

| گزینه | توضیح |
|---|---|
| prompt | feedback در REVIEW_FEEDBACK وارد می‌شود. |
| file | feedback از فایل می‌آید. |
| existing-review-feedback | از feedback موجود در workspace استفاده می‌کند. |

## REVIEW_FEEDBACK

| گزینه | توضیح |
|---|---|
| گزینه‌های ثابت هنوز مستند نشده‌اند. | skill انتخاب‌شده گزینه ثابت مستند نکرده است. از مقدار نمونه استفاده کن یا metadata مربوط به skill را به‌روزرسانی کن. |

## SOURCE_LABEL

| گزینه | توضیح |
|---|---|
| گزینه‌های ثابت هنوز مستند نشده‌اند. | skill انتخاب‌شده گزینه ثابت مستند نکرده است. از مقدار نمونه استفاده کن یا metadata مربوط به skill را به‌روزرسانی کن. |

## ANALYSIS_DEPTH

| گزینه | توضیح |
|---|---|
| standard | تحلیل عادی. |
| deep | گروه‌بندی عمیق‌تر موارد تکراری. |

## DEFAULT_STATUS

| گزینه | توضیح |
|---|---|
| Proposed | وضعیت پیش‌فرض RF جدید. |
| ضروری | صریحاً لازم است. |
| Ignored | صریحاً نادیده گرفته شده است. |
| Done | قبلاً انجام شده است. |
| Blocked | امکان ادامه وجود ندارد. |

# ورودی‌های لازم

- Existing PBI workspace
- Human feedback

# خروجی‌های مورد انتظار

- docs/ai/pbi/{PBI_ID}/phases/review-feedback.md
- docs/ai/pbi/{PBI_ID}/phases/RF-*.md
- docs/ai/pbi/{PBI_ID}/99-metrics.md

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
