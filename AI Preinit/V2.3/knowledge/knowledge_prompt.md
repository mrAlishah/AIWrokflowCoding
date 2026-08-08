برای شروع بررسی عمیق یک subsystem، این‌طور درخواست بده:

```text
Use skill: tools_repo_context_update

Parameters:

UPDATE_REASON:
Deep inspection of <SubsystemName>

REPOSITORY_AREAS:
<مسیرها یا نام subsystem>

INSPECTION_SCOPE:
deep

Task:
Inspect the <SubsystemName> subsystem deeply.
Create or refresh:
docs/ai/repo-context/knowledges/knowledge_<SubsystemName>.md

Capture only stable reusable knowledge.
Do not modify source code.
Report markdown changes.
```

مثال برای i-doit:

```text
Use skill: tools_repo_context_update

Parameters:

UPDATE_REASON:
Deep inspection of i-doit integration

REPOSITORY_AREAS:
Web.Services/IdoitService.cs, Web.Services/ExternalServices, Web-Suite/DependencyInjection

INSPECTION_SCOPE:
deep

Task:
Inspect the IdoitIntegration subsystem deeply.
Create or refresh:
docs/ai/repo-context/knowledges/knowledge_IdoitIntegration.md

Capture stable architecture, flows, dependencies, constraints, entry points, and safe update guidance.
Do not modify source code.
Report markdown changes.
```

برای استفاده در کارهای بعدی، کافی است بنویسی:

```text
برای تغییر/بررسی subsystem IdoitIntegration،
ابتدا docs/ai/repo-context/knowledges/knowledge_IdoitIntegration.md را بخوان
و اگر دانش پایدار جدیدی کشف شد، با tools_repo_context_update آن را به‌روزرسانی کن.
```

| Concept                     | Definition                                   | Typical Use                                          |
| --------------------------- | -------------------------------------------- | ---------------------------------------------------- |
| `tools_repo_context_update` | مهارت ثبت و به‌روزرسانی دانش reusable پروژه. | ایجاد یا اصلاح فایل knowledge یک subsystem.          |
| `knowledge_<Name>.md`       | فایل دانش پایدار یک subsystem.               | جلوگیری از بررسی تکراری و حفظ تصمیم‌ها و محدودیت‌ها. |
