import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';

export function Showcase() {
  const reduce = useReducedMotion();

  return (
    <div className="overflow-hidden rounded-2xl border-2 border-teal bg-dark shadow-[0_12px_40px_rgba(30,42,42,0.18)]">
      <div className="bg-teal px-5 pb-4 pt-5 text-white">
        <span className="mb-2 inline-flex items-center gap-1.5 rounded bg-white/15 px-2 py-0.5 text-[0.7rem] font-bold uppercase tracking-wide">
          <span className="h-1.5 w-1.5 rounded-full bg-[#2DC97E]" />
          Live now
        </span>
        <div className="font-heading text-lg font-extrabold">FieldBourne Companion</div>
        <p className="mt-1 text-sm text-white/85">A TV aerial franchise catching leads on FieldBourne today</p>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {[
            ['3', 'new leads today'],
            ['12', 'open jobs'],
            ['1-click', 'assign tech'],
          ].map(([strong, label]) => (
            <div key={label} className="rounded-lg bg-white/10 px-2 py-2 text-center">
              <strong className="block font-heading text-sm font-extrabold">{strong}</strong>
              <span className="text-[0.7rem] text-white/80">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-3 gap-2">
          {[
            {
              title: 'New leads',
              cards: [
                { text: 'Missed call, Penrith', amber: true },
                { text: 'SMS enquiry, Parramatta', amber: false },
              ],
            },
            { title: 'Follow-up', cards: [{ text: 'Quote sent, waiting', amber: false }] },
            { title: 'Booked', cards: [{ text: 'Tomorrow 9am, Mount Druitt', amber: false }] },
          ].map((col, colIdx) => (
            <div key={col.title} className="rounded-lg bg-cream/10 p-2">
              <div className="mb-2 text-[0.65rem] font-bold uppercase tracking-wide text-grey">{col.title}</div>
              {col.cards.map((card, i) => (
                <motion.div
                  key={card.text}
                  className={`mb-2 rounded-md px-2 py-2 text-[0.72rem] font-medium last:mb-0 ${
                    card.amber ? 'bg-amber-lt text-dark' : 'bg-cream text-dark'
                  }`}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + colIdx * 0.08 + i * 0.06, duration: 0.4 }}
                >
                  {card.text}
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/10 px-5 py-3">
        <p className="text-xs text-grey">Real workflow from our first live client.</p>
        <Link to="/fieldbourne" className="rounded-md bg-amber px-3 py-1.5 text-xs font-bold text-white no-underline hover:opacity-90">
          See the case study →
        </Link>
      </div>
    </div>
  );
}
