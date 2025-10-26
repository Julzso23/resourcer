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
    <div className="h-10 bg-gray-900 relative select-none first:rounded-t-lg last:rounded-b-lg border border-gray-800 not-first:border-t-0">
      <div className="w-full h-full flex flex-row">
        { columnWidths.map((columnWidth, index) => <div key={index} style={{ width: columnWidth * 100 + '%' }} className="border-r last:border-none border-dashed border-gray-800 opacity-50 h-full"></div>) }
      </div>
      { allocations.map(allocation => shouldShowAllocation(allocation) && <Allocation key={allocation.id} allocation={allocation} interval={interval} />) }
    </div>
  )
}
