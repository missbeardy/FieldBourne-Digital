export type Course = 'breakfast' | 'lunch'

/** Opening hours by weekday (0 = Sunday). Minutes since midnight; null = closed. */
const OPEN = 7 * 60
const BREAKFAST_END = 11 * 60 + 30
const WEEKDAY_CLOSE = 14 * 60
const WEEKEND_CLOSE = 13 * 60

export function closeFor(day: number): number | null {
  if (day === 1 || day === 2) return null
  return day === 0 || day === 6 ? WEEKEND_CLOSE : WEEKDAY_CLOSE
}

export function clockLabel(d: Date): string {
  const h = d.getHours()
  const m = String(d.getMinutes()).padStart(2, '0')
  const h12 = h % 12 === 0 ? 12 : h % 12
  return `${h12}:${m} ${h < 12 ? 'am' : 'pm'}`
}

function span(mins: number): string {
  const h = Math.floor(mins / 60)
  const m = mins % 60
  if (h === 0) return `${m} min`
  if (m === 0) return `${h} hr`
  return `${h} hr ${m} min`
}

export interface MenuClock {
  /** Which card the visitor's clock says is on. */
  course: Course
  /** One plain sentence describing the kitchen right now. */
  status: string
}

export function menuClock(now: Date): MenuClock {
  const mins = now.getHours() * 60 + now.getMinutes()
  const close = closeFor(now.getDay())
  const course: Course = mins < BREAKFAST_END ? 'breakfast' : 'lunch'
  if (close === null) {
    return { course, status: 'We are closed today. Open Wednesday to Sunday from 7 am.' }
  }
  if (mins < OPEN) {
    return { course, status: `Not open yet. The doors open at 7 am and breakfast is on first.` }
  }
  if (mins < BREAKFAST_END) {
    return { course, status: `Breakfast is on until 11:30 am. ${span(BREAKFAST_END - mins)} to go.` }
  }
  if (mins < close) {
    return { course, status: `Lunch is on now, until the kitchen closes at ${close === WEEKDAY_CLOSE ? '2' : '1'} pm.` }
  }
  return { course, status: 'The kitchen has closed for today. Next time, breakfast starts at 7 am.' }
}
