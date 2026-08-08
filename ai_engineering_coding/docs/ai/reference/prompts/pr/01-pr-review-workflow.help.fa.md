> راهنمای فارسی برای استفاده کاربر نهایی. نام skillها، parameterها و optionها عمداً انگلیسی مانده‌اند تا با prompt اجرایی و skillهای canonical یکسان باشند.

# هدف

گردش‌کار کامل review محلی PR/code را اجرا می‌کند.

# پارامترها

| پارامتر | ضروری | توضیح |
|---|---|---|
| STP_ID | بله | شناسه review workspace. مثال: STP-123. |
| BASE_BRANCH | بله | branch پایه برای diff محلی. مثال: main. |
| CURRENT_BRANCH | اختیاری | branch مقصد. مقدار پیش‌فرض current branch است. مثال: current branch. |
| REVIEW_SCOPE | بله | scope مربوط به review. مثال: full. |
| REVIEW_MODE | اختیاری | سطح سخت‌گیری review. مثال: strict. |
| COMMENT_LEVEL | اختیاری | سطح comment. مثال: important-only. |
| COMMENT_STYLE | اختیاری | لحن comment. مثال: collaborative. |
| SUGGESTION_DEPTH | اختیاری | سطح جزئیات suggestion. مثال: normal. |
| FINAL_DECISION | اختیاری | تصمیم نهایی اولیه. مثال: needs-followup. |

# گزینه‌های پارامترها

## STP_ID

| گزینه | توضیح |
|---|---|
| گزینه‌های ثابت هنوز مستند نشده‌اند. | skill انتخاب‌شده گزینه ثابت مستند نکرده است. از مقدار نمونه استفاده کن یا metadata مربوط به skill را به‌روزرسانی کن. |

## BASE_BRANCH

| گزینه | توضیح |
|---|---|
| گزینه‌های ثابت هنوز مستند نشده‌اند. | skill انتخاب‌شده گزینه ثابت مستند نکرده است. از مقدار نمونه استفاده کن یا metadata مربوط به skill را به‌روزرسانی کن. |

## CURRENT_BRANCH

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

## REVIEW_MODE

| گزینه | توضیح |
|---|---|
| strict | review سخت‌گیرانه پیش‌فرض. |
| normal | review استاندارد. |

## COMMENT_LEVEL

| گزینه | توضیح |
|---|---|
| important-only | فقط findings مهم. |
| all-supported | همه findings پشتیبانی‌شده. |

## COMMENT_STYLE

| گزینه | توضیح |
|---|---|
| collaborative | متن‌نویسی collaborative پیش‌فرض. |
| direct | متن‌نویسی مستقیم‌تر. |

## SUGGESTION_DEPTH

| گزینه | توضیح |
|---|---|
| normal | جزئیات پیش‌فرض. |
| deep | suggestionهای با جزئیات بیشتر. |

## FINAL_DECISION

| گزینه | توضیح |
|---|---|
| needs-followup | پیش‌فرض وقتی ممکن است follow-up لازم باشد. |
| ready | بدون issue مسدودکننده. |
| blocked | review قابل تکمیل نیست. |

# ورودی‌های لازم

- Checked-out review branch
- Local git diff

# خروجی‌های مورد انتظار

- Review workspace
- Diff analysis
- PR-ready comments
- Internal suggestions
- Final handoff

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
