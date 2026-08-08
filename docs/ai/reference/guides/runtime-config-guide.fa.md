# راهنمای Runtime Config

## هدف

این راهنما برای کاربری نوشته شده که با `runtime-config.yaml` آشنا نیست و می‌خواهد بداند هر گزینه چه معنی دارد، چه زمانی باید تغییر کند و روی رفتار agent چه اثری می‌گذارد.

`runtime-config.yaml` مثل تنظیمات رانندگی برای agent است. این فایل نمی‌گوید agent چه skillای اجرا کند و اجازه تغییر source code هم نمی‌دهد. فقط به agent می‌گوید هنگام اجرای skill انتخاب‌شده چقدر context بخواند، خروجی terminal را چطور خلاصه کند، از RTK استفاده کند یا نه، و metrics/observability بنویسد یا نه.

## فایل‌های Config

| فایل | نقش | چه زمانی استفاده می‌شود |
|---|---|---|
| `docs/ai/config/runtime-config.yaml` | config فعال | فقط همین فایل در runtime خوانده می‌شود. |
| `docs/ai/config/runtime-config.low_cost.yaml` | preset کم‌هزینه | وقتی سرعت و هزینه کم مهم‌تر از تحلیل عمیق است. |
| `docs/ai/config/runtime-config.balanced.yaml` | preset متعادل | برای استفاده حرفه‌ای روزمره. |
| `docs/ai/config/runtime-config.deep_review.yaml` | preset review عمیق | برای review پیچیده، معماری، audit یا maintenance. |
| `docs/ai/config/README.md` | توضیح پوشه config | برای فهم ساختار configها. |

نکته مهم: presetها خودشان فعال نیستند. برای فعال کردن یک preset باید محتوای آن را داخل `runtime-config.yaml` کپی کنی.

## قانون طلایی

runtime config فقط preference است، نه permission.

یعنی:

- اگر skill اجازه تغییر source code ندهد، config هم این اجازه را نمی‌دهد.
- اگر review-only task است، config اجازه fix کردن کد را نمی‌دهد.
- اگر `reference_docs: true` شود، باز هم reference docs فقط وقتی خوانده می‌شوند که task و governance اجازه بدهند.
- اگر `deep_review` فعال شود، agent هنوز نباید کل repository را بی‌دلیل بخواند.

## Config فعال فعلی

```yaml
version: 1

runtime:
  rtk: true

context:
  mode: conservative
  reference_docs: false
  repo_context: on_demand
  source_reading: exact_only
  diff_first: true
  prefer_existing_summaries: true
  broad_scan: false
  extra_file_justification: true
  context_expansion_notice: true
  final_response_detail: concise

terminal:
  output:
    prefer_summary: true
    raw_output_on_error: true
    raw_output_when_requested: true
    summarize_success_output: true

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

## ساختار کلی YAML

| بخش | کار ساده‌ای که انجام می‌دهد | روی چه چیزی اثر می‌گذارد |
|---|---|---|
| `version` | نسخه schema فایل config | validation و سازگاری config |
| `runtime` | تنظیم ابزارهای runtime مثل RTK | شکل اجرای بعضی commandها |
| `context` | تنظیم مقدار و نوع context خوانده‌شده | token cost، دقت تحلیل، تعداد فایل‌های خوانده‌شده |
| `terminal` | تنظیم مقدار خروجی commandها | شلوغی یا خلاصه بودن خروجی terminal |
| `observability` | تنظیم metrics و گزارش‌های اجرایی | فایل‌های metrics، dashboardها، final response |

## version

```yaml
version: 1
```

| مقدار | معنی | چه زمانی تغییر کند |
|---|---|---|
| `1` | نسخه فعلی schema runtime config | فعلاً تغییر نده. |

این عدد برای validation است. اگر در آینده schema تغییر کند ممکن است نسخه جدید تعریف شود. در V2.3 مقدار درست `1` است.

## runtime.rtk

```yaml
runtime:
  rtk: true
```

RTK یک ابزار اختیاری برای کم کردن خروجی شلوغ terminal است. مثلاً خروجی طولانی `git diff` یا testها را قابل‌خواندن‌تر می‌کند.

| مقدار | معنی | مناسب برای | اثر |
|---|---|---|---|
| `auto` | اگر RTK نصب و قابل استفاده بود، agent می‌تواند از آن استفاده کند. | حالت امن عمومی | اگر RTK نبود، command خام اجرا می‌شود. |
| `true` | agent ترجیح می‌دهد از RTK استفاده کند. | وقتی RTK نصب است و خروجی خلاصه‌تر می‌خواهی | commandهای شلوغ ممکن است با RTK اجرا شوند. |
| `false` | agent نباید از RTK استفاده کند. | وقتی خروجی خام کامل می‌خواهی یا RTK مشکل دارد | همه commandها raw اجرا می‌شوند. |

تفاوت `auto` و `true`:

- `auto`: استفاده از RTK مجاز است، اما اجباری نیست.
- `true`: agent باید RTK را ترجیح بدهد، ولی اگر RTK خراب یا در دسترس نبود، نباید workflow را متوقف کند.

## context.mode

```yaml
context:
  mode: conservative
```

این گزینه حالت کلی مصرف context را مشخص می‌کند.

| مقدار | معنی | چه زمانی استفاده شود | اثر روی هزینه و کیفیت |
|---|---|---|---|
| `conservative` | کمترین خواندن context | کارهای ساده، اجرای یک skill مشخص، review کوچک | هزینه کمتر، ریسک کمتر برای خواندن فایل‌های اضافی |
| `balanced` | خواندن هدفمند بیشتر در صورت نیاز | استفاده حرفه‌ای روزمره | تعادل بین هزینه و کیفیت |
| `deep` | context گسترده‌تر ولی هنوز مرتبط با task | review پیچیده، audit، architecture-sensitive، maintenance | کیفیت و traceability بیشتر، هزینه بالاتر |

مثال ساده:

- اگر فقط می‌خواهی یک PBI plan سبک بسازی: `conservative`
- اگر می‌خواهی یک diff متوسط را دقیق review کنی: `balanced`
- اگر می‌خواهی AI OS را audit کنی یا معماری را بررسی کنی: `deep`

## context.reference_docs

```yaml
context:
  reference_docs: false
```

این گزینه مشخص می‌کند آیا `docs/ai/reference/**` به طور پیش‌فرض وارد context شود یا نه.

| مقدار | معنی | توصیه |
|---|---|---|
| `false` | reference docs در runtime عادی خوانده نمی‌شوند. | برای کارهای روزمره همین را نگه دار. |
| `true` | agent می‌تواند reference docs را راحت‌تر بخواند، اگر task اجازه دهد. | فقط برای آموزش، prompt/help maintenance، validation، history، decisions یا AI OS maintenance. |

تفاوت مهم:

- `false` یعنی agent برای اجرای PBI یا review عادی نباید راهنماها و promptهای آماده را بخواند.
- `true` به‌تنهایی اجازه خواندن همه referenceها را نمی‌دهد؛ هنوز task باید مرتبط باشد.

برای کارهای معمولی مقدار درست `false` است.

## context.repo_context

```yaml
context:
  repo_context: on_demand
```

`repo-context` دانش پایدار درباره repository است؛ مثل policyها، coding standards، workflow و اطلاعاتی که بین taskها قابل استفاده است.

| مقدار | معنی | چه زمانی مناسب است | مثال |
|---|---|---|---|
| `never` | repo-context خوانده نشود مگر skill صریحاً لازم بداند. | کمترین هزینه و کارهای خیلی محدود | فقط یک فایل مشخص را تغییر بده و policy لازم نیست. |
| `on_demand` | فقط وقتی دانش repo روی تصمیم اثر دارد خوانده شود. | حالت پیش‌فرض خوب برای بیشتر taskها | قبل از تغییر الگوی کدنویسی، coding standards خوانده شود. |
| `when_skill_requires` | وقتی skill گفته repo-context لازم است یا task به policy وابسته است خوانده شود. | وقتی می‌خواهی agent دقیقاً تابع skill باشد | skill ابزار repo-context update یا policy update اجرا می‌شود. |

تفاوت `on_demand` و `when_skill_requires`:

- `on_demand`: agent می‌تواند خودش تشخیص دهد repo-context برای کیفیت لازم است.
- `when_skill_requires`: agent محتاط‌تر است و بیشتر فقط وقتی skill یا task واضحاً لازم بداند repo-context را می‌خواند.

اگر مبتدی هستی، `on_demand` انتخاب خوبی است.

## context.source_reading

```yaml
context:
  source_reading: exact_only
```

این گزینه مشخص می‌کند agent چقدر آزاد است source fileها را بخواند.

| مقدار | معنی | چه زمانی مناسب است | ریسک/هزینه |
|---|---|---|---|
| `exact_only` | فقط فایل‌های دقیقاً لازم یا نام‌برده‌شده خوانده می‌شوند. | taskهای کوچک، review محدود، کمترین context cost | ممکن است برای مسائل پیچیده کافی نباشد. |
| `targeted` | چند فایل مرتبط مستقیم هم می‌تواند خوانده شود. | review متوسط، bugfix محدود، فهم وابستگی نزدیک | هزینه متوسط، کیفیت بهتر. |
| `expanded_when_needed` | context گسترده‌تر اما هنوز مرتبط با task مجاز است. | planning پیچیده، review عمیق، معماری، audit | هزینه بالاتر، traceability بهتر. |

تفاوت‌ها با مثال:

- `exact_only`: فقط `OrderService.cs` را بخوان چون task همان را نام برده.
- `targeted`: علاوه بر `OrderService.cs`، interface و test مستقیم آن را هم بخوان.
- `expanded_when_needed`: علاوه بر فایل‌های مستقیم، flowهای مرتبط، چند caller و policy مرتبط را هم بخوان اگر برای تصمیم لازم است.

این گزینه اجازه خواندن کل repo را نمی‌دهد. حتی `expanded_when_needed` هم باید task-relevant باشد.

## context.diff_first

```yaml
context:
  diff_first: true
```

این گزینه برای review مهم است.

| مقدار | معنی | اثر |
|---|---|---|
| `true` | در review ابتدا local git diff بررسی شود. | review سریع‌تر و دقیق‌تر روی تغییرات واقعی متمرکز می‌شود. |
| `false` | agent می‌تواند قبل از diff سراغ فایل‌های دیگر برود. | معمولاً برای V2 توصیه نمی‌شود. |

برای PR review یا local review مقدار خوب `true` است.

## context.prefer_existing_summaries

```yaml
context:
  prefer_existing_summaries: true
```

این گزینه می‌گوید agent قبل از خواندن source بیشتر، اول summaryها و markdown memory موجود را بررسی کند.

| مقدار | معنی | اثر |
|---|---|---|
| `true` | اول workspace summary، repo-context و markdownهای موجود خوانده شوند. | token cost کمتر و continuity بهتر. |
| `false` | agent سریع‌تر سراغ فایل‌های اصلی می‌رود. | ممکن است context بیشتری مصرف شود. |

برای سیستم markdown-based مقدار خوب `true` است.

## context.broad_scan

```yaml
context:
  broad_scan: false
```

`broad_scan` یعنی خواندن وسیع: همه docs، همه skills، همه workspaces یا کل repository.

| مقدار | معنی | توصیه |
|---|---|---|
| `false` | broad scan در حالت عادی ممنوع است. | پیش‌فرض درست برای کاهش هزینه و خطا. |
| `true` | broad scan راحت‌تر مجاز می‌شود. | فقط برای full audit، cleanup، validation یا maintenance صریح. |

اگر کاربر نگفته "full audit" یا "کل docs/ai را بررسی کن"، مقدار `false` باید حفظ شود.

## context.extra_file_justification

```yaml
context:
  extra_file_justification: true
```

این گزینه می‌گوید اگر agent خواست خارج از scope عادی فایل بخواند، باید دلیل بدهد.

| مقدار | معنی | اثر |
|---|---|---|
| `true` | agent باید قبل از خواندن فایل اضافه توضیح دهد چرا لازم است. | شفافیت و کنترل بیشتر. |
| `false` | agent بدون گزارش قبلی راحت‌تر context را گسترش می‌دهد. | سریع‌تر ولی کم‌شفاف‌تر. |

فرمت معمول توضیح:

```text
Requested File:
Reason:
Expected Decision Impact:
```

برای استفاده حرفه‌ای مقدار `true` بهتر است.

## context.context_expansion_notice

```yaml
context:
  context_expansion_notice: true
```

این گزینه می‌گوید اگر agent context را به شکل مهمی گسترش داد، باید به کاربر اطلاع دهد.

| مقدار | معنی | اثر |
|---|---|---|
| `true` | agent اعلام می‌کند چرا context بیشتری لازم شده. | کنترل و auditability بهتر. |
| `false` | agent ممکن است بدون notice context را بیشتر کند. | خروجی کوتاه‌تر ولی شفافیت کمتر. |

برای multi-agent professional usage مقدار `true` بهتر است.

## context.final_response_detail

```yaml
context:
  final_response_detail: concise
```

این گزینه سطح جزئیات پاسخ نهایی agent را تنظیم می‌کند.

| مقدار | معنی | چه زمانی مناسب است |
|---|---|---|
| `concise` | پاسخ کوتاه و high-signal | کارهای روزمره، low_cost، وقتی فقط نتیجه می‌خواهی. |
| `standard` | توضیح متوسط همراه با validation | استفاده عمومی حرفه‌ای. |
| `detailed` | توضیح کامل‌تر و traceability بیشتر | review عمیق، audit، تصمیمات حساس. |

اگر skill یا user final response format مشخص کرده باشد، آن format اولویت دارد.

## terminal.output.prefer_summary

```yaml
terminal:
  output:
    prefer_summary: true
```

| مقدار | معنی | اثر |
|---|---|---|
| `true` | agent خروجی command را خلاصه می‌کند، مگر raw output لازم باشد. | گفتگو تمیزتر و کوتاه‌تر. |
| `false` | agent بیشتر خروجی کامل را منتقل می‌کند. | مفید برای debugging دقیق، ولی شلوغ‌تر. |

## terminal.output.raw_output_on_error

```yaml
terminal:
  output:
    raw_output_on_error: true
```

| مقدار | معنی | اثر |
|---|---|---|
| `true` | اگر command خطا دهد و output برای تشخیص لازم باشد، raw output حفظ می‌شود. | debugging بهتر. |
| `false` | خطا هم ممکن است خلاصه شود. | کوتاه‌تر ولی ممکن است جزئیات مهم از دست برود. |

برای توسعه نرم‌افزار مقدار `true` بهتر است.

## terminal.output.raw_output_when_requested

```yaml
terminal:
  output:
    raw_output_when_requested: true
```

| مقدار | معنی | اثر |
|---|---|---|
| `true` | اگر کاربر بگوید "خروجی کامل را نشان بده"، agent باید raw output بدهد. | کنترل کاربر بیشتر. |
| `false` | حتی با درخواست کاربر هم ممکن است خلاصه شود. | معمولاً توصیه نمی‌شود. |

## terminal.output.summarize_success_output

```yaml
terminal:
  output:
    summarize_success_output: true
```

| مقدار | معنی | اثر |
|---|---|---|
| `true` | خروجی command موفق خلاصه می‌شود. | مناسب برای test/buildهای طولانی و موفق. |
| `false` | خروجی موفق کامل‌تر گزارش می‌شود. | مفید وقتی log کامل موفقیت مهم است. |

## observability.enabled

```yaml
observability:
  enabled: true
```

این master switch کل observability است.

| مقدار | معنی | اثر |
|---|---|---|
| `true` | observability فعال است. | metrics و statusها می‌توانند طبق زیرتنظیم‌ها نوشته شوند. |
| `false` | کل observability خاموش است. | metrics، dashboardها، final response metrics status و tool observability summary نوشته نمی‌شوند. |

اگر هدف `low_cost` است، `false` می‌تواند مناسب باشد.

## observability.metrics.enabled

```yaml
observability:
  metrics:
    enabled: true
```

این master switch مخصوص metrics است.

| مقدار | معنی | اثر |
|---|---|---|
| `true` | metrics فعال است، اگر `observability.enabled` هم true باشد. | local metrics و dashboardها طبق تنظیمات بعدی فعال می‌شوند. |
| `false` | metrics خاموش است. | metrics نوشته نمی‌شود، حتی اگر زیرتنظیم‌ها true باشند. |

اگر `observability.enabled: false` باشد، مقدار این گزینه دیگر عملاً اثری ندارد.

## observability.metrics.workspace_records

```yaml
observability:
  metrics:
    workspace_records: true
```

| مقدار | معنی | اثر |
|---|---|---|
| `true` | skillهای PBI و Review می‌توانند در workspace فایل `99-metrics.md` را آپدیت کنند. | history اجرایی هر workspace ثبت می‌شود. |
| `false` | local workspace metrics نوشته نمی‌شود. | فایل‌های workspace کمتر تغییر می‌کنند. |

## observability.metrics.central_dashboards

```yaml
observability:
  metrics:
    central_dashboards: true
```

| مقدار | معنی | اثر |
|---|---|---|
| `true` | dashboardهای مرکزی مثل `docs/ai/pbi/metrics.md` یا `docs/ai/reviews/metrics.md` می‌توانند آپدیت شوند. | دید کلی از metrics چند workspace ایجاد می‌شود. |
| `false` | dashboard مرکزی آپدیت نمی‌شود. | تغییرات کمتر، نگهداری ساده‌تر. |

این گزینه معمولاً وقتی معنی دارد که `workspace_records: true` هم فعال باشد.

## observability.metrics.final_response_status

```yaml
observability:
  metrics:
    final_response_status: true
```

| مقدار | معنی | اثر |
|---|---|---|
| `true` | final response می‌تواند خط `Metrics Updated:` داشته باشد. | کاربر می‌فهمد metrics آپدیت شده یا نه. |
| `false` | این status در پاسخ نهایی حذف یا غیرلازم می‌شود. | پاسخ نهایی کوتاه‌تر می‌شود. |

مقدارهای رایج در final response:

```text
Metrics Updated:
Yes
No - <reason>
Not Applicable - <reason>
```

## observability.metrics.tool_reports

```yaml
observability:
  metrics:
    tool_reports: true
```

| مقدار | معنی | اثر |
|---|---|---|
| `true` | tool skills مثل system health می‌توانند observability summary در report داشته باشند. | گزارش‌های maintenance کامل‌تر می‌شوند. |
| `false` | tool reports خلاصه‌تر و بدون observability summary اختیاری می‌شوند. | هزینه و حجم کمتر. |

## observability.metrics.exact_token_tracking

```yaml
observability:
  metrics:
    exact_token_tracking: false
```

این گزینه باید همیشه `false` باشد.

| مقدار | معنی |
|---|---|
| `false` | V2 از exact token tracking استفاده نمی‌کند. |

مقدار `true` مجاز نیست. این سیستم از تخمین، سطح هزینه و summary استفاده می‌کند، نه محاسبه دقیق token.

## observability.metrics.external_telemetry

```yaml
observability:
  metrics:
    external_telemetry: false
```

این گزینه باید همیشه `false` باشد.

| مقدار | معنی |
|---|---|
| `false` | metrics به سیستم telemetry خارجی ارسال نمی‌شود. |

مقدار `true` مجاز نیست. V2 باید markdown-based و local بماند.

## مقایسه Presetها

| Preset | context.mode | repo_context | source_reading | observability | final_response_detail | مناسب برای |
|---|---|---|---|---|---|---|
| `low_cost` | `conservative` | `when_skill_requires` | `exact_only` | خاموش | `concise` | کمترین هزینه و کارهای ساده |
| `balanced` | `balanced` | `on_demand` | `targeted` | روشن | `standard` | استفاده حرفه‌ای روزمره |
| `deep_review` | `deep` | `on_demand` | `expanded_when_needed` | روشن | `detailed` | review پیچیده و maintenance |

## پیشنهاد انتخاب برای مبتدی

| اگر هدف تو این است | پیشنهاد |
|---|---|
| می‌خواهی سریع و کم‌هزینه کار کنی | `low_cost` |
| نمی‌دانی کدام بهتر است | `balanced` |
| داری review معماری یا audit انجام می‌دهی | `deep_review` |
| می‌خواهی reference guide یا promptها را نگهداری کنی | `balanced` یا `deep_review` |
| می‌خواهی فقط یک فایل مشخص را اصلاح کنی | `low_cost` یا config فعال فعلی |

## مثال تغییرهای رایج

برای کم‌هزینه‌ترین حالت:

```yaml
context:
  mode: conservative
  repo_context: when_skill_requires
  source_reading: exact_only
  final_response_detail: concise

observability:
  enabled: false
```

برای review متعادل:

```yaml
context:
  mode: balanced
  repo_context: on_demand
  source_reading: targeted
  final_response_detail: standard
```

برای review عمیق:

```yaml
context:
  mode: deep
  repo_context: on_demand
  source_reading: expanded_when_needed
  final_response_detail: detailed
```

## چیزهایی که نباید تغییر بدهی مگر بدانی چرا

| گزینه | چرا با احتیاط تغییر کند |
|---|---|
| `context.reference_docs` | اگر اشتباه true شود، agent ممکن است برای کارهای عادی reference material اضافه بخواند. |
| `context.broad_scan` | اگر true شود، context cost و ریسک خواندن غیرضروری بالا می‌رود. |
| `exact_token_tracking` | در V2 باید false بماند. |
| `external_telemetry` | در V2 باید false بماند. |

## Governance مرجع

تعریف canonical مقدارهای مجاز و رفتار هر بخش اینجاست:

```text
docs/ai/skills/governance/runtime-config-schema.md
docs/ai/skills/governance/context-management.md
docs/ai/skills/governance/terminal-output-optimization.md
docs/ai/skills/governance/observability.md
```

## چه زمانی این راهنما را بخوانم

این راهنما را بخوان وقتی:

- می‌خواهی `runtime-config.yaml` را تغییر بدهی.
- نمی‌دانی `low_cost`، `balanced` یا `deep_review` کدام مناسب‌تر است.
- می‌خواهی بفهمی agent چرا فایل بیشتری خوانده یا چرا خروجی terminal را خلاصه کرده.
- می‌خواهی metrics یا final response status را روشن/خاموش کنی.
- در حال نگهداری AI OS reference docs هستی.

در runtime عادی PBI، review یا implementation این راهنما را نخوان، مگر اینکه کاربر صریحاً درباره runtime config سوال کرده باشد.
