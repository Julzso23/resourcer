import { createRef, useCallback, useEffect, useState } from "react";
import { PlannerBody } from "./body/PlannerBody";
import { PlannerHead } from "./head/PlannerHead";
import { DateTime, DateTimeUnit, Interval } from "luxon";

export class AllocationModel {
  name: string
  interval: Interval

  constructor(name: string, interval: Interval) {
    this.name = name
    this.interval = interval
  }
}

export function Planner() {
  const [ zoomLevel, setZoomLevel ] = useState<DateTimeUnit>('month')
  const [ startDate, setStartDate ] = useState<DateTime>(DateTime.now().startOf(zoomLevel).minus({ [zoomLevel]: 1 }))
  const interval: Interval = Interval.after(startDate, { [zoomLevel]: 12 })
  const allocations: AllocationModel[] = [new AllocationModel('Test Allocation', Interval.fromDateTimes({ year: 2025, month: 2, day: 1 }, { year: 2025, month: 12, day: 1 }))]

  const wheelEventHandler = useCallback((event: WheelEvent) => {
    if (event.ctrlKey) {
      event.preventDefault()
      switch (zoomLevel) {
        case 'month': {
          if (event.deltaY <= -100) {
            setZoomLevel('week')
          }
          break
        }
        case 'week': {
          if (event.deltaY <= -100) {
            setZoomLevel('day')
          } else if (event.deltaY >= 100) {
            setZoomLevel('month')
          }
          break
        }
        case 'day': {
          if (event.deltaY >= 100) {
            setZoomLevel('week')
          }
          break
        }
      }
    } else if (Math.abs(event.deltaX) >= 100) {
      setStartDate(startDate.startOf(zoomLevel).plus({ [zoomLevel]: event.deltaX / 100 }))
    } else if (event.shiftKey && Math.abs(event.deltaY) >= 100) {
      setStartDate(startDate.startOf(zoomLevel).plus({ [zoomLevel]: event.deltaY / 100 }))
    }
  }, [zoomLevel, setZoomLevel, startDate, setStartDate])

  const ref = createRef<HTMLDivElement>()
  useEffect(() => {
    const currentRef = ref.current!
    currentRef.addEventListener('wheel', wheelEventHandler, { passive:false })
    return () => currentRef.removeEventListener('wheel', wheelEventHandler)
  }, [wheelEventHandler, ref])

  return (
    <div className="flex flex-col m-4 relative text-white rounded-lg gap-1" ref={ref}>
      <PlannerHead interval={interval} zoomLevel={zoomLevel} />
      <PlannerBody interval={interval} zoomLevel={zoomLevel} allocations={allocations} />
    </div>
  )
}
