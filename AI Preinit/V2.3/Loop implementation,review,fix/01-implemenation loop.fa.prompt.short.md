برای STP-8050 طبق Skills و AGENTS.md یک implementation loop اجرا کن.

Parameters:

PBI_ID:
STP-123

مبنای کار:
docs/ai/pbi/STP-8050/02-implementation-plan.md

Phaseها را به ترتیب plan اجرا کن. برای هر phase:

1. فقط همان phase را پیاده‌سازی کن.
2. تغییرات همان phase را review کن.
3. اگر issue ضروری/blocking وجود داشت fix کن و دوباره review کن.
4. تا وقتی issue ضروری باقی مانده وارد phase بعدی نشو.

قواعد:

- از الگوها، naming و استانداردهای موجود پروژه پیروی کن.
- refactor، rename یا تغییر غیرمرتبط انجام نده.
- بدون اجازه صریح من npm run lint یا npx eslint اجرا نکن.
- source/context اضافی را فقط وقتی بخوان که برای همان phase لازم است.

در پایان باید همه phaseها انجام شده باشند و review نهایی issue ضروری نداشته باشد. summary شامل فایل‌های تغییرکرده، fixهای انجام‌شده، validation و ریسک‌های باقی‌مانده بده.
