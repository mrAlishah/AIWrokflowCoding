> راهنمای فارسی برای استفاده کاربر نهایی. نام skillها، parameterها و optionها عمداً انگلیسی مانده‌اند تا با prompt اجرایی و skillهای canonical یکسان باشند.

# هدف

گردش‌کار کامل review محلی PR/code در V2.3 را از طریق skill `pr_review_workflow` اجرا می‌کند.

این prompt فقط مستندسازی تولید می‌کند و هرگز نباید source code را تغییر دهد.

# پارامترها

| پارامتر | ضروری | توضیح |
|---|---|---|
| STP_ID | بله | شناسه review workspace. مثال: STP-123. |
| BASE_BRANCH | بله | branch پایه برای diff محلی. مثال: main. |
| CURRENT_BRANCH | اختیاری | branch مقصد. مقدار پیش‌فرض current branch است. مثال: current branch. |
| REVIEW_SCOPE | بله | scope مربوط به review. مثال: full. |
| REVIEW_MODE | اختیاری | سطح سخت‌گیری review. مقدار پیش‌فرض strict است. مثال: strict. |
| COMMENT_LEVEL | اختیاری | سطح comment. مقدار پیش‌فرض important-only است. مثال: important-only. |
| COMMENT_STYLE | اختیاری | لحن comment. مقدار پیش‌فرض collaborative است. مثال: collaborative. |
| SUGGESTION_DEPTH | اختیاری | سطح جزئیات suggestion. مقدار پیش‌فرض normal است. مثال: normal. |
| FINAL_DECISION | اختیاری | تصمیم نهایی اولیه. مقدار پیش‌فرض needs-followup است. مثال: needs-followup. |

# گزینه‌های پارامترها

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
| یک skill | فقط `pr_review_workflow` را اجرا کن. |
| بدون تغییر source code | تغییر source code ممنوع است. |
| فقط local git diff | فقط از local git diff استفاده کن. |
| بدون PR API | PR API خارجی صدا نزن، pull request نساز و commit push نکن. |
| فقط context محلی لازم | فقط workspace، diff و فایل‌های تغییرکرده لازم را بخوان. |
| گزارش‌دهی markdown | تغییرات markdown را با path، action، reason، summary و future AI context impact گزارش کن. |

# خطاهای رایج

- اجرای دستی skillهای review سطح پایین‌تر داخل این prompt.
- استفاده از parameterهای غیرcanonical مانند `RISK_MODE`، `FOLLOWUP_MODE` یا `STOP_ON_BLOCKER`.
- درخواست از agent برای تغییر source code.
- صدا زدن PR API به‌جای استفاده از local diff.

# نکته‌های بهینه‌سازی context

- برای reviewهای معمول از short prompt استفاده کن.
- فقط skill انتخاب‌شده و review workspace را بخوان.
- فقط وقتی برای کیفیت review لازم است فایل‌های تغییرکرده را بررسی کن.
- از خواندن گسترده repository پرهیز کن.
