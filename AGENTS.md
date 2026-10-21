# FieldBourne Digital: agent guide

Marketing site for [FieldBourne Digital](https://fieldbournedigital.com.au), a one-person local web studio in Beaudesert, QLD.

**`CLAUDE.md` is the main instruction file for this repo.** Read it first: business context, writing rules, outreach compliance and guardrails. Then:

- `BRANDING.md` before any copy or voice change
- `PRODUCT.md` and `DESIGN.md` before any design change
- `docs/site-pivot-plan.md` for the approved site structure

If anything here conflicts with `CLAUDE.md`, follow `CLAUDE.md`.

## Stack

- Vite + React + TypeScript + Tailwind CSS v4
- `npm run build` type-checks, builds, then saves every page as real HTML (`scripts/prerender.mjs`) so search engines get a proper page. New routes must be added to `ROUTES` in `src/App.tsx`.
- Deploy: a push to `main` deploys to GitHub Pages via `.github/workflows/pages.yml`. Never push without Darren's OK.
- Concept sites live in `/demos` and are always labelled as invented businesses.

## Related repo

The FieldBourne Companion CRM app is a separate repo, [tv-magic-companion](https://github.com/missbeardy/tv-magic-companion). Link to it via `src/config/site.ts` (`tvmagicAppUrl`). Don't copy app code into this repo.
