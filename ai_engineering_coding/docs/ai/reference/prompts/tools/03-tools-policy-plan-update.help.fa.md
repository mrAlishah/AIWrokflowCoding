> راهنمای فارسی برای استفاده کاربر نهایی. نام skillها، parameterها و optionها عمداً انگلیسی مانده‌اند تا با prompt اجرایی و skillهای canonical یکسان باشند.

# هدف

ورودی tagشده کاربر را دسته‌بندی می‌کند و فقط فایل‌های مرتبط planning، RF یا policy تأییدشده را به‌روزرسانی می‌کند.

# پارامترها

| پارامتر | ضروری | توضیح |
|---|---|---|
| SCOPE | بله | scope مربوط به update. مثال: pbi. |
| STP_ID | بله | شناسه workspace برای به‌روزرسانی‌های workspace. مثال: STP-123. |
| INPUT_TAG | بله | نوع ورودی کاربر. مثال: USER_REVIEW_FEEDBACK. |
| UPDATE_MODE | اختیاری | نحوه اعمال ورودی tagشده. مثال: apply-workspace-update. |
| USER_INPUT | بله | ورودی tagشده کاربر. مثال: Mark RF-001 as Required and keep RF-002 as Proposed. |

# گزینه‌های پارامترها

## SCOPE

| گزینه | توضیح |
|---|---|
| pbi | Update PBI planning or RF files. |
| review | Update review planning files. |
| repo-context | Update repo-context related planning. |
| global | به‌روزرسانی global policy تأییدشده را اعمال می‌کند. |

## STP_ID

| گزینه | توضیح |
|---|---|
| گزینه‌های ثابت هنوز مستند نشده‌اند. | skill انتخاب‌شده گزینه ثابت مستند نکرده است. از مقدار نمونه استفاده کن یا metadata مربوط به skill را به‌روزرسانی کن. |

## INPUT_TAG

| گزینه | توضیح |
|---|---|
| USER_REVIEW_FEEDBACK | feedback انسانی review یا تغییر وضعیت RF. |
| USER_CODE_POLICY | ورودی code policy تأییدشده. |

## UPDATE_MODE

| گزینه | توضیح |
|---|---|
| apply-workspace-update | روی فایل‌های workspace مرتبط اعمال می‌کند. |
| apply-global-rule | rule مربوط به global policy تأییدشده را اعمال می‌کند. |

## USER_INPUT

| گزینه | توضیح |
|---|---|
| گزینه‌های ثابت هنوز مستند نشده‌اند. | skill انتخاب‌شده گزینه ثابت مستند نکرده است. از مقدار نمونه استفاده کن یا metadata مربوط به skill را به‌روزرسانی کن. |

# ورودی‌های لازم

- Active workspace, RF files, or policy files depending on scope

# خروجی‌های مورد انتظار

- Related PBI planning files
- Related review feedback files
- docs/ai/repo-context/policy/code-policies.md when SCOPE is global

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
