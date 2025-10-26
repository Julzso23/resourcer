import { DateTime, DateTimeUnit, Interval } from "luxon";
import { ProjectAllocationsModel } from "../Planner";
import { AllocationRowContainer } from "./AllocationRowContainer";
import { DateMarkerLine } from "./DateMarkerLine";

export function PlannerBody({ interval, zoomLevel, projectAllocations }: {
  interval: Interval,
  zoomLevel: DateTimeUnit,
  projectAllocations: ProjectAllocationsModel[],
}) {
  const days: (DateTime | null)[] = interval.splitBy({ day: 1 }).map(day => day.start)
  const columnWidths: number[] = Array.from(days.map(day => day?.startOf(zoomLevel).toMillis()).reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map()))
    .map(date => date[1] / days.length)

  return (
    <div className="w-full flex flex-col gap-1 min-h-4 overflow-hidden relative">
      { projectAllocations.map(project => <AllocationRowContainer key={project.id} project={project} interval={interval} columnWidths={columnWidths} />) }
      <div className="absolute top-0 right-0 bottom-0 left-0 xl:ml-81 lg:ml-61 ml-41 box-border pointer-events-none">
        <DateMarkerLine date={DateTime.now()} interval={interval} />
      </div>
    </div>
  )
}
