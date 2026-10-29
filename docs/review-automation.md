# Free review automation

Status: built 21 October 2026, changed to read Formspree emails on 29 October 2026. The local part is tested with sample emails. It switches on once the Gmail connector is signed in and the schedule is created.

## How it works

1. Someone fills in the free review form on the website. Formspree keeps the submission (the consent record) and emails admin@fieldbournedigital.com.au, which forwards to fieldbournedigital@gmail.com.
2. **A scheduled Claude Code task on Darren's computer** runs twice a day. It reads those emails through the Gmail connector, queues anything new, runs the audit and mockup, drafts the reply and sends Darren a push notification.
3. Darren reads the draft, attaches the PDF and before/after image, and sends it from his own mailbox. Nothing is ever sent for him.

Why the computer and not the cloud: the audit needs a browser for screenshots, and the business details stay on Darren's machine.

Why not Make: Formspree webhooks need a paid Formspree plan, and the email already carries every field. Reading the email directly cuts out a paid upgrade and two moving parts.

The site itself doesn't change. The form keeps posting to Formspree.

| Piece | Where it lives |
|---|---|
| Form | `src/components/ReviewForm.tsx` (unchanged) |
| Notification emails | fieldbournedigital@gmail.com, from Formspree, subject "Free website review request: ..." |
| Skill | `.claude/skills/free-review-queue/` |
| Email parser | `.claude/skills/free-review-queue/scripts/email-to-csv.mjs` |
| Queue script | `.claude/skills/free-review-queue/scripts/queue.mjs` |
| Saved emails, queue, requests, drafts | `prospects/` (gitignored) |

## 1. The Gmail connector

The skill uses Claude's Gmail connector (the small-business plugin). It must be signed in to **fieldbournedigital@gmail.com**, not the personal account. If it shows a sign-in error, reconnect it from Claude's connector settings and pick that account.

Read access is all it needs. The skill never sends, drafts or labels anything.

## 2. The schedule (ask Claude to do it)

Ask Claude in this repo: "set up the review queue schedule". It creates a scheduled task in the Claude desktop app:

- **Name:** FieldBourne review queue
- **When:** every day at 6:30 am and 6:30 pm (guessed to fit around the day job, change it to suit)
- **Folder:** `C:\Users\djran\Documents\FieldBourne-Digital`
- **Prompt:** "Run the free-review-queue skill. Check Gmail for new free website review requests, do the review, mockup and reply draft for each, and notify me. Never send anything."

The app needs to be open and the computer awake at those times. A missed run gets picked up at the next one.

## 3. Try it end to end

1. Submit the form on the live site with your own details and website (fieldbournedigital.com.au works).
2. Check the Formspree email lands in fieldbournedigital@gmail.com.
3. Ask Claude "run the review queue" rather than waiting for the schedule.
4. Check `prospects/fieldbourne-digital/` for the audit, mockup and `reply-<date>.md`, and that you got the notification.
5. Mark it sent (`queue.mjs mark --id <id> --status sent`) or delete the test folder and its rows in `prospects/review-queue.csv` and `prospects/contact-log.csv`.

## If the email layout changes

`email-to-csv.mjs` finds each field by its form name, whether Formspree writes `name: value`, puts the value on the next line, or Gmail returns a table. If Formspree changes its email so a field can't be found, the script lists the file under `problems` and the skill flags it rather than guessing. A request with no `consentReview: yes` is always skipped.

## Compliance notes

- Ticking the first box on the form is express consent to email about the review (Spam Act 2003). The queue skips anyone who didn't tick it.
- The consent record is kept in three places: Formspree (the submission with `consentVersion`, page and time), the saved email in `prospects/_inbox/emails/`, and `prospects/contact-log.csv` (a row with "express: review form" when the reply is drafted).
- Every reply carries Darren's name, ABN and the unsubscribe line. Unsubscribes go on `prospects/do-not-contact.csv` straight away, and the queue checks that list on every import.
- Only people who ticked the second box get tips emails. That list isn't built yet.
- Nothing in this setup sends email. Darren sends every reply himself.

## Running cost

$0 beyond the existing Claude plan. Formspree free plan, no Make.
