import { createRef, useCallback, useEffect, useState } from "react";
import { PlannerBody } from "./body/PlannerBody";
import { PlannerHead } from "./head/PlannerHead";
import { DateTime, DateTimeUnit, Interval } from "luxon";

export class AllocationModel {
  name: string
  interval: Interval
  percent: number

  constructor(name: string, interval: Interval, percent: number) {
    this.name = name
    this.interval = interval
    this.percent = percent
  }
}

export class ProjectAllocationsModel {
  name: string
  image?: string
  allocationRows: AllocationModel[][] = [[]]

  constructor(name: string, allocationRows: AllocationModel[][], image?: string) {
    this.name = name
    this.allocationRows = allocationRows
    this.image = image
  }
}

export function Planner() {
  const [ zoomLevel, setZoomLevel ] = useState<DateTimeUnit>('month')
  const [ startDate, setStartDate ] = useState<DateTime>(DateTime.now().startOf(zoomLevel).minus({ [zoomLevel]: 1 }))
  const [ columnCount, setColumnCount ] = useState<number>(12)
  const interval: Interval = Interval.after(startDate, { [zoomLevel]: columnCount })
  const projectAllocations: ProjectAllocationsModel[] = [
    new ProjectAllocationsModel('Test Project', [
      [new AllocationModel('Test Allocation', Interval.fromDateTimes({ year: 2025, month: 2, day: 1 }, { year: 2025, month: 12, day: 1 }), 100)],
      [new AllocationModel('Test Allocation', Interval.fromDateTimes({ year: 2025, month: 2, day: 1 }, { year: 2025, month: 12, day: 1 }), 100)],
    ], 'https://placehold.co/16x16'),
    new ProjectAllocationsModel('This is a test project', [
      [new AllocationModel('Test Allocation', Interval.fromDateTimes({ year: 2025, month: 2, day: 1 }, { year: 2025, month: 12, day: 1 }), 100)],
    ]),
    new ProjectAllocationsModel('Project superlongname', [
      [new AllocationModel('Test Allocation', Interval.fromDateTimes({ year: 2025, month: 2, day: 1 }, { year: 2025, month: 12, day: 1 }), 100)],
    ], 'https://placehold.co/16x16'),
  ]

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

  const scrollButtonHandler = useCallback((dateUnit: DateTimeUnit, amount: number) => setStartDate(startDate.plus({ [dateUnit]: amount })), [setStartDate, startDate])
  const setStartDateHandler = useCallback((dateUnit: DateTimeUnit, millis: number) => {
    switch (dateUnit) {
      case 'year': {
        setZoomLevel('month')
        break
      }
      case 'month': {
        setZoomLevel('day')
        break
      }
      case 'week': {
        setZoomLevel('day')
        break
      }
    }
    setStartDate(DateTime.fromMillis(millis))
  }, [setZoomLevel, setStartDate])

  const ref = createRef<HTMLDivElement>()
  useEffect(() => {
    const currentRef = ref.current!
    currentRef.addEventListener('wheel', wheelEventHandler, { passive:false })
    return () => currentRef.removeEventListener('wheel', wheelEventHandler)
  }, [wheelEventHandler, ref])

  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        setColumnCount(Math.floor(entry.contentRect.width / 160))
      }
    })
    resizeObserver.observe(ref.current!)

    return () => resizeObserver.disconnect()
  }, [ref, setColumnCount])

  return (
    <div className="flex flex-col m-4 relative text-white rounded-lg gap-1 touch-manipulation" ref={ref}>
      <PlannerHead interval={interval} zoomLevel={zoomLevel} onScroll={scrollButtonHandler} onSetStartDate={setStartDateHandler} />
      <PlannerBody interval={interval} zoomLevel={zoomLevel} projectAllocations={projectAllocations} />
    </div>
  )
}
