// Turns saved Formspree notification emails into the CSV that queue.mjs imports.
//
// Usage (from the repo root):
//   node .claude/skills/free-review-queue/scripts/email-to-csv.mjs --dir prospects/_inbox/emails --out prospects/_inbox/emails-<date>.csv
//
// Each .txt file in --dir is the plain text body of one "Free website review request" email.
// Formspree lists every field the form sent by its name, either "name: value" on one line or the
// name on one line and the value underneath. Field order follows src/components/ReviewForm.tsx.
//
// The notes box is the customer's own typing and sits in the middle, so it could contain a fake
// "consentReview" or "email" line. Fields before notes take the first match, fields after notes take
// the last match, and notes is whatever sits between the two. A field that can't be found is left
// blank, and queue.mjs skips any request without consentReview = yes.
// Exit codes: 0 ok, 1 bad input.

import { existsSync } from 'node:fs'
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const rest = process.argv.slice(2)
const args = Object.fromEntries(rest.reduce((acc, a, i, all) => (a.startsWith('--') ? [...acc, [a.slice(2), all[i + 1]]] : acc), []))

const BEFORE = ['name', 'business', 'website', 'town', 'businessType', 'email', 'phone']
const AFTER = ['consentReview', 'consentTips', 'consentVersion', 'page', 'source', 'submittedAt']
const HEADER = [...BEFORE, 'notes', ...AFTER]

// Same quoting as queue.mjs, so a value can't turn into a spreadsheet formula
const csv = (v) => {
  let s = String(v ?? '')
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`
  return `"${s.replace(/"/g, '""')}"`
}

// A field label: the name alone on its line, or "name:" with the value after it
const labelRe = (key) => new RegExp(`^[ \\t>*]*${key}[ \\t*]*(?::[ \\t]*|[ \\t]*$)`, 'gim')

function matches(text, key) {
  return [...text.matchAll(labelRe(key))].map((m) => ({ start: m.index, end: m.index + m[0].length }))
}

// The value runs from the end of its label to the next label (or a blank line for one-line fields)
function valueAt(text, from, to) {
  return text.slice(from, to).replace(/^\s+/, '').split(/\n\s*\n/)[0].trim()
}

function parse(text) {
  // Gmail can hand the HTML email back as a markdown table: "| name | Jo |" becomes "name: Jo"
  text = text
    .replace(/\r\n/g, '\n')
    .replace(/^[ \t]*\|[ \t]*([A-Za-z_]+)[ \t]*\|[ \t]*(.*?)[ \t]*\|?[ \t]*$/gm, (_, k, v) => `${k}: ${v.replace(/<br\s*\/?>/gi, '\n')}`)
    .replace(/^[ \t]*\|?[ \t:|-]+\|[ \t:|-]*$/gm, '')
  const out = {}
  const spans = {}

  let cursor = 0
  for (const key of BEFORE) {
    const m = matches(text.slice(cursor), key)[0]
    if (!m) continue
    spans[key] = { start: cursor + m.start, end: cursor + m.end }
    cursor = spans[key].end
  }
  let tail = text.length
  for (const key of [...AFTER].reverse()) {
    const all = matches(text.slice(0, tail), key)
    const m = all[all.length - 1]
    if (!m || m.start < cursor) continue
    spans[key] = m
    tail = m.start
  }

  const n = matches(text.slice(cursor, tail), 'notes')[0]
  if (n) spans.notes = { start: cursor + n.start, end: cursor + n.end }

  const order = Object.entries(spans).sort((a, b) => a[1].start - b[1].start)
  for (const [i, [key, span]] of order.entries()) {
    const next = order[i + 1]?.[1].start ?? text.length
    // Notes can run over several paragraphs; every other field is one value
    out[key] = key === 'notes' ? text.slice(span.end, next).trim() : valueAt(text, span.end, next)
  }
  return out
}

if (!args.dir || !existsSync(args.dir) || !args.out) {
  console.error('Pass --dir <folder of saved email .txt files> and --out <csv to write>.')
  process.exit(1)
}

const files = (await readdir(args.dir)).filter((f) => f.endsWith('.txt')).sort()
const rows = []
const problems = []
for (const f of files) {
  const r = parse(await readFile(join(args.dir, f), 'utf8'))
  const missing = ['business', 'email', 'consentReview', 'submittedAt'].filter((k) => !r[k])
  if (missing.length) problems.push({ file: f, missing })
  rows.push(r)
}

await writeFile(args.out, [HEADER.join(','), ...rows.map((r) => HEADER.map((k) => csv(r[k])).join(','))].join('\n') + '\n')
console.log(JSON.stringify({ files: files.length, written: args.out, problems }, null, 2))
