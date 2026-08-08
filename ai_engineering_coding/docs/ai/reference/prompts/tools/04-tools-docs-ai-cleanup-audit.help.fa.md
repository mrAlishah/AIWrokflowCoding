> راهنمای فارسی برای استفاده کاربر نهایی. نام skillها، parameterها و optionها عمداً انگلیسی مانده‌اند تا با prompt اجرایی و skillهای canonical یکسان باشند.

# هدف

ناحیه هدف docs/ai را از نظر cleanup و ریسک context-cost بررسی می‌کند، بدون تغییر رفتار workflow فعال.

# پارامترها

| پارامتر | ضروری | توضیح |
|---|---|---|
| CLEANUP_SCOPE | بله | ناحیه docs برای audit. مثال: docs/ai/reference. |
| CLEANUP_MODE | بله | حالت cleanup. مثال: audit-only. |
| TARGET_AREA | بله | ناحیه هدف داخل cleanup scope. مثال: prompts. |
| MAX_INSPECTION_DEPTH | اختیاری | عمق inspection. مثال: standard. |
| INCLUDE_DONE_WORKSPACES | اختیاری | اینکه workspaceهای تکمیل‌شده بررسی شوند یا نه. مثال: false. |
| OUTPUT_MODE | بله | حالت خروجی. مثال: report. |
| ALLOW_MARKDOWN_UPDATES | اختیاری | اینکه markdown update مجاز باشد یا نه. مثال: false. |

# گزینه‌های پارامترها

## CLEANUP_SCOPE

| گزینه | توضیح |
|---|---|
| گزینه‌های ثابت هنوز مستند نشده‌اند. | skill انتخاب‌شده گزینه ثابت مستند نکرده است. از مقدار نمونه استفاده کن یا metadata مربوط به skill را به‌روزرسانی کن. |

## CLEANUP_MODE

| گزینه | توضیح |
|---|---|
| audit-only | فقط audit می‌کند و findings را گزارش می‌دهد. |

## TARGET_AREA

| گزینه | توضیح |
|---|---|
| گزینه‌های ثابت هنوز مستند نشده‌اند. | skill انتخاب‌شده گزینه ثابت مستند نکرده است. از مقدار نمونه استفاده کن یا metadata مربوط به skill را به‌روزرسانی کن. |

## MAX_INSPECTION_DEPTH

| گزینه | توضیح |
|---|---|
| standard | inspection هدفمند عادی. |
| deep | inspection با جزئیات بیشتر. |

## INCLUDE_DONE_WORKSPACES

| گزینه | توضیح |
|---|---|
| true | فعال. |
| false | غیرفعال. |

## OUTPUT_MODE

| گزینه | توضیح |
|---|---|
| report | یک audit report می‌نویسد. |
| plan | یک cleanup plan می‌نویسد. |

## ALLOW_MARKDOWN_UPDATES

| گزینه | توضیح |
|---|---|
| true | فعال. |
| false | غیرفعال. |

# ورودی‌های لازم

- Targeted docs/ai areas

# خروجی‌های مورد انتظار

- Cleanup report or cleanup plan under docs/ai/reference/history/foundation/

# قوانین

| قانون | توضیح |
|---|---|
| بدون تغییر source code | تغییر source code ممنوع است. |
| بدون تغییر workflow | رفتار runtime workflow باید بدون تغییر بماند. |
| context هدفمند | فقط skill انتخاب‌شده و docs یا فایل‌های هدفمند لازم را بخوان. |
| گزارش‌دهی markdown | تغییرات markdown را با path، action، reason، summary و future AI context impact گزارش کن. |

# خطاهای رایج

- استفاده از tools prompt برای تغییر رفتار runtime workflow.
- خواندن کل repository بدون دلیل هدفمند.
- بدون تغییر گذاشتن شناسه‌های نمونه.
- حذف compatibility mappingها.

# نکته‌های بهینه‌سازی context

- برای checkهای معمول از short prompt استفاده کن.
- health check کامل و عمیق را فقط بعد از تغییرات AI OS اجرا کن.
- reportها و reference material را خارج از runtime روزانه نگه دار.
- از inspection scopeهای هدفمند استفاده کن.
