> راهنمای فارسی برای استفاده کاربر نهایی. نام skillها، parameterها و optionها عمداً انگلیسی مانده‌اند تا با prompt اجرایی و skillهای canonical یکسان باشند.

# هدف

وضعیت نهایی review، دسته‌بندی issueها، تصمیم نهایی، validation و ریسک باقی‌مانده را خلاصه می‌کند.

# پارامترها

| پارامتر | ضروری | توضیح |
|---|---|---|
| STP_ID | بله | شناسه review workspace. مثال: STP-123. |
| FINAL_STATUS | بله | وضعیت نهایی review. مثال: needs-followup. |
| REMAINING_RISKS | اختیاری | ریسک‌های باقی‌مانده. مثال: No known remaining risks. |
| VALIDATION_PERFORMED | بله | validation انجام‌شده. مثال: Local diff review completed. |
| RECOMMENDED_DECISION | بله | تصمیم پیشنهادی. مثال: needs-followup. |

# گزینه‌های پارامترها

## STP_ID

| گزینه | توضیح |
|---|---|
| گزینه‌های ثابت هنوز مستند نشده‌اند. | skill انتخاب‌شده گزینه ثابت مستند نکرده است. از مقدار نمونه استفاده کن یا metadata مربوط به skill را به‌روزرسانی کن. |

## FINAL_STATUS

| گزینه | توضیح |
|---|---|
| ready | آماده ادامه است. |
| needs-followup | Needs follow-up. |
| blocked | مسدود شده است. |

## REMAINING_RISKS

| گزینه | توضیح |
|---|---|
| گزینه‌های ثابت هنوز مستند نشده‌اند. | skill انتخاب‌شده گزینه ثابت مستند نکرده است. از مقدار نمونه استفاده کن یا metadata مربوط به skill را به‌روزرسانی کن. |

## VALIDATION_PERFORMED

| گزینه | توضیح |
|---|---|
| گزینه‌های ثابت هنوز مستند نشده‌اند. | skill انتخاب‌شده گزینه ثابت مستند نکرده است. از مقدار نمونه استفاده کن یا metadata مربوط به skill را به‌روزرسانی کن. |

## RECOMMENDED_DECISION

| گزینه | توضیح |
|---|---|
| ready | آماده ادامه است. |
| needs-followup | Needs follow-up. |
| blocked | مسدود شده است. |

# ورودی‌های لازم

- Review analysis
- Comments and suggestions
- Follow-up log

# خروجی‌های مورد انتظار

- docs/ai/reviews/{STP_ID}/07-handoff.md
- docs/ai/reviews/{STP_ID}/99-metrics.md

# قوانین

| قانون | توضیح |
|---|---|
| بدون تغییر source code | تغییر source code ممنوع است. |
| فقط local git diff | فقط از local git diff استفاده کن. |
| بدون PR API | PR API خارجی صدا نزن، pull request نساز و commit push نکن. |
| فقط context محلی لازم | فقط workspace، diff و فایل‌های تغییرکرده لازم را بخوان. |
| گزارش‌دهی markdown | تغییرات markdown را با path، action، reason، summary و future AI context impact گزارش کن. |

# خطاهای رایج

- اجرای review روی branch اشتباه.
- درخواست از agent برای تغییر source code.
- صدا زدن PR API به‌جای استفاده از local diff.
- بدون تغییر گذاشتن شناسه‌های نمونه.

# نکته‌های بهینه‌سازی context

- برای reviewهای معمول از short prompt استفاده کن.
- فقط skill انتخاب‌شده و review workspace را بخوان.
- فقط وقتی برای کیفیت review لازم است فایل‌های تغییرکرده را بررسی کن.
- از خواندن گسترده repository پرهیز کن.
