# FieldBourne Digital — agent guide

Marketing site for [FieldBourne Digital](https://fieldbournedigital.com.au).

**Before any copy or voice changes, read [`BRANDING.md`](BRANDING.md) first.**

## Repo role

| Repo | Purpose |
|------|---------|
| **This repo** (`FieldBourne-Digital`) | Public marketing site |
| [tv-magic-companion](https://github.com/missbeardy/tv-magic-companion) | FieldBourne Companion web app (separate repo) |

Do not merge app code into this repo. Link to the app via `src/config/site.ts` (`tvmagicAppUrl`).

## Stack

- Vite + React + TypeScript + Tailwind CSS v4
- Motion (`motion/react`) for page motion (respect `prefers-reduced-motion`)
- Deploy: `npm run build` → GitHub Pages from `dist/`
- Legacy static HTML kept under `legacy/` for reference
- Copy drafts under `copy/`

## Brand tokens

Map exact hex values in `src/index.css` `@theme` (do not invent new primaries):

- Teal `#1B6B6B` · Amber `#E8943A` · Charcoal `#1E2A2A` · Cream `#F7F5F2`
- Headings: Plus Jakarta Sans · Body: Inter
- Logo mark: `public/logo-mark.svg`

## Pages (React routes)

| Route | Purpose |
|------|---------|
| `/` | Homepage (lead catcher) |
| `/about` | Founder / company story |
| `/fieldbourne` | Companion case study (`/tvmagic` redirects here) |
| `/privacy`, `/terms` | Legal |

## Local preview

```bash
npm install
npm run dev
```

## Deploy

Push to `main` → `.github/workflows/pages.yml` builds and deploys `dist/`.

Custom domain: `fieldbournedigital.com.au` via `public/CNAME`.

## Scope for changes

Keep diffs focused. Feature work for FieldBourne Companion belongs in `tv-magic-companion`.
