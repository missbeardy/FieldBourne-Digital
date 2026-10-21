---
name: client-proposal
description: Write a FieldBourne Digital quote or proposal in AUD (GST handled from the price list, currently not registered so none charged), payment milestones, a monthly care plan, assumptions and exclusions, as a PDF (or DOCX on request), from a scope of work and Darren's price list. Use this whenever Darren wants to quote, price up, estimate, or send a proposal for a website, care plan or automation job, even if he just says "how much would I charge them" or "put together a quote".
---

# Client proposal

A quote a small business owner can read in two minutes and say yes to. Plain, exact, nothing hidden. It protects Darren too: the assumptions and exclusions are what stop a $3,000 job turning into a $6,000 one.

## Inputs

- **Scope**: what the client wants. It can be rough notes, a call summary or an audit report.
- **Price list**: `docs/pricing.md`. Read it every time. Don't use remembered prices.
- **Client details**: business name, contact person, and their ABN if they gave it.

## Step 1: Check the price list is ready

Open `docs/pricing.md`.

- If the **GST registered** line still says `[yes / no]`, stop and ask Darren. You can't charge GST without being registered, and getting it wrong is a real tax problem.
- If any price the scope needs is still `$[ ]`, ask Darren for that number. Don't invent one, and don't use a "typical market rate".

## Step 2: Turn the scope into line items

- Map each part of the scope to a line on the price list. Use "from" prices as the starting point and only go above them for a reason you can name (extra pages, copywriting, a booking system).
- Ask about anything the scope leaves open that changes the price: number of pages, who writes the words, who supplies photos, which hosting tier, whether there's a booking or payment system.
- Hosting tier must be one of the three in `CLAUDE.md`: the client's own builder, a static site Darren hosts, or managed WordPress on VentraIP. Never Vercel Hobby.
- Automation work: Make.com by default, Zapier only when an app has no Make support, custom code only for heavy logic. Include the client's own Make or Zapier subscription under exclusions, because they pay for it directly.

## Step 3: Write quote.json

Save it in the client's folder: `clients/<client>/` for a client, `prospects/<slug>/` for a prospect. Both are gitignored. Shape:

```json
{
  "quoteNumber": "FB-2026-001",
  "date": "2026-10-21",
  "validDays": 30,
  "gstRegistered": false,
  "client": { "business": "Lantern Gully Cabins", "contact": "Sam", "abn": "" },
  "summary": "Two or three plain sentences: what they get and why.",
  "items": [
    { "description": "Small business site, up to 5 pages", "detail": "Home, Cabins, Things to do, About, Contact", "qty": 1, "unitPriceExGst": 1490 }
  ],
  "milestones": [
    { "name": "Deposit", "when": "To start", "percent": 50 },
    { "name": "Launch", "when": "When the site goes live", "percent": 50 }
  ],
  "carePlan": {
    "name": "Standard care plan",
    "monthlyExGst": 89,
    "minimumMonths": 3,
    "includes": ["Hosting and backups", "Up to 1 hour of changes a month"],
    "notIncluded": ["New pages", "Paid apps or plugins"]
  },
  "assumptions": ["You supply photos and opening hours by ..."],
  "exclusions": ["Domain registration fees, paid by you directly"],
  "hosting": "The domain and DNS stay in your name. ...",
  "terms": "Invoices are due within 7 days."
}
```

- All prices are **ex GST**. The script adds GST only when `gstRegistered` is true. Never add GST yourself.
- Milestone percentages must add up to 100. Use the deposit and terms from `docs/pricing.md`.
- Number quotes `FB-<year>-<three digits>`. Check the client folders for the last number used and go one higher.
- **Assumptions** are the things you're relying on: who supplies the words and photos and by when, the number of feedback rounds, the page count.
- **Exclusions** are what's not in the price: domain fees, paid plugins, the client's own app subscriptions, ad spend, photography, ongoing changes outside the care plan.
- **Hosting** always says the domain and DNS stay in the client's name.

Writing rules: Australian English, no em dashes, plain words, nothing from the `BRANDING.md` banned list. Say "you" and "I".

## Step 4: Render

PDF (default):

```bash
node .claude/skills/client-proposal/scripts/render-quote.mjs --in <folder>/quote.json
```

It checks the milestones add up, refuses em dashes and banned words, works out the GST and totals in cents, and prints the totals. Open the PDF and check it.

DOCX (only when Darren asks): use the `docx` skill with the same content and the totals the script printed. Never recalculate the numbers by hand.

## Hand back

Give Darren the file path, the total, the care plan monthly price, and every assumption that needs his OK. Don't send the quote. Darren sends it.
