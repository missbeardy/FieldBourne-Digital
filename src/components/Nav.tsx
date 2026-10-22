import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { SITE_CONFIG } from '../config/site';
import { Logo } from './Logo';

export const NAV_LINKS = [
  { to: '/services', label: 'Services' },
  { to: '/business-systems', label: 'Business systems' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/work', label: 'Work' },
  { to: '/about', label: 'About' },
] as const;

export function PhoneIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5.2 3.5h3.1l1.6 4.2-2.1 1.4a11.5 11.5 0 0 0 5.1 5.1l1.4-2.1 4.2 1.6v3.1a1.9 1.9 0 0 1-2.1 1.9A15.6 15.6 0 0 1 3.3 5.6a1.9 1.9 0 0 1 1.9-2.1Z" />
    </svg>
  );
}

const desktopLink = ({ isActive }: { isActive: boolean }) =>
  `text-[0.95rem] no-underline transition-colors ${isActive ? 'text-dark font-semibold' : 'text-mid hover:text-dark'}`;

export function Nav() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-cream/92 backdrop-blur-[6px]">
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 md:px-8">
        <Link to="/" className="no-underline" aria-label="FieldBourne Digital, home">
          <Logo />
        </Link>

        <ul className="hidden list-none items-center gap-7 lg:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} className={desktopLink}>
                {l.label}
              </NavLink>
            </li>
          ))}
          <li>
            <Link to="/website-review" className="btn btn-primary !min-h-0 !py-2.5 !px-4 !text-[0.95rem]">
              Get a free review
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-1 lg:hidden">
          <a
            href={SITE_CONFIG.phoneHref}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-teal"
            aria-label={`Call Darren on ${SITE_CONFIG.phoneDisplay}`}
          >
            <PhoneIcon />
          </a>
          <button
            type="button"
            className="inline-flex h-11 items-center gap-2 rounded-full px-3 text-[0.95rem] font-semibold text-dark"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
            Menu
          </button>
        </div>
      </nav>

      <div id="mobile-menu" hidden={!open} className="border-t border-line/70 bg-cream lg:hidden">
        <ul className="mx-auto flex max-w-6xl list-none flex-col px-5 py-3">
          {NAV_LINKS.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className={({ isActive }) =>
                  `block py-3 text-lg no-underline ${isActive ? 'font-semibold text-dark' : 'text-dark'}`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
          <li className="pt-3 pb-2">
            <Link to="/website-review" className="btn btn-primary w-full">
              Get a free review
            </Link>
          </li>
          <li className="pb-2 text-center">
            <a href={SITE_CONFIG.phoneHref} className="link-quiet">
              Or call {SITE_CONFIG.phoneDisplay}
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
