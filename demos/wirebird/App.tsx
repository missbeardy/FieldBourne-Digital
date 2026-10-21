import { useCallback, useEffect, useId, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { DemoRibbon } from '../_kit/DemoRibbon.tsx'
import { fakeEmail, fakeMobiles } from '../_kit/fakeData.ts'
import {
  DEMO_CHAT_INPUT,
  DEMO_CHAT_OPEN,
  DEMO_CHAT_SEND,
  DEMO_CHIP,
  DEMO_LEAD_FIELD,
  DEMO_LEAD_SUBMIT,
  DEMO_REPLY,
} from '../_kit/selectors.ts'
import { initialState, reply } from '../_kit/assistant/engine.ts'
import type { AssistantPack, AssistantState } from '../_kit/assistant/types.ts'
import packJson from './pack.json'

const pack = packJson as unknown as AssistantPack

const PHONE = fakeMobiles[0]
const PHONE_HREF = `tel:${PHONE.replace(/\s/g, '')}`
const EMAIL = fakeEmail('cal')

const attr = (name: string) => ({ [name]: '' })

const JOB_OPTIONS = [
  'Switchboard upgrade',
  'Smoke alarms',
  'Solar-ready upgrade',
  'Rural pump or bore',
  'Power points or lights',
  'Fault finding',
  'Something else',
]
/* Stops on Cal's route sheet, with a rough drive time from Beaudesert. */
const TOWNS = [
  { name: 'Kooralbyn', mins: 15 },
  { name: 'Canungra', mins: 20 },
  { name: 'Tamborine', mins: 25 },
  { name: 'Rathdowney', mins: 30 },
  { name: 'Boonah', mins: 35 },
  { name: 'Aratula', mins: 40 },
  { name: 'Kalbar', mins: 40 },
  { name: 'Mount Alford', mins: 45 },
]
/* Loose compass bearings (degrees clockwise from north) for the route diagram. Distance is the drive time. */
const BEARING: Record<string, number> = {
  Tamborine: 28,
  Canungra: 88,
  Rathdowney: 158,
  Kooralbyn: 195,
  Aratula: 255,
  'Mount Alford': 281,
  Boonah: 306,
  Kalbar: 342,
}
const KNOWN_PLACES = ['Beaudesert', ...TOWNS.map((t) => t.name)]
const isKnownPlace = (v: string) => {
  const q = v.trim().toLowerCase()
  return KNOWN_PLACES.some((p) => {
    const k = p.toLowerCase()
    return k.startsWith(q) || q.startsWith(k)
  })
}

const TIMING_OPTIONS = ['As soon as possible', 'This week', 'Within a month', 'Just pricing for now']

type Msg = { id: number; from: 'bot' | 'user'; text: string; isReply?: boolean }
type Lead = { job: string; suburb: string; timing: string; name: string; mobile: string }
type Errors = Partial<Record<'job' | 'suburb' | 'timing' | 'contact', string>>

/* The chat topic that sets the docket's job line, so a customer who asked about smoke alarms is not asked again. */
const TOPIC_JOB: Record<string, string> = {
  switchboard: 'Switchboard upgrade',
  smoke: 'Smoke alarms',
  solar: 'Solar-ready upgrade',
  pumps: 'Rural pump or bore',
  tripping: 'Fault finding',
}
const topicJob = (asked: string[]) => {
  for (let i = asked.length - 1; i >= 0; i--) if (TOPIC_JOB[asked[i]]) return TOPIC_JOB[asked[i]]
  return ''
}

const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* ------------------------------------------------------------------ marks */

function BirdMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 44 26" aria-hidden="true" focusable="false">
      <path
        className="bird-body"
        d="M3 10.2 10.6 8c3.4-3 8.6-2.4 10.4 1.4 6.2 1.3 14.2 4.9 20 11l-9.2-1.3c-2.8 2.4-8.4 2.6-12.2.2C14.6 17.6 11.6 15 10.6 12.4z"
      />
      <path className="bird-legs" d="M19.6 19.6v4.4M24.4 20.2v3.8" />
    </svg>
  )
}

function Tick() {
  return (
    <svg className="tick" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <path d="M3 10.5 8 15.5 17 5" />
    </svg>
  )
}

/* ----------------------------------------------------------------- header */

function Header() {
  const menuRef = useRef<HTMLDetailsElement>(null)
  const closeMenu = () => menuRef.current?.removeAttribute('open')
  return (
    <header className="top">
      <DemoRibbon className="ribbon ribbon--top" name="Wirebird Electrical" />
      <div className="bar wrap">
        <a className="brand" href="#top" aria-label="Wirebird Electrical, back to top">
          <BirdMark className="brand__mark" />
          <span className="brand__name">
            Wirebird <span>Electrical</span>
          </span>
        </a>
        <nav className="nav" aria-label="Page sections">
          <a href="#quote">Quote</a>
          <a href="#rates">Rates</a>
          <a href="#cal">About Cal</a>
          <a href="#area">Where we go</a>
        </nav>
        <details className="menu" ref={menuRef}>
          <summary>Menu</summary>
          <nav aria-label="Page sections menu">
            <a href="#quote" onClick={closeMenu}>Quote</a>
            <a href="#rates" onClick={closeMenu}>Rates</a>
            <a href="#cal" onClick={closeMenu}>About Cal</a>
            <a href="#area" onClick={closeMenu}>Where we go</a>
          </nav>
        </details>
        <a className="bar__tel mono" href={PHONE_HREF}>
          {PHONE}
        </a>
      </div>
    </header>
  )
}

/* ------------------------------------------------------------------- hero */

function Hero({ onQuote }: { onQuote: () => void }) {
  return (
    <section className="hero wrap" aria-labelledby="hero-title">
      <div className="hero__copy">
        <h1 id="hero-title">Power playing up? Cal will sort it.</h1>
        <p className="lede">
          Owner-operator electrician with one apprentice, based in Beaudesert. Switchboards, solar-ready
          upgrades, rural pumps and smoke alarms across the Scenic Rim.
        </p>
        <div className="cta">
          <button type="button" className="btn btn--orange" onClick={onQuote} {...attr(DEMO_CHAT_OPEN)}>
            Get a quote
          </button>
          <a className="btn btn--line cta__call" href={PHONE_HREF}>
            Call <span className="mono">{PHONE}</span>
          </a>
        </div>
      </div>

      <figure className="docket" aria-label="A sample job docket">
        <div className="docket__stack"><div className="docket__sheet docket__sheet--back" aria-hidden="true" />
        <div className="docket__sheet">
          <div className="docket__head">
            <span className="docket__title">Job docket</span>
            <span className="mono docket__no">No. 0417</span>
          </div>
          <dl className="docket__rows">
            <div>
              <dt>Date</dt>
              <dd className="mono">16/10</dd>
            </div>
            <div className="docket__more">
              <dt>Where</dt>
              <dd>Kooralbyn</dd>
            </div>
            <div>
              <dt>Job</dt>
              <dd>Replace switchboard, safety switch on every circuit</dd>
            </div>
            <div className="docket__more">
              <dt>Tested</dt>
              <dd>RCD trip times, polarity, earth continuity</dd>
            </div>
            <div className="docket__more">
              <dt>Photos</dt>
              <dd>
                <span className="mono">6</span> before and after
              </dd>
            </div>
            <div className="docket__total">
              <dt>Total</dt>
              <dd className="mono">$1,850.00</dd>
            </div>
          </dl>
          <div className="docket__tear docket__more">
            <span>Customer copy</span>
          </div>
          <span className="stamp stamp--rot" aria-hidden="true">
            Tested and signed
          </span>
        </div></div>
        <figcaption className="docket__cap docket__more">Sample docket. Every job ends with one like this.</figcaption>
      </figure>
    </section>
  )
}

function Wire() {
  return (
    <div className="wire" aria-hidden="true">
      <BirdMark className="wire__bird" />
    </div>
  )
}

/* ------------------------------------------------------------------ stage */

type TodayRow = { time: string; job: string; place: string; status: string; tone: 'done' | 'live' | 'next' }
const TODAY_ROWS: TodayRow[] = [
  { time: '7:30', job: 'Smoke alarm swap', place: 'Rathdowney', status: 'Done', tone: 'done' },
  { time: '10:00', job: 'Switchboard upgrade', place: 'Kooralbyn', status: 'On site', tone: 'live' },
  { time: '1:30', job: 'Pump controller fault', place: 'Boonah', status: 'Booked', tone: 'next' },
  { time: '3:30', job: 'Solar-ready check', place: 'Canungra', status: 'Booked', tone: 'next' },
]

function Stage() {
  const uid = useId()
  const [state, setState] = useState<AssistantState>(initialState)
  const stateRef = useRef<AssistantState>(initialState)
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      id: 0,
      from: 'bot',
      text: "G'day, I am the Wirebird quote assistant. This is a demo and nothing real is sent. Ask about a job, or fill in the docket.",
    },
  ])
  const [typing, setTyping] = useState(false)
  const typingRef = useRef(false)
  const [draft, setDraft] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [formKey, setFormKey] = useState(0)
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState<Lead | null>(null)
  const [buzz, setBuzz] = useState(false)
  const [notif, setNotif] = useState(false)
  const [rowIn, setRowIn] = useState(false)
  const [booked, setBooked] = useState(false)
  const [jobSel, setJobSel] = useState('')
  const jobTouched = useRef(false)
  const [live, setLive] = useState({ suburb: '', timing: '', contact: '' })

  const nextId = useRef(1)
  const logRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLDivElement>(null)
  const timers = useRef<number[]>([])
  const later = useCallback((fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms))
  }, [])

  useEffect(() => {
    const t = timers.current
    return () => t.forEach((id) => window.clearTimeout(id))
  }, [])

  useEffect(() => {
    const el = logRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [msgs, typing])

  /* After each reply, keep the newest message and the input on screen, above the call bar. */
  useEffect(() => {
    if (msgs.length < 2) return
    const ask = inputRef.current?.closest('form')
    ask?.scrollIntoView({ block: 'nearest', behavior: prefersReduced() ? 'instant' : 'smooth' })
  }, [msgs])

  /* When the docket opens, bring it into view. */
  const formWrapRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!formOpen) return
    const id = window.setTimeout(
      () =>
        formWrapRef.current?.scrollIntoView({ block: 'nearest', behavior: prefersReduced() ? 'instant' : 'smooth' }),
      240,
    )
    return () => window.clearTimeout(id)
  }, [formOpen])

  const [farSuburb, setFarSuburb] = useState(false)
  const checkSuburb = (v: string) => setFarSuburb(v.trim().length >= 3 && !isKnownPlace(v))

  useEffect(() => {
    if (jobTouched.current) return
    const j = topicJob(state.asked)
    if (j) setJobSel(j)
  }, [state.asked])

  const pushMsg = useCallback((m: Omit<Msg, 'id'>) => {
    setMsgs((cur) => [...cur, { ...m, id: nextId.current++ }])
  }, [])

  const send = useCallback(
    (text: string) => {
      const q = text.trim()
      if (!q || typingRef.current) return
      pushMsg({ from: 'user', text: q })
      setDraft('')
      const r = reply(pack, q, stateRef.current)
      typingRef.current = true
      setTyping(true)
      later(() => {
        pushMsg({ from: 'bot', text: r.text, isReply: true })
        stateRef.current = r.state
        setState(r.state)
        if (r.showLeadForm) setFormOpen(true)
        typingRef.current = false
        setTyping(false)
      }, r.delayMs)
    },
    [later, pushMsg],
  )

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const get = (k: string) => String(fd.get(k) ?? '').trim()
    const lead: Lead = {
      job: get('job'),
      suburb: get('suburb'),
      timing: get('timing'),
      name: '',
      mobile: '',
    }
    /* One field for name and mobile: the digits are the number, the letters are the name. */
    const contact = get('nameMobile')
    const digits = contact.replace(/\D/g, '')
    lead.mobile = (contact.match(/\+?\d[\d\s()-]*\d/)?.[0] ?? digits).trim()
    lead.name = contact.replace(/[\d+()\-.]/g, ' ').replace(/\s+/g, ' ').trim() || 'A customer'
    const next: Errors = {}
    if (!lead.job) next.job = 'Choose the closest job.'
    if (lead.suburb.length < 2) next.suburb = 'Add your suburb or town.'
    if (!lead.timing) next.timing = 'Choose how soon.'
    if (digits.length < 8 || digits.length > 12) next.contact = 'Add your name and a mobile Cal can ring back.'
    setErrors(next)
    if (Object.keys(next).length) {
      const form = e.currentTarget
      later(() => form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(), 0)
      return
    }
    const reduced = prefersReduced()
    setSent(lead)
    pushMsg({ from: 'bot', text: pack.lead.confirmation })
    const phone = phoneRef.current
    if (phone) {
      const r = phone.getBoundingClientRect()
      const inView = r.top >= 0 && r.bottom <= window.innerHeight
      if (!inView) phone.scrollIntoView({ block: 'center', behavior: reduced ? 'instant' : 'smooth' })
    }
    later(() => {
      setNotif(true)
      setBuzz(true)
    }, reduced ? 0 : 250)
    later(() => setBuzz(false), reduced ? 0 : 1100)
    later(() => setRowIn(true), reduced ? 0 : 600)
  }

  const reset = () => {
    timers.current.forEach((id) => window.clearTimeout(id))
    timers.current = []
    setSent(null)
    setNotif(false)
    setBuzz(false)
    setRowIn(false)
    setBooked(false)
    setFarSuburb(false)
    setErrors({})
    jobTouched.current = false
    setJobSel(topicJob(state.asked))
    setLive({ suburb: '', timing: '', contact: '' })
    setFormKey((k) => k + 1)
  }

  const onFormChange = (e: FormEvent<HTMLFormElement>) => {
    const fd = new FormData(e.currentTarget)
    const get = (k: string) => String(fd.get(k) ?? '').trim()
    setLive({ suburb: get('suburb'), timing: get('timing'), contact: get('nameMobile') })
  }

  const fieldErr = (k: keyof Errors) => (errors[k] ? `${uid}-${k}-err` : undefined)
  const fieldLabel = (id: string) => pack.lead.fields.find((f) => f.id === id)?.label ?? id

  const smsText = sent
    ? `${sent.name} (${sent.mobile}) wants ${sent.job.toLowerCase()} in ${sent.suburb}. Timing: ${sent.timing.toLowerCase()}.`
    : ''

  return (
    <section className="stage wrap" id="quote" aria-labelledby="stage-title">
      <div className="stage__intro">
        <h2 id="stage-title">Answer four questions. Cal&apos;s phone buzzes.</h2>
        <p>
          Try the quote assistant. It is a simulation and nothing is sent, but this is exactly how an enquiry
          reaches a tradie who is up a ladder.
        </p>
      </div>

      <div className="stage__grid">
        {/* ---------------- assistant */}
        <div className={`panel assistant${formOpen ? ' has-form' : ''}`} id="assistant" aria-label="Quote assistant">
          <div className="panel__head">
            <BirdMark className="panel__mark" />
            <span>Demo assistant (simulated)</span>
          </div>

          <div className="log" ref={logRef} role="log" aria-live="polite" aria-label="Conversation">
            {msgs.map((m) => (
              <p key={m.id} className={`msg msg--${m.from}`} {...(m.isReply ? attr(DEMO_REPLY) : {})}>
                {m.text}
              </p>
            ))}
            {typing && (
              <p className="msg msg--bot msg--typing" aria-label="The assistant is typing">
                <i />
                <i />
                <i />
              </p>
            )}
          </div>

          {state.turns === 0 && (
            <div className="chips" role="group" aria-label="Suggested questions">
              {pack.chips.map((c) => (
                <button key={c} type="button" className="chip" onClick={() => send(c)} {...attr(DEMO_CHIP)}>
                  {c}
                </button>
              ))}
            </div>
          )}

          <form
            className="ask"
            onSubmit={(e) => {
              e.preventDefault()
              send(draft)
            }}
          >
            <label className="sr" htmlFor={`${uid}-ask`}>
              Ask the assistant a question
            </label>
            <input
              id={`${uid}-ask`}
              ref={inputRef}
              type="text"
              value={draft}
              maxLength={160}
              autoComplete="off"
              placeholder="Ask about a job"
              onChange={(e) => setDraft(e.target.value)}
              {...attr(DEMO_CHAT_INPUT)}
            />
            <button type="submit" className="btn btn--ink" disabled={typing} {...attr(DEMO_CHAT_SEND)}>
              Send
            </button>
          </form>

          {!formOpen && !sent && (
            <div className="altpath">
              <button type="button" className="btn btn--line" onClick={() => setFormOpen(true)}>
                Or fill in the docket
              </button>
            </div>
          )}

          <div className={`docketform${formOpen ? ' is-open' : ''}`} ref={formWrapRef}>
            <div className="docketform__inner">
              {sent ? (
                <div className="sent" role="status">
                  <span className="stamp">Docket sent</span>
                  <p>Sent to Cal&apos;s phone. Watch it land on the right.</p>
                  <button type="button" className="btn btn--line" onClick={reset}>
                    Run it again
                  </button>
                </div>
              ) : (
                <form key={formKey} className="docketform__form" onSubmit={submit} onChange={onFormChange} noValidate>
                  <h3>The docket</h3>

                  <div className="q">
                    <label htmlFor={`${uid}-job`}>
                      <span className="q__n mono">1</span>
                      {fieldLabel('job')}
                    </label>
                    <select
                      id={`${uid}-job`}
                      name="job"
                      value={jobSel}
                      onChange={(e) => {
                        jobTouched.current = true
                        setJobSel(e.target.value)
                      }}
                      required
                      aria-invalid={errors.job ? true : undefined}
                      aria-describedby={fieldErr('job')}
                      {...attr(DEMO_LEAD_FIELD)}
                    >
                      <option value="">Choose one</option>
                      {JOB_OPTIONS.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                    {errors.job && (
                      <p className="err" id={fieldErr('job')}>
                        {errors.job}
                      </p>
                    )}
                  </div>

                  <div className="q">
                    <label htmlFor={`${uid}-suburb`}>
                      <span className="q__n mono">2</span>
                      {fieldLabel('suburb')}
                    </label>
                    <input
                      id={`${uid}-suburb`}
                      name="suburb"
                      type="text"
                      maxLength={40}
                      autoComplete="address-level2"
                      placeholder="For example, Canungra"
                      list={`${uid}-places`}
                      required
                      aria-invalid={errors.suburb ? true : undefined}
                      aria-describedby={[fieldErr('suburb'), farSuburb ? `${uid}-far` : undefined]
                        .filter(Boolean)
                        .join(' ') || undefined}
                      onChange={(e) => farSuburb && checkSuburb(e.target.value)}
                      onBlur={(e) => checkSuburb(e.target.value)}
                      {...attr(DEMO_LEAD_FIELD)}
                    />
                    <datalist id={`${uid}-places`}>
                      {KNOWN_PLACES.map((t) => (
                        <option key={t} value={t} />
                      ))}
                    </datalist>
                    {errors.suburb && (
                      <p className="err" id={fieldErr('suburb')}>
                        {errors.suburb}
                      </p>
                    )}
                    {farSuburb && (
                      <p className="note" id={`${uid}-far`} role="status">
                        That is outside Cal&apos;s usual run. He will check the route and ring you.
                      </p>
                    )}
                  </div>

                  <div className="q">
                    <label htmlFor={`${uid}-timing`}>
                      <span className="q__n mono">3</span>
                      {fieldLabel('timing')}
                    </label>
                    <select
                      id={`${uid}-timing`}
                      name="timing"
                      defaultValue=""
                      required
                      aria-invalid={errors.timing ? true : undefined}
                      aria-describedby={fieldErr('timing')}
                      {...attr(DEMO_LEAD_FIELD)}
                    >
                      <option value="">Choose one</option>
                      {TIMING_OPTIONS.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                    {errors.timing && (
                      <p className="err" id={fieldErr('timing')}>
                        {errors.timing}
                      </p>
                    )}
                  </div>

                  <div className="q">
                    <label htmlFor={`${uid}-contact`}>
                      <span className="q__n mono">4</span>
                      Your name and mobile
                    </label>
                    <input
                      id={`${uid}-contact`}
                      name="nameMobile"
                      type="text"
                      maxLength={50}
                      autoComplete="off"
                      placeholder="First name, then mobile"
                      required
                      aria-invalid={errors.contact ? true : undefined}
                      aria-describedby={fieldErr('contact')}
                      {...attr(DEMO_LEAD_FIELD)}
                    />
                    {errors.contact && (
                      <p className="err" id={fieldErr('contact')}>
                        {errors.contact}
                      </p>
                    )}
                  </div>

                  <button type="submit" className="btn btn--orange btn--wide" {...attr(DEMO_LEAD_SUBMIT)}>
                    Send to Cal
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* ---------------- phone */}
        <div className="phonecol">
          <div className={`phone${buzz ? ' is-buzzing' : ''}`} ref={phoneRef}>
            <div className="phone__screen">
              <div className="phone__island" aria-hidden="true" />
              <div className="phone__time mono" aria-hidden="true">
                6:42
              </div>
              <div className="phone__date">Friday 16 October</div>
              <div className="phone__notifs" aria-live="polite">
                {notif && sent ? (
                  <div className="notif">
                    <div className="notif__top">
                      <span className="notif__icon">
                        <BirdMark />
                      </span>
                      <span className="notif__app">Wirebird Leads</span>
                      <span className="notif__when">now</span>
                    </div>
                    <p className="notif__title">New enquiry</p>
                    <p className="notif__body">{smsText}</p>
                  </div>
                ) : (
                  <div className="notif notif--wait" aria-hidden="true">
                    <div className="notif__top">
                      <span className="notif__icon">
                        <BirdMark />
                      </span>
                      <span className="notif__app">Wirebird Leads</span>
                      <span className="notif__when">waiting</span>
                    </div>
                    <p className="notif__title">Waiting for details</p>
                    <dl className="wait">
                      {(
                        [
                          ['Job', jobSel],
                          ['Where', live.suburb],
                          ['When', live.timing],
                          ['Who', live.contact],
                        ] as const
                      ).map(([k, v]) => (
                        <div key={k} className={v ? 'is-filled' : undefined}>
                          <dt>{k}</dt>
                          <dd>{v || <i className="wait__blank" />}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}
              </div>
              <div className="phone__bar" aria-hidden="true" />
            </div>
          </div>
          <p className="caption">Cal&apos;s phone (simulated)</p>
        </div>

        {/* ---------------- today */}
        <div className="panel today" aria-label="Today list">
          <div className="panel__head panel__head--split">
            <span>Today (simulated)</span>
            <span className="mono today__count">{4 + (rowIn ? 1 : 0)} jobs</span>
          </div>
          <ul className="today__list" aria-live="polite">
            <li className={`today__new${rowIn ? ' is-in' : ''}`} aria-hidden={!rowIn}>
              <div className="today__newinner">
                {sent && (
                  <div className="today__row today__row--new">
                    <span className="mono today__time">{booked ? '8:00' : 'Now'}</span>
                    <div className="today__main">
                      <p className="today__job">{sent.job}</p>
                      <p className="today__place">
                        {sent.suburb}, {sent.name}
                      </p>
                      <div className="today__actions">
                        <a className="mini mini--ink" href={`tel:${sent.mobile.replace(/[^\d+]/g, '')}`}>
                          Call back
                        </a>
                        <button
                          type="button"
                          className="mini mini--line"
                          disabled={booked}
                          onClick={() => setBooked(true)}
                        >
                          {booked ? 'Booked in' : 'Book in'}
                        </button>
                      </div>
                    </div>
                    <span className="tag tag--new">{booked ? 'Booked' : 'New'}</span>
                  </div>
                )}
              </div>
            </li>
            {TODAY_ROWS.map((r) => (
              <li key={r.time} className={`today__row today__row--${r.tone}`}>
                <span className="mono today__time">{r.time}</span>
                <div className="today__main">
                  <p className="today__job">{r.job}</p>
                  <p className="today__place">{r.place}</p>
                </div>
                <span className={`tag tag--${r.tone}`}>{r.status}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ rates */

const RATES = [
  {
    job: 'Switchboard upgrade',
    detail: 'New board, safety switches on every circuit, tested and certified.',
    from: '$1,850',
    unit: '',
  },
  {
    job: 'Smoke alarms',
    detail: 'Hardwired and interconnected. Compliant for a sale or a new lease.',
    from: '$95',
    unit: 'each',
  },
  {
    job: 'Solar-ready upgrade',
    detail: 'Board space, isolators and cabling ready for your solar installer.',
    from: '$420',
    unit: '',
  },
  {
    job: 'Rural pumps and bores',
    detail: 'Tank, dam and bore pumps. Controllers and the wiring back to the shed.',
    from: '$260',
    unit: '',
  },
  {
    job: 'Power points and lights',
    detail: 'Extra points, downlights, ceiling fans, shed and outdoor lighting.',
    from: '$140',
    unit: '',
  },
  {
    job: 'Fault finding',
    detail: 'Tripping safety switches, flickering lights, circuits that went dead.',
    from: '$190',
    unit: 'first hour',
  },
]

function Rates({ onQuote }: { onQuote: () => void }) {
  return (
    <section className="rates wrap" id="rates" aria-labelledby="rates-title">
      <div className="rates__head">
        <h2 id="rates-title">Rate card</h2>
        <p>
          Starting prices for the jobs Cal does most. Every job gets a written quote before work starts. These
          are sample prices for the demo.
        </p>
      </div>
      <ul className="ratecard">
        {RATES.map((r) => (
          <li key={r.job} className="rate">
            <h3 className="rate__job">{r.job}</h3>
            <p className="rate__detail">{r.detail}</p>
            <p className="rate__price">
              <span className="rate__from">from</span> <span className="mono">{r.from}</span>
              {r.unit && <span className="rate__unit"> {r.unit}</span>}
            </p>
          </li>
        ))}
      </ul>
      <div className="rates__foot">
        <p>Not on the list? Cal quotes the odd jobs too.</p>
        <button type="button" className="tearbtn" onClick={onQuote}>
          <span className="tearbtn__cut mono" aria-hidden="true">
            Tear here
          </span>
          <span className="tearbtn__label">Get a quote</span>
        </button>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- about Cal */

function About() {
  return (
    <section className="about" id="cal" aria-labelledby="cal-title">
      <div className="wrap about__grid">
        <div className="about__copy">
          <h2 id="cal-title">One electrician, one apprentice, one phone number.</h2>
          <p>
            I quote the job, do the wiring and answer the phone myself. My apprentice comes along to learn, and
            works under my licence. You deal with the same person from the quote to the certificate.
          </p>
          <p className="about__sign">Cal, owner</p>
        </div>
        <div className="carbon">
          <h3>Left with you at the end of every job</h3>
          <ul>
            <li>
              <Tick />
              <span>The written quote you agreed to, with the licence number on it</span>
            </li>
            <li>
              <Tick />
              <span>Photos of the board and the wiring, before and after</span>
            </li>
            <li>
              <Tick />
              <span>The test results, written down</span>
            </li>
            <li>
              <Tick />
              <span>The compliance certificate your insurer or agent asks for</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------- area */

/* Beaudesert at the centre, one rule per town, length = drive time. Ink on paper; the home dot is the only orange. */
function RouteDiagram() {
  const cx = 320
  const cy = 280
  const k = 3.8
  const rings = [15, 30, 45]
  return (
    <figure className="map">
      <svg
        viewBox="0 70 640 420"
        role="img"
        aria-label="Drive times from Beaudesert: Kooralbyn 15 minutes, Canungra 20, Tamborine 25, Rathdowney 30, Boonah 35, Aratula and Kalbar 40, Mount Alford 45."
      >
        {rings.map((m) => (
          <g key={m}>
            <circle className="map__ring" cx={cx} cy={cy} r={m * k} />
            <text className="map__ringlabel" x={cx + Math.sin(2.15) * m * k + 5} y={cy - Math.cos(2.15) * m * k + 5}>
              {m} min
            </text>
          </g>
        ))}
        {TOWNS.map((t) => {
          const a = ((BEARING[t.name] ?? 0) * Math.PI) / 180
          const r = t.mins * k
          const x = cx + Math.sin(a) * r
          const y = cy - Math.cos(a) * r
          const right = Math.sin(a) > 0.2
          const left = Math.sin(a) < -0.2
          const anchor = right ? 'start' : left ? 'end' : 'middle'
          const dx = right ? 14 : left ? -14 : 0
          const dy = right || left ? 7 : Math.cos(a) > 0 ? -14 : 28
          return (
            <g key={t.name}>
              <line className="map__rule" x1={cx} y1={cy} x2={x} y2={y} />
              <rect className="map__stop" x={x - 6} y={y - 6} width="12" height="12" />
              <text className="map__town" x={x + dx} y={y + dy} textAnchor={anchor}>
                {t.name}
              </text>
            </g>
          )
        })}
        <rect className="map__home" x={cx - 13} y={cy - 13} width="26" height="26" />
        <text className="map__homelabel" x={cx} y={cy - 24} textAnchor="middle">
          Beaudesert
        </text>
      </svg>
      <figcaption>Distance is drive time. Directions are loose.</figcaption>
    </figure>
  )
}

function Area() {
  return (
    <section className="area wrap" id="area" aria-labelledby="area-title">
      <h2 id="area-title">Where Cal drives</h2>
      <div className="area__body">
        <RouteDiagram />
        <div className="route">
          <p className="route__head">
            <span>Route sheet</span>
            <span className="mono">From Beaudesert</span>
          </p>
          <ol className="towns">
            {TOWNS.map((t, i) => (
              <li key={t.name}>
                <span className="towns__n mono">{i + 1}</span>
                <span className="towns__name">{t.name}</span>
                <span className="towns__lead" aria-hidden="true" />
                <span className="towns__time mono">
                  {t.mins} <span>min</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <p className="area__note">Further out than that? Ring and ask. Cal looks at the day&apos;s route before he says no.</p>
    </section>
  )
}

/* ---------------------------------------------------------- final call band */

function CallBand({ onQuote }: { onQuote: () => void }) {
  return (
    <section className="callband" aria-labelledby="call-title">
      <div className="wrap callband__inner">
        <h2 id="call-title">Ring Cal, or send the docket.</h2>
        <a className="callband__num mono" href={PHONE_HREF}>
          {PHONE}
        </a>
        <p>Missed calls get a text back. Cal is usually up a ladder, not ignoring you.</p>
        <button type="button" className="btn btn--ink" onClick={onQuote}>
          Get a quote
        </button>
      </div>
      <div className="tabs" aria-hidden="true">
        {Array.from({ length: 14 }, (_, i) => (
          <span key={i} className="tabs__tab mono">
            {PHONE}
          </span>
        ))}
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------- footer */

function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot__grid">
        <div>
          <p className="foot__brand">
            <BirdMark className="brand__mark" /> Wirebird Electrical
          </p>
          <p>Beaudesert and the Scenic Rim, Queensland.</p>
          <p>Licence number printed on every quote and certificate.</p>
        </div>
        <ul className="foot__contact">
          <li>
            Phone <a className="mono" href={PHONE_HREF}>{PHONE}</a>
          </li>
          <li>
            Email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </li>
        </ul>
      </div>
      <DemoRibbon className="ribbon ribbon--foot" name="Wirebird Electrical" />
    </footer>
  )
}

/* -------------------------------------------------------------------- app */

export default function App() {
  const [barHidden, setBarHidden] = useState(false)

  /* "Get a quote" lands on the assistant with the cursor already in its input. */
  const openChat = useCallback(() => {
    const el = document.getElementById('assistant')
    if (!el) return
    const small = window.matchMedia('(max-width: 759px)').matches
    el.scrollIntoView({ block: small ? 'start' : 'center', behavior: prefersReduced() ? 'instant' : 'smooth' })
    el.querySelector<HTMLInputElement>('input[type="text"]')?.focus({ preventScroll: true })
  }, [])

  /* The call bar steps aside while the assistant is on screen, so it never covers the docket fields. */
  useEffect(() => {
    const el = document.getElementById('assistant')
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(([entry]) => setBarHidden(entry.isIntersecting), { threshold: 0.12 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <>
      <a className="skip-link" href="#quote">
        Skip to the quote assistant
      </a>
      <Header />
      <main id="top">
        <Hero onQuote={openChat} />
        <Wire />
        <Stage />
        <Rates onQuote={openChat} />
        <About />
        <Area />
        <CallBand onQuote={openChat} />
      </main>
      <Footer />
      <div className={`callbar${barHidden ? ' is-away' : ''}`}>
        <a className="callbar__call" href={PHONE_HREF} aria-label={`Call Cal on ${PHONE}`}>
          Call Cal
        </a>
        <button type="button" className="callbar__quote" onClick={openChat}>
          Get a quote
        </button>
      </div>
    </>
  )
}
