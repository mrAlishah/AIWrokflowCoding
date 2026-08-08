برای `tools_repo_context_update` شما عملاً دو سناریوی متفاوت دارید و بهتر است برای هرکدام Prompt مستقل داشته باشید؛ چون هدف، محدوده خواندن و هزینه Context متفاوت است.

---

## سناریو ۱: Initial Population

هدف:

```text id="9jxz3o"
ساخت اولیه repo-context برای شناخت ساختار Repository
```

ویژگی‌ها:

- معمولاً اولین اجرا روی Repository
- ممکن است چندین ماژول بررسی شوند
- خروجی، دانش پایه و پایدار Repository است
- هزینه Context بالاتر از حالت عادی قابل قبول است

پارامترهای پیشنهادی:

```text id="fndj7q"
UPDATE_REASON:
initial_population

REPOSITORY_AREAS:
repository-root

INSPECTION_SCOPE:
standard
```

# 01 - Repo Context Initial Population.prompt.md

Use skill: tools_repo_context_update

Parameters:

UPDATE_REASON:
initial_population

REPOSITORY_AREAS:
repository-root

INSPECTION_SCOPE:
standard

Task:

Create the initial stable reusable repository knowledge for this codebase.

Goal:

Establish the first version of the repo-context layer for future PBI planning, implementation, and review workflows.

Required outputs should populate or update:

- architecture.md
- module_map.md
- file_index.md
- codebase-index.md
- domain_glossary.md
- test_strategy.md
- workflow.md

Read strategy:

Start from the repository entry points and expand incrementally.

Before reading additional files or modules, explain why they are required.

Constraints:

- Do not read the entire repository recursively.
- Do not read all docs/ai.
- Do not read all skills.
- Do not modify source code.
- Do not change workflow behavior.
- Do not introduce V3 concepts.
- Preserve compatibility mappings.
- Report markdown changes.

Expected result:

Create a stable, reusable repository knowledge baseline optimized for low-token future execution.

---

## سناریو ۲: Incremental Update

هدف:

```text id="w8n2jr"
به‌روزرسانی repo-context پس از تغییرات تیم
```

ویژگی‌ها:

- حالت روزمره
- فقط نواحی مشخص بررسی می‌شوند
- تمرکز بر تغییرات پایدار و قابل استفاده مجدد
- کمترین هزینه Context

پارامترهای پیشنهادی:

```text id="z0qk4v"
UPDATE_REASON:
architecture_changed / files_changed

REPOSITORY_AREAS:
module:settings
workflow:audit-log

INSPECTION_SCOPE:
targeted
```

# 02 - Repo Context Incremental Update.prompt.md

Use skill: tools_repo_context_update

Parameters:

UPDATE_REASON:
architecture_changed / test_strategy_changed / files_changed

REPOSITORY_AREAS:

module:settings
workflow:audit-log

INSPECTION_SCOPE:
targeted

Task:

Refresh stable reusable repo-context knowledge only for the listed repository areas.

Update repository knowledge only when changes affect future AI execution quality.

Required read path:

1. AGENTS.md or CLAUDE.md
2. docs/ai/START_HERE.md
3. docs/ai/skills/README.md
4. Selected skill only: tools_repo_context_update
5. Existing repo-context only when needed
6. Exact source files only when needed

Constraints:

- Do not read unrelated modules.
- Do not read the entire repository.
- Do not read all docs/ai.
- Do not read all skills.
- Before reading extra files, explain why.
- Do not modify source code.
- Do not change workflow behavior.
- Do not introduce V3 concepts.
- Preserve compatibility mappings.
- Report markdown changes.

Expected updates:

- docs/ai/repo-context/\*
- docs/ai/repo-context/policy/\* when relevant

Final response format:

- Summary
- Source areas inspected
- Repo-context files updated
- Markdown Files Changed
- Recommended next action

---

## تفاوت دو سناریو

| پارامتر            | Initial Population   | Incremental Update                       |
| ------------------ | -------------------- | ---------------------------------------- |
| هدف                | ساخت دانش پایه       | به‌روزرسانی دانش موجود                   |
| زمان اجرا          | یک‌بار یا به‌ندرت    | مداوم                                    |
| `UPDATE_REASON`    | `initial_population` | `architecture_changed` / `files_changed` |
| `REPOSITORY_AREAS` | `repository-root`    | `module:*` / `workflow:*`                |
| `INSPECTION_SCOPE` | `standard`           | `targeted`                               |
| هزینه Context      | متوسط                | پایین                                    |
| خروجی              | ساخت فایل‌های پایه   | اصلاح فایل‌های موجود                     |

قاعده ساده:

```text id="pz31t9"
اگر هدف شناخت Repository است → Initial Population

اگر هدف همگام‌سازی با تغییرات تیم است → Incremental Update
```
