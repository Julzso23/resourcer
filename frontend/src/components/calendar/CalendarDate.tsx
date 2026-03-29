import { DateTime } from 'luxon'

export function CalendarDate({
  date,
  currentMonth,
}: {
  date: DateTime,
  currentMonth: boolean,
}) {
  return <div className={`rounded-md aspect-square flex justify-center items-center cursor-pointer
    ${date.equals(DateTime.now().startOf('day')) ? 'border border-white' : ''}
    ${currentMonth ? 'opacity-100' : 'opacity-50'}
    ${date.isWeekend ? 'bg-gray-800 hover:bg-gray-700' : 'bg-slate-700 hover:bg-slate-600'}`}>
    { date.day }
  </div>
}
