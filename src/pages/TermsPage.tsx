import { LegalPage } from '../components/LegalPage';
import { SITE_CONFIG } from '../config/site';
import { usePageMeta } from '../hooks/usePageMeta';

export function TermsPage() {
  usePageMeta(
    'Terms of service | FieldBourne Digital',
    'Terms for websites, care plans, automation and the free website review from FieldBourne Digital, Beaudesert.',
  );

  return (
    <LegalPage
      title="Terms of service"
      updated="21 October 2026"
      other={{ to: '/privacy', label: 'privacy policy' }}
      intro={
        <p className="m-0">
          These terms apply to the website, the free website review, and the services provided by FieldBourne Digital (ABN {SITE_CONFIG.abn}). Each job also gets a written quote, and where the quote and these terms differ, the quote wins.
        </p>
      }
      sections={[
        {
          title: 'The free website review',
          body: (
            <p>The review is free, with no obligation. It's my honest opinion of your website based on what I can see publicly, plus a quick concept mockup. The mockup is a sketch for you to look at, not a finished site, and I won't publish it.</p>
          ),
        },
        {
          title: 'Websites, care plans and automation',
          body: (
            <p>Before any paid work starts, you get a written quote with the scope, price, milestones, what I'm assuming, and what isn't included. Work starts once you've accepted the quote and paid the deposit.</p>
          ),
        },
        {
          title: 'Prices and payment',
          body: (
            <>
              <p>Prices are in Australian dollars. FieldBourne Digital is not registered for GST, so no GST is charged.</p>
              <p>Unless the quote says otherwise, 50% is due to start and the rest at launch, before the site goes live on your domain. Invoices are due within 7 days. Care plans are billed monthly in advance and run month to month after the first 3 months.</p>
            </>
          ),
        },
        {
          title: 'What you own',
          body: (
            <p>Your domain is registered in your name. Once paid for, the website's content, design and code made for you are yours, along with your words, photos and data. If you move on, I'll hand over the files and any logins I hold, and remove my own access.</p>
          ),
        },
        {
          title: 'Your part',
          body: (
            <p>You're responsible for the accuracy of the content you supply, for having the right to use any photos or material you give me, and for your own legal obligations to your customers, such as privacy and licensing.</p>
          ),
        },
        {
          title: 'Availability',
          body: (
            <p>I aim to keep sites and systems running, but can't promise they'll never be interrupted. I'll give notice of planned work where I can.</p>
          ),
        },
        {
          title: 'Limitation of liability',
          body: (
            <p>To the extent Australian law allows, my liability is limited to the fees you paid for the relevant service, and I'm not liable for indirect or consequential losses. Nothing in these terms limits your rights under the Australian Consumer Law.</p>
          ),
        },
      ]}
    />
  );
}
