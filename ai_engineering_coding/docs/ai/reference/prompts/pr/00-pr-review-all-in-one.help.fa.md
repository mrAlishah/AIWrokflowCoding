# هدف

گردش‌کار کامل review محلی PR/code را از طریق `pr_review_workflow` اجرا می‌کند.

این all-in-one prompt پشتیبانی‌شده است، چون `pr_review_workflow` یک skill رسمی و واحد است که workflow کامل PR review را مالکیت می‌کند.

# پارامترها

| پارامتر | ضروری | توضیح |
|---|---|---|
| STP_ID | بله | شناسه review workspace. مثال: STP-123. |
| BASE_BRANCH | بله | branch پایه برای diff محلی. مثال: main. |
| CURRENT_BRANCH | اختیاری | branch مقصد. مقدار پیش‌فرض current branch است. |
| REVIEW_SCOPE | بله | scope مربوط به review. مثال: full. |
| REVIEW_MODE | اختیاری | سطح سخت‌گیری review. مقدار پیش‌فرض strict است. |
| COMMENT_LEVEL | اختیاری | سطح comment. مقدار پیش‌فرض important-only است. |
| COMMENT_STYLE | اختیاری | لحن comment. مقدار پیش‌فرض collaborative است. |
| SUGGESTION_DEPTH | اختیاری | سطح جزئیات suggestion. مقدار پیش‌فرض normal است. |
| FINAL_DECISION | اختیاری | تصمیم نهایی اولیه. مقدار پیش‌فرض needs-followup است. |

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

- branch آماده review
- local git diff

# خروجی‌های مورد انتظار

- review workspace
- diff analysis
- commentهای آماده PR
- suggestionهای داخلی
- final handoff

# قوانین

| قانون | توضیح |
|---|---|
| یک skill | فقط `pr_review_workflow` اجرا شود. |
| بدون تغییر source code | تغییر source code ممنوع است. |
| فقط local git diff | فقط از local git diff استفاده کن. |
| بدون PR API | PR API صدا نزن، pull request نساز و push نکن. |

# خطاهای رایج

- استفاده از launcherهای review سطح پایین‌تر وقتی review کامل روزانه لازم است.
- درخواست تغییر source code از review.
- صدا زدن PR API به‌جای استفاده از local diff.

# نکته‌های بهینه‌سازی context

- برای PR reviewهای معمول از short prompt استفاده کن.
- فقط وقتی برای کیفیت review لازم است فایل‌های تغییرکرده را بخوان.
