# FieldBourne Digital

Read this before doing any work in this repo. When this file and another doc disagree, this file wins.

## The business

- **Owner:** Darren, solo founder, Beaudesert QLD. Runs this alongside a full-time job, 5 to 10 hours a week. Builds with Claude and Cursor.
- **What it is now:** a local web studio for small rural and regional businesses, plus automation consulting. It used to be a field service CRM (SaaS). The CRM is no longer the headline product.
- **Existing client:** TV Magic South Brisbane uses the FieldBourne CRM (FieldBourne Companion). They stay on it and are happy to be named as a case study.
- **Target market, in order:**
  1. Scenic Rim
  2. Lockyer Valley and Ipswich
  3. Logan and Greater Brisbane
- **Who it's for:** small local businesses and solo operators, and the locals who want to back them. Keep site copy general rather than built around one industry. Trades, accommodation and local food are useful examples (they match the concept sites), not the only audience.
- **Local angle:** Darren is Beaudesert based and Queensland raised. He knows the area and how locals talk.
- **Contact:** phone 0451 177 893, email admin@fieldbournedigital.com.au. Free reviews go back within 2 business days.
- **Pricing:** `docs/pricing.md`. Not registered for GST, so no GST is charged.

### Offer ladder

1. **Free website review** with a quick mockup of improvements. This is the main call to action.
2. **Website build plus a monthly care plan.**
3. **Automation and AI assistants.** Make.com by default. Zapier only when an app has no Make support. Custom code only for heavy or complex logic. The FieldBourne CRM and the tradie bundle live in this tier.

### Hosting tiers

- Client-owned builder: Squarespace, Wix, Shopify.
- Static site Darren hosts: Astro, the AstroWind template, Cloudflare Pages.
- Managed WordPress: VentraIP.
- Domain and DNS always sit in the client's name.
- Never use Vercel Hobby for paid work.

## Writing rules

These apply to everything you produce: site copy, docs, emails, reports, proposals, code comments meant for people.

- Australian English (colour, organise, licence as a noun, GST, ABN).
- No em dashes. Use a comma, full stop or colon, or split the sentence.
- No corporate or hype language. The banned word list is in `BRANDING.md` section 5.
- Plain words a rural business owner would use. If it wouldn't be said out loud at the farm gate or on a job site, don't write it.
- Be specific and honest. Don't claim results, clients or numbers we don't have.

## Brand guide

- `BRANDING.md` at the repo root. Read it before any copy or voice change.
- Sections 4 to 8 (voice, banned words, colours, copy patterns, self-check) are current.
- Sections 1 to 3 still describe the old CRM product. Use the business context above instead until they are rewritten.
- Brand colours live in `src/index.css` `@theme`. Teal `#1B6B6B`, amber `#E8943A`, charcoal `#1E2A2A`, cream `#F7F5F2`. Don't invent new primaries.
- Fonts: Plus Jakarta Sans for headings, Inter for body.

## Demo sites

The sites in `/demos` are invented brands. On the website they must always be clearly labelled as concept work, never presented as clients or as real businesses.

| Folder | Brand | Type of business |
|---|---|---|
| `demos/wirebird` | Wirebird Electrical, Beaudesert | Trades |
| `demos/lantern-gully` | Lantern Gully Cabins, Rathdowney | Accommodation |
| `demos/sorrel-slate` | Sorrel & Slate cafe, Boonah | Food |

TV Magic South Brisbane is a real client, but of the FieldBourne CRM (custom software, tier 3), not a website build. Show it as an automation and custom software example, never as website work.

## Outreach compliance

Allowed channels:

- Compliant cold email.
- Manual one-to-one LinkedIn messages.
- Chambers of commerce and referrals.

Not allowed:

- Cold Facebook DMs.
- Automated outreach or scraping of any kind.

Every cold email must meet the Spam Act 2003:

- Only send to an address the business published itself (its own website, Google Business Profile, directory listing it supplied). No guessed or bought addresses.
- The message must be relevant to their business.
- It must include Darren's name and ABN.
- It must include a working unsubscribe, and unsubscribes must be honoured.
- Record where each address came from and the date it was found.
- The free review form on the website gives express consent to email. Keep a record of that consent.

## Repo facts

- Stack: Vite, React, TypeScript, Tailwind CSS v4, Motion. Respect `prefers-reduced-motion`.
- `npm run build` must keep passing.
- A push to `main` deploys the live site to GitHub Pages (`.github/workflows/pages.yml`). Treat any push to `main` as a deploy.
- Site settings (form endpoint, ABN, email, CRM link) live in `src/config/site.ts`.
- The CRM app is a separate repo: [tv-magic-companion](https://github.com/missbeardy/tv-magic-companion). Don't copy app code into this repo.
- `AGENTS.md` and `.cursor/rules/` carry older instructions for other tools. If they conflict with this file, follow this file.
- Never run `git add -A` or `git add .`. Add files by explicit path.

## Guardrails

- Never push, deploy, send email or post anything without asking Darren first.
- No secrets, API keys or client data in git. Use `.env` (gitignored). Keep `/prospects` gitignored.
- No scraping of Google Maps, LinkedIn or Facebook. The Google Places API is fine, but only `place_id` may be stored.
- Keep the existing CRM working for TV Magic. Don't break it.
- When unsure, ask. Don't assume.
