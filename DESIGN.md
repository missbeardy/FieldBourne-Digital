---
name: FieldBourne Digital
description: A local web studio's site seen from the lookout, the Scenic Rim skyline in soft layered teal under a morning sky.
colors:
  teal: "#1B6B6B"
  teal-hover: "#155757"
  amber: "#E8943A"
  amber-hover: "#DB8429"
  dark: "#1E2A2A"
  mid: "#55625F"
  cream: "#F7F5F2"
  white: "#FFFFFF"
  sky: "#EEF3EF"
  mist: "#E2ECE8"
  line: "#D3DFDA"
  ridge-far: "#C9DCD6"
  ridge-2: "#9DBFB7"
  ridge-3: "#6E9C95"
  ridge-near: "#24403D"
  on-deep: "#DCE7E2"
  on-deep-soft: "#B7CBC4"
typography:
  display:
    fontFamily: "Familjen Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 5.6vw, 4.6rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Familjen Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.9rem, 3.6vw, 2.8rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Familjen Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  body-lead:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 600
    lineHeight: 1.4
  small:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  field: "0.6rem"
  button: "0.65rem"
  frame: "0.75rem"
  panel: "1rem"
  pill: "9999px"
spacing:
  gutter: "20px"
  gutter-md: "32px"
  stack-sm: "32px"
  stack-md: "40px"
  stack-lg: "48px"
  section: "80px"
  section-md: "96px"
  container: "72rem"
  container-reading: "56rem"
components:
  button-primary:
    backgroundColor: "{colors.teal}"
    textColor: "{colors.cream}"
    rounded: "{rounded.button}"
    padding: "0.85rem 1.5rem"
    height: "3rem"
  button-primary-hover:
    backgroundColor: "{colors.teal-hover}"
    textColor: "{colors.cream}"
  button-sun:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.dark}"
    rounded: "{rounded.button}"
    padding: "0.85rem 1.5rem"
    height: "3rem"
  button-sun-hover:
    backgroundColor: "{colors.amber-hover}"
    textColor: "{colors.dark}"
  link-quiet:
    textColor: "{colors.teal}"
    typography: "{typography.label}"
  input-field:
    backgroundColor: "{colors.white}"
    textColor: "{colors.dark}"
    rounded: "{rounded.field}"
    padding: "12px 14px"
  form-panel:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.panel}"
    padding: "36px"
  concept-badge:
    backgroundColor: "{colors.mist}"
    textColor: "{colors.teal}"
    rounded: "{rounded.pill}"
    padding: "4px 10px"
  nav-bar:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.mid}"
    height: "64px"
---

# Design System: FieldBourne Digital

## Overview

**Creative North Star: "The Morning Lookout"**

The site is what a local sees standing at a Scenic Rim lookout early in the day: a pale cream sky fading into mist, the real skyline (Main Range with Mount Cordeaux's spike, Mount Maroon, Mount Barney's two peaks, flat-topped Mount Lindesay) stepping from hazy far ridges to a deep near paddock, and an amber sun sitting behind Barney's eastern shoulder. Everything else on the page is calm, plain and left-aligned, so the landscape and one clear action carry the first screen.

Density is low and the voice is a person, not a product. Sections are bands of ground colour (cream, sky, mist, deep ridge) rather than boxed cards, and they meet the deep ground along a still ridgeline instead of a hard rule. The one authored motion moment is the hero: as you scroll, the far ridges lag and sink behind the near hills and the sun climbs out from behind Barney. With reduced motion, the landscape is a still picture. Copy and voice rules live in `BRANDING.md`; this file is visual only.

The direction rejects the SaaS card-grid template outright: no eyebrow kickers over headings, no rows of feature cards as page structure, no stock gradients or glows.

**Key Characteristics:**
- The real Scenic Rim skyline, drawn once (`RIDGES` paths) and reused as hero, page intro and section edge.
- Teal-tinted haze ramp from far ridge to near paddock; brand teal is the nearest green hill.
- Familjen Grotesk headings, tight and balanced; Inter body at a 66ch reading measure.
- One primary action per screen, with "Or call 0451 177 893" as the quiet amber-underlined alternative.
- Flat ground bands; soft, low shadows only on things you could pick up (screenshots, the form, the review page).

## Colors

A haze palette: one teal family stepping through morning mist, warm cream ground, and a single amber sun.

### Primary
- **Lookout Teal** (teal): the primary button on light ground, the focus ring on light ground (5.74:1 against cream), link text, step numerals, scores, the nearest green hill in the landscape, the logo's hill. Its hover deepens to **Shaded Teal** (teal-hover).

### Secondary
- **Morning Sun** (amber): fills and marks only. The sun disc, the logo's sun, the underline under quiet links, and on deep ground the focus ring (4.65:1 against Paddock Deep) and the button. Its hover is **Late Sun** (amber-hover).

### Neutral
- **Charcoal** (dark): headings and primary text on light ground; the text colour on amber buttons.
- **Gum Shade** (mid): secondary body text, captions, help text and inactive nav links (5.85:1 on cream).
- **Cream** (cream): the page ground, the top of every sky gradient, and text on teal buttons.
- **Paper White** (white): form fields, the form panel and screenshot frames only.
- **Morning Sky** (sky): the middle of the sky gradient and the quiet band behind "How it works" and the pricing notes.
- **Valley Mist** (mist): the bottom of the sky gradient, the "Working across the Scenic Rim" band and the concept badge fill.
- **Fence Line** (line): 1px rules, table row dividers, the nav underline, field borders.
- **Far Range** (ridge-far), **Barney Haze** (ridge-2), **Foothill Sage** (ridge-3): the landscape layers from farthest to nearer. Barney Haze is also the text selection colour and the logo hill on deep ground.
- **Paddock Deep** (ridge-near): the nearest ground in the landscape and the deep section colour (the review explainer, the form band, the footer).
- **Lit Mist** (on-deep) and **Shadowed Mist** (on-deep-soft): body and secondary text on Paddock Deep (8.83:1 and 6.59:1). Headings on deep ground are Cream.

### Named Rules
**The Sun Is Not Ink Rule.** Amber is never text, at any size. It is the sun, an underline, the focus ring on deep ground, or a filled button carrying Charcoal text. Amber on cream measures 2.2:1; it cannot carry words.

**The Teal Light, Amber Deep Rule.** The primary button is teal on light ground and amber on Paddock Deep. Never both on one screen.

**The Haze Order Rule.** Landscape layers always step lighter with distance: Far Range, Barney Haze, Foothill Sage, Lookout Teal, Paddock Deep. Never reorder them or introduce a hue outside the teal family into the hills.

## Typography

**Display Font:** Familjen Grotesk (with ui-sans-serif, system-ui), self-hosted, weights 400 to 700
**Body Font:** Inter (with ui-sans-serif, system-ui), self-hosted, weights 400 to 600

**Character:** Familjen Grotesk's slightly quirky, tight grotesque gives the headings a hand-set local feel without going decorative; Inter keeps the reading plain and legible for older eyes on a phone outdoors.

### Hierarchy
- **Display** (700, clamp 2.6rem to 4.6rem, line-height 1.02, -0.02em): the homepage hero heading only, held to about 15ch so it breaks over three lines above the range.
- **Page title** (700, clamp 2.3rem to 3.8rem, line-height 1.04): the h1 in every inner page's sky intro, held to 18ch. Legal pages use a smaller clamp (2.2rem to 3.2rem).
- **Headline** (700, clamp 1.9rem to 2.8rem, line-height 1.08): section h2s. Charcoal on light ground, Cream on deep.
- **Title** (700, 1.25rem to 1.5rem): h3s in lists and step rows, and the small h2s heading price groups and legal sections.
- **Lead** (Inter 400, 1.125rem, line-height 1.625): the paragraph under a heading, in Gum Shade (or Charcoal at 85% in the hero and on intros). The hero lead scales from 1.1rem to 1.3rem.
- **Body** (Inter 400, 1rem, line-height 1.625): running text at a 66ch measure.
- **Label** (Inter 600, 0.95rem): form labels, nav links, the quiet link. Never uppercase, never tracked out.
- **Small** (Inter 400, 0.875rem): captions, help text, the footer bar, concept site metadata.

All headings use `text-wrap: balance`; paragraphs use `text-wrap: pretty`. Prices and scores use tabular figures.

### Named Rules
**The No Kicker Rule.** Headings stand alone. There is no small uppercase line above a heading, anywhere.

**The Heading Numeral Rule.** When a number is the point (step numbers, Lighthouse scores), it is set in Familjen Grotesk in Lookout Teal, large, with no circle or badge around it.

## Layout

A single left-aligned column inside a 72rem container (max-w-6xl) with 20px side gutters on phones and 32px from 768px up. Reading-led pages (pricing, FAQ, the form band) narrow to 56rem, legal pages to 48rem. Running text never exceeds 66ch.

Sections are full-bleed ground bands stacked vertically: cream, then Paddock Deep, Morning Sky or Valley Mist, each with 80px vertical padding on phones and 96px from 768px (112px for the "who it's for" statement). Inside a section, stacks use 32, 40 or 48px gaps. Two-column splits appear only from 768px (text beside an artefact, two paragraphs side by side, text beside the town list); the "How it works" ladder and the compact concept sites go to three columns. Everything collapses to one column below 768px.

The hero sizes its landscape with one variable, the range height: about 150 to 230px on phones and 220 to 400px from 768px, with the heading block padded so the button always clears the ridges. Each ridge layer keeps the drawing's 16:3 shape and is positioned so Mount Barney sits about 60% across the screen at any width.

### Named Rules
**The Bands Not Boxes Rule.** Page structure is ground colour, not cards. A section changes by changing its background band; content inside a band sits directly on it.

**The Ridgeline Seam Rule.** Where light ground meets Paddock Deep above the form, the join is the still ridgeline (`RidgeEdge`), never a straight edge or a wave divider. Inner pages open on the sky gradient with a low still range along the bottom (`PageIntro`).

## Elevation & Depth

Depth comes from the landscape itself: haze layers, the sky gradient and ground bands. Surfaces are flat. Shadows appear only under objects that read as physical things set on the ground: concept site screenshots, the review form panel, and the sample review page. They are soft, low and long, tinted with Charcoal and pulled in with a negative spread so they read as contact shadow rather than glow.

### Shadow Vocabulary
- **Resting print** (`box-shadow: 0 16px 36px -26px rgba(30,42,42,0.55)`): compact concept site screenshots on the homepage.
- **Form panel** (`box-shadow: 0 18px 40px -28px rgba(30,42,42,0.45)`): the white review form and its sent state, on deep ground.
- **Feature print** (`box-shadow: 0 22px 50px -30px rgba(30,42,42,0.55)`): full-size concept site screenshots on the concept sites page.
- **Paper on deep ground** (`box-shadow: 0 30px 60px -30px rgba(0,0,0,0.6)`): the sample review page sitting on Paddock Deep.

### Named Rules
**The Picked-Up Objects Rule.** Only things you could lift off the page get a shadow. Text blocks, bands, nav and buttons are flat.

## Shapes

Soft but not bubbly. Interactive surfaces have gently rounded corners of about 10px (buttons 0.65rem, fields 0.6rem); screenshot frames 12px; the form panel 16px. Pills (fully round) are reserved for the concept badge and the mobile phone and menu tap targets. The organic form language belongs to the landscape: every curve on the site comes from the `RIDGES` paths or the logo mark (Mount Barney's two peaks with the sun behind the eastern shoulder). Rules and dividers are straight 1px Fence Line.

## Components

### Buttons
Calm, solid, and few.
- **Shape:** gently rounded (0.65rem), minimum height 48px, padding 0.85rem by 1.5rem, Inter 600 at 1.0625rem, never wrapping.
- **Primary (teal):** Lookout Teal fill with Cream text, on any light ground.
- **Sun (amber):** Morning Sun fill with Charcoal text, only on Paddock Deep.
- **Hover / Active:** fill deepens one step over 180ms on `cubic-bezier(0.22, 1, 0.36, 1)`; pressing nudges the button down 1px. Disabled drops to 70% opacity with a progress cursor.
- **Focus:** a 3px outline, 3px offset, 6px radius (global `:focus-visible`): Lookout Teal on light ground, Morning Sun inside deep (`.on-deep`) sections. The same ring applies to every focusable element, links and fields included.

### Quiet Link
The alternative to the primary action, and the style for secondary moves ("Or call 0451 177 893", "See all prices", "All concept sites"). Lookout Teal, Inter 600, no text underline, with a 2px Morning Sun bottom border at 65% that goes solid on hover. On deep ground the text turns Cream. Phone links never wrap.

### Inputs / Fields
- **Style:** Paper White fill, 1px Fence Line border, 0.6rem radius, 12px by 14px padding, 1rem Charcoal text, Gum Shade placeholders. Labels sit above in the Label style; optional fields say "(optional)" in Gum Shade at normal weight.
- **Focus:** border turns Lookout Teal with a 2px teal ring at 20%; the caret is teal.
- **Disabled:** Morning Sky fill, Gum Shade text.
- **Checkboxes:** native, 20px, teal accent colour.
- **Error:** a Morning Sky panel with rounded 12px corners, Charcoal heading line and Gum Shade detail, offering email and phone as alternatives.

### Form Panel
The review form is the one white container on the site: Paper White, 16px radius, 24px padding on phones and 36px from 768px, with the Form panel shadow. It always sits on Paddock Deep under a `RidgeEdge`.

### Navigation
A sticky 64px cream bar at 92% opacity with a light 6px backdrop blur and a 1px Fence Line underline at 70%. Logo left; on desktop, nav links in Gum Shade (0.95rem) turning Charcoal on hover, the current page in Charcoal at 600, and a compact teal "Get a free review" button at the end. On phones, a round teal phone icon and a "Menu" button open a cream panel with full-width links, a full-width primary button and the quiet "Or call" link. Escape closes it.

### Footer
Paddock Deep ground with the light logo (Barney Haze hill), headings in Cream, links in Lit Mist turning Cream on hover, secondary text in Shadowed Mist, and a bottom bar divided by a 1px white rule at 10%.

### Concept Badge
A small Valley Mist pill with Lookout Teal 0.8rem semibold text reading "Concept site". It travels with every concept site wherever it appears, because these are invented businesses. It is a content label, not a heading kicker.

### Ridgelines (signature)
The hero landscape: five ridge layers and the sun, each an SVG in a 1600 by 300 frame, stacked along the bottom of the hero. On scroll, each layer is translated by a fraction of the scroll distance (far range 0.5, sun 0.2, Barney 0.38, foothills 0.24, near hill 0.1, paddock 0) with a small sideways drift that grows with nearness, so the far ridges sink behind the near hills and the sun climbs out from behind Barney. It runs only while the hero is on screen, only through transforms on one animation frame, and not at all under `prefers-reduced-motion`. `RidgeEdge` and `PageIntro` reuse the same paths, still.

### FAQ
A plain list of native disclosure rows between 1px Fence Line rules: question in Charcoal 1.125rem semibold, a teal plus that rotates 45 degrees to a cross over 200ms when open, answer in Gum Shade at reading measure.

## Do's and Don'ts

### Do:
- **Do** keep one primary action per screen, with "Or call 0451 177 893" as the quiet link beside or below it.
- **Do** use the teal button on light ground and the amber button only on Paddock Deep.
- **Do** build new sections as full-bleed ground bands (cream, Morning Sky, Valley Mist, Paddock Deep) with content directly on the band.
- **Do** reuse the `RIDGES` paths for any new landscape moment, in haze order, and keep them still unless they are the hero.
- **Do** honour `prefers-reduced-motion`: the landscape is static and transitions collapse.
- **Do** keep running text to 66ch and secondary text in Gum Shade (never lighter on light ground).
- **Do** label every concept site with the Concept Badge.

### Don't:
- **Don't** set amber as text at any size, including links, prices or numerals.
- **Don't** put a small uppercase kicker or eyebrow line above any heading.
- **Don't** structure a page as rows of cards; the only white container is the review form.
- **Don't** add a second authored motion moment; the scrolling ridgelines are the one.
- **Don't** add shadows to text blocks, bands, nav or buttons.
- **Don't** reorder the haze ramp or bring a non-teal hue into the hills.
- **Don't** invent new primaries; the four brand colours (teal, amber, charcoal, cream) are fixed.
