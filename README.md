# FieldBourne Digital

Marketing website for [FieldBourne Digital](https://fieldbournedigital.com.au) — modular job management systems for Australian trade businesses.

## Brand

| Token | Value |
|-------|-------|
| Primary teal | `#1B6B6B` |
| Accent amber | `#E8943A` |
| Dark charcoal | `#1E2A2A` |
| Warm cream | `#F7F5F2` |
| Headings | Plus Jakarta Sans |
| Body | Inter |

Logo mark: `assets/logo-mark.svg` (Path mark — Option 2)

## Pages

- `index.html` — Homepage
- `about.html` — Founder and company story
- `tvmagic.html` — FieldBourne Companion case study
- `privacy.html` / `terms.html` — Legal

## Configuration

Edit `assets/site-config.js`:

- `formEndpoint` — your [Formspree](https://formspree.io) form URL (falls back to `mailto:` until set)
- `tvmagicAppUrl` — FieldBourne Companion app login URL
- `clientVideoYoutubeId` — client testimonial embed (swap when real clip is ready)
- `clientVideoFirstName` — first name only in client proof section

## Deployment (GitHub Pages)

1. Repo **Settings → Pages → Build and deployment → GitHub Actions**
2. Push to `main` — workflow `.github/workflows/pages.yml` deploys the site
3. Custom domain `fieldbournedigital.com.au` is configured via `CNAME` and DNS at your registrar:
   - `A` records → GitHub Pages IPs, or
   - `CNAME` `www` → `missbeardy.github.io`
4. Enable **Enforce HTTPS** in Pages settings

## Local preview

```bash
npm install
npm run dev
```

Open [http://localhost:8080](http://localhost:8080).

No build step — the repo root is served as static files. Use this instead of opening HTML files directly in the browser so links and form referrer logic work correctly.

## AI / agent context

- `BRANDING.md` — voice, tone, colours, and copy rules (read first for any copy work)
- `AGENTS.md` — project guide for Cursor and other coding agents
- `.cursor/rules/` — always-on conventions for this repo

## Related repos

| Repo | Role |
|------|------|
| [FieldBourne-Digital](https://github.com/missbeardy/FieldBourne-Digital) | This marketing site |
| [tv-magic-companion](https://github.com/missbeardy/tv-magic-companion) | FieldBourne Companion web app (repo name legacy) |

Repo URLs are also in `assets/site-config.js` under `repos`.
