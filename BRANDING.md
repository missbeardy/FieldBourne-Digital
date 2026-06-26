# FieldBourne Digital — Brand Reference

**Purpose of this file:** the single source of truth for voice, tone, colour, and copy rules across all FieldBourne Digital and product (FieldBourne Companion, future verticals) content. Any human writer or LLM drafting copy for the website, app UI, emails, social, or sales should read this first.

---

## 1. Who We Are (in one breath)

FieldBourne Digital builds modular job-management software for Australian trade businesses — leads, scheduling, and follow-ups, configured around how a trade actually works, connected to the tools they already use. We are not a generic CRM and not a bespoke dev shop. One platform, many trades, built from proven modules.

**FieldBourne Companion** is Product 1. The same platform, configured for TV aerial/satellite franchise businesses. It is our proof, not our ceiling. (Legacy name: TVMagic Companion. Do not use on the marketing site.)

---

## 2. Brand Goal

Every piece of copy should move a busy, skeptical trade business owner one step closer to **booking a free chat**, by sounding like a person who has actually watched tradies duct-tape spreadsheets, text messages, and a calendar together, and built something better. Never like a SaaS company that has never held a drill.

**The job of the copy is to be believed, not to be impressive.**

---

## 3. Audience

- Solo tradies and small trade teams (1–10 people): TV aerial, electrical, plumbing, solar, HVAC, general field service
- Franchise head offices needing multi-site visibility without franchisees seeing each other's data
- Time-poor, low tech-tolerance, skeptical of software sales pitches, currently juggling 3+ disconnected tools
- They don't want to be sold to. They want someone to say "yeah, that's annoying, here's how we fix it" and then actually show them.

---

## 4. Voice & Tone

**We sound like:** a tradie-turned-builder explaining something useful to another tradie over a coffee. Direct, warm, plain-spoken, quietly confident. Short sentences. Real numbers and real scenarios over abstract claims.

**We do NOT sound like:** a SaaS pitch deck, a corporate consultancy, or a hype-bro. No exclamation-mark energy. No pretending this is more exciting than it is — job management software is useful, not thrilling, and the copy shouldn't oversell that.

### Tone pillars
1. **Honest over impressive** — if a claim can't be backed by something real (a live client, a number, a feature that exists today), don't make it.
2. **Specific over abstract.** "missed call on Tuesday, text on Saturday, email at midnight" beats "capture every lead."
3. **Second person, present tense** — talk *to* the reader about *their* day, not about the product in the abstract.
4. **Confident, not pushy** — state what it does plainly; let the reader decide. No false urgency, no fake scarcity.
5. **Plain language** — no jargon. If a word wouldn't be said out loud on a job site, don't write it. "Configured" is borderline; use sparingly.

---

## 5. The "Don'ts" — Words & Patterns to Avoid

**Banned punctuation:**
- **Em dashes (—)** in any customer-facing copy. Use a comma, full stop, colon, or split into two sentences instead.

**Banned words/phrases (SaaS jargon, hype, or false urgency):**
- "Revolutionize," "game-changer," "disrupt," "unlock," "supercharge," "10x"
- "Leverage" (as a verb), "seamless," "synergy," "best-in-class," "cutting-edge"
- "Solution" used as a noun for the product itself ("our solution helps you…")
- "Empower," "elevate," "streamline" — overused SaaS filler, says nothing concrete
- Exclamation marks in headlines or body copy (fine, very sparingly, in casual micro-copy only)
- Fake urgency: "Limited spots," "Act now," "Don't miss out"
- Vague superlatives with no proof behind them: "the best," "the easiest," "the most powerful"
- Em-dash-stacked corporate cadence ("Powerful. Flexible. Scalable."). Three-word fragment lists read like a stock photo caption

**Structural don'ts:**
- Don't open with the product name or company name — open with the reader's problem or outcome
- Don't stack two CTAs with no differentiation in the same viewport
- Don't claim multi-client traction we don't have yet. We have one live client (a TV aerial franchise on FieldBourne Companion). Say so, specifically, until that's no longer true. "Loved by trades businesses" with one client is a lie of implication.
- Don't hide the live-client proof (the showcase widget / case study) behind generic trust badges — specificity is the moat while the client list is short
- Don't use stock "tech support" tone ("Our team is here to help!") — Darren personally responds; say that instead

---

## 6. Colours

Source of truth: `assets/styles.css` `:root` variables. Never hardcode hex values in components — always reference these tokens (or the org-config equivalent for white-label tenants).

| Token | Hex | Use |
|---|---|---|
| `--teal` | `#1B6B6B` | Primary brand colour — logo, primary buttons, links, headline accents |
| `--teal` (hover) | `#155757` | Hover/active state for teal elements |
| `--teal-lt` | `#EAF3F3` | Light teal background tint (cards, highlights) |
| `--amber` | `#E8943A` | Accent colour — "bourne" in wordmark, eyebrows, badges, secondary emphasis |
| `--amber-lt` | `#FDF3E8` | Light amber background tint (eyebrow pills) |
| `--dark` | `#1E2A2A` | Primary text colour, headings |
| `--mid` | `#6B7A7A` | Secondary/body text, subheadings |
| `--grey` | `#C4BDB4` | Borders, dividers, low-emphasis trust text |
| `--bg` | `#F7F5F2` | Page background (warm cream, not white) |
| `--white` | `#FFFFFF` | Cards, button text on dark/teal backgrounds |

**Fonts:**
- Headings: Plus Jakarta Sans, weight 700–800
- Body: Inter, weight 400–500

**Note: this is the FieldBourne Digital parent brand palette.** FieldBourne Companion (the product app) may use org-specific theming via org-config. Do not mix parent-site teal/amber with product tenant palettes unless intentional for a demo.

---

## 7. Proven Copy Patterns (steal these structures)

These patterns are already working in live copy — reuse the *structure*, not necessarily the exact words, for new sections/products.

- **Headline pattern:** `[Action]. Not [the painful alternative].` → *"Run your jobs. Not your inbox."*
- **Eyebrow pattern:** short, lowercase-feel category label above a heading → *"Job management for trade businesses"*
- **Pain section opener:** *"Sound familiar?"* — invites self-recognition before pitching anything
- **Proof over claim:** show a live, specific number/scenario (3 new leads today, 12 open jobs) rather than a generic feature list
- **Founder voice, first person, unpolished:** *"I'd rather show you it working than talk at you about features."*
- **Friction-reducer micro-copy:** *"No credit card. We respond within one business day."* — specific, not vague reassurance
- **CTA verb:** "Book a free chat" — never "Book a demo," "Request a consultation," or "Get started" (too generic/corporate for this audience)

---

## 8. Quick Self-Check Before Publishing Any Copy

Ask of every new section or line:
1. Would Darren actually say this out loud to a tradie? If not, rewrite it.
2. Is every claim backed by something real (a live client, a number, an existing feature)?
3. Does it talk about the reader's day, or about the product's features in the abstract?
4. Did I use any em dash? (Never in customer-facing copy.)
5. Did I use any word from the banned list in Section 5?
6. Are the colours/fonts pulled from the tokens in Section 6, not hardcoded or guessed?

---

*Last updated: June 2026. Update this file whenever brand voice, colours, or core positioning change — this is the reference for all future copy, human or LLM-generated.*
