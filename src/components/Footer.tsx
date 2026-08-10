import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '../config/site';

export function Footer() {
  return (
    <footer className="flex flex-col items-center gap-4 border-t border-grey/40 bg-dark px-[5vw] py-10 text-center md:flex-row md:justify-between md:text-left">
      <div className="flex flex-col items-center gap-3 md:items-start">
        <img
          src="/logo-current.png"
          alt="FieldBourne Digital"
          className="h-12 w-auto rounded-md bg-white object-contain p-1.5"
        />
        <p className="text-sm text-grey">© 2026 FieldBourne Digital · ABN {SITE_CONFIG.abn}</p>
      </div>
      <ul className="flex list-none flex-wrap justify-center gap-5">
        <li><Link to="/privacy" className="text-sm text-grey no-underline hover:text-white">Privacy</Link></li>
        <li><Link to="/terms" className="text-sm text-grey no-underline hover:text-white">Terms</Link></li>
        <li><a href="/#contact" className="text-sm text-grey no-underline hover:text-white">Contact</a></li>
        <li>
          <a
            href={SITE_CONFIG.tvmagicAppUrl}
            className="text-sm text-grey no-underline hover:text-white"
            target="_blank"
            rel="noreferrer"
          >
            Client login
          </a>
        </li>
      </ul>
    </footer>
  );
}
