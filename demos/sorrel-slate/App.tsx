import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import { DemoRibbon } from '../_kit/DemoRibbon.tsx'
import { fakeEmail, fakeLandline, fakeMobiles } from '../_kit/fakeData.ts'
import type { AssistantPack } from '../_kit/assistant/types.ts'
import packJson from './pack.json'
import { Chat, ChatLauncher } from './Chat.tsx'
import { DEMO_CHAT_OPEN } from '../_kit/selectors.ts'
import { FloorPlan, Mark } from './Marks.tsx'
import { clockLabel, menuClock } from './clock.ts'
import type { Course } from './clock.ts'
import { COURSE_HOURS, COURSE_TITLE, DRINKS, MENU, PRODUCE } from './menu.ts'
import type { Dish } from './menu.ts'

const pack = packJson as unknown as AssistantPack

function DishRow({ dish, index }: { dish: Dish; index: number }) {
  return (
    <li className="dish" style={{ '--i': index } as CSSProperties}>
      <div className="dish-top">
        <span className="dish-name">{dish.name}</span>
        <span className="leader" aria-hidden="true" />
        <span className="dish-price">
          <span className="sr-only">$</span>
          {dish.price}
        </span>
      </div>
      {dish.note || dish.tags ? (
        <p className="dish-note">
          {dish.note}
          {dish.tags ? <span className="tag"> {dish.tags}</span> : null}
        </p>
      ) : null}
    </li>
  )
}

export default function App() {
  const [now, setNow] = useState(() => new Date())
  const [manual, setManual] = useState<Course | null>(null)
  const [chatOpen, setChatOpen] = useState(false)
  const [askInView, setAskInView] = useState(false)

  useEffect(() => {
    const t = window.setInterval(() => setNow(new Date()), 30000)
    return () => window.clearInterval(t)
  }, [])

  useEffect(() => {
    const nodes = document.querySelectorAll('.reveal')
    const mark = (el: Element) => el.classList.add('is-visible')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      nodes.forEach(mark)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) mark(e.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    nodes.forEach((el) => io.observe(el))
    const t = window.setTimeout(() => nodes.forEach(mark), 1500)
    return () => {
      window.clearTimeout(t)
      io.disconnect()
    }
  }, [])

  // One primary action per screen: the floating pill steps aside while an on-page ask button is showing.
  useEffect(() => {
    const targets = document.querySelectorAll('[data-ask]')
    const seen = new Set<Element>()
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) seen.add(e.target)
          else seen.delete(e.target)
        }
        setAskInView(seen.size > 0)
      },
      { threshold: 0.6 },
    )
    targets.forEach((t) => io.observe(t))
    return () => io.disconnect()
  }, [])

  const auto = menuClock(now)
  const course: Course = manual ?? auto.course
  const groups = MENU[course]
  let n = 0

  const openChat = () => setChatOpen(true)

  return (
    <>
      <a className="skip" href="#menu">
        Skip to the menu
      </a>

      <DemoRibbon className="ribbon ribbon-top" name="Sorrel &amp; Slate" />

      <header className="masthead">
        <a className="wordmark" href="#top" aria-label="Sorrel and Slate, back to the top">
          Sorrel <span className="amp">&amp;</span> Slate
        </a>
        <nav aria-label="Sections">
          <a href="#menu">Menu</a>
          <a className="nav-local" href="#local">Local produce</a>
          <a href="#functions">Functions</a>
          <a href="#visit">Visit</a>
        </nav>
        <a className="masthead-call" href={`tel:${fakeLandline(23).replace(/\D/g, '')}`}>
          <span className="sr-only">Call </span>
          {fakeLandline(23)}
        </a>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-h">
          <div className="hero-copy">
            <h1 id="hero-h">
              Breakfast till half eleven. <em>Lunch after.</em>
            </h1>
            <p className="lede">
              Mel&apos;s cafe and function room in Boonah. Local produce, and a long table for groups up to forty.
            </p>
            <div className="actions">
              <button type="button" className="btn btn-solid" onClick={openChat} data-ask="" {...{ [DEMO_CHAT_OPEN]: '' }}>
                Ask about a function
              </button>
              <a className="text-link" href="#menu">
                Read today&apos;s menu
              </a>
            </div>
          </div>

          <div className="hero-art" aria-hidden="true">
            <div className="board">
              <p className="board-small">On the pass</p>
              <p className="board-big">{COURSE_TITLE[auto.course]}</p>
              <p className="board-small">{auto.course === 'breakfast' ? 'until 11:30, then lunch' : 'from 11:30, till we close'}</p>
              <span className="board-rule" />
              <p className="board-list">eggs, sorrel, pumpkin, lemons, sourdough</p>
            </div>
            <Mark name="loaf" className="art art-loaf" />
            <Mark name="egg" className="art art-egg" />
            <Mark name="lemon" className="art art-lemon" />
            <Mark name="beet" className="art art-beet" />
            <Mark name="leaf" className="art art-leaf" />
            <Mark name="leaf" className="art art-leaf2" />
          </div>
        </section>

        <section id="menu" className="menu-sec" aria-labelledby="menu-h">
          <div className="menu-intro">
            <h2 id="menu-h">The menu changes with your clock.</h2>
            <p className="clock-line" aria-live="polite">
              <span className="clock-time">{clockLabel(now)}</span> where you are. {auto.status}
            </p>
            <div className="switch" role="group" aria-label="Choose a menu card">
              {(['breakfast', 'lunch'] as Course[]).map((c) => (
                <button key={c} type="button" aria-pressed={course === c} onClick={() => setManual(c === auto.course ? null : c)}>
                  {COURSE_TITLE[c]}
                </button>
              ))}
            </div>
            <p className="menu-note">
              <Mark name="leaf" />
              Eating with ten or more? Tell Mel before you come, so the kitchen is ready for you.
            </p>
            {manual && manual !== auto.course ? (
              <p className="peek">
                You are looking at the {manual} card.{' '}
                <button type="button" onClick={() => setManual(null)}>
                  Back to the card that is on now
                </button>
              </p>
            ) : null}
          </div>

          <article className="card" key={course} aria-label={`${COURSE_TITLE[course]} menu`}>
            <header className="card-head">
              <h3>{COURSE_TITLE[course]}</h3>
              <p>{COURSE_HOURS[course]}</p>
            </header>
            <div className="card-body">
              {groups.map((g) => (
                <section className="grp" key={g.title} aria-labelledby={`g-${g.title.replace(/\W/g, '')}`}>
                  <h4 id={`g-${g.title.replace(/\W/g, '')}`}>
                    <Mark name={g.mark} />
                    <i>{g.title}</i>
                  </h4>
                  <ul>
                    {g.dishes.map((d) => (
                      <DishRow key={d.name} dish={d} index={n++} />
                    ))}
                  </ul>
                  {g.extra ? <p className="grp-extra">{g.extra}</p> : null}
                </section>
              ))}
            </div>
            <footer className="card-foot">
              <h4>
                <Mark name="cup" />
                <i>To drink, all day</i>
              </h4>
              <ul className="drinks">
                {DRINKS.map((d) => (
                  <DishRow key={d.name} dish={d} index={n++} />
                ))}
              </ul>
              <p className="legend">
                <i>v</i> vegetarian, <i>gf</i> gluten free. Prices in Australian dollars. Tell us about allergies when you order.
              </p>
            </footer>
          </article>
        </section>

        <section id="local" className="local reveal" aria-labelledby="local-h">
          <div className="local-copy">
            <h2 id="local-h">Grown nearby, cooked here.</h2>
            <p>The card follows what Scenic Rim growers have that week, so a plate can change without notice.</p>
          </div>
          <ul className="shelf">
            {PRODUCE.map((p) => (
              <li key={p.name} className={p.lead ? 'shelf-lead' : undefined} style={{ '--size': `${p.size}px` } as CSSProperties}>
                <div className="stand">
                  <Mark name={p.mark} />
                </div>
                <h3>{p.name}</h3>
                <p>{p.line}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="functions" className="functions reveal" aria-labelledby="fn-h">
          <figure className="plan">
            <FloorPlan />
            <figcaption>Four tables of ten, the way the room is usually set.</figcaption>
          </figure>
          <div className="fn-copy">
            <h2 id="fn-h">A long table for forty.</h2>
            <p className="fn-lede">
              Birthdays, baby showers, wakes, club lunches and the end-of-year do. Mel sets the room to suit the group, and the kitchen is next door.
            </p>
            <dl className="formats">
              <div>
                <dt>Morning tea</dt>
                <dd>Scones, slices and sandwiches, with tea and coffee on tap.</dd>
              </div>
              <div>
                <dt>Long lunch</dt>
                <dd>A set menu served family style, built round what is in season.</dd>
              </div>
              <div>
                <dt>Grazing tables</dt>
                <dd>Local cheese, bread, pickles and fruit for a standing crowd.</dd>
              </div>
            </dl>
            <button type="button" className="btn btn-solid" onClick={openChat} data-ask="">
              Ask about a function
            </button>
          </div>
        </section>

        <section id="visit" className="visit reveal" aria-labelledby="visit-h">
          <h2 id="visit-h">Find us in Boonah.</h2>
          <div className="visit-grid">
            <dl className="hours">
              <div>
                <dt>Wednesday to Friday</dt>
                <dd>7 am to 2 pm</dd>
              </div>
              <div>
                <dt>Saturday and Sunday</dt>
                <dd>7 am to 1 pm</dd>
              </div>
              <div>
                <dt>Monday and Tuesday</dt>
                <dd>Closed, except for functions</dd>
              </div>
            </dl>
            <div className="contact">
              <p>
                In the Scenic Rim, an easy drive from Ipswich. Parking out the front and around the corner, level entry, dogs welcome on the verandah.
              </p>
              <ul className="calls">
                <li>
                  <a className="call" href={`tel:${fakeMobiles[0].replace(/\s/g, '')}`}>
                    <span className="call-label">Call about a function</span>
                    <span className="call-num">{fakeMobiles[0]}</span>
                  </a>
                </li>
                <li>
                  <a className="call" href={`tel:${fakeLandline(23).replace(/\D/g, '')}`}>
                    <span className="call-label">Call the cafe</span>
                    <span className="call-num">{fakeLandline(23)}</span>
                  </a>
                </li>
              </ul>
              <p className="contact-small">
                <a href={`mailto:${fakeEmail('hello')}`}>{fakeEmail('hello')}</a>
                <br />
                Street address and map link go here on a live site.
              </p>
              <button type="button" className="btn btn-solid" onClick={openChat} data-ask="">
                Ask about a function
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-row">
          <p className="wordmark wordmark-foot">
            Sorrel <span className="amp">&amp;</span> Slate
          </p>
          <p className="footer-note">
            Illustrations and layout drawn for this demo, with no photographs. Set in Libre Caslon, licensed under the SIL Open Font Licence.
          </p>
        </div>
        <DemoRibbon className="ribbon ribbon-foot" name="Sorrel &amp; Slate" />
      </footer>

      <ChatLauncher open={chatOpen} tucked={askInView} onOpen={openChat} />
      <Chat pack={pack} open={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  )
}
