---
name: process-audit-interview
description: Run FieldBourne Digital's 45-minute process audit with a small business owner, live or from notes or a transcript, then rank the jobs worth automating and recommend one 2-week pilot. Use this whenever Darren mentions a process audit, an automation discovery call, finding what to automate, "where is this business wasting time", a client's admin problems, or wants to prepare for or write up an automation consult, even if he doesn't say "audit".
---

# Process audit interview

This is the way into tier 3 of the offer ladder (automation and AI assistants). In 45 minutes Darren finds out how work actually moves through the business, where it leaks, and which one small automation would make a real difference in two weeks. The output has to be honest. If nothing is worth automating, say so. A good audit that recommends nothing still builds trust.

## Two ways to run it

1. **Live.** Darren is on the call or about to be. Walk him through `references/script.md` one section at a time. Give him the questions for the section, wait for his notes, ask any follow-ups that matter, then move on. Keep an eye on the clock: each section has a time.
2. **From notes.** Darren pastes notes or a transcript afterwards. Read them against the script and list anything important that wasn't covered, so he can ask by text or email. Then write the report.

To prepare before a call, give Darren the script with the niche prompts for this business filled in.

## What to listen for

For every repeated task, try to get:

- who does it, how often, and how long it takes each time
- the tools involved (phone, email, Facebook, booking sites, Xero or MYOB, Google Calendar, spreadsheets, paper)
- what happens when it's missed or late, in dollars or lost customers if they can say
- where the information starts and where it has to end up

Rural and regional realities matter: patchy mobile reception, slow internet, one person doing everything, seasonal peaks (school holidays for farm stays, storms for trades), and owners who are good at the work and tired of the admin.

## Scoring

Score each candidate automation:

| Factor | 1 | 5 |
|---|---|---|
| **Value** | saves under 30 min a week, nothing lost if missed | saves 3+ hours a week, or protects real revenue (missed bookings, unpaid invoices) |
| **Effort** | apps have Make modules, simple path, one week | no API, messy data, needs custom code |
| **Risk** | internal only, easy to undo | customer-facing, money, or sensitive data |

Priority = (2 × Value) − Effort − Risk. Rank by priority. Break ties by which one the owner cares about most, in their words.

Tool choice for each one, in this order:

1. Make.com, by default.
2. Zapier, only when an app has no Make support.
3. Custom code, only for heavy or complex logic.
4. Sometimes the answer is a setting in a tool they already pay for (Xero invoice reminders, booking platform auto-messages). Say so. It's cheaper and they keep control.

Sensitive data: allied health clinics hold health information. Under the Privacy Act it needs extra care. Don't route clinical notes or diagnoses through Make or Zapier. Stick to bookings, reminders, forms without clinical detail, and admin. Also note that Make runs in the EU or US, not Australia.

## The 2-week pilot

Pick one automation to pilot. It should be:

- in the top three by priority
- buildable and testable in two weeks of Darren's part-time hours (about 6 to 10 hours of work)
- low risk, with an easy off switch
- measurable: there's a number before and after (hours, missed enquiries, days to get paid)

Write the pilot as: what gets built, what the owner has to do (logins, approvals, a test booking), the measure and its starting number, a check-in on day 7, and a keep, change or drop decision on day 14.

## Output

Save to the client's folder: `clients/<client>/process-audit-<YYYY-MM-DD>.md` (or `prospects/<slug>/` before they're a client). Both are gitignored. Use this structure:

```markdown
# Process audit: <Business>
<date> · <who was there> · 45 minutes

## How work moves through the business now
A short plain description, enquiry to payment.

## Where time and money leak
Bullets in the owner's words, with hours or dollars where known.

## Automations, ranked
| # | What | Tool | Value | Effort | Risk | Priority | Rough monthly running cost |

One short paragraph per top-three item: what it does, in plain words.

## Recommended 2-week pilot
What gets built · What you need to do · How we'll measure it · Day 7 check-in · Day 14 decision

## Not worth automating (yet)
Things that came up, and why they're better left alone or fixed another way.

## Questions still open
```

For a DOCX version, use the `docx` skill with the same content, but only when Darren asks.

Writing rules: Australian English, no em dashes, plain words a farm or trade owner would use, nothing from the `BRANDING.md` banned list. Don't promise savings you can't back with what they told you. When the pilot is chosen, the `make-scenario-spec` skill turns it into a build spec.
