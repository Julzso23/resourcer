import { DateTime, DateTimeUnit } from 'luxon'
import { DateRowCell } from './DateRowCell'
import { DateRowScrollButton } from './DateRowScrollButton'

export function DateRow({
  dateUnit,
  dateCells,
  onScroll,
  onSetStartDate,
}: {
  dateUnit: DateTimeUnit
  dateCells: [number, number][]
  onScroll: (dateUnit: DateTimeUnit, amount: number) => void
  onSetStartDate: (dateUnit: DateTimeUnit, millis: number) => void
}) {
  const getDateString = (millis: number) => {
    const date: DateTime = DateTime.fromMillis(millis)
    switch (dateUnit) {
      case 'year':
        return date.toLocaleString({ year: 'numeric' })
      case 'month':
        return date.toLocaleString({ month: 'short' })
      case 'week':
        return 'W ' + date.weekNumber
      case 'day':
        return date.toLocaleString({ day: '2-digit' })
    }
  }

  return (
    <div className="flex flex-row border-b last:border-none border-gray-800 first:rounded-t-lg overflow-hidden relative">
      <DateRowScrollButton onClick={() => onScroll(dateUnit, -1)} />
      {dateCells.map((date) => (
        <DateRowCell
          widthPercent={date[1] * 100}
          key={date[0]}
          onClick={() => onSetStartDate(dateUnit, date[0])}
        >
          {getDateString(date[0])}
        </DateRowCell>
      ))}
      <DateRowScrollButton right onClick={() => onScroll(dateUnit, 1)} />
    </div>
  )
}
