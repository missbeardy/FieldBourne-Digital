import { Link } from 'react-router-dom';
import { ConceptSites } from '../components/ConceptSites';
import { PageIntro } from '../components/PageIntro';
import { SCENIC_RIM_TOWNS, SITE_CONFIG } from '../config/site';
import { usePageMeta } from '../hooks/usePageMeta';

export function ScenicRimPage() {
  usePageMeta(
    'Websites for Scenic Rim businesses | FieldBourne Digital, Beaudesert',
    'Local web design for small businesses in Beaudesert, Boonah, Tamborine Mountain, Canungra, Kalbar, Rathdowney and across the Scenic Rim. Free website review.',
  );

  return (
    <>
      <PageIntro
        title="Websites for Scenic Rim businesses"
        lead={
          <p className="m-0">
            I'm based in Beaudesert and work with small businesses right across the Scenic Rim, from the tradie in Canungra to the cabins out past Rathdowney.
          </p>
        }
      />

      <section className="mx-auto grid max-w-6xl gap-12 px-5 pb-20 md:grid-cols-[1.2fr_1fr] md:px-8">
        <div className="measure space-y-5 text-lg leading-relaxed text-dark/85">
          <p>
            Business out here works differently to the city. Customers are often locals who'd rather back someone nearby, or visitors planning a weekend from Brisbane on their phone. Mobile reception can be patchy. Word of mouth still does a lot of the work.
          </p>
          <p>
            A good local website helps with all of that. It loads fast on a weak signal, says clearly where you are and when you're open, shows real photos and real reviews, and makes ringing or booking easy.
          </p>
          <p>
            Your domain and website stay in your name, and you deal with me directly. If something needs fixing, you ring me.
          </p>
        </div>
        <div>
          <h2 className="text-2xl text-dark">Towns I work in</h2>
          <ul className="mt-5 grid list-none grid-cols-2 gap-x-8 p-0 text-lg">
            {SCENIC_RIM_TOWNS.map((t) => (
              <li key={t} className="border-b border-line py-3 text-dark">{t}</li>
            ))}
          </ul>
          <p className="mt-5 leading-relaxed text-mid">And further out across the Lockyer Valley, Ipswich and Logan.</p>
        </div>
      </section>

      <section className="bg-sky">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8">
          <h2 className="text-[clamp(1.8rem,3.2vw,2.4rem)] text-dark">Concept sites set in the Scenic Rim</h2>
          <p className="measure mt-4 text-lg leading-relaxed text-mid">
            An electrician in Beaudesert, a cafe in Boonah and cabins under Mount Barney. All invented, to show what a local site can do.
          </p>
          <ConceptSites compact />
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-20 text-center md:px-8">
        <h2 className="text-[clamp(1.7rem,3vw,2.2rem)] text-dark">See how your website stacks up</h2>
        <p className="mx-auto mt-3 max-w-[46ch] text-lg leading-relaxed text-mid">
          A free plain-English review and a quick mockup, within {SITE_CONFIG.replyDays} business days.
        </p>
        <Link to="/website-review" className="btn btn-primary mt-7">Get a free review</Link>
      </section>
    </>
  );
}
