import { Link } from 'react-router-dom';
import { PageIntro } from '../components/PageIntro';
import { usePageMeta } from '../hooks/usePageMeta';

type Row = { item: string; detail?: string; price: string };

const groups: { title: string; rows: Row[] }[] = [
  {
    title: 'To start',
    rows: [{ item: 'Free website review', detail: 'One-page report and a quick mockup, within 2 business days', price: 'Free' }],
  },
  {
    title: 'Websites',
    rows: [
      { item: 'One-page site', detail: 'Fast site I host. One to two weeks', price: 'from $790' },
      { item: 'Small business site', detail: 'Up to 5 pages, fast site I host. Two to three weeks', price: 'from $1,490' },
      { item: 'Fix up your current site', detail: 'Squarespace, Wix or Shopify. About a week', price: 'from $390' },
      { item: 'New site on your own builder', detail: 'Squarespace, Wix or Shopify. About two weeks', price: 'from $990' },
      { item: 'WordPress site', detail: 'Up to 5 pages, managed WordPress on VentraIP. About three weeks', price: 'from $1,890' },
    ],
  },
  {
    title: 'Care plans',
    rows: [
      { item: 'Basic', detail: 'Hosting, backups, a monthly check, up to 15 minutes of changes', price: '$49 a month' },
      { item: 'Standard', detail: 'Everything in Basic, up to an hour of changes, Google Business Profile updates', price: '$89 a month' },
      { item: 'WordPress', detail: 'Everything in Basic, plus plugin and security updates', price: '$99 a month' },
    ],
  },
  {
    title: 'Automation',
    rows: [
      { item: 'Process audit', detail: '45-minute chat and a write-up. Taken off the job if you go ahead', price: '$149' },
      { item: 'Automation', detail: 'Most two-week pilots land between $390 and $990', price: 'Quoted per job' },
    ],
  },
  {
    title: 'Extras',
    rows: [
      { item: 'Extra page', price: '$150' },
      { item: 'Copywriting', detail: 'Per page', price: '$90' },
      { item: 'Out-of-scope work', detail: 'Hourly', price: '$65 an hour' },
    ],
  },
];

export function PricingPage() {
  usePageMeta(
    'Prices | FieldBourne Digital, Beaudesert',
    'Starting prices for websites, care plans and automation for small local businesses. The website review is free. No GST charged.',
  );

  return (
    <>
      <PageIntro
        title="Prices"
        lead={
          <p className="m-0">
            Starting prices, kept fair because it's just me, with no office or sales team to pay for. Every job gets a written quote before any work starts.
          </p>
        }
      />

      <section className="mx-auto max-w-4xl px-5 pb-16 md:px-8">
        {groups.map((g) => (
          <div key={g.title} className="mt-12 first:mt-2">
            <h2 className="text-2xl text-dark">{g.title}</h2>
            <table className="nums mt-4 w-full border-collapse text-left">
              <tbody>
                {g.rows.map((r) => (
                  <tr key={r.item} className="border-b border-line align-top">
                    <th scope="row" className="py-4 pr-6 font-normal">
                      <span className="block text-lg font-semibold text-dark">{r.item}</span>
                      {r.detail && <span className="mt-0.5 block leading-relaxed text-mid">{r.detail}</span>}
                    </th>
                    <td className="py-4 text-right text-lg font-semibold whitespace-nowrap text-dark">{r.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </section>

      <section className="bg-sky">
        <div className="mx-auto grid max-w-4xl gap-8 px-5 py-14 md:grid-cols-3 md:px-8">
          <p className="m-0 leading-relaxed text-dark">
            <span className="font-semibold">No GST.</span> FieldBourne Digital is not registered for GST, so no GST is charged.
          </p>
          <p className="m-0 leading-relaxed text-dark">
            <span className="font-semibold">50% to start</span>, the rest at launch. Invoices are due within 7 days.
          </p>
          <p className="m-0 leading-relaxed text-dark">
            <span className="font-semibold">Yours to keep.</span> Your domain, words and photos are always yours. Domain fees, about $20 to $40 a year, are paid by you in your name.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-16 text-center md:px-8">
        <h2 className="text-[clamp(1.7rem,3vw,2.2rem)] text-dark">Not sure what you need?</h2>
        <p className="mx-auto mt-3 max-w-[46ch] text-lg leading-relaxed text-mid">The free review tells you, before you spend anything.</p>
        <Link to="/website-review" className="btn btn-primary mt-7">Get a free review</Link>
      </section>
    </>
  );
}
