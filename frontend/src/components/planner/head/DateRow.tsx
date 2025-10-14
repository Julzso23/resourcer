import { DateTime, DateTimeUnit } from 'luxon'
import { DateRowCell } from './DateRowCell'

export function DateRow({ dateUnit, dateCells }: {
  dateUnit: DateTimeUnit,
  dateCells: [number, number][],
}) {
  const getDateString = (millis: number) => {
    const date: DateTime = DateTime.fromMillis(millis)
    switch (dateUnit) {
      case 'year': return date.toLocaleString({ year: 'numeric' })
      case 'month': return date.toLocaleString({ month: 'short' })
      case 'week': return 'W ' + date.weekNumber
      case 'day': return date.toLocaleString({ day: '2-digit' })
    }
  }

  return (
    <div className="flex flex-row border-b last:border-none border-gray-800 first:rounded-t-lg overflow-hidden">
      { dateCells.map(date => <DateRowCell widthPercent={date[1] * 100} key={date[0]}>{ getDateString(date[0]) }</DateRowCell>) }
    </div>
  )
}
