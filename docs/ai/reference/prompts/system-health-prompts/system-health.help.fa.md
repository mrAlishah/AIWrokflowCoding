> راهنمای فارسی برای استفاده کاربر نهایی. نام skillها، parameterها و optionها عمداً انگلیسی مانده‌اند تا با prompt اجرایی و skillهای canonical یکسان باشند.

# هدف

prompt کامل health check سیستم V2 AI Operating System را اجرا می‌کند.

# پارامترها

| پارامتر | ضروری | توضیح |
|---|---|---|
| CHECK_SCOPE | اختیاری | scope مربوط به audit. مثال: full. |
| CHECK_COMPATIBILITY | اختیاری | اینکه backward compatibility بررسی شود یا نه. مثال: true. |
| REPORT_MODE | اختیاری | حالت خروجی report. مثال: latest-and-history. |
| ANALYSIS_DEPTH | اختیاری | عمق تحلیل. مثال: deep. |

# گزینه‌های پارامترها

## CHECK_SCOPE

| گزینه | توضیح |
|---|---|
| runtime-only | فقط runtime routing و skillهای فعال را بررسی می‌کند. |
| foundation-only | فقط historical foundation material را بررسی می‌کند. |
| full | health check کامل AI OS. |

## CHECK_COMPATIBILITY

| گزینه | توضیح |
|---|---|
| true | فعال. |
| false | غیرفعال. |

## REPORT_MODE

| گزینه | توضیح |
|---|---|
| latest-only | فقط latest.md را می‌نویسد. |
| latest-and-history | latest.md و نسخه history تاریخ‌دار را می‌نویسد. |

## ANALYSIS_DEPTH

| گزینه | توضیح |
|---|---|
| standard | بررسی استاندارد سریع‌تر. |
| deep | validation دقیق‌تر. |

# ورودی‌های لازم

- Current docs/ai state
- No source code inspection

# خروجی‌های مورد انتظار

- docs/ai/reference/system-health/latest.md
- docs/ai/reference/system-health/history/YYYY-MM-DD.md

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
