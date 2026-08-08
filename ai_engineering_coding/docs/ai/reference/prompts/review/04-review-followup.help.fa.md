> راهنمای فارسی برای استفاده کاربر نهایی. نام skillها، parameterها و optionها عمداً انگلیسی مانده‌اند تا با prompt اجرایی و skillهای canonical یکسان باشند.

# هدف

follow-up diff را بررسی می‌کند، فقط commentهای تأییدشده را done علامت می‌زند و commentهای حل‌نشده را planned نگه می‌دارد.

# پارامترها

| پارامتر | ضروری | توضیح |
|---|---|---|
| STP_ID | بله | شناسه review workspace. مثال: STP-123. |
| BASE_BRANCH | بله | branch پایه برای follow-up diff. مثال: main. |
| CURRENT_HEAD | اختیاری | ref فعلی head. مثال: HEAD. |
| FOLLOWUP_DIFF | اختیاری | منبع follow-up diff. مثال: از local git diff main...HEAD استفاده کن. |

# گزینه‌های پارامترها

## STP_ID

| گزینه | توضیح |
|---|---|
| گزینه‌های ثابت هنوز مستند نشده‌اند. | skill انتخاب‌شده گزینه ثابت مستند نکرده است. از مقدار نمونه استفاده کن یا metadata مربوط به skill را به‌روزرسانی کن. |

## BASE_BRANCH

| گزینه | توضیح |
|---|---|
| گزینه‌های ثابت هنوز مستند نشده‌اند. | skill انتخاب‌شده گزینه ثابت مستند نکرده است. از مقدار نمونه استفاده کن یا metadata مربوط به skill را به‌روزرسانی کن. |

## CURRENT_HEAD

| گزینه | توضیح |
|---|---|
| گزینه‌های ثابت هنوز مستند نشده‌اند. | skill انتخاب‌شده گزینه ثابت مستند نکرده است. از مقدار نمونه استفاده کن یا metadata مربوط به skill را به‌روزرسانی کن. |

## FOLLOWUP_DIFF

| گزینه | توضیح |
|---|---|
| گزینه‌های ثابت هنوز مستند نشده‌اند. | skill انتخاب‌شده گزینه ثابت مستند نکرده است. از مقدار نمونه استفاده کن یا metadata مربوط به skill را به‌روزرسانی کن. |

# ورودی‌های لازم

- Existing comments
- Follow-up diff

# خروجی‌های مورد انتظار

- docs/ai/reviews/{STP_ID}/04-en-pr-comments.md
- docs/ai/reviews/{STP_ID}/05-fa-pr-suggestions.md
- docs/ai/reviews/{STP_ID}/06-followup-log.md

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
