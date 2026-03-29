import { DateTime } from 'luxon'
import { CalendarDate } from './CalendarDate'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'

export function Calendar({
  showWeekends = true,
  size = 'sm',
}: {
  showWeekends?: boolean,
  size?: 'sm' | 'md' | 'lg',
}) {
  const [viewDate, setViewDate] = useState(DateTime.now().startOf('month').startOf('week'))
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

  return <div className='bg-slate-950 p-2 rounded-md w-fit select-none'>
    <h1 className='font-semibold text-lg'>{highlightedMonth.toFormat('MMMM yyyy')}</h1>
    <div className='flex flex-row gap-1' ref={scrollRef}>
      <div className={`grid ${showWeekends ? 'grid-cols-7' : 'grid-cols-5'} gap-1 ${width()}`}>
        {titles.map((title, i) => (
          <div key={i} className='text-center text-gray-400'>
            {title}
          </div>
        ))}
        {dates.map((date, i) => (
          (showWeekends || !date.isWeekend) && <CalendarDate key={i} date={date} currentMonth={isCurrentMonth(date)} />
        ))}
      </div>

      <div className='flex flex-col justify-between'>
        <div className='cursor-pointer' onClick={() =>scrollDate(-1)}><FontAwesomeIcon icon={faChevronUp} /></div>
        <div className='cursor-pointer' onClick={() => scrollDate(1)}><FontAwesomeIcon icon={faChevronDown} /></div>
      </div>
    </div>
  </div>
}
