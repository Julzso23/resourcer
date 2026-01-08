import { DateTime, Interval } from 'luxon'

export function DateMarkerLine({
  date,
  interval,
}: {
  date: DateTime
  interval: Interval
}) {
  const left: number =
    (date.diff(interval.start!).as('days') / interval.length('days')) * 100
  return (
    <div
      className="border-l border-white border-dashed absolute h-full opacity-50"
      style={{
        left: left + '%',
        display: interval.contains(date) ? 'block' : 'none',
      }}
    ></div>
  )
}
