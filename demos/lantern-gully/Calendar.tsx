import { cabins, questionFor, shortLabel, statusText, weekends } from './availability.ts'
import type { Cabin, Status } from './availability.ts'
import { openChat } from './time.ts'

function Nights({ status }: { status: Status }) {
  // Two blocks: Friday night, Saturday night. Filled means taken.
  const fri = status !== 'free'
  const sat = status === 'booked'
  return (
    <span className="nights" aria-hidden="true">
      <i className={fri ? 'on' : ''} />
      <i className={sat ? 'on' : ''} />
    </span>
  )
}

export default function Calendar({ selected }: { selected: Cabin['id'] }) {
  return (
    <table className="cal">
      <caption className="sr-only">
        Sample availability for eight weekends. Each cabin shows whether the Friday and Saturday nights are free or booked.
      </caption>
      <thead>
        <tr>
          <th scope="col" className="cal-when">Weekend</th>
          {cabins.map((c) => (
            <th key={c.id} scope="col" className={c.id === selected ? 'is-sel' : ''}>{c.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {weekends.map((w) => (
          <tr key={w.fri}>
            <th scope="row" className="cal-when">
              <button type="button" className="cal-ask" onClick={() => openChat(questionFor(w))}>
                {shortLabel(w)}
              </button>
            </th>
            {cabins.map((c) => {
              const s = w.status[c.id]
              return (
                <td key={c.id} className={`${c.id === selected ? 'is-sel' : ''} st-${s}`}>
                  <Nights status={s} />
                  <span className="st-text">{statusText[s]}</span>
                </td>
              )
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
