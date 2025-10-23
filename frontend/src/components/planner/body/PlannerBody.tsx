import { DateTime, DateTimeUnit, Interval } from "luxon";
import { ProjectAllocationsModel } from "../Planner";
import { AllocationRowContainer } from "./AllocationRowContainer";

export function PlannerBody({ interval, zoomLevel, projectAllocations }: {
  interval: Interval,
  zoomLevel: DateTimeUnit,
  projectAllocations: ProjectAllocationsModel[],
}) {
  const days: (DateTime | null)[] = interval.splitBy({ day: 1 }).map(day => day.start)
  const columnWidths: number[] = Array.from(days.map(day => day?.startOf(zoomLevel).toMillis()).reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map()))
    .map(date => date[1] / days.length)

  return (
    <div className="w-full flex flex-col gap-1 min-h-4 overflow-hidden">
      { projectAllocations.map(project => <AllocationRowContainer name={project.name} interval={interval} columnWidths={columnWidths} allocationRows={project.allocationRows} />) }
    </div>
  )
}
