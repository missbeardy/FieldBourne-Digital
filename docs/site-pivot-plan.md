# Site pivot plan

Status: approved 21 October 2026. Built and live on fieldbournedigital.com.au (commit afd77bd). Still open: the TV Magic results and quote, and the free review automation (section 3).
Branch: `studio-pivot`. Nothing gets pushed to `main` (which deploys the live site) without Darren's OK.

## What changes, in one paragraph

The site stops selling a missed-call CRM to tradies and starts offering a free website review to small local businesses and solo operators, from someone local. Everything on the site points to that one action. The three-step offer (free review, website and care plan, automation) explains what happens after it. The concept sites show what a FieldBourne site looks like, clearly labelled as invented businesses. TV Magic South Brisbane stays as the one real client, shown as custom software and automation work, not as a website build.

## Decisions made

| Question | Answer |
|---|---|
| Fix the Google problem now, Astro later | Yes, pre-render now (see section 0 and the Astro note) |
| Audience | General: small local businesses, solo operators, and locals who want to back them. No niche pages. |
| Local angle | Beaudesert based, Queensland raised, knows the area |
| Reply time for free reviews | 2 business days |
| Phone on the site | Yes: 0451 177 893 |
| Allied health concept | Left out |
| TV Magic | Ask Nick for a quote, figures and written OK. Unconfirmed number comes down now. |
| GST | Not registered. No GST charged. |
| Prices | Set below most local freelancers. See `docs/pricing.md` and section 5. |

## 0. Fix first: Google can't see any page except the homepage

The site is a single-page React app on GitHub Pages. GitHub Pages only has a real file for `/`. Every other address (`/about`, `/case-study/tvmagic`) returns **404 not found**, then a script bounces the visitor to the homepage. Checked 21 October 2026:

| Address | What Google gets |
|---|---|
| `/` | 200, fine |
| `/about` | 404 |
| `/case-study/tvmagic` | 404 |
| `/work` | 301 to `/work/`, because `public/work/` (the screenshot folder) has the same name as the page |
| `/demos/wirebird/` | 200, fine (real file) |

**Fix: pre-render every page at build time.** After `vite build`, a small script opens each route in Playwright (already installed) and saves the finished HTML to `dist/<route>/index.html`. Every page then returns 200 with its own title, description and content. No change of framework or host. About 2 to 3 hours.

- Move the screenshots from `public/work/` to `public/images/work/` so `/work` stops clashing.
- Delete the old `sitemap.xml`, `robots.txt` and `CNAME` in the repo root. The live ones are in `public/`.

### What Astro is, and whether to move later

Astro is a free, open-source tool for building websites. It produces plain, fast HTML pages, which is why it's the static option in the hosting tiers. AstroWind is a free starter template for it.

- **Cost:** nothing. Astro and AstroWind are free (MIT licence). Cloudflare Pages hosting is free for a site this size. GitHub Pages, where the site is now, is also free.
- **Why move one day:** the pages would be real HTML from the start (no pre-render step), and your own site would be built on the same stack you sell clients.
- **How hard later:** moderate, roughly 10 to 15 hours. It doesn't get much harder by waiting. The words, images and brand colours carry straight over. Astro can reuse the existing React pieces. The three demos stay exactly as they are, built the same way. The main work is rebuilding the page layouts and setting up Cloudflare Pages and the domain.
- **Recommendation:** pre-render now and get the new offer live. Move to Astro once a client site has been built on it, so you learn it on paid work, not your own site.

## 1. Site map

| Page | Route | Job |
|---|---|---|
| Home | `/` | Explain the offer, get the free review |
| Free website review | `/website-review` | The form, and what they'll get back |
| Services | `/services` | Websites, care plans, automation |
| Pricing | `/pricing` | "From" prices |
| Concept sites | `/work` | The demos, labelled |
| TV Magic case study | `/case-study/tvmagic` | The one real client (custom CRM) |
| Scenic Rim | `/scenic-rim` | Local page for the main market |
| About | `/about` | Darren, Beaudesert, why a local studio |
| Privacy, Terms | `/privacy`, `/terms` | Updated for the new form |

Keep the redirects: `/fieldbourne` and `/tvmagic` both go to `/case-study/tvmagic`.

**Nav:** Services · Pricing · Concept sites · About · **Get a free review** (button)
**Footer:** the same links, plus Case study, Privacy, Terms, phone 0451 177 893, email, ABN, "Beaudesert, QLD", and a small "Client login" link to FieldBourne Companion so TV Magic's access is unchanged.

**CTA wording:** "Get a free website review" (short form: "Get a free review"). This replaces "Book a free chat" everywhere. `BRANDING.md` gets updated to match (section 9).

## 2. Homepage

General, not built around one industry. Local in tone. Short enough to read on a phone in a minute.

1. **First screen**
   - Heading: **"Websites for local businesses, from someone local."**
   - Line under it: "Beaudesert based and Queensland raised. I know the area, and I know how your customers talk." (Darren's own version, "Based in Beaudesert and Queensland raised, I know how to talk to your customers", is the fallback.)
   - Then: "Send me your website and I'll send back a plain-English review and a quick mockup of what it could look like, within 2 business days. Free, and no obligation."
   - Button: **Get my free review**. Second link: "See concept sites". Tap-to-call 0451 177 893 on phones.
2. **What you get from the review.** A picture of a real one-page review PDF and a before/after mockup (from Phase 5), plus three bullets: speed and phone check, how you show up on Google, the five things I'd fix first.
3. **Who it's for.** One short section, no industry cards:
   - "Small local businesses and solo operators. Tradies, cafes, farm stays, shops, makers, clinics, the lot."
   - "People round here like to back local. Your website is usually where they check you out first. It should make that easy."
4. **How it works: three steps** (the offer ladder)
   1. **Free website review.** A one-page report and a quick mockup. Yours to keep.
   2. **A website, then I look after it.** Built for how your customers find and contact you, with a monthly care plan so it keeps working. Sites from $790.
   3. **Automation.** Take repeat admin off your plate: enquiries, bookings, reminders, follow-ups. Quoted per job.
   Link: "See services and prices".
5. **Concept sites strip.** Three cards with a "Concept site" badge: "Invented businesses, built to show what a FieldBourne site can do." Link to `/work`.
6. **Local.** "Working across the Scenic Rim, Lockyer Valley and Ipswich." List the towns. "Your domain and website stay in your name. You deal with me, not a call centre."
7. **Questions** (short FAQ): Do I own my website and domain? What does it cost? I'm on Wix or Squarespace, can you help? Do I need a new site, or can you fix mine? How long does it take?
8. **The review form**, repeated at the bottom.

TV Magic isn't on the homepage. It's a CRM, not a website, so it would muddy the main message. It lives on the Services page under automation, and on its own case study page.

Page title: "Local websites for small businesses | FieldBourne Digital, Beaudesert".

## 3. Free review form

On `/website-review`, and repeated at the bottom of the homepage.

**Fields**
- Your name (required)
- Business name (required)
- Website address (required, or tick "I don't have one yet")
- Town (required)
- What kind of business? Trade or service · Accommodation or tourism · Food or drink · Shop or maker · Health or wellness · Something else (required)
- Email (required: the review comes by email)
- Phone (optional)
- Anything you'd like me to look at? (optional)

**Consent: express consent to email.** One checkbox, unticked by default, required to send:

> ☐ Email me my free review, and follow up about it. I can unsubscribe any time.

Optional second checkbox, unticked:

> ☐ Also send me the occasional tip about websites and local marketing (a few times a year).

Under the button: "I'll reply within 2 business days. Your details are only used for your review. See the privacy policy."

**Keeping a record of consent.** With each submission, send hidden fields for the consent wording version (for example `consent-v1-2026-10`), the page URL and the time. Formspree stores the submission with that. When the review is sent, the contact log records "express consent: review form".

**Privacy policy update.** Add business name, website address and town to what's collected. Say they're used to prepare the review and follow up, and that marketing email is only sent with consent. Check that the listed providers (Formspree, Gmail, Resend, PostHog) match what's actually in use, and remove any that aren't.

### Automating the free review

Yes, most of this can run on its own. The bit that stays manual is you reading the review and pressing send. That keeps the quality up and keeps you inside the "never send without asking" rule.

How it would work:

1. Someone fills in the form. Formspree (or a Make webhook) sends the details to a Google Sheet and emails you "new review request".
2. A Claude Code task on your computer checks the sheet twice a day. For each new request it:
   - runs the `website-audit-report` skill (the PDF)
   - runs the `prospect-mockup` skill (the mockup and before/after image)
   - drafts the reply email, with the PDF and image ready to attach
   - saves everything in `prospects/<business>/` and marks the row "ready to check"
3. You get a notification, read it over (5 to 10 minutes), and send it from your own email.

Why on your computer and not in the cloud: the audit needs a browser to take screenshots, and the business details stay on your machine instead of in someone else's system.

Build effort: about 4 to 6 hours once the form is live. Do it as its own small project after the site pivot, because it needs real form submissions to test with. Running cost: Make's free plan should cover the form step at this volume. Claude Code uses your existing plan.

## 4. Services page

Three sections, in the same order as the steps.

**Websites**
- What every site includes: works on a phone first, one clear action (call, book or enquire), Google basics set up, a privacy policy, and the domain in your name.
- Three ways to host it, in plain words:
  - **Keep your own builder** (Squarespace, Wix, Shopify). You own the account. I fix it up or build it there.
  - **A fast site I host.** Quick to load, little to go wrong, nothing for you to update.
  - **WordPress** on VentraIP, an Australian host. For people who want to edit a lot themselves.
- How it goes: free review, quote, build, launch, care plan.

**Care plans**
- What's included each month: hosting, backups, a check that forms and bookings still work, small changes. From $49 a month.
- What isn't: new pages, big changes, paid apps.

**Automation**
- Plain examples, not tied to one industry: enquiries that answer themselves out of hours, booking confirmations and reminders, quote follow-ups, invoice reminders, asking happy customers for a review.
- How it starts: a 45-minute process audit ($149, taken off the job if you go ahead), then one 2-week pilot.
- Tools: Make.com by default, Zapier when an app needs it, custom code for the heavy stuff.
- **Custom software: the FieldBourne CRM.** One short panel: "When off-the-shelf tools don't fit, I build custom systems. TV Magic South Brisbane runs on a CRM I built that catches every lead and sends it to the right technician." Link to the case study. The tradie bundle sits here too, as an option for trade businesses.

## 5. Pricing page

From `docs/pricing.md`. Set below the usual local freelancer range (about $1,000 to $6,000 for a small business site), because it's a one-person operation.

| | From |
|---|---|
| Free website review | Free |
| One-page site | $790 |
| Small business site (up to 5 pages) | $1,490 |
| Fix up your current Wix, Squarespace or Shopify site | $390 |
| New site on your own builder | $990 |
| WordPress site (up to 5 pages) | $1,890 |
| Care plan | $49 a month |
| Process audit | $149 |
| Automation | Quoted per job |

- "FieldBourne Digital is not registered for GST, so no GST is charged."
- "Every job gets a written quote before any work starts. 50% to start, the rest at launch."
- "Domain fees (about $20 to $40 a year) are paid by you, in your name."
- Button: Get a free review.

## 6. Concept sites (`/work`)

Rename the page "Concept sites". Every card has a visible **Concept site** badge and a small tag for the type of business.

Intro: "These are invented businesses. I built them to show what a FieldBourne site looks like and how it handles enquiries on a phone. They are not clients."

| Concept site | Tag |
|---|---|
| Wirebird Electrical, Beaudesert | Trade |
| Lantern Gully Cabins, Rathdowney | Accommodation |
| Sorrel & Slate cafe, Boonah | Food |

- Change the ribbon on every demo (one shared file, `demos/_kit/DemoRibbon.tsx`) to: "Concept site. [Name] is an invented business, built by FieldBourne Digital." Keep the link to `/work`.
- Keep the Lighthouse scores on each card. They're a real, checkable claim.
- TV Magic comes off this page. It's a CRM, not a website, so putting it next to website concepts mixes up two different things. It's on the Services page instead.

## 7. TV Magic case study

You're right that it isn't a website build, and the page shouldn't pretend it is. Keep it, framed as what it is: **custom software and automation for a real business.** It's still useful proof for tier 3 (automation and custom systems), and for any trade business that needs more than a website.

- Title idea: "How TV Magic South Brisbane stopped forwarding every lead by hand."
- Name: "TV Magic South Brisbane". Don't use "TVMagic Companion" (`BRANDING.md` rule).
- Placeholders to fill with Nick:
  - `[Quote from Nick, in his words, 1 to 3 sentences]`
  - `[Result 1: for example hours a week saved, confirmed by Nick]`
  - `[Result 2: for example leads assigned automatically per day]`
  - `[How long it has been running]`
  - `[Photo or video, with Nick's OK]`
- **Take down the unconfirmed number now.** The live page says "~12 hours / week" with "placeholder outcome" next to it. Hide it until Nick confirms.
- Get Nick's written OK to use his name, the business name, any figures and the video. An email is enough. Keep it.
- The CTA at the bottom changes from "walk through Companion live" to "Get a free review" plus a line: "Got admin that eats your evenings? Ask about a process audit."
- Keep the existing CRM app link. Nothing on the site changes how TV Magic logs in or uses the app.

## 8. Local SEO for the Scenic Rim

**On the site**
- Every page gets its own title and description. Beaudesert or the Scenic Rim goes in the homepage, Scenic Rim page and services titles.
- Business details in the page code (JSON-LD, type `ProfessionalService`) on every page:
  - name, URL, email, phone +61 451 177 893
  - founder: Darren
  - `areaServed`: Beaudesert, Boonah, Tamborine Mountain, Canungra, Kalbar, Rathdowney, Aratula, Harrisville, then Scenic Rim Region, Lockyer Valley, Ipswich
  - locality Beaudesert QLD 4285, no street address
- `/scenic-rim` page: what FieldBourne does for local businesses there, the towns covered, the concept sites set in Rathdowney, Boonah and Beaudesert, and the "back local" angle. Real local detail, not a list of keywords.
- **No thin town pages.** One page per town with the same words swapped is what Google calls doorway pages, and it can drag the whole site down. Add a town page only when there's something real to say.
- An updated `sitemap.xml` listing every page, sent to Google Search Console.

**Off the site**
- A Google Business Profile for FieldBourne Digital as a **service-area business**: address hidden, service area set to the Scenic Rim towns, then Lockyer Valley and Ipswich. Category "Website designer". Phone 0451 177 893. Ask every happy client for a review.
- Beaudesert, Boonah and Tamborine Mountain chambers of commerce, and the Scenic Rim Regional Council business directory. Good for referrals as well as being found.
- Same name, phone and email everywhere.

## 8b. Look and feel (from the impeccable critique, 21 October 2026)

The critique scored the current site 15/32: calm and quick, but built from the most common SaaS template parts, and less crafted than the concept sites. Full report: `.impeccable/critique/`. Decisions made by Darren:

**Direction: borrow the concept sites' craft.** The studio site should prove it can make a business feel like itself, the way Wirebird's job docket and Lantern Gully's contour map do. So:
- Real local imagery instead of a fake dashboard. The first screen shows something only FieldBourne can show: a real review PDF page and a before/after.
- One or two solid teal or charcoal sections, and fewer bordered white cards on cream.
- A small amount of material texture or detail tied to the work (for example the review laid out like a printed page), used in one place, not everywhere.
- Drop the template habits: the capitalised badge above every heading, the two-colour headline, "01 to 04" number labels, the coloured bar beside quotes.

**Colours: keep all four hexes, change how they're used.**
- Amber is for fills and marks only (the sun, rules, highlights), never small text. It fails contrast as text (2.2:1).
- Darken the mid grey from `#6B7A7A` to about `#55625F` so body text passes.
- Remove the near-invisible pale grey text.

**Logo: redraw the hill and sun.**
- A clean SVG in exact brand teal and amber, ideally drawn from a real local ridgeline (Mount Barney or the Main Range).
- The mark alone in the nav, beside a typed wordmark. The same mark as the favicon. Retire the teal swoosh.
- One spelling everywhere: **FieldBourne Digital** (confirmed by Darren).
- Write the logo and colour-use rules into `BRANDING.md`.

**Fonts: new heading font, keep Inter for body text.** Present 2 or 3 options with real samples before choosing. Starting candidates, all free to self-host:
- Young Serif: warm, like a country-town printed sign
- Archivo: sturdy, like farm equipment lettering
- Familjen Grotesk: friendly, a little quirky

**Photo of Darren: not yet.** Design around a local landscape image for now, with a clearly marked spot to swap in a photo later. A real photo is still the biggest single trust gain available.

**Also from the critique:**
- A compact menu on phones (there is none today), with tap-to-call in the header.
- Form fields with visible labels, a success message that says what happens next and when, and an email link plus phone number if sending fails.
- No duplicate call-to-action buttons in the same screen.

**Impeccable steps for the build, in order:** `init` (writes `PRODUCT.md` from `CLAUDE.md`), `shape` (homepage and review form, including font samples), `distill`, `adapt`, `harden`, `typeset`, then `polish` and `document`. Rerun `critique` at the end to compare with 15/32.

## 9. Housekeeping that goes with the pivot

- `BRANDING.md`: rewrite sections 1 to 3 (who we are, goal, audience) for the local studio, and change the CTA rule to "Get a free website review". Voice rules stay.
- `AGENTS.md` and `.cursor/rules/`: point to `CLAUDE.md` so Cursor follows the same rules.
- `src/config/site.ts`: add the phone number, and replace the trade-only business types with the form options in section 3.
- `index.html`: replace the "Missed Call Follow-Up for Aussie Tradies" title and description.
- About page: rewrite as the studio story. Darren, Beaudesert based and Queensland raised, a local studio run alongside a full-time job, why small local businesses, "you deal with me". Honest about the size of the business.
- `tools/audit/studio.json`: add the phone number so it appears on review PDFs and quotes.

## 10. Order of work and time

At 5 to 10 hours a week, about 4 weeks.

| # | Work | Rough hours |
|---|---|---|
| 1 | Pre-render fix, move `public/work`, tidy root files, new nav and footer, `site.ts`, `index.html` meta | 4 to 5 |
| 2 | Homepage and review form, privacy update | 5 to 7 |
| 3 | Services and pricing pages | 3 to 4 |
| 4 | Concept sites page, demo ribbon wording, TV Magic page reframed with placeholders | 2 to 3 |
| 5 | `/scenic-rim` page, JSON-LD, sitemap, About rewrite, `BRANDING.md` | 3 to 4 |
| 6 | Look and feel (section 8b): logo redraw, heading font, colour use, phone menu, form labels | 5 to 7 |
| 7 | Check every page: build, Lighthouse, phone screenshots, run our own audit skill and impeccable critique on it, no em dashes, no banned words | 1 to 2 |

Then Darren reviews on a local preview. Nothing is pushed until he says so. The free review automation (section 3) is a separate small project after this.

## Still open

Nothing. Approved by Darren on 21 October 2026: heading, prices and "Quoted per job" wording.
