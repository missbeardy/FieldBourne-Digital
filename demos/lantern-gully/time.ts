import { useCallback, useState } from 'react'

export type Time = 'dawn' | 'day' | 'dusk' | 'night'

export const times: { id: Time; label: string }[] = [
  { id: 'dawn', label: 'Dawn' },
  { id: 'day', label: 'Day' },
  { id: 'dusk', label: 'Dusk' },
  { id: 'night', label: 'Night' },
]

function read(): Time {
  const t = document.documentElement.getAttribute('data-time')
  return t === 'dawn' || t === 'dusk' || t === 'night' ? t : 'day'
}

/** The page light. The first value is set from local time by a script in index.html. */
export function useTime(): [Time, (t: Time) => void] {
  const [time, setState] = useState<Time>(read)
  const setTime = useCallback((t: Time) => {
    document.documentElement.setAttribute('data-time', t)
    setState(t)
  }, [])
  return [time, setTime]
}

/** What the little caption under the sun says at each light. */
export const captions: Record<Time, string> = {
  dawn: 'Mount Barney, 6.14 am',
  day: 'Mount Barney, 11.20 am',
  dusk: 'Mount Barney, 5.48 pm',
  night: 'Mount Barney, 9.05 pm',
}

/** A question to send as soon as the assistant opens. n changes on every request, so repeats still fire. */
export interface Ask {
  q: string
  n: number
}

/** Opens the demo assistant, optionally sending a question straight away. */
export function openChat(question?: string) {
  window.dispatchEvent(new CustomEvent('lg:open-chat', { detail: { question } }))
}
