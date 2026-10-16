import { motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ContactForm } from '../components/ContactForm';
import { FadeIn, Stagger, StaggerItem } from '../components/motion';
import { Showcase } from '../components/Showcase';
import { SITE_CONFIG } from '../config/site';
import { usePageMeta } from '../hooks/usePageMeta';

const howSteps = [
  ['Enquiry comes in', 'Customer calls, texts, emails, leaves a voicemail, or messages on Facebook.'],
  ['FieldBourne catches it', 'The enquiry is captured and can trigger an immediate acknowledgement so the customer knows you got it.'],
  ['It becomes a lead card', 'Details land in one organised place instead of scattered across the phone.'],
  ['Alert and next action', 'You get a clear follow-up, not another unread notification pile.'],
  ['Reminders keep it moving', 'Timers stop the lead dying in “I’ll get to it later.”'],
  ['Send a quote link', 'Quote for acceptance with less typing on site.'],
  ['Book and confirm', 'Accepted work moves to a booked job with confirmation.'],
  ['Invoice, collect, review', 'Chase payment and ask for a review once the job is done.'],
];

const features = [
  [
    '01',
    'Every missed call becomes a chance, not a blank',
    'FieldBourne captures new enquiries from missed calls, SMS, email, voicemail and Facebook, then turns them into organised lead cards. You see what came in, who it was, and what to do next.',
    'More enquiries contacted. Fewer jobs disappearing into thin air.',
  ],
  [
    '02',
    'Respond while the customer is still shopping',
    'Speed matters more than a perfect reply. FieldBourne can send an immediate acknowledgement, then alert you so you can follow up while they are still deciding.',
    'You stay in the conversation instead of finding out later that they booked elsewhere.',
  ],
  [
    '03',
    'Chase the job without keeping it in your head',
    'Follow-up timers and reminders keep each opportunity moving. No sticky notes. No “I meant to call them back.” Just the next action, on your phone.',
    'Persistent follow-up protects revenue you already paid to attract.',
  ],
  [
    '04',
    'Enquiry to booked work, with less typing',
    'Organised lead details carry forward into quote links, booking confirmation, invoicing, overdue chasing and review requests. Built for field work, not another desktop admin session at 9pm.',
    'Less admin. More booked and paid jobs.',
  ],
];

const faqs = [
  ['Is FieldBourne another all-in-one CRM?', 'No. It is a lead-conversion and follow-up system. The focus is catching new enquiries and chasing them toward booked, paid work. It is not trying to replace every tool in your business.'],
  ['Do I have to leave ServiceM8, Tradify or my accounting software?', 'No. FieldBourne is built to sit beside what you already use. There is no major migration required to start protecting missed enquiries.'],
  ['I already have a job-management app. Why add this?', 'Because most job-management tools shine after the job exists. The leak often happens earlier: the missed call, the unread message, the forgotten follow-up. FieldBourne is the front door that catches that work before it slips away.'],
  ['Will this work from my phone on site?', 'Yes. It is designed for tradies who live on their phone between jobs, not for people who want another desktop dashboard.'],
  ['Is this full of AI hype and complicated automation?', 'No. The story is practical: capture the enquiry, acknowledge the customer, organise the lead, remind you to follow up, then move to quote and booking. No buzzword pitch.'],
  ['Is this just a missed-call text-back?', 'Text-back is useful, and FieldBourne can acknowledge a customer fast. The difference is what happens next: organised lead cards, follow-up reminders, quote links, booking, invoicing and review requests. Not a one-off SMS that still leaves the job chasing in your head.'],
  ['How do we get started?', 'Book a free chat. Darren will look at how enquiries come in today, where jobs get lost, and whether FieldBourne fits the way you already work. No credit card. Response within one business day.'],
  ['Do you publish pricing on the site?', 'No. Pricing depends on setup and how your channels work. You get a clear quote on the free chat: implementation plus a flat monthly subscription.'],
];

export function HomePage() {
  const reduce = useReducedMotion();
  usePageMeta(
    'Missed Call Follow-Up for Aussie Tradies | FieldBourne',
    'Turn missed calls and messages into organised leads, fast follow-up, quotes and booked jobs. FieldBourne sits beside ServiceM8 or Tradify. No full software swap.',
  );

  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-[5vw] py-16 md:grid-cols-2 md:gap-16 md:py-20">
        <div>
          <div className="mb-4 inline-block rounded bg-amber-lt px-3 py-1 font-heading text-xs font-bold uppercase tracking-wider text-amber">
            Lead catcher for Aussie tradies
          </div>
          <motion.h1
            className="mb-5 font-heading text-[clamp(2.2rem,4vw,3.2rem)] font-extrabold tracking-tight text-dark"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Catch every enquiry.
            <br />
            <span className="text-teal">Not just the ones you answer.</span>
          </motion.h1>
          <motion.p
            className="mb-8 max-w-md text-lg leading-relaxed text-mid"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
          >
            When a customer calls while you are on the tools, FieldBourne captures it, can acknowledge them straight away, and turns the missed call into a lead you can chase before they ring someone else.
          </motion.p>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#contact" className="rounded-lg bg-teal px-6 py-3 font-heading font-bold text-white no-underline transition hover:bg-teal-hover">
              Book a free chat →
            </a>
            <a href="#how" className="font-heading text-sm font-semibold text-teal no-underline hover:text-teal-hover">
              See how it works
            </a>
          </div>
          <p className="mt-8 text-sm text-grey">✓ Phone-first · ✓ Works beside your current tools · ✓ Aussie owned</p>
        </div>
        <FadeIn delay={0.15} y={24}>
          <Showcase />
          <p className="mt-6 text-center text-sm">
            <a href="/work" className="font-heading font-semibold text-teal no-underline hover:text-teal-hover">
              See sites we&apos;ve built
            </a>
          </p>
        </FadeIn>
      </section>

      <section id="problem" className="px-[5vw] py-20">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <div className="mb-3 font-heading text-xs font-bold uppercase tracking-wider text-amber">Sound familiar?</div>
            <h2 className="mb-4 max-w-3xl font-heading text-3xl font-extrabold text-dark md:text-4xl">You missed the call. Someone else booked the job.</h2>
            <p className="mb-10 max-w-3xl text-mid">
              The problem is not poor CRM admin. It is a real customer trying to hire you while you are driving, working, or talking to someone else. Nobody answers. Follow-up happens too late, or not at all. They contact another business. The job is gone, and you never even knew what it was worth.
            </p>
          </FadeIn>
          <Stagger className="grid gap-4 md:grid-cols-3">
            {[
              ['Missed', 'while on the tools', 'Phone rings mid-job. You cannot stop. By the time you call back, they have already spoken to the next tradie on Google.'],
              ['Follow-up', 'lives in your head', 'A voicemail here, a Facebook message there, a text at 7pm. Nothing organised. Nothing timed. Easy to forget when the day gets loud.'],
              ['Slow', 'reply loses the job', 'Customers are comparing quotes now, not next week. If acknowledgement and follow-up drag, revenue slips away without a fight.'],
            ].map(([num, label, desc]) => (
              <StaggerItem key={label} className="rounded-xl border border-grey bg-white p-6">
                <div className="font-heading text-2xl font-extrabold text-teal">{num}</div>
                <div className="mt-1 font-heading text-sm font-bold text-dark">{label}</div>
                <p className="mt-3 text-sm leading-relaxed text-mid">{desc}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section id="how" className="bg-white px-[5vw] py-20">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <div className="mb-3 font-heading text-xs font-bold uppercase tracking-wider text-amber">How FieldBourne works</div>
            <h2 className="mb-3 font-heading text-3xl font-extrabold text-dark md:text-4xl">From missed enquiry to booked job.</h2>
            <p className="mb-10 max-w-2xl text-mid">Simple steps. Built for a phone in a van, not a desk full of software.</p>
          </FadeIn>
          <Stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {howSteps.map(([title, body], i) => (
              <StaggerItem key={title} className="rounded-xl border border-grey bg-cream p-5">
                <div className="mb-2 font-heading text-sm font-extrabold text-amber">{i + 1}</div>
                <h3 className="mb-2 font-heading text-base font-bold text-dark">{title}</h3>
                <p className="text-sm leading-relaxed text-mid">{body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section id="features" className="px-[5vw] py-20">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <div className="mb-3 font-heading text-xs font-bold uppercase tracking-wider text-amber">What you get</div>
            <h2 className="mb-10 font-heading text-3xl font-extrabold text-dark md:text-4xl">Protect the jobs you already paid to attract.</h2>
          </FadeIn>
          <Stagger className="grid gap-4 md:grid-cols-2">
            {features.map(([num, title, body, result]) => (
              <StaggerItem key={num} className="rounded-xl border border-grey bg-white p-6">
                <div className="mb-2 font-heading text-xs font-bold uppercase tracking-wider text-amber">{num}</div>
                <h3 className="mb-2 font-heading text-lg font-bold text-dark">{title}</h3>
                <p className="text-sm leading-relaxed text-mid">{body}</p>
                <p className="mt-4 border-t border-grey pt-3 font-heading text-sm font-semibold text-teal">{result}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section id="beside" className="bg-white px-[5vw] py-20">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <div className="mb-3 font-heading text-xs font-bold uppercase tracking-wider text-amber">Keep what already works</div>
            <h2 className="mb-4 max-w-3xl font-heading text-3xl font-extrabold text-dark md:text-4xl">FieldBourne is the front door. Not a forced migration.</h2>
            <p className="mb-8 max-w-3xl text-mid">
              You do not need to rip out ServiceM8, Tradify, your calendar, or your accounting software to stop losing leads. FieldBourne sits beside the tools you already use. Its job is to catch and convert new enquiries before they disappear, then help you move them through follow-up, quoting and booking.
            </p>
            <ul className="mb-6 grid max-w-3xl list-none gap-3 sm:grid-cols-2">
              {[
                'Keep your current job-management setup',
                'No major data migration project',
                'Front-door layer for missed calls and messages',
                'Practical for solo operators and small teams',
                'Australian and SMS-native, designed for phone-first work',
              ].map((item) => (
                <li key={item} className="relative pl-6 text-sm font-medium text-dark before:absolute before:left-0 before:text-teal before:content-['✓']">
                  {item}
                </li>
              ))}
            </ul>
            <p className="max-w-3xl text-mid">
              If your current software runs the job well once it is booked, keep it. FieldBourne helps make sure the enquiry becomes a job in the first place.
            </p>
          </FadeIn>
        </div>
      </section>

      <section id="faq" className="px-[5vw] py-20">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <div className="mb-3 font-heading text-xs font-bold uppercase tracking-wider text-amber">Common questions</div>
            <h2 className="mb-8 font-heading text-3xl font-extrabold text-dark">Straight answers before you book a chat.</h2>
          </FadeIn>
          <div className="mx-auto flex max-w-3xl flex-col gap-3">
            {faqs.map(([q, a]) => (
              <details key={q} className="rounded-xl border border-grey bg-white px-5 open:pb-1">
                <summary className="cursor-pointer list-none py-4 font-heading font-bold text-dark marker:content-none [&::-webkit-details-marker]:hidden">
                  {q}
                </summary>
                <p className="pb-4 text-sm leading-relaxed text-mid">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-[5vw] py-16">
        <div className="mx-auto max-w-6xl">
          <FadeIn className="rounded-2xl border border-grey bg-teal-lt p-8 md:p-10">
              <div className="mb-3 font-heading text-xs font-bold uppercase tracking-wider text-amber">Live client</div>
              <h3 className="mb-3 max-w-3xl font-heading text-2xl font-extrabold text-dark">
                TVMagic: from manual SMS forwards to auto-assigned leads on FieldBourne Companion
              </h3>
              <p className="mb-5 max-w-3xl text-mid">
                Nick, TVMagic Franchisee, was manually forwarding around 15 leads a day. Now SMS, voicemail and email land in the app and assign to the right tech.
              </p>
              <Link to="/case-study/tvmagic" className="font-heading font-semibold text-teal no-underline hover:text-teal-hover">
                Read the case study →
              </Link>
          </FadeIn>
        </div>
      </section>

      <section className="bg-white px-[5vw] py-20">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <div className="mb-3 font-heading text-xs font-bold uppercase tracking-wider text-amber">Built by hand</div>
            <h2 className="mb-8 max-w-3xl font-heading text-3xl font-extrabold text-dark">I’d rather show you it working than talk at you about features.</h2>
          </FadeIn>
          <div className="flex flex-col gap-6 md:flex-row md:items-start">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-teal font-heading text-2xl font-extrabold text-white">D</div>
            <div>
              <p className="max-w-3xl text-lg leading-relaxed text-mid">
                “I'm Darren. I built FieldBourne Digital because I kept seeing tradies lose jobs to missed calls and slow follow-up, then spend nights patching it with spreadsheets and texts. FieldBourne Companion was our first build. Same idea: catch the enquiry, keep it moving, work from the phone.”
              </p>
              <p className="mt-3 text-sm text-mid">Darren, Founder, FieldBourne Digital, Beaudesert, QLD</p>
              <Link to="/about" className="mt-3 inline-block font-heading text-sm font-semibold text-teal no-underline hover:text-teal-hover">
                More about FieldBourne Digital →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-[5vw] py-20">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <div className="mb-3 font-heading text-xs font-bold uppercase tracking-wider text-amber">From a real client</div>
            <h2 className="mb-3 font-heading text-3xl font-extrabold text-dark">
              Not Darren. {SITE_CONFIG.clientVideoFirstName}, TVMagic Franchisee.
            </h2>
            <p className="mb-6 text-mid">Our first live client on FieldBourne Companion. Full client video coming soon.</p>
            <div className="aspect-video overflow-hidden rounded-xl border border-grey bg-dark/5">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${SITE_CONFIG.clientVideoYoutubeId}`}
                title="Client testimonial video"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="mt-6 text-lg font-medium text-dark">
              “Within 90 days I was doing zero lead allocation. Leads land in the app and assign themselves.”
            </p>
            <p className="mt-2 text-sm text-mid">Nick · TVMagic Franchisee · FieldBourne Companion</p>
          </FadeIn>
        </div>
      </section>

      <section className="bg-white px-[5vw] py-20">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <div className="mb-3 font-heading text-xs font-bold uppercase tracking-wider text-amber">Foundational Client</div>
            <h2 className="mb-4 font-heading text-3xl font-extrabold text-dark">Premium setup at our entry rate.</h2>
            <p className="mb-8 max-w-3xl text-mid">
              As a new business, we are taking on a small number of foundational clients. You get the full professional build while we grow. There is a one-time implementation fee plus a flat monthly subscription. We quote both on your free chat, so you know what you are in for before anything starts.
            </p>
            <div className="max-w-xl rounded-2xl border-2 border-teal bg-cream p-8">
              <div className="font-heading text-xl font-extrabold text-dark">Foundational Client</div>
              <p className="mt-1 text-sm font-semibold text-teal">Implementation + subscription</p>
              <p className="mt-1 text-sm text-mid">Quoted on your free chat. No surprises.</p>
              <p className="mt-4 text-sm text-mid">
                Front-door lead capture and follow-up, set up around how your enquiries actually come in. Built for early clients who help shape the product.
              </p>
              <ul className="mt-5 list-none space-y-2 text-sm text-dark">
                {['We map where leads get lost today', 'We connect your enquiry channels', 'We train you to chase from your phone'].map((item) => (
                  <li key={item} className="before:mr-2 before:text-teal before:content-['✓']">{item}</li>
                ))}
              </ul>
              <a href="#contact" className="mt-6 inline-block rounded-lg bg-teal px-5 py-3 font-heading text-sm font-bold text-white no-underline hover:bg-teal-hover">
                Book a free chat
              </a>
              <p className="mt-3 text-xs text-mid">No per-user charges. No lock-in contracts. Exact costs confirmed on the call.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="bg-dark px-[5vw] py-20 text-center">
        <FadeIn>
          <div className="mb-3 font-heading text-xs font-bold uppercase tracking-wider text-amber">Ready to stop the leak?</div>
          <h2 className="mx-auto mb-4 max-w-3xl font-heading text-3xl font-extrabold text-white md:text-4xl">
            Let’s look at the enquiries you are already losing.
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-grey">
            Bring one real week of missed calls, messages and late follow-ups to a free chat. We will map where jobs disappear and show how FieldBourne can catch them without forcing you onto a new all-in-one stack.
          </p>
          <a href="#contact" className="inline-block rounded-lg bg-teal px-6 py-3 font-heading font-bold text-white no-underline hover:bg-teal-hover">
            Book a free chat →
          </a>
          <p className="mt-4 text-sm text-grey">No credit card. We respond within one business day.</p>
        </FadeIn>
      </section>

      <section id="contact" className="px-[5vw] py-20">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
          <FadeIn>
            <div className="mb-3 font-heading text-xs font-bold uppercase tracking-wider text-amber">Get in touch</div>
            <h2 className="mb-4 font-heading text-3xl font-extrabold text-dark">Tell us about your business</h2>
            <p className="mb-4 text-mid">Darren will get back to you within one business day to arrange a no-pressure chat.</p>
            <p className="mb-6 text-sm font-medium text-dark">Darren personally onboards every new business. No call centre, no hand-off.</p>
            <p className="text-sm text-mid">
              📧 <a href={`mailto:${SITE_CONFIG.contactEmail}`} className="text-teal no-underline">{SITE_CONFIG.contactEmail}</a>
            </p>
            <p className="mt-2 text-sm text-mid">🇦🇺 Australian owned &amp; operated · ABN {SITE_CONFIG.abn}</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <ContactForm />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
