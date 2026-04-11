import { DateTime, Interval } from 'luxon'

export function CalendarDate({
  date,
  currentMonth,
  selectionSize,
  selectedDate,
  selectedDateRange,
  hoveredDateRange,
  onClick,
  onPointerEnter,
  onPointerLeave,
}: {
  date: DateTime,
  currentMonth: boolean,
  selectionSize?: 'day' | 'halfDay',
  selectedDate?: DateTime,
  selectedDateRange?: Interval,
  hoveredDateRange?: Interval,
  onClick?: (date: DateTime) => void,
  onPointerEnter?: (date: DateTime) => void,
  onPointerLeave?: (date: DateTime) => void,
}) {
  return <div className={`rounded-md aspect-square flex justify-center items-center cursor-pointer relative
    overflow-hidden shadow-sm
    ${date.equals(DateTime.now().startOf('day')) ? 'border border-white' : ''}
    ${currentMonth ? 'opacity-100' : 'opacity-50'}
    ${date.isWeekend ? 'bg-gray-800 hover:bg-gray-700' : 'bg-slate-700 hover:bg-slate-600'}`}>

    {selectionSize === 'day' && <>
      <div className={`w-full h-full hover:bg-blue-900 absolute left-0
        ${selectedDate?.equals(date) || selectedDateRange?.contains(date) ? 'bg-blue-800' : ''}
        ${hoveredDateRange?.contains(date) ? 'bg-blue-900' : ''}`}
        onClick={() => onClick?.(date)} />
    </>}

    {selectionSize === 'halfDay' && <>
      <div className={`w-1/2 h-full hover:bg-blue-900 absolute left-0
        ${selectedDate?.equals(date) || selectedDateRange?.contains(date) ? 'bg-blue-800' : ''}
        ${hoveredDateRange?.contains(date) ? 'bg-blue-900' : ''}`}
        onClick={() => onClick?.(date)}
        onPointerEnter={() => onPointerEnter(date)}
        onPointerLeave={() => onPointerLeave(date)} />
      <div className={`w-1/2 h-full hover:bg-blue-900 absolute right-0
        ${selectedDate?.equals(date.plus({ hours: 12 })) || selectedDateRange?.contains(date.plus({ hours: 12 })) ? 'bg-blue-800' : ''}
        ${hoveredDateRange?.contains(date.plus({ hours: 12 })) ? 'bg-blue-900' : ''}`}
        onClick={() => onClick?.(date.plus({ hours: 12 }))}
        onPointerEnter={() => onPointerEnter(date.plus({ hours: 12 }))}
        onPointerLeave={() => onPointerLeave(date.plus({ hours: 12 }))} />
    </>}

    <span className='z-10 pointer-events-none'>{ date.day }</span>
  </div>
}
