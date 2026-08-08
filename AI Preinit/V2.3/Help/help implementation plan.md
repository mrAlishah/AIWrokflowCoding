برای ساخت راهنمای استفاده از این سیستم، این مسیر را پیشنهاد می‌کنم:

## قدم‌ها

1. **تعریف مخاطب**
   مشخص کن راهنما برای چه کسی است:
   - کاربر عادی که فقط prompt اجرا می‌کند
   - agent/operator که با skillها کار می‌کند
   - توسعه‌دهنده‌ای که می‌خواهد skill یا governance را نگهداری کند

2. **تعریف هدف راهنما**
   مثلا:
   - «چطور یک PBI را اجرا کنم؟»
   - «چطور review بگیرم؟»
   - «چطور policy update انجام بدهم؟»
   - «چطور health check بگیرم؟»

3. **شروع با Runtime Path**
   اول راهنما باید بگوید مسیر استاندارد همیشه این است:

   ```text
   AGENTS.md or CLAUDE.md
   -> docs/ai/START_HERE.md
   -> docs/ai/skills/README.md
   -> selected skill only
   ```

4. **معرفی مفهوم Skill**
   توضیح بده که هر کار باید با این قالب شروع شود:

   ```text
   Use skill: skill_name

   Parameters:

   PARAMETER_NAME:
   value

   Task:
   concrete task
   ```

5. **دسته‌بندی workflowها**
   راهنما را به بخش‌های اصلی تقسیم کن:
   - PBI Workflow
   - Review Workflow
   - PR Review Workflow
   - Tools Workflow
   - Reference / Guides / Prompts

6. **برای هر workflow یک مسیر ساده بنویس**
   مثلا برای PBI:

   ```text
   pbi_clarification
   -> pbi_workspace_create
   -> pbi_plan_create
   -> pbi_implementation_phase
   -> pbi_review_phase
   -> pbi_fix_phase if needed
   -> pbi_final_handoff
   ```

7. **برای هر skill یک مثال آماده بده**
   مثال باید قابل اجرا باشد، نه توضیحی:

   ```text
   Use skill: pbi_plan_create

   Parameters:

   PBI_ID:
   STP-1234

   PLANNING_DEPTH:
   light

   Task:
   Create an implementation plan for this PBI.
   ```

8. **قوانین مهم را کوتاه اضافه کن**
   فقط guardrailهای ضروری:
   - یک skill در هر اجرا
   - source code فقط وقتی skill اجازه دهد
   - review فقط local git diff
   - repo-context فقط با `tools_repo_context_update`
   - `docs/ai/reference/**` runtime نیست

9. **بخش خطاهای رایج اضافه کن**
   مثل:
   - خواندن همه docs
   - اجرای چند skill با هم
   - تغییر source در review-only task
   - استفاده از prompt بدون پارامتر واضح

10. **بخش “کدام skill را انتخاب کنم؟” بساز**
    یک جدول تصمیم‌گیری ساده:

| اگر می‌خواهی...           | استفاده کن                  |
| ------------------------- | --------------------------- |
| PBI خام را شفاف کنی       | `pbi_clarification`         |
| workspace بسازی           | `pbi_workspace_create`      |
| plan بسازی                | `pbi_plan_create`           |
| code review بگیری         | `pr_review_workflow`        |
| repo-context را آپدیت کنی | `tools_repo_context_update` |
| health check بگیری        | `tools_system_health_check` |

11. **در پایان checklist بده**
    قبل از اجرا:

- آیا skill مشخص است؟
- آیا parameters کامل است؟
- آیا task دقیق است؟
- آیا workflow اجازه تغییر فایل را می‌دهد؟
- آیا خروجی مورد انتظار معلوم است؟

## ساختار پیشنهادی راهنما

```markdown
# راهنمای استفاده از V2 AI Operating System

## هدف

## مسیر اجرای روزانه

## مفهوم Skill

## قالب استاندارد Prompt

## انتخاب Skill مناسب

## PBI Workflow

## Review Workflow

## PR Review Workflow

## Tools Workflow

## قوانین مهم

## مثال‌های آماده اجرا

## خطاهای رایج

## Checklist قبل از اجرا
```

پیشنهاد من این است که اول یک **راهنمای کاربر عمومی** بسازی، بعد برای هر workflow یک راهنمای جداگانه کوتاه‌تر.
