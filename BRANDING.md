# FieldBourne Digital: brand reference

**Purpose of this file:** the single source of truth for voice, tone, colour, logo and copy rules for FieldBourne Digital. Any human writer or LLM drafting copy for the website, reviews, emails, quotes or social should read this first. Visual system details (spacing, components, motion) live in `DESIGN.md`.

---

## 1. Who we are (in one breath)

FieldBourne Digital is Darren, a one-person local web studio in Beaudesert, Queensland. He reviews small businesses' websites for free, builds and looks after websites, and sets up automations that take repeat admin off their hands. The domain and website always stay in the client's name.

TV Magic South Brisbane is the one real client so far, running on a custom CRM Darren built (FieldBourne Companion). It is proof of automation and custom software, not of website work. The concept sites in `/demos` are invented businesses and are always labelled that way.

---

## 2. Brand goal

Every piece of copy should move a busy, wary local business owner one step closer to **asking for a free website review**, by sounding like someone from the area who knows what they're doing and will tell it straight. Never like a city agency or a software company.

**The job of the copy is to be believed, not to be impressive.**

---

## 3. Audience

- Small local businesses and solo operators: tradies, cafes, farm stays, shops, makers, clinics. Scenic Rim first, then Lockyer Valley, Ipswich, Logan and Greater Brisbane.
- Often older, time-poor, and burnt before by web people who overcharged or disappeared.
- Mostly reading on a phone, sometimes outdoors, sometimes on a weak signal.
- They like to back a local. A face, a town and a phone number earn more trust than any badge.

---

## 4. Voice and tone

**We sound like:** a local who builds websites, explaining something useful over the counter. Direct, warm, plain-spoken, quietly confident. Short sentences. Real examples over abstract claims. First person: "I", not "we".

**We do NOT sound like:** a SaaS pitch deck, a corporate consultancy, or a hype merchant. No exclamation-mark energy. No pretending a website is more exciting than it is.

### Tone pillars
1. **Honest over impressive.** If a claim can't be backed by something real, don't make it.
2. **Specific over abstract.** "There's no call button on the first screen of a phone" beats "the mobile experience could be improved".
3. **Second person, present tense.** Talk to the reader about their business and their customers.
4. **Confident, not pushy.** State what it does plainly and let the reader decide. No false urgency, no fake scarcity.
5. **Plain language.** If a word wouldn't be said at the farm gate or on a job site, don't write it. Explain any technical idea by what it does.

---

## 5. The don'ts: words and patterns to avoid

**Banned punctuation:**
- **Em dashes** in any customer-facing copy. Use a comma, full stop, colon, or split into two sentences. Avoid en dashes as punctuation too.

**Banned words and phrases (jargon, hype, or false urgency):**
- "Revolutionize," "game-changer," "disrupt," "unlock," "supercharge," "10x"
- "Leverage" (as a verb), "seamless," "synergy," "best-in-class," "cutting-edge"
- "Solution" used as a noun for what we sell ("our solution helps you...")
- "Empower," "elevate," "streamline": overused filler that says nothing concrete
- Exclamation marks in headlines or body copy
- Fake urgency: "Limited spots," "Act now," "Don't miss out"
- Vague superlatives with no proof: "the best," "the easiest," "the most powerful"
- Three-word fragment lists ("Fast. Local. Affordable.") that read like a stock photo caption

**Structural don'ts:**
- Don't open with the company name. Open with the reader's outcome or problem.
- Don't put two different calls to action side by side in the same screen. One main action ("Get a free website review"), with "Or call 0451 177 893" as the quiet alternative.
- Don't put a small capitalised label above a heading. Let the heading speak.
- Don't claim clients, results or reviews we don't have. One real client, three concept sites. Say so.
- Never present a concept site as a client.
- Don't use stock support tone ("Our team is here to help!"). Darren answers his own phone; say that instead.

---

## 6. Colours, type and logo

Source of truth: `src/index.css` `@theme`. Never hardcode new colours in components.

| Token | Hex | Use |
|---|---|---|
| `teal` | `#1B6B6B` | Primary brand colour: logo hill, primary buttons, links |
| `teal-hover` | `#155757` | Hover state for teal |
| `amber` | `#E8943A` | **Fills and marks only**: the sun, the main button on dark ground, underlines. Never small text (it fails contrast) |
| `dark` | `#1E2A2A` | Headings and main text |
| `mid` | `#55625F` | Secondary text (darkened from #6B7A7A so it passes contrast) |
| `cream` | `#F7F5F2` | Page background |
| `sky`, `mist` | `#EEF3EF`, `#E2ECE8` | Quiet section grounds, the morning sky |
| `ridge-far` to `ridge-near` | `#C9DCD6` to `#24403D` | The Scenic Rim layers, farthest to nearest; `ridge-near` is the deep section and footer ground |

**Fonts:**
- Headings: Familjen Grotesk, weight 600 to 700
- Body: Inter, weight 400 to 600

**Logo:**
- The mark is Mount Barney's two peaks in teal with the amber sun rising behind the eastern shoulder. Source: `src/components/Logo.tsx`. The favicon (`public/favicon.svg`) is the same mark.
- Always shown next to the typed name "FieldBourne Digital". Never the old raster lockup, never the old teal swoosh.
- On dark ground the hill switches to `#9DBFB7` so it stays visible. The sun stays amber.
- The name is always **FieldBourne Digital**, capital B.

---

## 7. Proven copy patterns

- **Main heading:** "Websites for local businesses, from someone local."
- **Local line:** "Beaudesert based and Queensland raised. I know the area, and I know how your customers talk."
- **Main call to action:** "Get a free website review" (short: "Get a free review", in a button: "Get my free review"). Never "Book a demo", "Get started" or "Book a free chat".
- **Secondary action:** "Or call 0451 177 893" as a quiet text link.
- **Proof over claim:** show the real thing, such as a real review page, a concept site, or the TV Magic story, rather than adjectives.
- **Founder voice, first person:** "I'd rather show you that than make claims."
- **Reassurance that is specific:** "Within 2 business days. Free, and no obligation." "Your domain stays in your name."
- **Prices are published** as starting prices from `docs/pricing.md`, with "No GST charged" stated plainly.
- **Review form:** labelled fields, an unticked consent box for the review emails, and an optional box for tips. Say what happens next and when.

---

## 8. Quick self-check before publishing any copy

1. Would Darren say this out loud to a local business owner? If not, rewrite it.
2. Is every claim backed by something real?
3. Does it talk about the reader's business and customers, or about us?
4. Any em dash? (Never in customer-facing copy.)
5. Any word from the banned list in section 5?
6. Are colours and fonts from section 6, with amber never used for small text?

---

*Last updated: October 2026, for the studio pivot. Update this file whenever voice, colours or positioning change.*
