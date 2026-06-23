# راهنمای Runtime Config

## هدف

این راهنما توضیح می‌دهد کاربر نهایی چطور باید `docs/ai/config/runtime-config.yaml` را بفهمد و استفاده کند.

runtime config یک فایل سبک و اختیاری برای تنظیم ترجیح‌های runtime است. این فایل skillها، workflowها، permissionها، review guardrailها، مالکیت repo-context یا markdown shared memory را تغییر نمی‌دهد.

## محل فایل config

```text
docs/ai/config/runtime-config.yaml
```

agent می‌تواند این فایل را بعد از `docs/ai/skills/README.md` فقط برای اعمال runtime tool preferences بخواند.

## ساختار فعلی

```yaml
version: 1

runtime:
  rtk: auto

observability:
  enabled: true
  metrics:
    enabled: true
    workspace_records: true
    central_dashboards: true
    final_response_status: true
    tool_reports: true
    exact_token_tracking: false
    external_telemetry: false
```

## تنظیم RTK

`runtime.rtk` بهینه‌سازی اختیاری خروجی terminal با RTK را کنترل می‌کند.

| مقدار | معنی |
|---|---|
| `auto` | اگر RTK نصب و در دسترس باشد، agent می‌تواند از آن استفاده کند. |
| `true` | اگر RTK در دسترس باشد، agent ترجیحاً از commandهای RTK-wrapped استفاده کند. |
| `false` | agent نباید از RTK استفاده کند. |

وقتی RTK فعال و در دسترس است، برای commandهای شلوغ از آن استفاده کن:

```text
rtk git status
rtk git diff BASE_BRANCH...HEAD
rtk git diff --name-only BASE_BRANCH...HEAD
rtk git log --oneline -20
rtk rg "pattern"
rtk dotnet test
```

وقتی RTK غیرفعال، نصب‌نشده، ناقص، یا خروجی raw دقیق لازم است، از command خام استفاده کن:

```text
git status
git diff BASE_BRANCH...HEAD
git diff --name-only BASE_BRANCH...HEAD
rg "pattern"
dotnet test
```

قانون canonical مربوط به RTK اینجاست:

```text
docs/ai/skills/governance/terminal-output-optimization.md
```

## تنظیم‌های Observability Metrics

`observability` مشخص می‌کند metricهای عملیاتی markdown-based برای AI OS فعال باشند یا نه و کدام خروجی‌های metric مجاز هستند.

| تنظیم | معنی |
|---|---|
| `observability.enabled: true` | تنظیمات observability را برای AI OS فعال می‌کند. |
| `metrics.enabled: true` | رفتار metricهای markdown-based را فعال می‌کند. |
| `workspace_records: true` | فایل‌های markdown مربوط به workspace می‌توانند metrics یا usage summary داشته باشند. |
| `central_dashboards: true` | dashboard یا summary مرکزی markdown فقط وقتی skill تأییدشده مالک آن است می‌تواند نگهداری شود. |
| `final_response_status: true` | final responseها می‌توانند status یا usage summary کوتاه داشته باشند، وقتی skill انتخاب‌شده آن را لازم بداند. |
| `tool_reports: true` | خروجی toolها مثل system-health report می‌تواند بخش metrics داشته باشد. |
| `exact_token_tracking: false` | exact token count نباید tracking یا الزام شود. |
| `external_telemetry: false` | metricها نباید به telemetry خارجی ارسال شوند. |

این تنظیم‌ها مدل کم‌هزینه و markdown-memory در V2 را حفظ می‌کنند، بدون اینکه telemetry خارجی اضافه شود.

## نحوه تغییر رفتار RTK

استفاده خودکار از RTK:

```yaml
runtime:
  rtk: auto
```

ترجیح دادن RTK وقتی در دسترس است:

```yaml
runtime:
  rtk: true
```

غیرفعال کردن RTK:

```yaml
runtime:
  rtk: false
```

## قوانین ایمنی

- runtime config اجازه خواندن docs یا source fileهای اضافه را نمی‌دهد.
- runtime config اجازه تغییر source code را نمی‌دهد.
- runtime config review-only guardrailها را ضعیف نمی‌کند.
- runtime config RTK را اجباری نمی‌کند.
- runtime config جایگزین markdown shared memory نیست.
- اگر RTK شکست خورد، از command خام استفاده کن و ادامه بده.

## چه زمانی این راهنما را بخوانم

این راهنما را بخوان وقتی:

- می‌خواهی `runtime.rtk` را بفهمی یا تغییر بدهی.
- می‌خواهی observability metric flagها را بفهمی.
- در حال نگهداری reference docs مربوط به AI OS هستی.
- system health report از تو خواسته رفتار runtime config را بررسی کنی.

در runtime عادی PBI، review یا implementation این راهنما را نخوان، مگر اینکه کاربر صریحاً درباره runtime config سوال کرده باشد.
