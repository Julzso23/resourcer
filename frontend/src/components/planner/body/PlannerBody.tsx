import { DateTime, DateTimeUnit, Interval } from "luxon";
import { AllocationRow } from "./AllocationRow";
import { AllocationModel } from "../Planner";

export function PlannerBody({ interval, zoomLevel, allocations }: {
  interval: Interval,
  zoomLevel: DateTimeUnit,
  allocations: AllocationModel[],
}) {
  const days: (DateTime | null)[] = interval.splitBy({ day: 1 }).map(day => day.start)
  const columnWidths: number[] = Array.from(days.map(day => day?.startOf(zoomLevel).toMillis()).reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map()))
    .map(date => date[1] / days.length)

  return (
    <div className="w-full flex flex-col min-h-4 rounded-lg overflow-hidden bg-gray-950 border border-gray-800">
      { Array(100).fill(0).map((_, index) => <AllocationRow interval={interval} columnWidths={columnWidths} key={index} allocations={allocations} />) }
    </div>
  )
}
