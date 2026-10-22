import { Link } from 'react-router-dom';
import { PageIntro } from '../components/PageIntro';
import { RIDGES } from '../components/Ridgelines';
import { SITE_CONFIG } from '../config/site';
import { usePageMeta } from '../hooks/usePageMeta';

export function AboutPage() {
  usePageMeta(
    'About Darren | FieldBourne Digital, Beaudesert',
    'Darren runs FieldBourne Digital from Beaudesert: websites, care plans, and automation and business systems for small businesses across the Scenic Rim and Greater Brisbane.',
  );

  return (
    <>
      <PageIntro
        title="I'm Darren. I build websites and business systems."
        lead={
          <p className="m-0">
            Beaudesert based and Queensland raised. I build websites and small automations for local businesses, and I answer my own phone.
          </p>
        }
      />

      <section className="mx-auto grid max-w-6xl gap-12 px-5 pb-20 md:grid-cols-[1.2fr_1fr] md:px-8">
        <div className="measure space-y-5 text-lg leading-relaxed text-dark/85">
          <p>
            Most small businesses round here don't need an agency. They need someone who'll look at their website the way a customer would, tell them plainly what's working and what isn't, and fix it for a fair price.
          </p>
          <p>
            That's the whole idea. It starts with a free review of your website, and if you'd like help after that, I build the site, look after it, and take some of the repeat admin off your hands.
          </p>
          <p>
            It's a small operation, which keeps the prices fair. It also means you always deal with me, from the first look at your site to the last change.
          </p>
          <p>
            Your domain and website stay in your name. If you ever move on, you take everything with you.
          </p>
        </div>

        {/* Spot for a photo of Darren somewhere local. Until then, the view it would be taken against. */}
        <figure className="m-0 self-start">
          <div className="overflow-hidden rounded-2xl bg-[linear-gradient(180deg,var(--color-sky),var(--color-mist))]">
            <svg viewBox="830 -20 400 300" preserveAspectRatio="xMidYMid slice" className="block aspect-[4/3] w-full" aria-hidden="true">
              <path d={RIDGES.range} fill="var(--color-ridge-far)" />
              <circle cx="1150" cy="70" r="40" fill="var(--color-amber)" />
              <path d={RIDGES.barney} fill="var(--color-ridge-2)" />
              <path d={RIDGES.foothills} fill="var(--color-ridge-3)" />
              <path d={RIDGES.near} fill="var(--color-teal)" />
              <path d={RIDGES.paddock} fill="var(--color-ridge-near)" />
            </svg>
          </div>
          <figcaption className="mt-3 text-sm text-mid">Mount Barney from the Beaudesert side, more or less.</figcaption>
        </figure>
      </section>

      <section className="bg-sky">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-2 md:px-8">
          <div>
            <h2 className="text-[clamp(1.8rem,3.2vw,2.4rem)] text-dark">The name</h2>
            <p className="measure mt-4 text-lg leading-relaxed text-mid">
              A field is a paddock, the ground you work. A bourne is an old word for a creek, and for the place you're headed. Together they're about getting a local business from where it is to where it wants to be.
            </p>
          </div>
          <div>
            <h2 className="text-[clamp(1.8rem,3.2vw,2.4rem)] text-dark">Real work so far</h2>
            <p className="measure mt-4 text-lg leading-relaxed text-mid">
              One real client, TV Magic South Brisbane, runs on a system I built. Three concept sites show the kind of websites I make. I'd rather show you that than make claims.
            </p>
            <p className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
              <Link to="/case-study/tvmagic" className="link-quiet">The TV Magic story</Link>
              <Link to="/work" className="link-quiet">Concept sites</Link>
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-20 text-center md:px-8">
        <h2 className="text-[clamp(1.7rem,3vw,2.2rem)] text-dark">Talk to me about your business</h2>
        <p className="mx-auto mt-3 max-w-[46ch] text-lg leading-relaxed text-mid">
          Start with a free review, or just give me a ring on <a href={SITE_CONFIG.phoneHref} className="text-teal">{SITE_CONFIG.phoneDisplay}</a>.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
          <Link to="/website-review" className="btn btn-primary">Get a free review</Link>
          <a href={SITE_CONFIG.phoneHref} className="link-quiet">Call {SITE_CONFIG.phoneDisplay}</a>
        </div>
      </section>
    </>
  );
}
