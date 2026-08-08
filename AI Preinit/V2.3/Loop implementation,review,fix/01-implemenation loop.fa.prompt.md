با توجه به Skills تعریف‌شده در این repository و دستورالعمل‌های AGENTS.md، یک اجرای مرحله‌ای برای STP-8050 انجام بده.
Parameters:

PBI_ID:
STP-123

مبنای کار:
docs/ai/pbi/STP-8050/02-implementation-plan.md

Scope اجرا:

- phaseها را دقیقاً به ترتیب همین plan اجرا کن.
- از الگوها، naming، structure و استانداردهای موجود پروژه پیروی کن.
- بدون اجازه صریح من از npm run lint یا npx eslint استفاده نکن.

برای هر phase این loop را انجام بده:

1. Implementation
   - فقط تغییرات لازم همان phase را انجام بده.
   - از تغییرات غیرمرتبط، refactor اضافی، rename غیرضروری، یا تغییر behavior خارج از scope خودداری کن.
   - اگر phase به source/context بیشتری نیاز داشت، فقط فایل‌های دقیقاً مرتبط را بخوان.

2. Review
   - بعد از پیاده‌سازی همان phase، خودت تغییرات را review کن.
   - review باید bug، regression risk، mismatch با plan، ناسازگاری با الگوهای پروژه، و validation gap را بررسی کند.
   - اگر issue ضروری یا blocking وجود داشت، آن را واضح مشخص کن.

3. Fix
   - فقط موارد ضروری یا blocking را fix کن.
   - بعد از fix، همان بخش را دوباره review کن.
   - تا وقتی issue ضروری باقی مانده، وارد phase بعدی نشو.

این loop را تا پایان همه phaseهای 02-implementation-plan.md ادامه بده.

شرط پایان:

- همه phaseها اجرا شده باشند.
- review نهایی issue ضروری یا blocking نداشته باشد.
- implementation با plan و phase files هم‌خوان باشد.
- اگر تست یا build لازم بود ولی اجرا نشد، دلیلش را دقیق بگو.
- در پایان summary بده:
  - phaseهای انجام‌شده
  - فایل‌های تغییر کرده
  - موارد fix شده در review loop
  - validation انجام‌شده یا انجام‌نشده
  - ریسک‌های باقی‌مانده، اگر وجود دارد
