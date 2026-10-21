---
target: the new homepage
total_score: 24
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
timestamp: 2026-10-21T09-29-28Z
slug: src-pages-homepage-tsx
---
Method: dual-agent (A: design review sub-agent · B: detector sub-agent)

## Design Health Score (7 and 10 n/a, Persuade surface)

| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | Form states good; concept cards leave the site in the same tab |
| 2 | Match System / Real World | 3 | Plain local voice; "Concept site" is studio jargon |
| 3 | User Control and Freedom | 3 | Native FAQ, Escape closes menu; demo links take you away |
| 4 | Consistency and Standards | 3 | Inner-page intros lose the recognisable skyline; case study CTA copy and button mismatch |
| 5 | Error Prevention | 3 | No-website path handled; town and business type required for no clear reason |
| 6 | Recognition Rather Than Recall | 3 | Mobile header phone is an unlabelled icon |
| 7 | Flexibility and Efficiency | n/a | Persuade surface |
| 8 | Aesthetic and Minimalist Design | 3 | Review explained four times; white strips under concept thumbnails |
| 9 | Error Recovery | 3 | Send-failure state excellent; field validation is browser bubbles only |
| 10 | Help and Documentation | n/a | Persuade surface |
| **Total** | | **24/32** | **Good (75%)**, up from 15/32 |

## Design Specificity Verdict
Authored at both ends (ridgeline hero, the real review artefact on Paddock Deep), template habit in the middle (two grey paragraphs, a 1-2-3 column row, a three-card row, town list, accordion). Inner-page PageIntro shows only foothills, near and paddock layers, so it reads as a generic wave divider at desktop width.

Detector: 3 advisory design-system-font-size findings (HomePage.tsx:67 1.05rem real drift; HomePage.tsx:153 1.35rem and ConceptSites.tsx:59 0.8rem false positives, documented in DESIGN.md). Browser overlay: overused-font (Inter ~80%, false positive, body font by design); /services heading-rhythm x2 (false positive, gap comes from the intro band). Sweep: no amber text, no dashes, all img have alt, no horizontal scroll; 31 sub-44px tap targets on mobile, the real ones being footer links, inline quiet links and the header logo.

## Priority Issues
- [P1] Darren is anonymous on the homepage: "Darren" appears 0 times in HomePage.tsx. Fix: "I'm Darren." in the hero lead, signed line in the form band. /impeccable clarify
- [P1] Concept thumbnails show 16 to 42px white strips inside the aspect-[16/10] frame (ConceptSites.tsx:74). Fix: object-cover object-top, h-full w-full. /impeccable polish
- [P1] Mobile CTA desert: no review button for about 5.5 screens between the deep band and the form. Fix: a teal button after "How it works" or the concept cards, or a compact review button in the mobile header. /impeccable layout
- [P2] Form heavier than the promise: 11 controls, town and business type required. Fix: make both optional, tuck phone, notes and tips box into a details row, move reassurance above the button at 1rem Charcoal. /impeccable distill
- [P2] Middle repeats itself and "How it works" is really a price ladder in three columns. Fix: fold "who it's for" into the Scenic Rim band; restack as rows with prices right-aligned. /impeccable distill, then layout

## Persona Red Flags
Jordan: who is "I"? "Concept site" needs decoding. Riley: white strips look broken; blocked by required business type; case study CTA mismatch; footer "Client login" confuses prospects. Casey: no button for 5+ screens after the deep band. Older Scenic Rim owner outdoors: pale band changes vanish under glare; quiet links 23 to 27px tall; 12.8px badge; sample review unreadable at phone width.

## Minor Observations
Desktop hero right half is empty sky. Form band runs into the same-colour footer with no seam. Two paragraphs before the hero button push it to 64% of the phone screen. Pricing notes band is three cramped columns. Case study has two 3-column text rows back to back.

## Reviewer ideas
(a) Peak or sun at top of inner pages: yes in intent, but not as a floating icon (that is a kicker). Add RIDGES.barney and the sun disc to PageIntro.tsx, still, placed in the empty right third on desktop.
(b) Fewer three-column rows: agree. Restack HomePage.tsx:148, CaseStudyPage.tsx:43 and :56 (merge into one before/after), PricingPage.tsx:86. Keep ConceptSites.tsx:69 (three artefacts compared side by side) and the footer.

## Questions to Consider
With no photo, what is Darren's face? Could the sample review and form carry his signature? Is "How it works" a price list in a process costume? Would a farm-stay owner rather text their web address than fill in 11 controls?
