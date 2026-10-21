# Audit pipeline

Scripts behind the `website-audit-report` skill (built in Phase 3).

- Input: a URL, the business type and the town.
- Runs Unlighthouse, the web-quality checks and Playwright screenshots on desktop and mobile.
- Output: a one-page plain-English PDF.

## Where output goes

- Audits of a real business go in `/prospects/<business-slug>/`. That folder is gitignored.
- Test runs on our own site or the demos go in `tools/audit/output/`, also gitignored.

## Tone reference

`prospects/scenic-rim-blinds/website-review-2026-10-13.md` (local only) is the model for how a review should read: plain, specific, honest, no hype.
