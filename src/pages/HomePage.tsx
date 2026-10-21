import { Link } from 'react-router-dom';
import { SCENIC_RIM_TOWNS, SITE_CONFIG } from '../config/site';
import { ConceptSites } from '../components/ConceptSites';
import { Faq } from '../components/Faq';
import { ReviewForm } from '../components/ReviewForm';
import { RidgeEdge, Ridgelines } from '../components/Ridgelines';
import { usePageMeta } from '../hooks/usePageMeta';

const steps = [
  {
    title: 'Free website review',
    body: "A one-page report on your website and a quick mockup of what it could look like. Yours to keep, whatever you decide.",
    price: 'Free',
  },
  {
    title: 'A website, then I look after it',
    body: 'Built for how your customers find and contact you, with a monthly care plan so it keeps working after launch.',
    price: 'Sites from $790. Care from $49 a month.',
  },
  {
    title: 'Automation',
    body: 'Take the repeat admin off your plate: enquiries, bookings, reminders and follow-ups that look after themselves.',
    price: 'Quoted per job',
  },
] as const;

const faqs = [
  {
    q: 'Do I own my website and domain?',
    a: 'Yes. Your domain is registered in your name, and your words and photos are yours. If you ever move on, I hand everything over.',
  },
  {
    q: 'What does it cost?',
    a: 'The review is free. A one-page site starts at $790 and a small business site at $1,490, with care plans from $49 a month. Every job gets a written quote first, and I am not registered for GST, so there is no GST on top.',
  },
  {
    q: "I'm on Wix or Squarespace. Can you help?",
    a: 'Yes. I can fix up the site you already have, from $390, or build a new one on the same builder so you keep your account.',
  },
  {
    q: 'Do I need a new site, or can you fix mine?',
    a: "Often a few changes do most of the good. The review tells you which, honestly, and I'll say so if your site is fine as it is.",
  },
  {
    q: 'How long does it take?',
    a: 'The review comes back within 2 business days. A one-page site takes one to two weeks, and a small business site two to three.',
  },
] as const;

export function HomePage() {
  usePageMeta(
    'Local websites for small businesses | FieldBourne Digital, Beaudesert',
    'Websites for local businesses, from someone local. Get a free plain-English review of your website and a quick mockup within 2 business days. Beaudesert, Scenic Rim.',
  );

  return (
    <>
      {/* First viewport: the heading over a quiet morning sky, the Scenic Rim along the bottom */}
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,var(--color-cream)_0%,var(--color-sky)_48%,var(--color-mist)_78%,#D3E3DD_100%)] [--rh:clamp(150px,27vh,230px)] md:[--rh:clamp(220px,36vh,400px)]">
        <div className="relative z-10 mx-auto max-w-6xl px-5 pt-[clamp(2rem,6vh,4.5rem)] pb-[calc(var(--rh)*0.92)] md:pb-[calc(var(--rh)*0.8)] md:px-8">
          <h1 className="max-w-[15ch] text-[clamp(2.6rem,5.6vw,4.6rem)] leading-[1.02] text-dark">
            Websites for local businesses, from someone local.
          </h1>
          <p className="measure mt-6 text-[clamp(1.1rem,1.6vw,1.3rem)] leading-relaxed text-dark/85">
            Beaudesert based and Queensland raised. I know the area, and I know how your customers talk.
          </p>
          <p className="measure mt-3 text-[1.05rem] leading-relaxed text-mid">
            Send me your website and I'll send back a plain-English review and a quick mockup of what it could look like, within {SITE_CONFIG.replyDays} business days. Free, and no obligation.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Link to="/website-review" className="btn btn-primary">
              Get my free review
            </Link>
            <a href={SITE_CONFIG.phoneHref} className="link-quiet">
              Or call {SITE_CONFIG.phoneDisplay}
            </a>
          </div>
        </div>
        <Ridgelines />
      </section>

      {/* What the review actually is, shown rather than described */}
      <section className="bg-ridge-near">
        <div className="on-deep mx-auto grid max-w-6xl items-center gap-12 px-5 pt-14 pb-20 md:grid-cols-[1fr_1.05fr] md:px-8 md:pt-16 md:pb-24">
          <div>
            <h2 className="text-[clamp(1.9rem,3.6vw,2.8rem)] text-cream">What you get from the free review</h2>
            <p className="measure mt-5 text-lg leading-relaxed text-on-deep">
              I go through your website the way your customers do, on a computer and on a phone. Then you get two things back.
            </p>
            <ul className="mt-7 list-none space-y-5 p-0">
              <li>
                <h3 className="text-xl text-cream">A one-page report in plain English</h3>
                <p className="measure mt-1.5 leading-relaxed text-on-deep-soft">
                  How quick it is on a phone, how you show up on Google, whether people can tell you're real and local, and the five things I'd fix first.
                </p>
              </li>
              <li>
                <h3 className="text-xl text-cream">A quick mockup of your homepage</h3>
                <p className="measure mt-1.5 leading-relaxed text-on-deep-soft">
                  Your own business, your colours, with those fixes in place, so you can see the difference before spending anything.
                </p>
              </li>
            </ul>
            <div className="mt-9">
              <Link to="/website-review" className="btn btn-sun">Get my free review</Link>
            </div>
          </div>

          <figure className="m-0">
            <div className="relative mx-auto max-w-[460px] md:mx-0 md:ml-auto">
              <img
                src="/images/review/review-page-520.webp"
                srcSet="/images/review/review-page-520.webp 520w, /images/review/review-page.webp 794w"
                sizes="(min-width: 768px) 460px, 90vw"
                width={520}
                height={735}
                loading="lazy"
                alt="A one-page website review for Wirebird Electrical, with seven scores and five fixes"
                className="block w-full rounded-md shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] md:rotate-[1.2deg]"
              />
            </div>
            <figcaption className="mx-auto mt-5 max-w-[460px] text-sm leading-relaxed text-on-deep-soft md:mr-0 md:ml-auto">
              A real review, done on Wirebird Electrical, one of my concept sites. Yours would look like this, about your business.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Who it's for: one plain statement, no industry cards */}
      <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <h2 className="max-w-[22ch] text-[clamp(1.9rem,3.8vw,3rem)] text-dark">
          For small local businesses and the people who run them on their own.
        </h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <p className="measure text-lg leading-relaxed text-mid">
            Tradies, cafes, farm stays, shops, makers, clinics, the lot. If locals look you up before they ring or walk in, your website is doing a job, and it should do it well.
          </p>
          <p className="measure text-lg leading-relaxed text-mid">
            People round here like to back local. Your website is usually where they check you out first. It should make that easy: who you are, where you are, and how to get hold of you.
          </p>
        </div>
      </section>

      {/* How it works: the offer ladder, three steps in order */}
      <section className="bg-sky">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
          <h2 className="text-[clamp(1.9rem,3.6vw,2.8rem)] text-dark">How it works</h2>
          <ol className="mt-10 grid list-none gap-10 p-0 md:grid-cols-3 md:gap-8">
            {steps.map((s, i) => (
              <li key={s.title} className="relative">
                <div className="flex items-baseline gap-3">
                  <span className="font-heading text-[2.6rem] leading-none text-teal" aria-hidden="true">{i + 1}</span>
                  <h3 className="text-[1.35rem] text-dark">{s.title}</h3>
                </div>
                <p className="mt-3 leading-relaxed text-mid">{s.body}</p>
                <p className="nums mt-3 font-semibold text-dark">{s.price}</p>
              </li>
            ))}
          </ol>
          <p className="mt-10">
            <Link to="/services" className="link-quiet">What's included</Link>
            <Link to="/pricing" className="link-quiet ml-6">See all prices</Link>
          </p>
        </div>
      </section>

      {/* Concept sites, clearly labelled as invented */}
      <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-[clamp(1.9rem,3.6vw,2.8rem)] text-dark">See what a FieldBourne site looks like</h2>
          <Link to="/work" className="link-quiet">All concept sites</Link>
        </div>
        <p className="measure mt-4 text-lg leading-relaxed text-mid">
          These are invented businesses, built to show the kind of site I make. They are not clients.
        </p>
        <ConceptSites compact />
      </section>

      {/* Local */}
      <section className="bg-mist">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-[1fr_1fr] md:px-8 md:py-24">
          <div>
            <h2 className="text-[clamp(1.9rem,3.6vw,2.8rem)] text-dark">Working across the Scenic Rim</h2>
            <p className="measure mt-5 text-lg leading-relaxed text-mid">
              I'm in Beaudesert. Most of my work is within an hour's drive, and further out across the Lockyer Valley, Ipswich and Logan.
            </p>
            <p className="measure mt-4 text-lg leading-relaxed text-mid">
              Your domain and website stay in your name. You deal with me, not a call centre.
            </p>
            <p className="mt-7">
              <a href={SITE_CONFIG.phoneHref} className="link-quiet">Call {SITE_CONFIG.phoneDisplay}</a>
            </p>
          </div>
          <ul className="grid list-none grid-cols-2 gap-x-8 self-center p-0 text-lg">
            {SCENIC_RIM_TOWNS.map((t) => (
              <li key={t} className="border-b border-ridge-2/50 py-3 text-dark">{t}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Questions */}
      <section className="mx-auto max-w-4xl px-5 py-20 md:px-8 md:py-24">
        <h2 className="text-[clamp(1.9rem,3.6vw,2.8rem)] text-dark">Questions people ask</h2>
        <Faq items={faqs} />
      </section>

      {/* The form, under the hills */}
      <section id="review" className="bg-ridge-near">
        <RidgeEdge />
        <div className="on-deep mx-auto max-w-4xl px-5 pt-10 pb-24 md:px-8">
          <h2 className="text-[clamp(1.9rem,3.6vw,2.8rem)] text-cream">Get your free website review</h2>
          <p className="measure mt-4 mb-9 text-lg leading-relaxed text-on-deep">
            Tell me where to look. I'll send the review and a mockup within {SITE_CONFIG.replyDays} business days.
          </p>
          <ReviewForm />
        </div>
      </section>
    </>
  );
}
