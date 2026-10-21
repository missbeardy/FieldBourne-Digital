/**
 * The FieldBourne mark: Mount Barney's two peaks in brand teal, with the sun rising behind
 * the eastern shoulder. Drawn once here; public/favicon.svg uses the same paths.
 */
export function LogoMark({ className = '', title, hill = '#1B6B6B' }: { className?: string; title?: string; hill?: string }) {
  return (
    <svg
      viewBox="0 0 40 28"
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <circle cx="30.5" cy="11.5" r="6.2" fill="#E8943A" />
      <path
        fill={hill}
        d="M1 27 C6 23.6 9.6 21.4 13 17.8 C15.2 15.4 16.6 11.6 18.4 9 C19.4 7.6 20.6 7.7 21.3 9.1 C21.8 10.1 22.5 10.3 23.2 9.2 C24.1 7.7 25.5 7.6 26.4 9.2 C28.2 12.6 31.6 18.6 39 23 L39 27 Z"
      />
    </svg>
  );
}

export function Logo({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark className="h-7 w-10 shrink-0" hill={tone === 'light' ? '#9DBFB7' : '#1B6B6B'} />
      <span
        className={`font-heading text-[1.15rem] font-bold leading-none tracking-[-0.01em] whitespace-nowrap ${
          tone === 'light' ? 'text-cream' : 'text-dark'
        }`}
      >
        FieldBourne Digital
      </span>
    </span>
  );
}
