import { DateTime, DateTimeUnit, Interval } from 'luxon'
import { DateRowCell } from './DateRowCell'

export function DateRow({ dateUnit, interval }: {
  dateUnit: DateTimeUnit,
  interval: Interval,
}) {
  const days: (DateTime | null)[] = interval.splitBy({ day: 1 }).map(day => day.start)
  const years: Map<number, number> = days.map(day => day?.startOf('year').toMillis()).reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1 / days.length), new Map())
  const months: Map<number, number> = days.map(day => day?.startOf('month').toMillis()).reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1 / days.length), new Map())
  const weeks: Map<number, number> = days.map(day => day?.startOf('week').toMillis()).reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1 / days.length), new Map())

  return (
    <div className="flex flex-row border-b last:border-none border-gray-800 first:rounded-t-lg overflow-hidden">
      { dateUnit == 'year' && Array.from(years).map(year => <DateRowCell widthPercent={year[1] * 100} key={year[0]}>{ DateTime.fromMillis(year[0]).toLocaleString({ year: 'numeric' }) }</DateRowCell>) }
      { dateUnit == 'month' && Array.from(months).map(month => <DateRowCell widthPercent={month[1] * 100} key={month[0]}>{ DateTime.fromMillis(month[0]).toLocaleString({ month: 'short' }) }</DateRowCell>) }
      { dateUnit == 'week' && Array.from(weeks).map(week => <DateRowCell widthPercent={week[1] * 100} key={week[0]}>W { DateTime.fromMillis(week[0]).weekNumber }</DateRowCell>) }
      { dateUnit == 'day' && days.map(day => <DateRowCell widthPercent={(1 / days.length) * 100} key={day?.toUnixInteger()}>{ day?.toLocaleString({ day: '2-digit' }) }</DateRowCell>) }
    </div>
  )
}
