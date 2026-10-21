---
target: fieldbournedigital.com.au homepage (src/pages/HomePage.tsx)
total_score: 15
max_score: 32
na_heuristics: 7,10
p0_count: 2
p1_count: 3
timestamp: 2026-10-21T03-57-18Z
slug: src-pages-homepage-tsx
---
Method: dual-agent (A: design review, B: detector and browser evidence)

# Critique: fieldbournedigital.com.au (homepage, plus /work and /about), 21 October 2026

## Heuristics (Persuade surface; 7 and 10 n/a)
1 System status 2 | 2 Real world 2 | 3 Control 3 | 4 Consistency 2 | 5 Error prevention 2 | 6 Recognition 2 | 7 n/a | 8 Minimalist 1 | 9 Error recovery 1 | 10 n/a. Total 15/32 (47%, Poor), driven by pivot mismatch and repetition.

## Specificity
Category-interchangeable SaaS template (pill eyebrow, two-tone H1, fake dashboard, card grids, numbered features, accordion FAQ). Nothing says Beaudesert or one local person. /work is the exception and the best visual language on the site.
Detector: home desktop 68, home phone 52, /about 18, /work 7. Contrast clusters: amber text 2.2:1, text-mid 4.1:1, text-grey 1.7:1, white on amber 2.4:1. Also tiny text in the hero mock, line length 96 to 128 chars, numbered labels, hero eyebrow chip, side-tab on /work. False positive: gradient-text on body. CLI ran degraded (regex), 3 findings is a floor.

## Colour and logo verdict
Colours: keep all four hexes. Amber as fill and mark only, never small text. Darken --mid to about #55625F. Fewer tinted cards; one or two solid teal/charcoal sections with real local photos.
Logo: keep hill-and-sun concept, redraw as SVG in exact brand hexes (ideally a real local ridgeline), mark alone in nav beside a live-text wordmark, same mark as favicon, retire the swoosh, one spelling of the name.
Fonts: Plus Jakarta Sans plus Inter flagged as overused; a brand decision for the owner.

## Priority issues
1. [P0] First screen sells the wrong business (lead catcher eyebrow, missed-call H1, CRM dashboard with Sydney suburbs). Fix: approved H1 in one colour, local line, Get my free review, tap-to-call 0451 177 893, replace dashboard with real review PDF and before/after, real photo of Darren. shape then bolder.
2. [P0] No mobile menu; CTA duplicated in first phone screen. Fix: compact menu with plan's 4 links, tap-to-call in header, full links in footer. adapt.
3. [P1] Homepage bloat: 13 sections, 8 steps, 8 FAQs, founder and TV Magic twice, CTA x4. Fix: plan's 8 sections, 3 steps, max 5 FAQs, remove TV Magic, Foundational Client and stop-the-leak band from home. distill.
4. [P1] Contrast and form accessibility: amber 2.2:1, grey ticks 1.7:1, mid 4.1:1, white on amber 2.4:1, placeholder-only fields, no aria-pressed on chips, error with no link. Fix: darker small text, visible labels, type tel/url, success message with what happens next, mailto and phone on error, plan's fields and consent. harden then audit.
5. [P1] Logo and identity inconsistency: raster lockup in white box, unrelated swoosh favicon, yellow sun, two spellings. Fix: redraw, consolidate, one spelling, write rules into BRANDING.md. polish then document.

## Persona red flags
Jordan: CRM jargon, "Sites we've built" then "fictional", three hero CTAs.
Casey: no menu, all-text first screen, no tap-to-call, unreadable tick line, blank video box while loading.
Scenic Rim owner, 50s: no face, phone or town; Sydney suburbs; "Premium setup at our entry rate", "Foundational Client", "No credit card" read as city agency; trade-only chips exclude them.

## Minor
D monogram placeholder instead of a photo; index.html title still the old offer; FAQ has no open/closed indicator; 88px phone header button and "Digital" dropped; off-palette LIVE NOW green; side-tab on /work notes; reframe "What FieldBourne means" as paddock and creek.

## Questions
Could a Boonah cafe owner tell this was made locally without the logo? Should the studio site borrow the concept sites' craft? Would a redrawn local ridgeline beat any colour change?
