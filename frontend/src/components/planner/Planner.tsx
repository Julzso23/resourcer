import { createRef, useCallback, useEffect, useState } from 'react'
import { PlannerBody } from './body/PlannerBody'
import { PlannerHead } from './head/PlannerHead'
import { DateTime, DateTimeUnit, Interval } from 'luxon'
import { SettingsMenu } from './sidebar/SettingsMenu'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch, RootState } from '../../store'
import { AllocationDto } from '../../../../dtos/allocation.dto'
import { AllocationCollectionDto } from '../../../../dtos/allocationCollection.dto'

export class AllocationModel extends AllocationDto {
  interval: Interval

  constructor(allocation: AllocationDto) {
    super(
      allocation.id,
      allocation.name,
      allocation.percent,
      allocation.start,
      allocation.end,
      allocation.staffMemberId,
      allocation.projectId,
    )
    this.interval = Interval.fromDateTimes(
      new Date(allocation.start),
      new Date(allocation.end),
    )
  }
}

export class AllocationCollectionModel {
  id: number
  name: string
  image?: string
  allocationRows: AllocationModel[][] = [[]]

  constructor(dto: AllocationCollectionDto) {
    this.id = dto.id
    this.name = dto.name
    this.allocationRows = [
      dto.allocations.map((allocation) => new AllocationModel(allocation)),
    ]
    this.image = 'https://placehold.co/16x16'
  }
}

enum CurrentMenu {
  None,
  Settings,
}

export function Planner() {
  const [zoomLevel, setZoomLevel] = useState<DateTimeUnit>('month')
  const [startDate, setStartDate] = useState<DateTime>(
    DateTime.now()
      .startOf(zoomLevel)
      .minus({ [zoomLevel]: 1 }),
  )
  const [columnCount, setColumnCount] = useState<number>(12)
  const interval: Interval = Interval.after(startDate, {
    [zoomLevel]: columnCount,
  })

  const projectView = useSelector<RootState, boolean>(
    (state) => state.planner.projectView,
  )

  const dispatch = useDispatch<Dispatch>()
  useEffect(() => {
    dispatch.planner.getAllocationCollections({ projectView })
  }, [dispatch, projectView])

  const allocationCollections = useSelector<
    RootState,
    AllocationCollectionDto[]
  >((state) => state.planner.allocationCollections)

  const [currentMenu, setCurrentMenu] = useState<CurrentMenu>(CurrentMenu.None)

  const wheelEventHandler = useCallback(
    (event: WheelEvent) => {
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
        setStartDate(
          startDate
            .startOf(zoomLevel)
            .plus({ [zoomLevel]: event.deltaX / 100 }),
        )
      } else if (event.shiftKey && Math.abs(event.deltaY) >= 100) {
        setStartDate(
          startDate
            .startOf(zoomLevel)
            .plus({ [zoomLevel]: event.deltaY / 100 }),
        )
      }
    },
    [zoomLevel, setZoomLevel, startDate, setStartDate],
  )

  const scrollButtonHandler = useCallback(
    (dateUnit: DateTimeUnit, amount: number) =>
      setStartDate(startDate.plus({ [dateUnit]: amount })),
    [setStartDate, startDate],
  )
  const setStartDateHandler = useCallback(
    (dateUnit: DateTimeUnit, millis: number) => {
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
    },
    [setZoomLevel, setStartDate],
  )

  const ref = createRef<HTMLDivElement>()
  useEffect(() => {
    const currentRef = ref.current!
    currentRef.addEventListener('wheel', wheelEventHandler, { passive: false })
    return () => currentRef.removeEventListener('wheel', wheelEventHandler)
  }, [wheelEventHandler, ref])

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setColumnCount(Math.floor(entry.contentRect.width / 160))
      }
    })
    resizeObserver.observe(ref.current!)

    return () => resizeObserver.disconnect()
  }, [ref, setColumnCount])

  const [sidebarClosing, setSidebarClosing] = useState(false)

  const toggleSettings = useCallback(() => {
    if (currentMenu === CurrentMenu.Settings) {
      setSidebarClosing(true)
    } else if (currentMenu === CurrentMenu.None) {
      setCurrentMenu(CurrentMenu.Settings)
    }
  }, [setCurrentMenu, currentMenu, setSidebarClosing])

  const closeMenu = useCallback(() => {
    setCurrentMenu(CurrentMenu.None)
    setSidebarClosing(false)
  }, [setCurrentMenu, setSidebarClosing])

  return (
    <div
      className="m-4 relative text-white rounded-lg gap-1 touch-manipulation"
      ref={ref}
    >
      <div className="flex flex-row gap-2 flex-wrap">
        {currentMenu === CurrentMenu.Settings && (
          <SettingsMenu onClose={closeMenu} closing={sidebarClosing} />
        )}
        <div className="flex flex-col flex-auto gap-1">
          <PlannerHead
            interval={interval}
            zoomLevel={zoomLevel}
            onScroll={scrollButtonHandler}
            onSetStartDate={setStartDateHandler}
            onOpenSettings={toggleSettings}
          />
          <PlannerBody
            interval={interval}
            zoomLevel={zoomLevel}
            projectAllocations={allocationCollections.map(
              (collection) => new AllocationCollectionModel(collection),
            )}
          />
        </div>
      </div>
    </div>
  )
}
