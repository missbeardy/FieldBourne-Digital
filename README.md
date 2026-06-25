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
- `tvmagic.html` — TVMagic Companion case study
- `privacy.html` / `terms.html` — Legal

## Configuration

Edit `assets/site-config.js`:

- `formEndpoint` — your [Formspree](https://formspree.io) form URL (falls back to `mailto:` until set)
- `tvmagicAppUrl` — TVMagic Companion login URL

## Deployment (GitHub Pages)

1. Repo **Settings → Pages → Build and deployment → GitHub Actions**
2. Push to `main` — workflow `.github/workflows/pages.yml` deploys the site
3. Custom domain `fieldbournedigital.com.au` is configured via `CNAME` and DNS at your registrar:
   - `A` records → GitHub Pages IPs, or
   - `CNAME` `www` → `missbeardy.github.io`
4. Enable **Enforce HTTPS** in Pages settings

## Local preview

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

## Related repos

- [tv-magic-companion](https://github.com/missbeardy/tv-magic-companion) — TVMagic Companion web app (separate repo)
