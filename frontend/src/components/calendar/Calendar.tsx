import { DateTime, Interval } from 'luxon'
import { CalendarDate } from './CalendarDate'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'

export function Calendar({
  showWeekends = true,
  size = 'sm',
  selectionSize = 'day',
  selectionType = 'single',
  selectedDate,
  selectedDateRange,
  onDateSelect,
  onDateRangeSelect,
}: {
  showWeekends?: boolean,
  size?: 'sm' | 'md' | 'lg',
  selectionSize?: 'day' | 'halfDay',
  selectionType?: 'single' | 'range',
  selectedDate?: DateTime,
  selectedDateRange?: Interval,
  onDateSelect?: (date: DateTime) => void,
  onDateRangeSelect?: (range: Interval) => void,
}) {
  const [viewDate, setViewDate] = useState(DateTime.now().startOf('month').startOf('week'))
  const [selectedStartDate, setSelectedStartDate] = useState<DateTime | undefined>(undefined)
  const [hoveredDateRange, setHoveredDateRange] = useState<Interval | undefined>(undefined)

  const dates = Array.from({ length: 42 }, (_, i) => viewDate.plus({ days: i }))
  const titles = dates.slice(0, showWeekends ? 7 : 5).map(date => date.toFormat('ccc'))
  const highlightedMonth = viewDate.plus({ weeks: 2 }).startOf('month')

  const scrollDate = (delta: number) => {
    setViewDate(viewDate.plus({ weeks: delta }))
  }

  const onWheel = useCallback((event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault()
    const delta = event.deltaY > 0 ? 1 : -1
    scrollDate(delta)
  }, [viewDate])

  const scrollRef = (node: HTMLDivElement) => {
    node.addEventListener('wheel', onWheel, { passive: false })
    return () => node.removeEventListener('wheel', onWheel)
  }

  const width = () => {
    switch (size) {
      case 'sm': return showWeekends ? 'w-70' : 'w-50'
      case 'md': return showWeekends ? 'w-98' : 'w-70'
      case 'lg': return showWeekends ? 'w-133' : 'w-95'
    }
  }

  const isCurrentMonth = (date: DateTime) => date.startOf('month').equals(highlightedMonth)

  const singleDateClick = useCallback((date: DateTime) => {
    if (!selectedDate?.equals(date)) {
      onDateSelect?.(date)
    } else {
      onDateSelect?.(undefined)
    }
  }, [onDateSelect, selectedDate])

  const selectionSizeToDuration = () => {
    switch (selectionSize) {
      case 'day': return { hours: 24 }
      case 'halfDay': return { hours: 12 }
    }
  }

  const rangeDateClick = useCallback((date: DateTime) => {
    if (selectedStartDate == null) {
      onDateRangeSelect?.(undefined)
      setSelectedStartDate(date)
    } else {
      if (selectedStartDate > date) {
        onDateRangeSelect?.(Interval.fromDateTimes(date, selectedStartDate.plus(selectionSizeToDuration())))
      } else {
        onDateRangeSelect?.(Interval.fromDateTimes(selectedStartDate, date.plus(selectionSizeToDuration())))
      }
      setSelectedStartDate(undefined)
      setHoveredDateRange(undefined)
    }
  }, [onDateRangeSelect, selectedDateRange, selectedStartDate])

  const datePointerEnter = useCallback((date: DateTime) => {
    if (selectedStartDate != null) {
      if (selectedStartDate > date) {
        setHoveredDateRange(Interval.fromDateTimes(date, selectedStartDate.plus(selectionSizeToDuration())))
      } else {
        setHoveredDateRange(Interval.fromDateTimes(selectedStartDate, date.plus(selectionSizeToDuration())))
      }
    }
  }, [hoveredDateRange, selectedStartDate])

  const datePointerLeave = useCallback((date: DateTime) => {
    setHoveredDateRange(undefined)
  }, [])

  return <div className='bg-slate-950 p-2 rounded-md w-fit select-none shadow-md'>
    <h1 className='font-semibold text-lg'>{highlightedMonth.toFormat('MMMM yyyy')}</h1>
    <div className='flex flex-row gap-1' ref={scrollRef}>
      <div className={`grid ${showWeekends ? 'grid-cols-7' : 'grid-cols-5'} gap-1 ${width()}`}>
        {titles.map((title, i) => (
          <div key={i} className='text-center text-gray-400'>
            {title}
          </div>
        ))}
        {dates.map((date, i) => (
          (showWeekends || !date.isWeekend) &&
            <CalendarDate key={i} date={date} currentMonth={isCurrentMonth(date)} selectionSize={selectionSize}
              selectedDateRange={selectedDateRange}
              hoveredDateRange={hoveredDateRange}
              onClick={selectionType === 'single' ? singleDateClick : rangeDateClick} selectedDate={selectedDate}
              onPointerEnter={datePointerEnter}
              onPointerLeave={datePointerLeave} />
        ))}
      </div>

      <div className='flex flex-col justify-between'>
        <div className='cursor-pointer' onClick={() =>scrollDate(-1)}><FontAwesomeIcon icon={faChevronUp} /></div>
        <div className='cursor-pointer' onClick={() => scrollDate(1)}><FontAwesomeIcon icon={faChevronDown} /></div>
      </div>
    </div>
  </div>
}
