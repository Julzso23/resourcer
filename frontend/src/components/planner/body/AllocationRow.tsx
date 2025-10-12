import { Interval } from "luxon";
import { AllocationModel } from "../Planner";
import { Allocation } from "./Allocation";

export function AllocationRow({ interval, columnWidths, allocations }: {
  interval: Interval,
  columnWidths: number[],
  allocations: AllocationModel[],
}) {
  const shouldShowAllocation = (allocation: AllocationModel) => interval.overlaps(allocation.interval)
  const allocationLeft = (allocation: AllocationModel) => (Math.max(allocation.interval.start!.diff(interval.start!).as('days'), 0) / interval.length('days')) * 100
  const allocationWidth = (allocation: AllocationModel) => (allocation.interval.intersection(interval)!.length('days') / interval.length('days')) * 100

  return (
    <div className="flex flex-row h-10 mt-1 first:mt-0 bg-gray-900 drop-shadow-md relative">
      { columnWidths.map((columnWidth, index) => <div key={index} style={{ width: columnWidth * 100 + '%' }} className="border-r last:border-none border-dashed border-gray-800"></div>) }
      { allocations.map(allocation => shouldShowAllocation(allocation) && <Allocation key={allocation.name} left={allocationLeft(allocation)} width={allocationWidth(allocation)} />) }
    </div>
  )
}
