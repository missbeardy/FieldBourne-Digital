import { PageIntro } from '../components/PageIntro';
import { ReviewForm } from '../components/ReviewForm';
import { SITE_CONFIG } from '../config/site';
import { usePageMeta } from '../hooks/usePageMeta';

const next = [
  ['You send the form', 'Takes a couple of minutes. No logins, no access to your website needed.'],
  ['I go through your site', 'On a computer and a phone, the way your customers would. I check speed, Google, and whether you look local and trustworthy.'],
  [
    `Within ${SITE_CONFIG.replyDays} business days`,
    'You get a one-page report in plain English and a quick mockup of your homepage. Yours to keep.',
  ],
  ['Then it is up to you', "If you'd like help with any of it, we talk. If not, that's fine. No chasing, no pressure."],
] as const;

export function WebsiteReviewPage() {
  usePageMeta(
    'Free website review | FieldBourne Digital, Beaudesert',
    'Get a free plain-English review of your business website and a quick mockup of improvements, within 2 business days. From Darren at FieldBourne Digital, Beaudesert.',
  );

  return (
    <>
      <PageIntro
        title="Get a free review of your website"
        lead={
          <p className="m-0">
            Tell me about your business and where your website is. I'll send back a plain-English review and a quick mockup of what it could look like. Free, and no obligation.
          </p>
        }
      />

      <section className="mx-auto grid max-w-6xl gap-12 px-5 pt-4 pb-24 md:grid-cols-[1.35fr_1fr] md:px-8">
        <div>
          <ReviewForm />
        </div>
        <aside>
          <h2 className="text-2xl text-dark">What happens next</h2>
          <ol className="mt-6 list-none space-y-6 p-0">
            {next.map(([title, body], i) => (
              <li key={title} className="grid grid-cols-[2rem_1fr] gap-3">
                <span className="font-heading text-2xl leading-none text-teal" aria-hidden="true">{i + 1}</span>
                <div>
                  <h3 className="text-lg text-dark">{title}</h3>
                  <p className="mt-1 leading-relaxed text-mid">{body}</p>
                </div>
              </li>
            ))}
          </ol>
          <figure className="m-0 mt-10">
            <img
              src="/images/review/review-page-520.webp"
              width={520}
              height={735}
              loading="lazy"
              alt="A sample one-page website review with seven scores and five fixes"
              className="block w-full max-w-[320px] rounded-md shadow-[0_24px_48px_-30px_rgba(30,42,42,0.6)]"
            />
            <figcaption className="mt-3 max-w-[320px] text-sm text-mid">
              A sample review, done on one of my concept sites.
            </figcaption>
          </figure>
          <p className="mt-8 text-mid">
            Rather talk? Call me on <a href={SITE_CONFIG.phoneHref} className="text-teal">{SITE_CONFIG.phoneDisplay}</a>.
          </p>
        </aside>
      </section>
    </>
  );
}
