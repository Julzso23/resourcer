import { Interval } from "luxon";
import { AllocationModel } from "../Planner";
import { Allocation } from "./Allocation";

export function AllocationRow({ interval, columnWidths, allocations }: {
  interval: Interval,
  columnWidths: number[],
  allocations: AllocationModel[],
}) {
  const shouldShowAllocation = (allocation: AllocationModel) => interval.overlaps(allocation.interval)

  return (
    <div className="flex flex-row h-10 mt-1 first:mt-0 bg-gray-900 shadow-md relative select-none">
      { columnWidths.map((columnWidth, index) => <div key={index} style={{ width: columnWidth * 100 + '%' }} className="border-r last:border-none border-dashed border-gray-800"></div>) }
      { allocations.map(allocation => shouldShowAllocation(allocation) && <Allocation key={allocation.name} allocation={allocation} interval={interval} />) }
    </div>
  )
}
