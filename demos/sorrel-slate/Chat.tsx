import { useEffect, useId, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { initialState, reply } from '../_kit/assistant/engine.ts'
import type { AssistantPack, AssistantState } from '../_kit/assistant/types.ts'
import {
  DEMO_CHAT_INPUT,
  DEMO_CHAT_OPEN,
  DEMO_CHAT_SEND,
  DEMO_CHIP,
  DEMO_LEAD_FIELD,
  DEMO_LEAD_SUBMIT,
  DEMO_REPLY,
} from '../_kit/selectors.ts'

type Prefill = { guests?: string; date?: string; start?: string }

type Msg =
  | { id: number; role: 'user' | 'bot'; text: string }
  | { id: number; role: 'form'; prefill: Prefill }
  | { id: number; role: 'sent'; text: string }

const DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

export const START_OPTIONS = [
  'Early (7 to 10 am)',
  'Late morning (10 am to noon)',
  'Lunch (noon to 2 pm)',
  'Afternoon (2 to 5 pm)',
  'Evening',
]

export const OCCASIONS = [
  'Birthday',
  'Baby or bridal shower',
  'Wake or memorial',
  'Club, team or work lunch',
  'Workshop or meeting',
  'Something else',
]

function pad(n: number) {
  return String(n).padStart(2, '0')
}

/** Pulls "30 people, Saturday, 2pm" style details out of what the visitor typed. */
export function parseEnquiry(texts: string[], today = new Date()): Prefill {
  const t = texts.join(' ').toLowerCase()
  const out: Prefill = {}
  const g = t.match(/\b(\d{1,3})\s*(?:people|guests|of us|ppl|adults|pax|persons)\b/)
  if (g) out.guests = g[1]
  const d = DAYS.findIndex((name) => new RegExp(`\\b${name}\\b`).test(t))
  if (d >= 0) {
    const next = new Date(today)
    const ahead = (d - today.getDay() + 7) % 7 || 7
    next.setDate(today.getDate() + ahead)
    out.date = `${next.getFullYear()}-${pad(next.getMonth() + 1)}-${pad(next.getDate())}`
  }
  const tm = t.match(/\b(\d{1,2})(?::\d{2})?\s*(am|pm)\b/)
  if (tm) {
    let h = Number(tm[1]) % 12
    if (tm[2] === 'pm') h += 12
    out.start = h < 10 ? START_OPTIONS[0] : h < 12 ? START_OPTIONS[1] : h < 14 ? START_OPTIONS[2] : h < 17 ? START_OPTIONS[3] : START_OPTIONS[4]
  }
  return out
}

function todayISO() {
  const n = new Date()
  return `${n.getFullYear()}-${pad(n.getMonth() + 1)}-${pad(n.getDate())}`
}

function prettyDate(iso: string) {
  if (!iso) return ''
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'long' })
}

interface Docket {
  name: string
  mobile: string
  date: string
  guests: string
  start: string
  occasion: string
}

function LeadForm({
  pack,
  prefill,
  onSent,
}: {
  pack: AssistantPack
  prefill: Prefill
  onSent: (text: string) => void
}) {
  const uid = useId()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [docket, setDocket] = useState<Docket | null>(null)
  const ref = useRef<HTMLFormElement>(null)

  function submit(e: FormEvent) {
    e.preventDefault()
    const f = new FormData(ref.current!)
    const get = (k: string) => String(f.get(k) ?? '').trim()
    const next: Record<string, string> = {}
    if (!get('name')) next.name = 'Add your name so Mel knows who to ask for.'
    if (get('mobile').replace(/\D/g, '').length < 8) next.mobile = 'Add a mobile number Mel can ring or text.'
    const guests = Number(get('guests'))
    if (get('guests') && (guests < 1 || guests > 40)) next.guests = 'The room seats 1 to 40. For more, say so in the notes.'
    setErrors(next)
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0]
      ref.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }
    setDocket({
      name: get('name'),
      mobile: get('mobile'),
      date: get('date'),
      guests: get('guests'),
      start: get('start'),
      occasion: get('occasion'),
    })
    const first = get('name').split(' ')[0]
    const bits = [get('date') ? prettyDate(get('date')) : '', get('guests') ? `${get('guests')} guests` : ''].filter(Boolean).join(', ')
    onSent(`Sent. Mel has it${bits ? `: ${bits}` : ''}. She will text or call ${first} within a day. This is a demo, so nothing was actually sent.`)
  }

  if (docket) {
    const rows: [string, string][] = [
      ['For', docket.name],
      ['Call or text', docket.mobile],
      ['Date', prettyDate(docket.date)],
      ['Guests', docket.guests],
      ['Roughly when', docket.start],
      ['Occasion', docket.occasion],
    ].filter((r): r is [string, string] => Boolean(r[1]))
    return (
      <div className="docket" role="status">
        <p className="docket-sent">Sent. Mel has it.</p>
        <p className="docket-title">Mel will text or call {docket.name.split(' ')[0]} within a day.</p>
        <dl>
          {rows.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <p className="docket-note">{pack.lead.confirmation}</p>
      </div>
    )
  }

  const field = (id: string) => pack.lead.fields.find((x) => x.id === id)!
  const err = (id: string) =>
    errors[id] ? (
      <p className="field-error" id={`${uid}-${id}-err`}>
        {errors[id]}
      </p>
    ) : null
  const plain = (id: string) => ({
    id: `${uid}-${id}`,
    name: id,
    'aria-invalid': errors[id] ? true : undefined,
    'aria-describedby': errors[id] ? `${uid}-${id}-err` : undefined,
  })
  const common = (id: string) => ({
    id: `${uid}-${id}`,
    name: id,
    [DEMO_LEAD_FIELD]: '',
    'aria-invalid': errors[id] ? true : undefined,
    'aria-describedby': errors[id] ? `${uid}-${id}-err` : undefined,
  })
  const label = (id: string) => {
    const f = field(id)
    return (
      <label htmlFor={`${uid}-${id}`}>
        {f.label}
        {f.required ? <span className="req"> (required)</span> : null}
      </label>
    )
  }

  const hasPrefill = Boolean(prefill.guests || prefill.date || prefill.start)

  return (
    <form className="leadform" ref={ref} onSubmit={submit} noValidate>
      <p className="leadform-title">Leave it with Mel</p>
      {hasPrefill ? <p className="leadform-hint">Filled in from what you typed. Change anything that is off.</p> : null}
      <div className="lf-row">
        {label('name')}
        <input type="text" autoComplete="name" {...common('name')} />
        {err('name')}
      </div>
      <div className="lf-row">
        {label('mobile')}
        <input type="tel" autoComplete="tel" inputMode="tel" {...common('mobile')} />
        {err('mobile')}
      </div>
      <div className="lf-pair">
        <div className="lf-row">
          {label('date')}
          <input type="date" min={todayISO()} defaultValue={prefill.date} {...common('date')} />
        </div>
        <div className="lf-row">
          {label('guests')}
          <input type="number" min={1} max={40} inputMode="numeric" defaultValue={prefill.guests} {...common('guests')} />
          {err('guests')}
        </div>
      </div>
      <details className="lf-more">
        <summary>Add details (optional)</summary>
        <div className="lf-more-body">
          <div className="lf-row">
            {label('email')}
            <input type="email" autoComplete="email" {...plain('email')} />
          </div>
          <div className="lf-row">
            {label('start')}
            <select defaultValue={prefill.start ?? ''} {...plain('start')}>
              <option value="">Choose a time</option>
              {START_OPTIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
          <div className="lf-row">
            {label('occasion')}
            <select defaultValue="" {...plain('occasion')}>
              <option value="">Choose one</option>
              {OCCASIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
          <div className="lf-row">
            {label('notes')}
            <textarea rows={3} {...plain('notes')} />
          </div>
        </div>
      </details>
      <button type="submit" className="btn btn-solid" {...{ [DEMO_LEAD_SUBMIT]: '' }}>
        Send to Mel
      </button>
    </form>
  )
}

export function ChatLauncher({ open, tucked, onOpen }: { open: boolean; tucked: boolean; onOpen: () => void }) {
  return (
    <button
      type="button"
      className={`chat-launch${tucked ? ' is-tucked' : ''}`}
      onClick={onOpen}
      hidden={open}
      aria-haspopup="dialog"
      aria-label="Book a function or ask Mel"
      {...{ [DEMO_CHAT_OPEN]: '' }}
    >
      <span className="chat-launch-mark" aria-hidden="true">
        &amp;
      </span>
      Ask Mel
    </button>
  )
}

export function Chat({ pack, open, onClose }: { pack: AssistantPack; open: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Msg[]>([])
  const [typing, setTyping] = useState(false)
  const [draft, setDraft] = useState('')
  const stateRef = useRef<AssistantState>(initialState)
  const idRef = useRef(1)
  const threadRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const timers = useRef<number[]>([])
  const heading = useId()

  useEffect(() => {
    const list = timers.current
    return () => list.forEach((t) => window.clearTimeout(t))
  }, [])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  useEffect(() => {
    const el = threadRef.current
    if (!el) return
    const last = messages[messages.length - 1]
    if (last && last.role === 'form') {
      // Bring the whole short form into view, so "Send to Mel" is on screen without scrolling.
      const forms = el.querySelectorAll<HTMLElement>('.leadform')
      const f = forms[forms.length - 1]
      if (f) {
        const place = () => {
          el.scrollTop = f.offsetHeight + 24 <= el.clientHeight ? el.scrollHeight : Math.max(0, f.offsetTop - 12)
        }
        place()
        const raf = window.requestAnimationFrame(place)
        return () => window.cancelAnimationFrame(raf)
      }
    }
    const toEnd = () => {
      el.scrollTop = el.scrollHeight
    }
    toEnd()
    const raf = window.requestAnimationFrame(toEnd)
    return () => window.cancelAnimationFrame(raf)
  }, [messages, typing])

  function ask(text: string) {
    const q = text.trim()
    if (!q || typing) return
    const userMsg: Msg = { id: idRef.current++, role: 'user', text: q }
    const history = [...messages.filter((m) => m.role === 'user').map((m) => (m as { text: string }).text), q]
    setMessages((m) => [...m, userMsg])
    setDraft('')
    setTyping(true)
    const r = reply(pack, q, stateRef.current)
    stateRef.current = r.state
    const t = window.setTimeout(() => {
      setTyping(false)
      setMessages((m) => {
        const next: Msg[] = [...m, { id: idRef.current++, role: 'bot', text: r.text }]
        if (r.showLeadForm && !m.some((x) => x.role === 'form')) {
          next.push({ id: idRef.current++, role: 'form', prefill: parseEnquiry(history) })
        }
        return next
      })
    }, r.delayMs)
    timers.current.push(t)
  }

  return (
    <section
      className="chat"
      role="dialog"
      aria-labelledby={heading}
      hidden={!open}
      onKeyDown={(e) => {
        if (e.key === 'Escape') onClose()
      }}
    >
      <span className="chat-handle" aria-hidden="true" />
      <header className="chat-head">
        <div>
          <h2 id={heading}>Demo assistant (simulated)</h2>
          <p>Scripted answers about Sorrel &amp; Slate. Mel replies to real enquiries herself.</p>
        </div>
        <button type="button" className="chat-close" onClick={onClose} aria-label="Close the assistant">
          Close
        </button>
      </header>

      <div className="chat-thread" ref={threadRef} aria-live="polite" aria-relevant="additions">
        <p className="bubble bubble-bot">
          G&apos;day. Ask me about the menu, our hours, or a function for up to 40. I can pass the details to Mel.
        </p>
      {messages.length === 0 ? (
          <div className="chat-chips">
            {pack.chips.map((c) => (
              <button key={c} type="button" className="chip" onClick={() => ask(c)} {...{ [DEMO_CHIP]: '' }}>
                {c}
              </button>
            ))}
          </div>
        ) : null}
        {messages.map((m) =>
          m.role === 'form' ? (
            <LeadForm
              key={m.id}
              pack={pack}
              prefill={m.prefill}
              onSent={(text) => setMessages((list) => [...list, { id: idRef.current++, role: 'sent', text }])}
            />
          ) : m.role === 'sent' ? (
            <div key={m.id} className="bubble bubble-sent" role="status">
              <p>{m.text}</p>
              <button type="button" className="chip" onClick={() => inputRef.current?.focus()}>
                Ask something else
              </button>
            </div>
          ) : m.role === 'user' ? (
            <p key={m.id} className='bubble bubble-user'>
              {m.text}
            </p>
          ) : (
            <p key={m.id} className='bubble bubble-bot' {...{ [DEMO_REPLY]: '' }}>
              {m.text}
            </p>
          ),
        )}
        {typing ? (
          <p className="bubble bubble-bot typing" role="status" aria-label="The assistant is typing">
            <span />
            <span />
            <span />
          </p>
        ) : null}
      </div>

      <form
        className="chat-compose"
        onSubmit={(e) => {
          e.preventDefault()
          ask(draft)
        }}
      >
        <label htmlFor={`${heading}-in`} className="sr-only">
          Your message
        </label>
        <input
          id={`${heading}-in`}
          ref={inputRef}
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Type a question"
          autoComplete="off"
          {...{ [DEMO_CHAT_INPUT]: '' }}
        />
        <button type="submit" className="btn btn-solid" {...{ [DEMO_CHAT_SEND]: '' }}>
          Send
        </button>
      </form>
    </section>
  )
}
