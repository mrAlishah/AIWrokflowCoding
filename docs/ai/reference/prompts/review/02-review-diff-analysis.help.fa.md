> راهنمای فارسی برای استفاده کاربر نهایی. نام skillها، parameterها و optionها عمداً انگلیسی مانده‌اند تا با prompt اجرایی و skillهای canonical یکسان باشند.

# هدف

diff محلی git را بررسی می‌کند و فایل‌های تغییرکرده، تغییرات رفتاری، ریسک‌ها، شکاف‌های validation و فایل‌های نیازمند بررسی عمیق‌تر را مشخص می‌کند.

# پارامترها

| پارامتر | ضروری | توضیح |
|---|---|---|
| STP_ID | بله | شناسه review workspace. مثال: STP-123. |
| BASE_BRANCH | بله | branch پایه برای diff. مثال: main. |
| HEAD | اختیاری | ref مقصد. مقدار پیش‌فرض current branch است. مثال: HEAD. |
| REVIEW_SCOPE | بله | scope مربوط به review. مثال: full. |

# گزینه‌های پارامترها

## STP_ID

| گزینه | توضیح |
|---|---|
| گزینه‌های ثابت هنوز مستند نشده‌اند. | skill انتخاب‌شده گزینه ثابت مستند نکرده است. از مقدار نمونه استفاده کن یا metadata مربوط به skill را به‌روزرسانی کن. |

## BASE_BRANCH

| گزینه | توضیح |
|---|---|
| گزینه‌های ثابت هنوز مستند نشده‌اند. | skill انتخاب‌شده گزینه ثابت مستند نکرده است. از مقدار نمونه استفاده کن یا metadata مربوط به skill را به‌روزرسانی کن. |

## HEAD

| گزینه | توضیح |
|---|---|
| گزینه‌های ثابت هنوز مستند نشده‌اند. | skill انتخاب‌شده گزینه ثابت مستند نکرده است. از مقدار نمونه استفاده کن یا metadata مربوط به skill را به‌روزرسانی کن. |

## REVIEW_SCOPE

| گزینه | توضیح |
|---|---|
| full | همه بخش‌های تغییرکرده را review می‌کند. |
| backend-only | فقط تغییرات backend را review می‌کند. |
| frontend-only | فقط تغییرات frontend را review می‌کند. |
| tests-only | فقط testها را review می‌کند. |
| security-sensitive | review حساس به security. |
| architecture-sensitive | review حساس به architecture. |

# ورودی‌های لازم

- Existing review workspace
- Local git diff

# خروجی‌های مورد انتظار

- docs/ai/reviews/{STP_ID}/02-context.md
- docs/ai/reviews/{STP_ID}/03-diff-analysis.md
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
