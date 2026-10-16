import { useCallback, useEffect, useRef, useState } from 'react'
import type { FormEvent, RefObject } from 'react'
import { initialState, reply } from '../_kit/assistant/engine.ts'
import type { AssistantPack, AssistantState } from '../_kit/assistant/types.ts'
import {
  DEMO_CHAT_INPUT,
  DEMO_CHAT_SEND,
  DEMO_CHIP,
  DEMO_LEAD_FIELD,
  DEMO_LEAD_SUBMIT,
  DEMO_REPLY,
} from '../_kit/selectors.ts'
import { fakeMobiles } from '../_kit/fakeData.ts'
import { longLabel, weekends } from './availability.ts'
import packJson from './pack.json'
import type { Ask } from './time.ts'

const pack = packJson as unknown as AssistantPack

interface Msg {
  id: number
  role: 'bot' | 'user'
  text: string
  /** True for answers produced by the engine. */
  engine?: boolean
}

const phone = fakeMobiles[2]
const phoneDigits = phone.split(' ').join('')

const GREETING =
  'Hello. I can check which weekends are free and answer questions about the cabins. Jo reads every enquiry herself.'

type Errors = Partial<Record<string, string>>

export default function Chat({ open, onClose, ask }: { open: boolean; onClose: () => void; ask: Ask }) {
  const [shown, setShown] = useState(false)
  const [msgs, setMsgs] = useState<Msg[]>([{ id: 0, role: 'bot', text: GREETING }])
  const [typing, setTyping] = useState(false)
  const [offerLead, setOfferLead] = useState(false)
  const [leadOpen, setLeadOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const [errors, setErrors] = useState<Errors>({})
  const [weekend, setWeekend] = useState('')
  const [draft, setDraft] = useState('')

  const engine = useRef<AssistantState>(initialState)
  const busy = useRef(false)
  const nextId = useRef(1)
  const log = useRef<HTMLDivElement>(null)
  const input = useRef<HTMLInputElement>(null)
  const card = useRef<HTMLElement>(null)
  const timer = useRef<number | undefined>(undefined)

  const push = useCallback((m: Omit<Msg, 'id'>) => {
    setMsgs((prev) => [...prev, { ...m, id: nextId.current++ }])
  }, [])

  const send = useCallback(
    (raw: string) => {
      const text = raw.trim()
      if (!text || busy.current) return
      busy.current = true
      push({ role: 'user', text })
      setDraft('')
      setTyping(true)
      const r = reply(pack, text, engine.current)
      engine.current = r.state
      timer.current = window.setTimeout(() => {
        setTyping(false)
        push({ role: 'bot', text: r.text, engine: true })
        if (r.showLeadForm) {
          // An unanswered question says "leave your details below", so the form follows it.
          // Any other answer offers the hand-over and lets the visitor choose.
          if (r.text === pack.fallback) setLeadOpen(true)
          else setOfferLead(true)
        }
        const last = r.state.asked[r.state.asked.length - 1]
        if (last && last.startsWith('weekend-')) setWeekend(last.slice('weekend-'.length))
        busy.current = false
      }, r.delayMs)
    },
    [push],
  )

  const startLead = useCallback(() => {
    setOfferLead(false)
    setLeadOpen(true)
  }, [])

  // The panel mounts closed, then slides in, so the first open moves like every later one.
  useEffect(() => {
    const id = window.requestAnimationFrame(() => setShown(open))
    return () => window.cancelAnimationFrame(id)
  }, [open])

  // A question handed over from the page (a date in the availability table) is asked straight away.
  useEffect(() => {
    if (!ask.q) return
    const id = window.setTimeout(() => send(ask.q), 350)
    return () => window.clearTimeout(id)
  }, [ask, send])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  useEffect(() => {
    if (open) window.setTimeout(() => input.current?.focus({ preventScroll: true }), 60)
  }, [open])

  useEffect(() => {
    const el = log.current
    if (el) el.scrollTop = el.scrollHeight
  }, [msgs, typing, offerLead])

  // When the form (or its confirmation) appears, its heading goes to the top of the panel.
  useEffect(() => {
    const el = log.current
    const c = card.current
    if (el && c && (leadOpen || sent)) el.scrollTop = Math.max(0, c.offsetTop - 8)
  }, [leadOpen, sent])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const onSubmitMessage = (e: FormEvent) => {
    e.preventDefault()
    send(draft)
  }

  const onSubmitLead = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const get = (k: string) => String(f.get(k) ?? '').trim()
    const next: Errors = {}
    if (!get('name')) next.name = 'Add your name so Jo knows who to text.'
    if (get('mobile').replace(/\D/g, '').length < 8) next.mobile = 'Enter a mobile number, for example 0491 570 158.'
    if (!get('weekend')) next.weekend = 'Choose a weekend.'
    const email = get('email')
    if (email && !/^\S+@\S+\.\S+$/.test(email)) next.email = 'That email looks incomplete.'
    const guests = Number(get('guests'))
    if (get('guests') && (!guests || guests < 1 || guests > 6)) next.guests = 'Jo sleeps one to six guests.'
    setErrors(next)
    if (next.email || next.guests) setMoreOpen(true)
    if (Object.keys(next).length) return
    setSent(true)
    setLeadOpen(false)
  }

  // The three things Jo needs carry the test hook. The extras sit behind a disclosure.
  const fieldProps = (id: string, required: boolean) => ({
    id: `lead-${id}`,
    name: id,
    required,
    'aria-invalid': errors[id] ? true : undefined,
    'aria-describedby': errors[id] ? `lead-${id}-err` : undefined,
    ...(required ? { [DEMO_LEAD_FIELD]: '' } : {}),
  })

  const showChips = msgs.length === 1

  return (
    <section
      id="lg-chat"
      className={`chat ${shown ? 'is-open' : ''}`}
      role="dialog"
      aria-label="Demo assistant (simulated)"
      aria-hidden={!open}
      inert={!open}
    >
      <header className="chat-head">
        <div>
          <h2 className="chat-title">Demo assistant (simulated)</h2>
          <p className="chat-sub">Answers come from a fixed script about Lantern Gully.</p>
          <a className="chat-text" href={`sms:${phoneDigits}`}>Prefer a text? Jo is on {phone}</a>
        </div>
        <button type="button" className="chat-close" onClick={onClose} aria-label="Close the assistant">
          Close
        </button>
      </header>

      <div className="chat-log" ref={log} role="log" aria-live="polite" aria-relevant="additions">
        {msgs.map((m) => (
          <p key={m.id} className={`msg msg-${m.role}`} {...(m.engine ? { [DEMO_REPLY]: '' } : {})}>
            {m.text}
          </p>
        ))}
        {typing && (
          <p className="msg msg-bot msg-typing" aria-label="The assistant is typing">
            <span /><span /><span />
          </p>
        )}

        {showChips && (
          <div className="chips">
            {pack.chips.map((c) => (
              <button key={c} type="button" className="chip" {...{ [DEMO_CHIP]: '' }} onClick={() => send(c)}>
                {c}
              </button>
            ))}
          </div>
        )}

        {offerLead && !leadOpen && !sent && !typing && (
          <div className="chips">
            <button type="button" className="chip chip-pass" onClick={startLead}>
              Pass this to Jo
            </button>
          </div>
        )}

        {leadOpen && !sent && (
          <form
            className="lead"
            ref={card as RefObject<HTMLFormElement>}
            onSubmit={onSubmitLead}
            noValidate
            aria-label="Send your dates to Jo"
          >
            <h3 className="lead-title">Pass it to Jo</h3>
            <p className="lead-sub">Three details is enough. She replies by text.</p>

            <div className="fld">
              <label htmlFor="lead-name">Your name</label>
              <input type="text" autoComplete="name" {...fieldProps('name', true)} />
              {errors.name && <p className="err" id="lead-name-err">{errors.name}</p>}
            </div>

            <div className="fld">
              <label htmlFor="lead-mobile">Mobile</label>
              <input type="tel" autoComplete="tel" inputMode="tel" {...fieldProps('mobile', true)} />
              {errors.mobile && <p className="err" id="lead-mobile-err">{errors.mobile}</p>}
            </div>

            <div className="fld">
              <label htmlFor="lead-weekend">Which weekend?</label>
              <select value={weekend} onChange={(e) => setWeekend(e.target.value)} {...fieldProps('weekend', true)}>
                <option value="">Choose a weekend</option>
                {weekends.map((w) => (
                  <option key={w.fri} value={w.fri}>{longLabel(w)}</option>
                ))}
              </select>
              {errors.weekend && <p className="err" id="lead-weekend-err">{errors.weekend}</p>}
            </div>

            <details className="lead-more" open={moreOpen} onToggle={(e) => setMoreOpen(e.currentTarget.open)}>
              <summary>Add an email, guests or a note</summary>
              <div className="lead-more-in">
                <div className="fld">
                  <label htmlFor="lead-email">Email</label>
                  <input type="email" autoComplete="email" {...fieldProps('email', false)} />
                  {errors.email && <p className="err" id="lead-email-err">{errors.email}</p>}
                </div>

                <div className="fld">
                  <label htmlFor="lead-guests">How many guests?</label>
                  <input type="number" min={1} max={6} inputMode="numeric" {...fieldProps('guests', false)} />
                  {errors.guests && <p className="err" id="lead-guests-err">{errors.guests}</p>}
                </div>

                <div className="fld">
                  <label htmlFor="lead-note">Anything Jo should know?</label>
                  <textarea rows={3} {...fieldProps('note', false)} />
                </div>
              </div>
            </details>

            <button type="submit" className="btn btn-solid" {...{ [DEMO_LEAD_SUBMIT]: '' }}>
              Send to Jo
            </button>
            <p className="lead-note">Demo only. Nothing is sent anywhere.</p>
          </form>
        )}

        {sent && (
          <div className="sent" ref={card as RefObject<HTMLDivElement>} role="status">
            <svg className="tick" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
              <circle cx="24" cy="24" r="21" pathLength={1} />
              <path d="M14 25.5l7 7 14-16" pathLength={1} />
            </svg>
            <h3 className="lead-title">Sent to Jo</h3>
            <p>{pack.lead.confirmation}</p>
          </div>
        )}
      </div>

      <form className="chat-compose" onSubmit={onSubmitMessage}>
        <label htmlFor="lg-chat-input" className="sr-only">Ask a question</label>
        <input
          id="lg-chat-input"
          ref={input}
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Try: is the 21st free?"
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
