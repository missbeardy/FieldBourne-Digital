---
name: website-audit-report
description: Audit a small business website and produce FieldBourne Digital's one-page plain-English PDF review, scoring speed, mobile, SEO, local SEO, Google Business Profile, accessibility and trust signals, ending with the top 5 fixes. Use this whenever Darren wants to review, audit, check or score a website, prepare a "free website review", look at a prospect's or client's site, or asks "what's wrong with this site" for a business, even if he doesn't say "audit" or "PDF". Takes a URL, the business type and the town.
---

# Website audit report

This is the free website review at the top of the FieldBourne offer ladder. A rural business owner reads it, usually on paper or a phone, and decides whether Darren knows what he's talking about. The job of the report is to be believed and to be useful even if they never hire him.

## Inputs

Ask for anything missing before you start:

- **URL** of the site
- **Business type** (for example "farm stay", "electrician", "physio")
- **Town** the business is in or mainly serves
- Optional: the **business name** if the site doesn't make it obvious, and a Google **place_id** if the first lookup picked the wrong listing

## Where output goes

Work out a short slug from the business name (`scenic-rim-blinds`).

- A real business (prospect or client): `prospects/<slug>/audit-<YYYY-MM-DD>/`. This folder is gitignored because it holds business data.
- Our own site or a `/demos` concept site: `tools/audit/output/<slug>-<YYYY-MM-DD>/`.

Never write audit output anywhere that git tracks.

## Step 1: Run the pipeline

From the repo root:

```bash
node tools/audit/audit.mjs --url <url> --type "<business type>" --town "<town>" --out <output dir> [--name "<business name>"]
```

It takes a few minutes. It runs Playwright screenshots (desktop 1440 wide, phone 390 wide), on-page checks, Lighthouse on phone and desktop, an Unlighthouse scan of up to 10 pages, and a Google Places lookup. Read `results.json` when it finishes. Look at `screenshots/desktop-top.png` and `screenshots/mobile-top.png` yourself too, because the numbers miss things a person sees straight away: generated stock photos, a headline nobody can read, a cookie banner covering the phone screen.

Useful flags:

- `--place-id <id>` if the Places lookup found the wrong listing or none. Ask Darren for it rather than guessing.
- `--skip-site-scan` for a quick run, or if Unlighthouse fails. Say in the report notes that only the homepage was measured.
- `--skip-places` if there is no API key yet. The GBP score then shows "Not checked".

Google Places rules: only the `place_id` is ever written to disk (`place.json`). Don't copy ratings, review counts, hours or review text into any file. The plain findings in `results.json` ("Google reviews: 10 to 24") are what you work from. No scraping of Google Maps, LinkedIn or Facebook, ever.

## Step 2: Also apply the web-quality checks

Use the `web-quality-audit` skill's checklist as a second pair of eyes on what the pipeline flagged, and add anything important it finds that `results.json` missed. The installed `seo-audit` skill is useful for the local SEO and Google Business Profile reasoning. Don't let either one turn the report into a technical document.

## Step 3: Write report.json

Write `report.json` in the output folder in this shape:

```json
{
  "title": "A straight look at your website",
  "business": "Scenic Rim Blinds",
  "site": "scenicrimblinds.com.au",
  "date": "21 October 2026",
  "intro": "Two or three sentences.",
  "scores": [
    { "label": "Speed", "score": 62, "line": "One sentence." },
    { "label": "Mobile", "score": 55, "line": "..." },
    { "label": "SEO", "score": 80, "line": "..." },
    { "label": "Local SEO", "score": 40, "line": "..." },
    { "label": "Google Business Profile", "score": 70, "line": "..." },
    { "label": "Accessibility", "score": 88, "line": "..." },
    { "label": "Trust signals", "score": 50, "line": "..." }
  ],
  "fixes": ["Five items, most valuable first."],
  "closing": "One sentence.",
  "screenshots": { "desktop": "screenshots/desktop-top.png", "mobile": "screenshots/mobile-top.png" },
  "googleAttribution": true
}
```

- Scores come straight from `results.json` `scores` (0 to 100). Don't adjust them to fit a story. Use `null` for GBP if it wasn't checked.
- Set `googleAttribution` to true whenever Places data informed the report.
- Each score `line` says what that score means for their customers, in about 15 to 22 words. Not how it was measured.
- The `fixes` are the five changes that would bring them the most enquiries or bookings, in order. Each one is a concrete action they could hand to anyone, about 25 to 40 words. Start with the verb. Bold the action with `**...**` if it helps scanning.

### How it should read

Read `references/voice.md` before writing. The short version:

- Write as Darren, first person, to the owner. "I went through your site on a phone."
- Start the intro with something genuinely good about the business. There almost always is something: a clear offer, real photos, a licence shown, years in the town.
- Be specific. "There's no button on the first screen of a phone" beats "the mobile experience could be improved".
- Name things they'd recognise: their phone number, their headline, their booking page. Not "LCP", "schema", "H1" or "alt text". If a technical idea matters, say what it does: "a small bit of code that tells Google your address and hours".
- Think about their customer. A farm stay guest is comparing three places on a phone at night. A tradie's customer has a problem now and wants to ring someone. A physio's patient wants to know if they can book online and whether they're covered.
- Australian English. No em dashes or en dashes. No hype. Nothing from the banned list in `BRANDING.md` section 5. No exclamation marks.
- Don't sell. The report ends with the fixes and one quiet closing line. No "contact me today" pitch. Darren's details are in the footer.
- Honest about limits. If GBP wasn't checked or only the homepage was measured, say so in the relevant line.

## Step 4: Render the PDF

```bash
node tools/audit/render-report.mjs --in <output dir>/report.json
```

It writes `website-review.pdf` next to `report.json`. It refuses to print if the text has an em dash, en dash or banned word (exit 3), and warns if the content runs past one A4 page (exit 2). If it runs over, tighten the intro and score lines first, then the fixes. Rerun until it fits.

Open the PDF (or `report.html`) and look at it before you hand it over. Check the screenshots show the real site and not a cookie banner or error page.

## Step 5: Hand back

Tell Darren:

- where the PDF is
- the seven scores in one line
- the top fix
- anything the pipeline couldn't check, and why

Don't send the PDF to anyone. Darren decides what goes out.
