import { Link, NavLink } from 'react-router-dom';

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium transition-colors ${isActive ? 'text-dark' : 'text-mid hover:text-dark'}`;

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-grey bg-cream px-[5vw]">
      <Link to="/" className="inline-flex shrink-0 items-center gap-2 no-underline sm:gap-2.5" aria-label="FieldBourne Digital home">
        <img
          src="/logo-current.webp"
          alt=""
          width={40}
          height={40}
          className="h-9 w-9 shrink-0 object-contain sm:h-10 sm:w-10"
        />
        <span aria-hidden="true" className="font-heading text-[1.05rem] font-extrabold tracking-tight text-teal whitespace-nowrap min-[400px]:text-[1.15rem]">
          Field<span className="text-amber">bourne</span>
          <span className="hidden min-[400px]:inline"> Digital</span>
        </span>
      </Link>

      <ul className="hidden items-center gap-8 list-none md:flex">
        <li><a href="/#how" className="text-sm font-medium text-mid no-underline hover:text-dark">How it works</a></li>
        <li><a href="/#beside" className="text-sm font-medium text-mid no-underline hover:text-dark">Beside your tools</a></li>
        <li><NavLink to="/work" className={linkClass}>Work</NavLink></li>
        <li><NavLink to="/case-study/tvmagic" className={linkClass}>Case study</NavLink></li>
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
        className="ml-3 inline-flex min-h-11 shrink-0 items-center rounded-md bg-teal px-3 text-sm font-bold text-white no-underline md:hidden"
      >
        Book a free chat
      </a>
    </nav>
  );
}
