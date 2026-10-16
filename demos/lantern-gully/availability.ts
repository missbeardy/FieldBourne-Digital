/** Made-up availability for eight weekends. Sample data only. */
export type Status = 'free' | 'sat' | 'booked'

export interface Cabin {
  id: 'ironbark' | 'bottlebrush' | 'spotted-gum'
  name: string
  sleeps: number
  from: number
  blurb: string
  features: string[]
  /** Position on the map, in percent of the map frame. */
  x: number
  y: number
  /** Which side the map label sits on. */
  side: 'left' | 'right'
}

export const cabins: Cabin[] = [
  {
    id: 'ironbark',
    name: 'Ironbark',
    sleeps: 2,
    from: 265,
    blurb: 'The ridge cabin. One room, a big bed, and a deck that looks up toward Barney.',
    features: ['Wood heater', 'Outdoor bath', 'Sleeps two'],
    x: 31,
    y: 21,
    side: 'right',
  },
  {
    id: 'bottlebrush',
    name: 'Bottlebrush',
    sleeps: 4,
    from: 320,
    blurb: 'Down by the creek. A verandah, a proper kitchen, and the sound of water all night.',
    features: ['Creek frontage', 'Gas kitchen', 'Sleeps four'],
    x: 49,
    y: 49,
    side: 'left',
  },
  {
    id: 'spotted-gum',
    name: 'Spotted Gum',
    sleeps: 6,
    from: 410,
    blurb: 'The family one, on the flat beside the star paddock. Two bedrooms and a long table.',
    features: ['Two bedrooms', 'Firepit', 'Sleeps six'],
    x: 74,
    y: 66,
    side: 'left',
  },
]

export interface Weekend {
  /** Friday date, ISO. */
  fri: string
  status: Record<Cabin['id'], Status>
}

export const weekends: Weekend[] = [
  { fri: '2026-10-23', status: { ironbark: 'booked', bottlebrush: 'free', 'spotted-gum': 'booked' } },
  { fri: '2026-10-30', status: { ironbark: 'free', bottlebrush: 'booked', 'spotted-gum': 'booked' } },
  { fri: '2026-11-06', status: { ironbark: 'booked', bottlebrush: 'booked', 'spotted-gum': 'free' } },
  { fri: '2026-11-13', status: { ironbark: 'free', bottlebrush: 'booked', 'spotted-gum': 'sat' } },
  { fri: '2026-11-20', status: { ironbark: 'booked', bottlebrush: 'free', 'spotted-gum': 'booked' } },
  { fri: '2026-11-27', status: { ironbark: 'free', bottlebrush: 'sat', 'spotted-gum': 'booked' } },
  { fri: '2026-12-04', status: { ironbark: 'booked', bottlebrush: 'booked', 'spotted-gum': 'booked' } },
  { fri: '2026-12-11', status: { ironbark: 'booked', bottlebrush: 'booked', 'spotted-gum': 'free' } },
]

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const SHORT = MONTHS.map((m) => m.slice(0, 3))

function parts(iso: string, addDays: number) {
  const [y, m, d] = iso.split('-').map(Number)
  const dt = new Date(Date.UTC(y, m - 1, d + addDays))
  return { d: dt.getUTCDate(), m: dt.getUTCMonth() }
}

/** "23 to 25 Oct" or "30 Oct to 1 Nov". */
export function shortLabel(w: Weekend): string {
  const a = parts(w.fri, 0)
  const b = parts(w.fri, 2)
  return a.m === b.m ? `${a.d} to ${b.d} ${SHORT[a.m]}` : `${a.d} ${SHORT[a.m]} to ${b.d} ${SHORT[b.m]}`
}

/** "Fri 13 to Sun 15 November". */
export function longLabel(w: Weekend): string {
  const a = parts(w.fri, 0)
  const b = parts(w.fri, 2)
  return a.m === b.m
    ? `Fri ${a.d} to Sun ${b.d} ${MONTHS[a.m]}`
    : `Fri ${a.d} ${MONTHS[a.m]} to Sun ${b.d} ${MONTHS[b.m]}`
}

/** Saturday date, used to name a weekend ("the 14th"). */
export function saturday(w: Weekend): { d: number; m: number } {
  return parts(w.fri, 1)
}

export function ordinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}

export function questionFor(w: Weekend): string {
  return `Is the weekend of the ${ordinal(saturday(w).d)} free?`
}

export const statusText: Record<Status, string> = {
  free: 'Free',
  sat: 'Sat only',
  booked: 'Booked',
}
