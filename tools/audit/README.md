# Audit pipeline

Scripts behind the `website-audit-report` skill (built in Phase 3).

- Input: a URL, the business type and the town.
- Runs Unlighthouse, the web-quality checks and Playwright screenshots on desktop and mobile.
- Output: a one-page plain-English PDF.

## Commands

From the repo root:

```bash
node tools/audit/audit.mjs --url <url> --type "<business type>" --town "<town>" --out <dir>
node tools/audit/render-report.mjs --in <dir>/report.json
```

- `audit.mjs` measures the site and writes `results.json` plus screenshots. It takes about 3 minutes with the site scan, under 1 minute with `--skip-site-scan`.
- The skill writes `report.json` in plain English, then `render-report.mjs` prints the one-page PDF.
- The Google Business Profile score needs `GOOGLE_PLACES_API_KEY` in `.env` (see `.env.example`).
- `studio.json` holds the footer details (name, email, ABN) used on reports and quotes.

## Where output goes

- Audits of a real business go in `/prospects/<business-slug>/`. That folder is gitignored.
- Test runs on our own site or the demos go in `tools/audit/output/`, also gitignored.

## Tone reference

`prospects/scenic-rim-blinds/website-review-2026-10-13.md` (local only) is the model for how a review should read: plain, specific, honest, no hype.
