// Checks the do-not-contact list and logs where a contact address came from.
//
// Usage (from the repo root):
//   node .claude/skills/outreach-email/scripts/log-contact.mjs check --email <address>
//   node .claude/skills/outreach-email/scripts/log-contact.mjs log --business "<name>" --email <address> \
//     --source-url <url where the business published it> --found <YYYY-MM-DD> --draft <path to draft>
//   node .claude/skills/outreach-email/scripts/log-contact.mjs unsubscribe --email <address> [--note "<text>"]
//
// Files (both gitignored under /prospects):
//   prospects/contact-log.csv     one row per drafted email
//   prospects/do-not-contact.csv  addresses and domains that have opted out
//
// Exit codes: 0 ok, 1 bad input, 4 on the do-not-contact list.

import { existsSync } from 'node:fs'
import { appendFile, mkdir, readFile, writeFile } from 'node:fs/promises'

const [cmd, ...rest] = process.argv.slice(2)
const args = Object.fromEntries(rest.reduce((acc, a, i, all) => (a.startsWith('--') ? [...acc, [a.slice(2), all[i + 1]]] : acc), []))

const LOG = 'prospects/contact-log.csv'
const DNC = 'prospects/do-not-contact.csv'
const today = new Date().toISOString().slice(0, 10)
// Quote every value, and stop spreadsheet apps treating a value as a formula
const csv = (v) => {
  let s = String(v ?? '')
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`
  return `"${s.replace(/"/g, '""')}"`
}

await mkdir('prospects', { recursive: true })
if (!existsSync(LOG)) await writeFile(LOG, 'date_drafted,business,email,source_url,date_found,consent_basis,draft_path,status\n')
if (!existsSync(DNC)) await writeFile(DNC, 'date,email_or_domain,note\n')

const email = (args.email || '').trim().toLowerCase()
const isAddress = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)
const isDomain = cmd === 'unsubscribe' && /^@?[^@\s]+\.[^@\s]+$/.test(email)
if (!isAddress && !isDomain) {
  console.error('A valid --email is required (or @domain for a whole-business unsubscribe).')
  process.exit(1)
}
const domain = email.includes('@') ? email.split('@')[1] : email

async function onDoNotContact() {
  const rows = (await readFile(DNC, 'utf8')).split(/\r?\n/).slice(1).filter(Boolean)
  return rows.some((r) => {
    // Undo the CSV quoting and the formula guard, and drop any leading @, before comparing
    const entry = r.split(',')[1]?.replace(/"/g, '').trim().replace(/^'/, '').replace(/^@/, '').toLowerCase()
    return entry && (entry === email || entry === domain)
  })
}

if (cmd === 'check') {
  if (await onDoNotContact()) {
    console.error(`${email} is on the do-not-contact list. Do not draft.`)
    process.exit(4)
  }
  console.log(`${email} is not on the do-not-contact list.`)
} else if (cmd === 'log') {
  for (const k of ['business', 'source-url', 'found', 'draft']) {
    if (!args[k]) {
      console.error(`Missing --${k}.`)
      process.exit(1)
    }
  }
  try {
    new URL(args['source-url'])
  } catch {
    console.error('--source-url must be the full web address where the business published this email.')
    process.exit(1)
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(args.found)) {
    console.error('--found must be a date like 2026-10-21.')
    process.exit(1)
  }
  if (await onDoNotContact()) {
    console.error(`${email} is on the do-not-contact list. Not logged.`)
    process.exit(4)
  }
  const row = [today, args.business, email, args['source-url'], args.found, 'inferred: conspicuously published by the business', args.draft, 'drafted, not sent']
  await appendFile(LOG, row.map(csv).join(',') + '\n')
  console.log(`Logged ${email} to ${LOG}`)
} else if (cmd === 'unsubscribe') {
  // Store a whole-business opt-out as the bare domain, so nothing needs escaping
  const entry = isAddress ? email : email.replace(/^@/, '')
  await appendFile(DNC, [today, entry, args.note || ''].map(csv).join(',') + '\n')
  console.log(`Added ${email} to ${DNC}`)
} else {
  console.error('Command must be check, log or unsubscribe.')
  process.exit(1)
}
