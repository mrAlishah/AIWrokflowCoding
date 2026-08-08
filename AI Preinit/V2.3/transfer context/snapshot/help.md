برای این سناریو، در واقع به **دو Prompt مکمل** نیاز دارید:

1. **Snapshot Generator** → روی Chat فعلی اجرا می‌شود و Context_Snapshot.md تولید می‌کند.
2. **Snapshot Loader / Rehydrator** → در Chat جدید اجرا می‌شود و Context را بازسازی می‌کند.

این معماری شبیه Memory Migration در AI Agentها و سیستم‌های Enterprise است.

---

## Prompt شماره 1 — Enterprise Context Snapshot Generator

این Prompt را در انتهای Chat فعلی اجرا کنید.

# AI Context Snapshot Generator v2

ROLE

Act as a Senior Context Engineer, Knowledge Architect and AI Memory Compression Specialist.

OBJECTIVE

Analyze the ENTIRE conversation and generate a Context_Snapshot.md file optimized for migration into a new AI chat.

The goal is NOT to summarize the conversation.

The goal is to reconstruct the current state of the project, user, decisions, constraints and workflows so that a new AI session can continue the work with minimal loss of context.

---

COMPRESSION RULES

Preserve:

- User goals
- User profile
- Long-term objectives
- Active projects
- Important decisions
- Constraints
- Working assumptions
- Output formats
- Preferred workflows
- Open tasks
- Critical context

Remove:

- Repeated discussions
- Dead-end conversations
- Obsolete ideas
- Small talk
- Irrelevant details

---

OUTPUT FORMAT

Generate a single markdown document named:

Context_Snapshot.md

Structure:

# Executive Summary

High-level understanding of the user and project.

---

# User Profile

Include:

- Background
- Skills
- Professional domain
- Learning goals
- Personal goals
- AI usage goals
- Decision-making preferences

---

# Long-Term Objectives

List all long-term goals.

---

# Active Projects

For each project:

## Project Name

Purpose

Current State

Important Context

Open Tasks

Risks

Next Action

---

# Current Session Context

Include:

Current focus

Recent discussions

Current decisions

Immediate next steps

---

# Important Rules

List all rules discovered in the conversation.

---

# Decision Framework

Document all decision-making principles.

---

# Preferred Output Formats

Document preferred response structures.

---

# Workflows

Document reusable workflows.

---

# Open Tasks

Prioritized list.

---

# Known Constraints

Time

Resources

Skills

External limitations

---

# Risks and Dependencies

---

# Recommended Continuation Prompt

Generate a short continuation prompt.

---

# Snapshot Quality Score

Evaluate:

Completeness: X/100

Transfer Readiness: X/100

Context Preservation: X/100

Provide final score.

END OF FILE

---

## Prompt شماره 2 — Enterprise Context Loader (برای Chat جدید)

این Prompt را در ابتدای Chat جدید اجرا کنید و فایل Context_Snapshot.md را همراه آن قرار دهید.

# AI Context Rehydration Protocol

ROLE

Act as an AI Context Reconstruction Engine.

INPUT

You will receive a Context_Snapshot.md file generated from a previous AI session.

Your responsibility is to reconstruct the previous working state with maximum fidelity.

---

PROCESS

Step 1

Read the entire Context_Snapshot.md.

Step 2

Reconstruct:

- User Profile
- Goals
- Active Projects
- Constraints
- Rules
- Decision Framework
- Workflows

Step 3

Create an Internal Working Model.

Step 4

Identify:

- Missing information
- Ambiguities
- Potential conflicts

Step 5

Generate a Continuation State.

---

OUTPUT

# Reconstructed Understanding

Summarize your understanding.

---

# Active Projects

List active projects.

---

# Current Priorities

List current priorities.

---

# Rules Applied

List the rules being enforced.

---

# Continuation Plan

Describe how work should continue.

---

# Recommended Next Action

Recommend the immediate next step.

---

IMPORTANT

Treat Context_Snapshot.md as the authoritative source.

Preserve:

- Project intent
- User preferences
- Decision framework
- Output styles

Do not restart the project from scratch.

Continue from the latest known state.

---

## نسخه Minimal (سریع و روزمره)

### Generate Snapshot

```markdown
Analyze the entire chat and create a compact Context Snapshot.

Include only:

- User Profile
- Goals
- Active Projects
- Important Decisions
- Constraints
- Rules
- Open Tasks
- Next Action

Optimize for migration into a new chat.

Output in Markdown.
```

### Load Snapshot

```markdown
Read the attached Context Snapshot.

Reconstruct:

- User profile
- Goals
- Projects
- Rules
- Constraints

Then:

1. Summarize your understanding.
2. Identify current priorities.
3. Continue the work from the latest state.
```

---

## پارامترهای قابل سفارشی‌سازی

| پارامتر                      | توضیح                                          |
| ---------------------------- | ---------------------------------------------- |
| Compression_Level            | میزان فشرده‌سازی Context (Low / Medium / High) |
| Include_User_Profile         | درج پروفایل کاربر                              |
| Include_Project_History      | درج تاریخچه پروژه                              |
| Include_Decisions            | ثبت تصمیم‌های مهم                              |
| Include_Rules                | ثبت قوانین پروژه                               |
| Include_Output_Format        | ثبت فرمت‌های خروجی                             |
| Include_Workflows            | ثبت Workflowهای تکرارشونده                     |
| Include_Open_Tasks           | ثبت کارهای باز                                 |
| Include_Risks                | ثبت ریسک‌ها                                    |
| Include_Next_Action          | ثبت گام بعدی                                   |
| Generate_Continuation_Prompt | تولید Prompt ادامه کار                         |
| Transfer_Readiness_Score     | ارزیابی کیفیت انتقال                           |
| Snapshot_Format              | Markdown / JSON / YAML                         |
| Detail_Level                 | Brief / Standard / Detailed / Enterprise       |
| Project_Mode                 | Single Project / Multi Project                 |
| Preserve_Decision_Framework  | حفظ مدل تصمیم‌گیری                             |
| Preserve_User_Preferences    | حفظ ترجیحات کاربر                              |
| Preserve_Output_Style        | حفظ سبک پاسخ‌ها                                |
| Generate_Context_File        | تولید فایل Context_Snapshot.md                 |
| Session_Context_Depth        | عمق استخراج Session جاری                       |
| Long_Term_Context_Depth      | عمق استخراج Context بلندمدت                    |

### تنظیم پیشنهادی برای Personal AI OS

برای پروژه‌ای مثل «همفکر شخصی، برنامه‌ریزی زندگی، یادگیری زبان، مدیریت کار و AI» این تنظیمات معمولاً بهترین نتیجه را می‌دهند:

```text
Compression_Level = Medium
Detail_Level = Enterprise
Include_User_Profile = Yes
Include_Decisions = Yes
Include_Rules = Yes
Include_Workflows = Yes
Include_Open_Tasks = Yes
Preserve_Decision_Framework = Yes
Preserve_Output_Style = Yes
Generate_Continuation_Prompt = Yes
Transfer_Readiness_Score = Yes
Snapshot_Format = Markdown
```

این ترکیب معمولاً بیشترین حفظ Context را با کمترین حجم متن فراهم می‌کند.
