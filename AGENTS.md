# FieldBourne Digital — agent guide

Marketing site for [FieldBourne Digital](https://fieldbournedigital.com.au). Static HTML/CSS/JS deployed to GitHub Pages.

**Before any copy or voice changes, read [`BRANDING.md`](BRANDING.md) first.** It is the source of truth for tone, banned words, and copy patterns.

## Repo role

| Repo | Purpose |
|------|---------|
| **This repo** (`FieldBourne-Digital`) | Public marketing site, case study, contact form |
| [tv-magic-companion](https://github.com/missbeardy/tv-magic-companion) | FieldBourne Companion web app (separate repo, legacy repo name) |

Do not merge app code into this repo. Link to the app via `assets/site-config.js` (`tvmagicAppUrl`).

## Stack

- Plain HTML pages at repo root (no build step, no framework)
- Shared styles: `assets/styles.css`
- Shared behaviour: `assets/site.js`
- Runtime config: `assets/site-config.js` (load before `site.js`)

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Homepage |
| `about.html` | Founder / company story |
| `tvmagic.html` | FieldBourne Companion case study |
| `privacy.html`, `terms.html` | Legal |

## Brand tokens

Use CSS variables from `assets/styles.css`:

- Teal `#1B6B6B` → `--teal`
- Amber `#E8943A` → `--amber`
- Charcoal `#1E2A2A` → `--dark`
- Cream `#F7F5F2` → `--bg`
- Headings: Plus Jakarta Sans · Body: Inter
- Logo mark: `assets/logo-mark.svg`

Wordmark pattern: `Field<span class="logo-bourne">bourne</span> Digital`

## Editing conventions

- Copy new nav/footer blocks from an existing page; keep links consistent.
- Prefer CSS classes over inline styles except for one-off page tweaks.
- Put URLs and contact details in `site-config.js`, not hard-coded in multiple files.
- Contact form uses Formspree when `formEndpoint` is set; otherwise falls back to `mailto:`.
- Client login footer link reads `tvmagicAppUrl` from config (see `index.html`).

## Local preview

```bash
npm install
npm run dev
```

Open [http://localhost:8080](http://localhost:8080).

## Deploy

Push to `main` → `.github/workflows/pages.yml` deploys the repo root to GitHub Pages.

Custom domain: `fieldbournedigital.com.au` via `CNAME`.

## Scope for changes

Keep diffs small. This site is marketing copy and layout, not the job-management product. Feature work for FieldBourne Companion belongs in `tv-magic-companion`.
