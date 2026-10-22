import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '../config/site';
import { Logo } from './Logo';
import { NAV_LINKS } from './Nav';

export function Footer() {
  return (
    <footer className="on-deep bg-ridge-near text-on-deep">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.3fr_1fr_1fr] md:px-8">
        <div>
          <Logo tone="light" />
          <p className="mt-4 max-w-xs leading-relaxed text-on-deep-soft">
            A local studio in Beaudesert for websites and business systems, working across the Scenic Rim, Lockyer Valley, Ipswich, Logan and Greater Brisbane.
          </p>
        </div>

        <div>
          <h2 className="mb-3 font-heading text-base text-cream">Pages</h2>
          <ul className="list-none space-y-2 p-0">
            <li><Link to="/website-review" className="text-on-deep no-underline hover:text-cream">Free website review</Link></li>
            {NAV_LINKS.map((l) => (
              <li key={l.to}><Link to={l.to} className="text-on-deep no-underline hover:text-cream">{l.label}</Link></li>
            ))}
            <li><Link to="/case-study/tvmagic" className="text-on-deep no-underline hover:text-cream">TV Magic case study</Link></li>
            <li><Link to="/scenic-rim" className="text-on-deep no-underline hover:text-cream">Scenic Rim</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="mb-3 font-heading text-base text-cream">Get in touch</h2>
          <ul className="list-none space-y-2 p-0">
            <li><a href={SITE_CONFIG.phoneHref} className="text-cream no-underline">{SITE_CONFIG.phoneDisplay}</a></li>
            <li><a href={`mailto:${SITE_CONFIG.contactEmail}`} className="break-all text-on-deep no-underline hover:text-cream">{SITE_CONFIG.contactEmail}</a></li>
            <li className="text-on-deep-soft">Beaudesert, QLD 4285</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-5 text-sm text-on-deep-soft md:flex-row md:items-center md:justify-between md:px-8">
          <p className="m-0">© {new Date().getFullYear()} FieldBourne Digital · ABN {SITE_CONFIG.abn}</p>
          <ul className="flex list-none flex-wrap gap-5 p-0">
            <li><Link to="/privacy" className="text-on-deep-soft no-underline hover:text-cream">Privacy</Link></li>
            <li><Link to="/terms" className="text-on-deep-soft no-underline hover:text-cream">Terms</Link></li>
            <li>
              <a href={SITE_CONFIG.tvmagicAppUrl} target="_blank" rel="noreferrer" className="text-on-deep-soft no-underline hover:text-cream">
                Client login
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
