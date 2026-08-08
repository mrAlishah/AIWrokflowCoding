**Workflow Diagram**

```mermaid
flowchart TD
    A["User Request"] --> B["Read AGENTS.md or CLAUDE.md"]
    B --> C["Read docs/ai/START_HERE.md"]
    C --> D["Read docs/ai/skills/README.md"]
    D --> E{"Select exactly one skill"}

    E -->|Raw / unclear PBI| P1["pbi_clarification"]
    E -->|PBI workflow| P2["PBI skills"]
    E -->|Daily PR / code review| R1["pr_review_workflow"]
    E -->|Partial review task| R2["review_* skills"]
    E -->|Repo knowledge update| T1["tools_repo_context_update"]
    E -->|Policy / governance update| T2["tools_policy_plan_update"]
    E -->|System health audit| T3["tools_system_health_check"]
    E -->|Reference docs / guides / prompts| T4["tools_reference_update"]

    P2 --> P2A["pbi_workspace_create"]
    P2A --> P2B["pbi_plan_create"]
    P2B --> P2C["pbi_implementation_phase"]
    P2C --> P2D["pbi_review_phase"]
    P2D --> P2E{"Findings need fixes?"}
    P2E -->|Yes| P2F["pbi_fix_phase"]
    P2E -->|No| P2G["pbi_final_handoff"]
    P2F --> P2G

    R1 --> R1A["Read local git diff only"]
    R1A --> R1B["Analyze changed files"]
    R1B --> R1C["Return review findings"]
    R1C --> R1D["No source changes, no PR APIs, no push"]

    R2 --> R2A["review_workspace_create"]
    R2A --> R2B["review_diff_analysis"]
    R2B --> R2C["review_comments_create"]
    R2C --> R2D["review_followup or review_final_handoff"]

    T1 --> T1A["Update docs/ai/repo-context only"]
    T2 --> T2A["Update approved policy/governance files only"]
    T3 --> T3A["Write system health report"]
    T4 --> T4A["Update non-runtime reference docs"]

    P1 --> X["Final Response"]
    P2G --> X
    R1D --> X
    R2D --> X
    T1A --> X
    T2A --> X
    T3A --> X
    T4A --> X

    subgraph RuntimeRules["Runtime Rules"]
        G1["Read selected skill only"]
        G2["Read active workspace only if required"]
        G3["Read repo-context only if needed"]
        G4["Read exact source files only if needed"]
        G5["Do not read docs/ai/reference by default"]
    end

    D -.-> RuntimeRules
```

خلاصه عملی استفاده:

```text
User Request
-> AGENTS.md / CLAUDE.md
-> docs/ai/START_HERE.md
-> docs/ai/skills/README.md
-> انتخاب یک skill
-> خواندن فقط همان skill
-> اجرای همان workflow
-> آپدیت فقط فایل‌هایی که skill اجازه می‌دهد
-> Final Response
```

اصل مهم سیستم این است: هر درخواست باید به یک skill مشخص route شود، نه اینکه agent کل `docs/ai` یا کل repo را بخواند.
