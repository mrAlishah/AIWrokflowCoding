Use skill: review-followup

Parameters:

STP_ID:
STP-XXXX

FOLLOWUP_TYPE:
fix-verification

Diff command:
git diff develop...HEAD

Rules:

- Check only comments with status Planned.
- Mark Done only if fixed in local diff.
- Keep Planned if not fixed.
- Use Ignore only with reason.
- Create PR-001.1 style follow-up comments when needed.
- Do not modify source code.

Output:

- Done comments
- Still Planned comments
- New follow-up comments
- Updated followup log
- Markdown Files Changed
- Confirmation source code was not modified
