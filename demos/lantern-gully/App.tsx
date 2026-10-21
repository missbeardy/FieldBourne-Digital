import { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react'
import { DemoRibbon } from '../_kit/DemoRibbon.tsx'
import { DEMO_CHAT_OPEN } from '../_kit/selectors.ts'
import { fakeEmail, fakeMobiles } from '../_kit/fakeData.ts'
import { Defer } from './Defer.tsx'
import { ContourField } from './Field.tsx'
import { cabins } from './availability.ts'
import type { Cabin } from './availability.ts'
import { captions, openChat, times, useTime } from './time.ts'
import type { Ask, Time } from './time.ts'

// Everything below the first screen, and the assistant, loads as separate chunks.
const loadChat = () => import('./Chat.tsx')
const Chat = lazy(loadChat)
const MapView = lazy(() => import('./MapView.tsx'))
const Calendar = lazy(() => import('./Calendar.tsx'))

const phone = fakeMobiles[2]
const phoneDigits = phone.split(' ').join('')
const email = fakeEmail('hello.lantern')

const hours: { time: Time; word: string; clock: string; text: string }[] = [
  { time: 'dusk', word: 'Dusk', clock: '6.10 pm', text: 'Friday evening. Drive in with the light going. The track has reflectors, and Jo has left a lantern lit on the verandah.' },
  { time: 'dawn', word: 'Dawn', clock: '5.45 am', text: 'Saturday, early. Mist sits in the gully until about nine. Coffee on the deck, still in your jumper.' },
  { time: 'day', word: 'Day', clock: '11.00 am', text: 'Saturday. Swim in the creek, walk the track, or do the thing you have been meaning to do, which is nothing.' },
  { time: 'night', word: 'Night', clock: '9.30 pm', text: 'Saturday, late. There are no streetlights. Light the heater, leave the torch off for a minute, and look up.' },
]

const links = [
  { href: '#gully', label: 'The gully' },
  { href: '#availability', label: 'Weekends' },
  { href: '#offgrid', label: 'Off the grid' },
  { href: '#questions', label: 'Before you come' },
]

const faq: { q: string; a: string }[] = [
  { q: 'Getting here', a: 'We are near Rathdowney, in the Scenic Rim. The last stretch is gravel and an ordinary car manages it when it is dry. After heavy rain, check with Jo first. The street address and gate code come with your confirmation.' },
  { q: 'What to bring', a: 'Food and drink, a torch, warm clothes for the evenings, and shoes you can walk a creek track in. Linen, towels, firewood, pots and pans are all here.' },
  { q: 'Dogs and kids', a: 'Kids are welcome and Spotted Gum is set up for families. Dogs are by arrangement at Bottlebrush and Spotted Gum, and never in Ironbark.' },
  { q: 'If it rains', a: 'A tin roof and a wood heater make a wet weekend easy. If water cuts the track, Jo moves your dates at no charge.' },
  { q: 'Changing your dates', a: 'Change or cancel up to 14 days out and the deposit becomes credit for another weekend.' },
]

/** A ridge-line cut: one contour line, then the band. Each use has its own shape. */
const ridges = [
  'M0 34 C120 6 210 40 340 26 S560 2 700 22 S960 44 1100 20 S1340 8 1440 30',
  'M0 22 C160 40 260 8 420 20 S640 46 820 24 S1120 2 1260 26 S1400 38 1440 24',
  'M0 30 C100 12 240 4 380 24 S600 44 760 30 S1020 6 1180 18 S1380 40 1440 28',
]
function Edge({ shape, at }: { shape: 0 | 1 | 2; at: 'top' | 'bottom' }) {
  const d = ridges[shape]
  return (
    <svg className={`edge edge-${at}`} viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path className="edge-fill" d={`${d} L1440 80 L0 80 Z`} transform="translate(0 12)" />
      <path className="edge-line" d={d} />
    </svg>
  )
}

function TimeSwitch({ time, onChange, id }: { time: Time; onChange: (t: Time) => void; id: string }) {
  return (
    <div className="timesw" role="group" aria-labelledby={id}>
      <span id={id} className="timesw-label">Light</span>
      {times.map((t) => (
        <button key={t.id} type="button" aria-pressed={time === t.id} onClick={() => onChange(t.id)}>
          {t.label}
        </button>
      ))}
    </div>
  )
}

export default function App() {
  const [time, setTime] = useTime()
  const [navOpen, setNavOpen] = useState(false)
  const bar = useRef<HTMLDivElement>(null)
  const [selected, setSelected] = useState<Cabin['id']>('bottlebrush')
  const cabin = cabins.find((c) => c.id === selected) ?? cabins[0]

  const [chatOpen, setChatOpen] = useState(false)
  const [chatMounted, setChatMounted] = useState(false)
  const [ask, setAsk] = useState<Ask>({ q: '', n: 0 })

  // Anything on the page can open the assistant; the code for it arrives on first use.
  useEffect(() => {
    const onOpen = (e: Event) => {
      const q = (e as CustomEvent<{ question?: string }>).detail?.question ?? ''
      setChatMounted(true)
      setChatOpen(true)
      setAsk((a) => ({ q, n: a.n + 1 }))
    }
    window.addEventListener('lg:open-chat', onOpen)
    return () => window.removeEventListener('lg:open-chat', onOpen)
  }, [])

  // On wide screens the open assistant is a drawer, and the page makes room for it.
  useEffect(() => {
    document.documentElement.classList.toggle('chat-open', chatOpen)
  }, [chatOpen])

  // The section sheet closes on Escape, or on a tap anywhere outside the header.
  useEffect(() => {
    if (!navOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setNavOpen(false)
      bar.current?.querySelector<HTMLElement>('.mark-btn')?.focus()
    }
    const onDown = (e: PointerEvent) => {
      if (bar.current && !bar.current.contains(e.target as Node)) setNavOpen(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onDown)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', onDown)
    }
  }, [navOpen])

  const closeChat = useCallback(() => {
    setChatOpen(false)
    window.setTimeout(() => document.querySelector<HTMLElement>('.launcher')?.focus(), 0)
  }, [])

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>

      <header className="top">
        <DemoRibbon className="ribbon ribbon-top" name="Lantern Gully Cabins" />
        <div className="bar wrap" ref={bar}>
          <a className="mark" href="#top" aria-label="Lantern Gully Cabins, back to the top">
            Lantern Gully <span>Cabins</span>
          </a>
          <button
            type="button"
            className="mark-btn"
            aria-label="Lantern Gully Cabins, sections"
            aria-expanded={navOpen}
            aria-controls="sheet"
            onClick={() => setNavOpen((o) => !o)}
          >
            Lantern Gully<span className="caret" aria-hidden="true" />
          </button>
          <nav className="nav" aria-label="Sections">
            {links.map((l) => (
              <a key={l.href} href={l.href}>{l.label}</a>
            ))}
          </nav>
          <TimeSwitch time={time} onChange={setTime} id="timesw-bar" />
          <nav id="sheet" className="sheet" aria-label="Section links" hidden={!navOpen} onClick={(e) => { if ((e.target as HTMLElement).closest('a')) setNavOpen(false) }}>
            {links.map((l) => (
              <a key={l.href} href={l.href}>{l.label}</a>
            ))}
            <a href="#jo">Text Jo</a>
          </nav>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="top" aria-labelledby="h-hero">
          <div className="hero-field" aria-hidden="true">
            <ContourField className="field-hero" />
            <div className="orb" />
            <p className="orb-cap">{captions[time]}</p>
            <span className="hp hp-iron"><span className="pin-mark" /><span className="hp-name">Ironbark</span></span>
            <span className="hp hp-gum"><span className="pin-mark" /><span className="hp-name">Spotted Gum</span></span>
          </div>
          <div className="wrap hero-copy">
            <h1 id="h-hero">
              <span className="ln"><span>Nothing on</span></span>
              <span className="ln"><span>until Monday.</span></span>
            </h1>
            <p className="lede">
              Three off-grid cabins in a quiet gully near Rathdowney, under Mount Barney. Solar lights, a wood heater and a creek.
            </p>
            <p className="hero-note">
              Text Jo on <a href={`sms:${phoneDigits}`}>{phone}</a>. Gate code and directions come with your confirmation.
            </p>
          </div>
          <div className="hp hp-cta">
            <span className="pin-mark" aria-hidden="true" />
            <span className="hp-lead" aria-hidden="true" />
            <a className="btn btn-solid" href="#availability">See free weekends</a>
            <span className="hp-name hp-bottle" aria-hidden="true">Bottlebrush</span>
          </div>
        </section>

        <section className="sec gully" id="gully" aria-labelledby="h-gully">
          <div className="wrap">
            <h2 id="h-gully">Three cabins along one creek.</h2>
            <p className="intro">Each one has its own bend of the creek or its own piece of ridge. Pick a cabin on the map.</p>
            <div className="gully-grid">
              <Defer className="slot slot-map">
                <Suspense fallback={<div className="map" />}>
                  <MapView selected={selected} onSelect={setSelected} />
                </Suspense>
              </Defer>
              <div className="detail">
                <div className="pick" role="group" aria-label="Choose a cabin">
                  {cabins.map((c) => (
                    <button key={c.id} type="button" aria-pressed={selected === c.id} onClick={() => setSelected(c.id)}>
                      {c.name}
                    </button>
                  ))}
                </div>
                <div className="detail-body" aria-live="polite">
                  <h3 className="sr-only">{cabin.name}</h3>
                  <p>{cabin.blurb}</p>
                  <ul className="feat">
                    {cabin.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                  <p className="price">
                    From <strong>${cabin.from}</strong> a night
                  </p>
                  <a className="textlink" href="#availability">See its free weekends</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="sec hourly band" id="slow" aria-labelledby="h-slow">
          <Edge shape={0} at="top" />
          <Edge shape={1} at="bottom" />
          <div className="wrap">
            <h2 id="h-slow">A weekend, hour by hour.</h2>
            <p className="intro">Tap a time and the whole page takes on that light.</p>
            <ol className="hours">
              {hours.map((h) => (
                <li key={h.time} className={time === h.time ? 'is-now' : ''}>
                  <div className="hour-head">
                    <span className="hour-clock">{h.clock}</span>
                    <span className="hour-word">{h.word}</span>
                  </div>
                  <div className="hour-body">
                    <p>{h.text}</p>
                    <button type="button" className="btn btn-line btn-sm" aria-pressed={time === h.time} onClick={() => setTime(h.time)}>
                      {time === h.time ? `Showing ${h.word.toLowerCase()}` : `Show the page at ${h.word.toLowerCase()}`}
                    </button>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="sec avail" id="availability" aria-labelledby="h-avail">
          <div className="wrap avail-grid">
            <div className="avail-head">
              <h2 id="h-avail">Is your weekend free?</h2>
              <p className="intro">
                Sample availability for the next eight weekends. Tap a date to ask the assistant, or{' '}
                <button type="button" className="inline-btn" onClick={() => openChat()}>ask in your own words</button>.
              </p>
              <p className="legend">
                <span className="nights" aria-hidden="true"><i /><i /></span> Free
                <span className="nights" aria-hidden="true"><i className="on" /><i className="on" /></span> Booked
                <span className="legend-note">Left block is Friday night, right block is Saturday night.</span>
              </p>
            </div>
            <Defer className="slot slot-cal">
              <Suspense fallback={null}>
                <Calendar selected={selected} />
              </Suspense>
            </Defer>
          </div>
        </section>

        <section className="sec offgrid band" id="offgrid" aria-labelledby="h-off">
          <Edge shape={2} at="top" />
          <Edge shape={0} at="bottom" />
          <div className="wrap">
            <h2 className="statement" id="h-off">
              The lights run on <em>sun</em>. The water falls on the <em>roof</em>. The heater burns what we split. After ten there is only <em>dark</em>, and that is the point.
            </h2>
            <dl className="facts">
              <div><dt>Power</dt><dd>Solar panels and a battery. Lights, the fridge and phone charging are covered.</dd></div>
              <div><dt>Water</dt><dd>Rainwater from tanks, with hot showers on gas. The drinking water is fine to drink.</dd></div>
              <div><dt>Heat</dt><dd>A wood heater in every cabin. Firewood and kindling are supplied.</dd></div>
              <div><dt>Signal</dt><dd>No wifi. Mobile reception is patchy, better on the ridge than by the creek.</dd></div>
            </dl>
          </div>
        </section>

        <section className="sec faq" id="questions" aria-labelledby="h-faq">
          <div className="wrap faq-grid">
            <h2 id="h-faq">Before you come</h2>
            <div className="acc">
              {faq.map((f, i) => (
                <details key={f.q} open={i === 0}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="sec contact band" id="jo" aria-labelledby="h-jo">
          <ContourField className="field-contact" />
          <Edge shape={1} at="top" />
          <Edge shape={2} at="bottom" />
          <div className="wrap">
            <h2 id="h-jo">Prefer a person? Text Jo.</h2>
            <p className="phone"><a href={`tel:${phoneDigits}`}>{phone}</a></p>
            <p className="mail"><a href={`mailto:${email}`}>{email}</a></p>
            <p className="intro">Jo replies by the evening. The details here are placeholders for the demo.</p>
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="wrap foot-in">
          <DemoRibbon className="ribbon ribbon-foot" name="Lantern Gully Cabins" />
          <p className="fine">Lantern Gully Cabins is a made-up business. The availability, prices, phone number and email on this page are samples.</p>
          <a className="textlink" href="#top">Back to the top</a>
        </div>
      </footer>

      <div className="dock" hidden={chatOpen}>
        <button
          type="button"
          className="launcher"
          {...{ [DEMO_CHAT_OPEN]: '' }}
          aria-expanded={chatOpen}
          aria-controls="lg-chat"
          onClick={() => openChat()}
          onPointerEnter={() => void loadChat()}
          onFocus={() => void loadChat()}
        >
          <span className="l-long">Ask about a weekend</span>
          <span className="l-short">Ask Jo</span>
        </button>
      </div>

      {chatMounted && (
        <Suspense fallback={null}>
          <Chat open={chatOpen} onClose={closeChat} ask={ask} />
        </Suspense>
      )}
    </>
  )
}
