# Free review automation

Status: built on 21 October 2026, not switched on yet. The local part is tested with sample data. The Make scenario and the schedule need Darren's accounts, so they're set up by hand using the steps below.

## How it works

1. Someone fills in the free review form on the website. Formspree keeps the submission (the consent record) and emails Darren, as it does now.
2. **Make** catches the same submission and adds it as a row in a Google Sheet.
3. **A scheduled Claude Code task on Darren's computer** runs twice a day. It reads the sheet, queues anything new, runs the audit and mockup, drafts the reply and sends Darren a push notification.
4. Darren reads the draft, attaches the PDF and before/after image, and sends it from his own mailbox. Nothing is ever sent for him.

Why the computer and not the cloud: the audit needs a browser for screenshots, and the business details stay on Darren's machine.

The site itself doesn't change. The form keeps posting to Formspree.

| Piece | Where it lives |
|---|---|
| Form | `src/components/ReviewForm.tsx` (unchanged) |
| Sheet | Google Drive: **FieldBourne review requests** |
| Make scenario | Darren's Make account: **Review form to sheet** |
| Skill | `.claude/skills/free-review-queue/` |
| Queue script | `.claude/skills/free-review-queue/scripts/queue.mjs` |
| Queue, requests, drafts | `prospects/` (gitignored) |

## 1. The Google Sheet (5 minutes)

Create a sheet called **FieldBourne review requests** in the Google account the Drive connector uses. Row 1, in this order, spelt exactly like this (they're the form's field names):

```
submittedAt  name  business  website  town  businessType  email  phone  notes  consentReview  consentTips  consentVersion  page
```

Don't share it with anyone. It holds people's contact details.

## 2. The Make scenario (20 minutes)

Make's free plan covers this: 2 operations a submission, well under the 1,000 a month limit.

**Scenario name:** Review form to sheet

**Module 1, trigger: Webhooks > Custom webhook**
- Create a webhook called "FieldBourne review form". Copy its address.
- In Formspree, open the form (ID `mlgyjqgv`), go to Plugins (or Integrations), add **Webhook**, and paste the Make address. Send a test submission from the live site so Make learns the fields.
- If your Formspree plan doesn't include webhooks: use the fallback below instead.

**Module 2: Google Sheets > Add a row**
- Spreadsheet: FieldBourne review requests, sheet 1, "Table contains headers": yes.
- Map each column to the webhook field of the same name. `submittedAt` maps to `submittedAt`, and so on down the list.
- Leave out `_gotcha` and `_subject`.

**Filter between 1 and 2:** only continue if `_gotcha` is empty (Formspree already drops most spam, this catches the rest).

**Error handling:** on module 2, add a **Break** error handler with 3 retries, 15 minutes apart. Make keeps the failed run so nothing is lost if Google hiccups, and Formspree still has every submission.

**Schedule:** Immediately (instant trigger).

**Fallback if Formspree webhooks aren't on your plan:** Module 1 becomes **Gmail > Watch emails** on the Formspree notification emails (from `noreply@formspree.io`, subject starting "Free website review request:"), then **Text parser > Match pattern** to pull each field out of the email body, then the same Sheets module. It's more fragile, so check it after any change to the form.

**Test cases:**
1. Normal request with a website: one new row, all 13 columns filled except phone and notes if left blank.
2. "I don't have a website yet" ticked: `website` says "(no website yet)".
3. Notes with a comma, quotes and a line break: they land in one cell.
4. Two quick submissions in a row: two rows.

## 3. The Drive connector

The scheduled task reads the sheet through Claude's Google Drive connector. Check it's connected and signed in to the same Google account as the sheet. If it isn't available when the task runs, the skill looks in `prospects/_inbox/` for a CSV you saved yourself (File, Download, Comma-separated values) and uses that instead.

## 4. The schedule (2 minutes, ask Claude to do it)

Ask Claude in this repo: "set up the review queue schedule". It creates a scheduled task in the Claude desktop app:

- **Name:** FieldBourne review queue
- **When:** every day at 6:30 am and 6:30 pm (guessed to fit around the day job, change it to suit)
- **Folder:** `C:\Users\djran\Documents\FieldBourne-Digital`
- **Prompt:** "Run the free-review-queue skill. Check the sheet for new free website review requests, do the review, mockup and reply draft for each, and notify me. Never send anything."

The computer needs to be on and awake at those times. A missed run just gets picked up at the next one.

## 5. Try it end to end

1. Submit the form on the live site with your own details and website (fieldbournedigital.com.au works).
2. Check the row appears in the sheet.
3. Ask Claude "run the review queue" rather than waiting for the schedule.
4. Check `prospects/fieldbourne-digital/` for the audit, mockup and `reply-<date>.md`, and that you got the notification.
5. Mark it sent (`queue.mjs mark --id <id> --status sent`) or delete the test folder and its rows in `prospects/review-queue.csv` and `prospects/contact-log.csv`.

## Compliance notes

- Ticking the first box on the form is express consent to email about the review (Spam Act 2003). The queue skips anyone who didn't tick it.
- The consent record is kept in three places: Formspree (the submission with `consentVersion`, page and time), the sheet, and `prospects/contact-log.csv` (a row with "express: review form" when the reply is drafted).
- Every reply carries Darren's name, ABN and the unsubscribe line. Unsubscribes go on `prospects/do-not-contact.csv` straight away, and the queue checks that list on every import.
- Only people who ticked the second box get tips emails. That list isn't built yet.
- Nothing in this setup sends email. Darren sends every reply himself.

## Running cost

Make free plan: $0. Google Sheets: $0. Claude Code: your existing plan, a few minutes of work per review.
