import { Link, NavLink } from 'react-router-dom';

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium transition-colors ${isActive ? 'text-dark' : 'text-mid hover:text-dark'}`;

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-grey bg-cream px-[5vw]">
      <Link to="/" className="inline-flex items-center gap-2.5 no-underline">
        <img src="/logo-mark.svg" alt="" width={28} height={28} />
        <span className="font-heading text-[1.15rem] font-extrabold tracking-tight text-teal whitespace-nowrap">
          Field<span className="text-amber">bourne</span> Digital
        </span>
      </Link>

      <ul className="hidden items-center gap-8 list-none md:flex">
        <li><a href="/#how" className="text-sm font-medium text-mid no-underline hover:text-dark">How it works</a></li>
        <li><a href="/#beside" className="text-sm font-medium text-mid no-underline hover:text-dark">Beside your tools</a></li>
        <li><NavLink to="/fieldbourne" className={linkClass}>FieldBourne</NavLink></li>
        <li><NavLink to="/about" className={linkClass}>About</NavLink></li>
        <li>
          <a
            href="/#contact"
            className="rounded-md bg-teal px-5 py-2 text-sm font-semibold text-white no-underline transition-colors hover:bg-teal-hover"
          >
            Book a free chat
          </a>
        </li>
      </ul>

      <a
        href="/#contact"
        className="rounded-md bg-teal px-4 py-1.5 text-sm font-bold text-white no-underline md:hidden"
      >
        Book a free chat
      </a>
    </nav>
  );
}
