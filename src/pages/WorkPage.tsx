import { Link } from 'react-router-dom';
import { ConceptSites } from '../components/ConceptSites';
import { PageIntro } from '../components/PageIntro';
import { usePageMeta } from '../hooks/usePageMeta';

export function WorkPage() {
  usePageMeta(
    'Concept sites | FieldBourne Digital',
    'Three concept sites for invented local businesses, built by FieldBourne Digital to show what a site looks like and how it handles enquiries on a phone.',
  );

  return (
    <>
      <PageIntro
        title="Concept sites"
        lead={
          <p className="m-0">
            These are invented businesses. I built them to show what a FieldBourne site looks like and how it handles enquiries on a phone. They are not clients. Open one and try it.
          </p>
        }
      />
      <section className="mx-auto max-w-6xl px-5 pb-24 md:px-8">
        <ConceptSites />
      </section>
      <section className="bg-sky">
        <div className="mx-auto max-w-4xl px-5 py-16 text-center md:px-8">
          <h2 className="text-[clamp(1.7rem,3vw,2.2rem)] text-dark">Want to see yours done like this?</h2>
          <p className="mx-auto mt-3 max-w-[46ch] text-lg leading-relaxed text-mid">
            Start with a free review of the website you have now, and a quick mockup of what it could be.
          </p>
          <Link to="/website-review" className="btn btn-primary mt-7">Get a free review</Link>
        </div>
      </section>
    </>
  );
}
