> راهنمای فارسی برای استفاده کاربر نهایی. نام skillها، parameterها و optionها عمداً انگلیسی مانده‌اند تا با prompt اجرایی و skillهای canonical یکسان باشند.

# هدف

مستندات reference کاربرمحور زیر `docs/ai/reference/` را به‌روزرسانی می‌کند تا کاربران بدون خواندن skill fileها بتوانند workflowهای V2 را بفهمند و اجرا کنند.

# پارامترها

| پارامتر | ضروری | توضیح |
|---|---|---|
| UPDATE_SCOPE | اختیاری | scope مربوط به reference update. مقدار پیش‌فرض `all` است. مثال: `prompts-only`. |
| AREA | اختیاری | ناحیه reference برای به‌روزرسانی. مقدار پیش‌فرض `all` است. مثال: `tools`. |
| CHANGE_REASON | بله | دلیل reference update. مثال: `skill created`. |
| SOURCE_OF_TRUTH | اختیاری | منبع استفاده‌شده برای هماهنگ‌سازی reference material. مقدار پیش‌فرض `skills-readme` است. مثال: `skill-files`. |

# گزینه‌های پارامترها

## UPDATE_SCOPE

| گزینه | توضیح |
|---|---|
| all | همه areaهای reference تحت تأثیر را به‌روزرسانی می‌کند. |
| guides-only | فقط guideها را به‌روزرسانی می‌کند. |
| prompts-only | فقط prompt fileها و prompt help را به‌روزرسانی می‌کند. |
| index-only | فقط indexهای reference را به‌روزرسانی می‌کند. |
| area-only | فقط یک area انتخاب‌شده را به‌روزرسانی می‌کند. |

## AREA

| گزینه | توضیح |
|---|---|
| pbi | reference material مربوط به PBI را به‌روزرسانی می‌کند. |
| pr | reference material مربوط به PR review را به‌روزرسانی می‌کند. |
| review | reference material مربوط به review سطح پایین‌تر را به‌روزرسانی می‌کند. |
| tools | reference material مربوط به tools را به‌روزرسانی می‌کند. |
| all | Update all affected areas. |

## CHANGE_REASON

| گزینه | توضیح |
|---|---|
| skill created | یک skill جدید اضافه شده است. |
| skill renamed | نام invocation یا file مربوط به skill تغییر کرده است. |
| workflow updated | stepهای workflow تغییر کرده‌اند. |
| parameters changed | parameterهای skill تغییر کرده‌اند. |
| health check finding | system health report به‌روزرسانی reference را پیشنهاد کرده است. |
| user feedback | کاربر دستورالعمل‌های reference را نامشخص تشخیص داده است. |

## SOURCE_OF_TRUTH

| گزینه | توضیح |
|---|---|
| skills-readme | از `docs/ai/skills/README.md` به‌عنوان index اصلی استفاده می‌کند. |
| skill-files | از selected skill fileها به‌عنوان منبع اصلی استفاده می‌کند. |
| system-health-report | از آخرین system health report به‌عنوان ورودی استفاده می‌کند. |
| manual-request | از درخواست صریح کاربر به‌عنوان ورودی استفاده می‌کند. |

# ورودی‌های لازم

- A clear `CHANGE_REASON`
- A selected `UPDATE_SCOPE`
- A selected `AREA`
- Current skill routing or selected skill files when prompts need parameter alignment

# خروجی‌های مورد انتظار

- Updated `docs/ai/reference/README.md` when affected
- Updated `docs/ai/reference/help-index.md` when affected
- Updated files under `docs/ai/reference/guides/` when affected
- Updated files under `docs/ai/reference/prompts/` when affected
- Markdown Files Changed report

# قوانین

| قانون | توضیح |
|---|---|
| فقط reference | Update only allowed files under `docs/ai/reference/`. |
| غیر runtime | مستندات reference را خارج از مسیرهای runtime عادی نگه دار. |
| بدون تغییر source code | source code را تغییر نده. |
| بدون تغییر workflow | رفتار runtime workflow را تغییر نده. |
| بدون rename کردن skill | skillها را rename نکن و compatibility mappingها را حذف نکن. |
| Prompt Usability | promptها باید فقط با تغییر مقدار parameterها قابل اجرا باشند. |
| Source Of Truth | از skill fileها و `docs/ai/skills/README.md` استفاده کن؛ parameter یا option اختراع نکن. |

# خطاهای رایج

- تغییر رفتار runtime skill هنگام بهبود reference docs.
- اختراع optionهایی که در skill انتخاب‌شده مستند نشده‌اند.
- خواندن همه skillها وقتی update هدفمند یک area کافی است.
- بازنویسی محتوای historical یا system-health report.

# نکته‌های بهینه‌سازی context

- برای update هدفمند از `UPDATE_SCOPE: area-only` و یک `AREA` مشخص استفاده کن.
- فقط وقتی جزئیات parameter لازم است از `SOURCE_OF_TRUTH: skill-files` استفاده کن.
- همه skillها را نخوان مگر اینکه `UPDATE_SCOPE: all` و `AREA: all` باشد.
- فقط reference fileهای تحت تأثیر را بخوان.
