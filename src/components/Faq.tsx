type Item = { readonly q: string; readonly a: string };

/** Plain question and answer list. Native details/summary, so it works without JavaScript and with a keyboard. */
export function Faq({ items }: { items: readonly Item[] }) {
  return (
    <div className="mt-8 border-t border-line">
      {items.map((item) => (
        <details key={item.q} className="group border-b border-line">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-lg font-semibold text-dark [&::-webkit-details-marker]:hidden">
            {item.q}
            <svg
              viewBox="0 0 20 20"
              className="h-5 w-5 shrink-0 text-teal transition-transform duration-200 group-open:rotate-45"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M10 4v12M4 10h12" />
            </svg>
          </summary>
          <p className="measure m-0 pb-6 leading-relaxed text-mid">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
