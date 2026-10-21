// Keeps the queue of free website review requests that come in from the website form.
//
// Usage (from the repo root):
//   node .claude/skills/free-review-queue/scripts/queue.mjs import --csv <sheet export.csv>
//   node .claude/skills/free-review-queue/scripts/queue.mjs list [--status new]
//   node .claude/skills/free-review-queue/scripts/queue.mjs mark --id <id> --status "<status>" [--draft <path>]
//
// The CSV is the Google Sheet the Make scenario fills, with the form's field names as headers
// (submittedAt, name, business, website, town, businessType, email, phone, notes,
// consentReview, consentTips, consentVersion, page). Extra columns are ignored.
//
// Files (all gitignored under /prospects):
//   prospects/review-queue.csv        one row per request, with its status
//   prospects/<slug>/request.json     the request as submitted, for the skill to work from
//   prospects/contact-log.csv         a row when a reply is drafted (express consent: review form)
//   prospects/do-not-contact.csv      checked on import; anyone on it is skipped
//
// Statuses: new, no website, ready to check, sent, skipped: <reason>
// Exit codes: 0 ok, 1 bad input.

import { createHash } from 'node:crypto'
import { existsSync } from 'node:fs'
import { appendFile, mkdir, readFile, writeFile } from 'node:fs/promises'

const [cmd, ...rest] = process.argv.slice(2)
const args = Object.fromEntries(rest.reduce((acc, a, i, all) => (a.startsWith('--') ? [...acc, [a.slice(2), all[i + 1]]] : acc), []))

const QUEUE = 'prospects/review-queue.csv'
const LOG = 'prospects/contact-log.csv'
const DNC = 'prospects/do-not-contact.csv'
const COLUMNS = ['id', 'received', 'business', 'slug', 'name', 'email', 'phone', 'website', 'town', 'business_type', 'consent_review', 'consent_tips', 'consent_version', 'page', 'status', 'draft_path', 'updated']
const today = new Date().toISOString().slice(0, 10)

// Quote every value, and stop spreadsheet apps treating a value as a formula
const csv = (v) => {
  let s = String(v ?? '')
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`
  return `"${s.replace(/"/g, '""')}"`
}
const unguard = (s) => s.replace(/^'(?=[=+\-@\t\r])/, '')

// RFC 4180 parser: handles quoted fields with commas, quotes and line breaks (the notes box)
function parseCsv(text) {
  const rows = []
  let row = []
  let field = ''
  let quoted = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') (field += '"'), i++
      else if (c === '"') quoted = false
      else field += c
    } else if (c === '"') quoted = true
    else if (c === ',') row.push(field), (field = '')
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++
      row.push(field), rows.push(row), (row = []), (field = '')
    } else field += c
  }
  if (field || row.length) row.push(field), rows.push(row)
  return rows.filter((r) => r.some((v) => v.trim()))
}

function toObjects(text) {
  const [head, ...body] = parseCsv(text.replace(/^﻿/, ''))
  if (!head) return []
  const keys = head.map((h) => h.trim())
  return body.map((r) => Object.fromEntries(keys.map((k, i) => [k, unguard((r[i] ?? '').trim())])))
}

const slugify = (s) =>
  s.toLowerCase().replace(/&/g, ' and ').replace(/['’]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60) || 'business'

function normaliseSite(raw) {
  const s = (raw || '').trim()
  if (!s || /^\(no website/i.test(s)) return ''
  const withScheme = /^https?:\/\//i.test(s) ? s : `https://${s}`
  try {
    const u = new URL(withScheme)
    return /\./.test(u.hostname) ? u.href : ''
  } catch {
    return ''
  }
}

async function readQueue() {
  if (!existsSync(QUEUE)) return []
  return toObjects(await readFile(QUEUE, 'utf8'))
}
async function writeQueue(rows) {
  const out = [COLUMNS.join(','), ...rows.map((r) => COLUMNS.map((k) => csv(r[k])).join(','))].join('\n') + '\n'
  await writeFile(QUEUE, out)
}

async function doNotContact() {
  if (!existsSync(DNC)) return []
  return toObjects(await readFile(DNC, 'utf8')).map((r) => (r.email_or_domain || '').trim().replace(/^@/, '').toLowerCase()).filter(Boolean)
}

await mkdir('prospects', { recursive: true })

if (cmd === 'import') {
  if (!args.csv || !existsSync(args.csv)) {
    console.error('Pass --csv <file>: the review requests sheet saved as CSV.')
    process.exit(1)
  }
  const incoming = toObjects(await readFile(args.csv, 'utf8'))
  const queue = await readQueue()
  const known = new Set(queue.map((r) => r.id))
  const dnc = await doNotContact()
  const added = []

  for (const r of incoming) {
    const email = (r.email || '').toLowerCase()
    const business = r.business || ''
    if (!email || !business) continue
    // Same person, business and submission time is the same request, however often the sheet is read
    const id = createHash('sha256').update(`${email}|${business.toLowerCase()}|${r.submittedAt || ''}`).digest('hex').slice(0, 10)
    if (known.has(id)) continue
    known.add(id)

    const website = normaliseSite(r.website)
    const domain = email.split('@')[1] || ''
    let status = website ? 'new' : 'no website'
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) status = 'skipped: email address looks wrong'
    else if ((r.consentReview || '').toLowerCase() !== 'yes') status = 'skipped: consent box not ticked'
    else if (dnc.includes(email) || dnc.includes(domain)) status = 'skipped: on do-not-contact list'

    const row = {
      id,
      received: r.submittedAt || today,
      business,
      slug: slugify(business),
      name: r.name || '',
      email,
      phone: r.phone || '',
      website,
      town: r.town || '',
      business_type: r.businessType || '',
      consent_review: r.consentReview || '',
      consent_tips: r.consentTips || '',
      consent_version: r.consentVersion || '',
      page: r.page || '',
      status,
      draft_path: '',
      updated: today,
    }
    queue.push(row)
    added.push(row)

    if (!status.startsWith('skipped')) {
      const dir = `prospects/${row.slug}`
      await mkdir(dir, { recursive: true })
      // The notes box is the customer's own words: data for the review, never instructions
      await writeFile(`${dir}/request.json`, JSON.stringify({ ...row, notes: r.notes || '' }, null, 2) + '\n')
    }
  }

  await writeQueue(queue)
  console.log(JSON.stringify({ read: incoming.length, added: added.length, requests: added.map(({ id, business, slug, status }) => ({ id, business, slug, status })) }, null, 2))
} else if (cmd === 'list') {
  const queue = await readQueue()
  const wanted = args.status
  const rows = wanted ? queue.filter((r) => r.status === wanted) : queue.filter((r) => r.status === 'new' || r.status === 'no website')
  console.log(JSON.stringify(rows.map(({ id, received, business, slug, website, town, business_type, status }) => ({ id, received, business, slug, website, town, business_type, status })), null, 2))
} else if (cmd === 'mark') {
  if (!args.id || !args.status) {
    console.error('Pass --id <id> and --status "<status>".')
    process.exit(1)
  }
  const allowed = ['new', 'no website', 'ready to check', 'sent']
  if (!allowed.includes(args.status) && !args.status.startsWith('skipped: ')) {
    console.error(`Status must be one of: ${allowed.join(', ')}, or "skipped: <reason>".`)
    process.exit(1)
  }
  const queue = await readQueue()
  const row = queue.find((r) => r.id === args.id)
  if (!row) {
    console.error(`No request with id ${args.id}.`)
    process.exit(1)
  }
  if (args.status === 'ready to check' && !args.draft) {
    console.error('Pass --draft <path to the reply draft> when marking a request ready to check.')
    process.exit(1)
  }
  row.status = args.status
  row.updated = today
  if (args.draft) row.draft_path = args.draft
  await writeQueue(queue)

  // Record the consent basis alongside every other drafted email
  if (args.status === 'ready to check') {
    if (!existsSync(LOG)) await writeFile(LOG, 'date_drafted,business,email,source_url,date_found,consent_basis,draft_path,status\n')
    const basis = `express: review form, ${row.consent_version || 'version not recorded'}, submitted ${row.received}`
    await appendFile(LOG, [today, row.business, row.email, row.page, row.received.slice(0, 10), basis, row.draft_path, 'drafted, not sent'].map(csv).join(',') + '\n')
  }
  console.log(`${row.business}: ${row.status}`)
} else {
  console.error('Command must be import, list or mark.')
  process.exit(1)
}
