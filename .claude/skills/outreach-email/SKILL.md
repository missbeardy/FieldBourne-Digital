---
name: outreach-email
description: Draft a short, Spam Act compliant cold email to a local business from a FieldBourne website audit, check the do-not-contact list, and log where the address came from. Never sends. Use this whenever Darren wants to email, contact, reach out to or follow up a prospect, write a cold email, or turn an audit into an outreach message, even if he just says "write to them". Also use it to record an unsubscribe.
---

# Outreach email

A short first email to a local business, offering the free website review Darren has already done. It has to be legal under the Spam Act 2003, and it has to read like a neighbour writing, not a marketing campaign.

This skill drafts and logs. It never sends, and it doesn't create drafts in Gmail or any other mail tool unless Darren asks for that specific email. Darren sends every email himself.

## Inputs

- The **audit folder** for the business (`prospects/<slug>/audit-<date>/`, with `report.json` and `results.json`)
- The **email address**
- The **source URL**: the page where the business itself published that address (their website, their Google Business Profile, a directory listing they filled in, a chamber of commerce member page)
- The **date found**

## Step 1: Check the address is one we may email

Under the Spam Act, a cold email to a business is allowed on "inferred consent" only when all of these are true. Check each one. If any fails, stop, say which one and why, and don't write a draft.

1. **There is a published address.** If there's no email address, or no source URL showing where the business published it, refuse. A guessed address (info@ because the domain exists), one from a data broker or bought list, one found by scraping, or one from someone's personal LinkedIn or Facebook profile does not count.
2. **The business published it itself, openly.** Open the source URL and confirm the address is actually on that page.
3. **The page doesn't say "no unsolicited email".** Look for wording like "no unsolicited commercial email", "no marketing", or "no sales calls" near the address or in the footer. If it's there, refuse.
4. **The email is relevant to the address.** A website offer to the general business address or the owner's work address is fine. A staff member's address that's clearly about something else (accounts@, bookings for guests, a clinic's patient intake address) needs Darren's call. Ask him.
5. **Not on the do-not-contact list.** Run:

   ```bash
   node .claude/skills/outreach-email/scripts/log-contact.mjs check --email <address>
   ```

   Exit code 4 means they've opted out. Stop.

## Step 2: Write the draft

Read `report.json` for the business, its strengths and the top fixes. Then write:

- **Subject:** plain and specific, under 8 words. Their business name or town helps. No "quick question", no clickbait.
- **Body:** 80 to 130 words.
  - Who Darren is, in one line: he runs a small web studio in Beaudesert.
  - One true, specific thing he noticed on their site, taken from the audit. Lead with the one that costs them the most enquiries, and say it in the customer's terms ("on a phone there's no way to book without scrolling a long way").
  - The offer: he's put together a one-page review and a quick mockup, free, and can send them over if they'd like. Don't attach anything to a first email.
  - One easy reply to make: "Want me to send it through?"
- **Sign-off, always all of these:**

  ```
  Darren
  FieldBourne Digital, Beaudesert QLD
  ABN [ABN]
  admin@fieldbournedigital.com.au
  ```

- **Unsubscribe line, always the last line:**

  > If you'd rather not hear from me again, just reply "no thanks" and I won't contact you again.

Writing rules: Australian English. No em dashes. No hype, nothing from the `BRANDING.md` banned list, no exclamation marks, no flattery that isn't backed by something on their site. No fake familiarity ("Hope you're well!"). No urgency. Read `docs/outreach/` for any templates Darren has saved and follow them where they fit. The installed `cold-email` skill has good advice on reply rates, but its US list-building and automation advice doesn't apply here.

## Step 3: Save and log

Save the draft to `prospects/<slug>/outreach-<YYYY-MM-DD>.md` in this shape:

```markdown
To: <address>
Source: <source URL> (found <date>)
Subject: <subject>

<body>

<sign-off>

<unsubscribe line>

---
Checks: published address yes · business published it yes · no "no marketing" notice · relevant yes · not on do-not-contact list
Before sending: replace [ABN], read it once more, send from your own mailbox.
```

Then log it:

```bash
node .claude/skills/outreach-email/scripts/log-contact.mjs log --business "<name>" --email <address> --source-url <url> --found <YYYY-MM-DD> --draft prospects/<slug>/outreach-<date>.md
```

The log (`prospects/contact-log.csv`) and the draft are both gitignored. Never put contact details anywhere git tracks.

## Unsubscribes

When Darren says someone replied "no thanks", asked not to be contacted, or bounced as "not interested", record it straight away. The law requires honouring it within 5 working days.

```bash
node .claude/skills/outreach-email/scripts/log-contact.mjs unsubscribe --email <address> --note "replied no thanks"
```

For a whole business, pass the domain as the email (`--email @theirdomain.com.au`).

## Hand back

Show Darren the subject and body in chat, the checks that passed, the file path, and the reminder to replace `[ABN]`. Then stop. Don't send.
