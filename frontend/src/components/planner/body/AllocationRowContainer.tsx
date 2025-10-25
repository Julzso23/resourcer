import { Interval } from "luxon";
import { AllocationRow } from "./AllocationRow";
import { ProjectAllocationsModel } from "../Planner";

export function AllocationRowContainer({ interval, columnWidths, project }: {
  interval: Interval,
  columnWidths: number[],
  project: ProjectAllocationsModel,
}) {
  return (
    <div className="flex flex-row gap-1 items-stretch">
      <div className="xl:w-80 lg:w-60 w-40 px-4 py-2 bg-gray-950 rounded-lg border border-gray-800 flex flex-row items-center gap-2 shadow">
        { project.image ? <img src={project.image} className="w-6 aspect-square rounded-sm" /> : undefined }
        <span className="whitespace-nowrap overflow-hidden overflow-ellipsis" title={project.name}>{ project.name }</span>
      </div>
      <div className="flex flex-col flex-auto rounded-lg shadow">
        { project.allocationRows.map((allocations, index) => <AllocationRow key={index} interval={interval} columnWidths={columnWidths} allocations={allocations} />) }
      </div>
    </div>
  )
}
