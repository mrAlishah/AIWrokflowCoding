# هدف

گردش‌کار review سطح پایین‌تر را با `review_workspace_create` شروع می‌کند.

این prompt یک launcher است. review workspace را می‌سازد و prompt مرحله بعد را آماده می‌کند، اما همه review skillها را در یک اجرا انجام نمی‌دهد.

# پارامترها

| پارامتر | ضروری | توضیح |
|---|---|---|
| STP_ID | بله | شناسه review workspace. مثال: STP-123. |
| BASE_BRANCH | بله | branch پایه برای diff محلی. مثال: main. |
| HEAD_BRANCH | بله | branch تحت review. مثال: current branch. |
| REVIEW_SCOPE | بله | scope مربوط به review. مثال: full. |

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

# ورودی‌های لازم

- شناسه review workspace
- base branch
- head branch یا current branch

# خروجی‌های مورد انتظار

- placeholderهای review workspace
- prompt آماده مرحله بعد برای `review_diff_analysis`

# قوانین

| قانون | توضیح |
|---|---|
| یک skill | در این اجرا فقط `review_workspace_create` اجرا شود. |
| بدون تغییر source code | تغییر source code ممنوع است. |
| review محلی | review باید local و git-diff driven بماند. |
| بدون PR API | PR API صدا نزن، pull request نساز و push نکن. |

# خطاهای رایج

- اجرای همه review skillهای سطح پایین‌تر در یک launcher prompt.
- استفاده از review launcher وقتی `pr_review_workflow` گزینه بهتری است.
- درخواست fix کردن code از review workflow.

# نکته‌های بهینه‌سازی context

- برای review کامل روزانه از `pr_review_workflow` استفاده کن.
- فقط وقتی کنترل مرحله‌ای لازم داری از این launcher استفاده کن.
