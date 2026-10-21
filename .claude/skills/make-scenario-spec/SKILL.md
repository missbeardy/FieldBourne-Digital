---
name: make-scenario-spec
description: Turn a chosen business process into a Make.com scenario build spec (blueprint) covering trigger, modules, field mapping, filters and routes, error handling, running cost and test cases, ready for Darren to build or hand over. Use this whenever Darren wants to plan, spec, design or scope a Make (Integromat) scenario or automation, build the pilot from a process audit, or asks "how would I automate this in Make", even if he doesn't say "spec" or "blueprint".
---

# Make scenario spec

A build spec Darren can follow in the Make editor without having to think again, and that someone else could pick up later. It's written before anything is built, so problems show up on paper and not in a client's inbox.

## Inputs

- **The process**: usually the pilot from `process-audit-interview`, or Darren's description.
- **The apps involved**, and which accounts and plans the client has.
- Anything known about volumes: how many enquiries, bookings or invoices a week.

If the trigger, the apps or the end result are unclear, ask before writing. A spec built on a guess wastes build time.

## Tool choice

1. **Make.com**, by default.
2. **Zapier**, only for a step where the app has no Make app or HTTP access. Say which step and why.
3. **Custom code**, only for heavy or complex logic (big data volumes, tricky maths, long-running jobs). Say where it would run.

Before naming a Make module, check it exists. Use Context7 or Make's docs for the app's module names and fields. If the Make MCP server is connected, you can read the client's existing scenarios and connections. Don't create or change anything in Make without Darren saying yes to that specific change. If you couldn't confirm a module name, mark it `(check in Make)`.

## Things to get right in Queensland

- **Time zone**: `Australia/Brisbane`. Queensland has no daylight saving, but customers and apps in NSW and Victoria do. Set the time zone explicitly in every date function and scenario setting.
- **Dates**: show customers dates as `D MMMM YYYY` (21 October 2026). Phone numbers: store as `+61`, show as `04xx xxx xxx`.
- **GST**: if the scenario creates invoices or quotes, the amounts and tax rates must match the client's Xero or MYOB settings. Never hard-code GST.
- **Sensitive data**: no clinical notes or diagnoses through Make. Make stores execution data in the EU or US, so say so if personal data passes through.
- **Ownership**: the scenario lives in the client's own Make organisation, on their plan, with their connections. Darren is added as a team member.

## Output

Save to `clients/<client>/make-spec-<short-process-name>-<YYYY-MM-DD>.md` (gitignored). Use this structure:

```markdown
# Make scenario: <what it does, in plain words>
Client · date · status: spec, not built

## What it does
Two or three sentences a business owner would understand. Before and after.

## Trigger
App and module, instant (webhook) or scheduled (how often), and why.

## Modules
| # | App | Module | What it does | Notes |
Number them in run order. Include routers and filters as their own rows.

## Field mapping
For each module that writes data:
| Target field | Source (module # and field) | Transform | Example |
Transforms in Make function syntax, for example formatDate(1.start; "D MMMM YYYY"; "Australia/Brisbane").

## Filters and routes
Each condition in plain words and in Make terms.

## Error handling
For each module that can fail: what can go wrong, the error handler (Resume, Ignore, Break with retries, Rollback, Commit), and who gets told how. Turn on "Allow storing of incomplete executions". Say how someone would notice a silent failure.

## Data stores and connections
Every connection the client must authorise, and any data store with its fields.

## Running cost
Operations (credits) per run × runs a month = monthly total, and the Make plan that covers it. Plus any other app costs.

## Test cases
| # | Situation | Input | Expected result |
At least: the normal case, a missing or odd field, a duplicate, an app being down, and a time-zone edge (for example a booking from Sydney during daylight saving).

## Switching it off
How to pause it, and what the business does by hand while it's off.

## Handover notes
What the client needs to know in plain words. What to do if it emails them an error.
```

If Darren asks for a blueprint file he can import into Make, write `blueprint.json` next to the spec in Make's export format. Label it untested, and tell him to check every module after import, because export formats change.

Writing rules: Australian English, no em dashes, plain words in every section the client will read, nothing from the `BRANDING.md` banned list.

## Hand back

Give Darren the file path, the module count, the monthly running cost, any `(check in Make)` items, and anything the client must set up or approve before the build.
