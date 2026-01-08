import { DateTime, DateTimeUnit, Interval } from 'luxon'
import { AllocationCollectionModel } from '../Planner'
import { AllocationRowContainer } from './AllocationRowContainer'
import { DateMarkerLine } from './DateMarkerLine'

export function PlannerBody({
  interval,
  zoomLevel,
  projectAllocations: allocationCollections,
}: {
  interval: Interval
  zoomLevel: DateTimeUnit
  projectAllocations: AllocationCollectionModel[]
}) {
  const days: (DateTime | null)[] = interval
    .splitBy({ day: 1 })
    .map((day) => day.start)
  const columnWidths: number[] = Array.from(
    days
      .map((day) => day?.startOf(zoomLevel).toMillis())
      .reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map()),
  ).map((date) => date[1] / days.length)

  return (
    <div className="w-full flex flex-col gap-1 min-h-4 overflow-hidden relative">
      {allocationCollections.map((collection) => (
        <AllocationRowContainer
          key={collection.id}
          collection={collection}
          interval={interval}
          columnWidths={columnWidths}
        />
      ))}
      <div className="absolute top-0 right-0 bottom-0 left-0 xl:ml-81 lg:ml-61 ml-41 box-border pointer-events-none">
        <DateMarkerLine date={DateTime.now()} interval={interval} />
      </div>
    </div>
  )
}
