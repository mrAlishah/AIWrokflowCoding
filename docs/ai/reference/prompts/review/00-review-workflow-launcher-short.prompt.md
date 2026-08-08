# 00 - Review Workflow Launcher - Short

Use skill: review_workspace_create

Parameters:

STP_ID:
STP-XXXX

BASE_BRANCH:
main

HEAD_BRANCH:
current branch

REVIEW_SCOPE:
full
Options: full / backend-only / frontend-only / tests-only / security-sensitive / architecture-sensitive

Task:
Create the review workspace and prepare the next prompt for `review_diff_analysis`. Do not execute the next skill.
