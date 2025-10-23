import { Interval } from "luxon";
import { AllocationRow } from "./AllocationRow";
import { AllocationModel } from "../Planner";

export function AllocationRowContainer({ name, interval, columnWidths, allocationRows }: {
  name: string,
  interval: Interval,
  columnWidths: number[],
  allocationRows: AllocationModel[][],
}) {
  return (
    <div className="flex flex-row gap-1 items-stretch">
      <div className="w-40 p-2 bg-gray-950 rounded-lg border border-gray-800 flex flex-row items-center shadow-md">{ name }</div>
      <div className="flex flex-col flex-auto rounded-lg shadow-md">
        { allocationRows.map(allocations => <AllocationRow interval={interval} columnWidths={columnWidths} allocations={allocations} />) }
      </div>
    </div>
  )
}
