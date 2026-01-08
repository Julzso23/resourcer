import { Interval } from 'luxon'
import { AllocationRow } from './AllocationRow'
import { AllocationCollectionModel } from '../Planner'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'

export function AllocationRowContainer({
  interval,
  columnWidths,
  collection,
}: {
  interval: Interval
  columnWidths: number[]
  collection: AllocationCollectionModel
}) {
  const projectView = useSelector<RootState, boolean>(
    (state) => state.planner.projectView,
  )

  return (
    <div className="flex flex-row gap-1 items-stretch">
      <Link
        to={`/${projectView ? 'projects' : 'staff'}/${collection.id}`}
        target="_blank"
      >
        <div className="xl:w-80 lg:w-60 w-40 px-4 py-2 bg-gray-950 rounded-lg border border-gray-800 flex flex-row items-center gap-2 shadow">
          {collection.image ? (
            <img
              src={collection.image}
              className="w-6 aspect-square rounded-sm"
            />
          ) : undefined}
          <span
            className="whitespace-nowrap overflow-hidden overflow-ellipsis"
            title={collection.name}
          >
            {collection.name}
          </span>
        </div>
      </Link>
      <div className="flex flex-col flex-auto rounded-lg shadow">
        {collection.allocationRows.map((allocations, index) => (
          <AllocationRow
            key={index}
            interval={interval}
            columnWidths={columnWidths}
            allocations={allocations}
          />
        ))}
      </div>
    </div>
  )
}
