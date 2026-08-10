import { Link } from 'react-router-dom';

type BrandLogoProps = {
  /** Compact mark + wordmark for nav */
  variant?: 'nav' | 'lockup';
  className?: string;
  to?: string;
};

export function BrandWordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`font-heading font-extrabold tracking-tight text-teal whitespace-nowrap ${className}`}>
      Field<span className="text-amber">bourne</span> Digital
    </span>
  );
}

export function BrandLogo({ variant = 'nav', className = '', to = '/' }: BrandLogoProps) {
  if (variant === 'lockup') {
    const img = (
      <img
        src="/logo-current.png"
        alt="FieldBourne Digital"
        className={`h-auto w-full max-w-[220px] object-contain ${className}`}
      />
    );
    return to ? (
      <Link to={to} className="inline-block no-underline" aria-label="FieldBourne Digital home">
        {img}
      </Link>
    ) : (
      img
    );
  }

  const content = (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <img src="/logo-mark.svg" alt="" width={32} height={32} className="h-8 w-8 shrink-0" />
      <BrandWordmark className="text-[1.15rem]" />
    </span>
  );

  return to ? (
    <Link to={to} className="inline-flex items-center no-underline" aria-label="FieldBourne Digital home">
      {content}
    </Link>
  ) : (
    content
  );
}
