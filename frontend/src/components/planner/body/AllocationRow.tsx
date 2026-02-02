import { DateTime, Interval } from 'luxon'
import { AllocationModel } from '../Planner'
import { Allocation } from './Allocation'
import { PointerEvent, Ref, useCallback, useRef, useState } from 'react'
import { AllocationDto } from '../../../../../dtos/allocation.dto'
import { pointerToDateTime } from '../plannerHelpers'

export function AllocationRow({
  interval,
  columnWidths,
  allocations,
}: {
  interval: Interval
  columnWidths: number[]
  allocations: AllocationModel[]
}) {
  const ref: Ref<HTMLDivElement> = useRef(null)

  const [ghostAllocation, setGhostAllocation] =
    useState<AllocationModel | null>(null)
  const [draggingGhostAllocation, setDraggingGhostAllocation] =
    useState<boolean>(false)

  const pointerMove = useCallback(
    (event: PointerEvent) => {
      let start: DateTime
      let end: DateTime
      if (draggingGhostAllocation && ghostAllocation) {
        start = ghostAllocation.interval.start!
        end = pointerToDateTime(
          interval,
          ref.current!.getBoundingClientRect(),
          event.clientX,
        )
        if (end < start) {
          const temp = end.plus(0)
          end = start
          start = temp
        }
      } else {
        start = pointerToDateTime(
          interval,
          ref.current!.getBoundingClientRect(),
          event.clientX,
        )
        end = start.plus({ months: 1 })
      }
      const allocation = new AllocationModel(
        new AllocationDto(
          -1,
          '',
          100,
          start!.toJSDate(),
          end!.toJSDate(),
          -1,
          -1,
        ),
      )
      setGhostAllocation(allocation)
    },
    [interval, ref, draggingGhostAllocation, ghostAllocation],
  )

  const pointerLeave = useCallback(() => {
    setGhostAllocation(null)
    setDraggingGhostAllocation(false)
  }, [])

  const pointerDown = useCallback((event: PointerEvent) => {
    if (event.button === 0) {
      setDraggingGhostAllocation(true)
      ref.current!.setPointerCapture(event.pointerId)
    }
  }, [])

  const pointerUp = useCallback((event: PointerEvent) => {
    if (event.button === 0) {
      setDraggingGhostAllocation(false)
      ref.current!.releasePointerCapture(event.pointerId)
    }
  }, [])

  const allocationsToShow = allocations.filter((allocation) =>
    interval.overlaps(allocation.interval),
  )

  return (
    <div
      className="h-10 bg-gray-900 relative select-none first:rounded-t-lg last:rounded-b-lg border border-gray-800 not-first:border-t-0"
      onPointerEnter={pointerMove}
      onPointerMove={pointerMove}
      onPointerLeave={pointerLeave}
      onPointerDown={pointerDown}
      onPointerUp={pointerUp}
      ref={ref}
    >
      <div className="w-full h-full flex flex-row">
        {columnWidths.map((columnWidth, index) => (
          <div
            key={index}
            style={{ width: columnWidth * 100 + '%' }}
            className="border-r last:border-none border-dashed border-gray-800 opacity-50 h-full"
          ></div>
        ))}
      </div>

      {allocationsToShow.map((allocation) => (
        <Allocation
          key={allocation.id}
          allocation={allocation}
          interval={interval}
        />
      ))}

      {ghostAllocation && (
        <Allocation
          key={ghostAllocation.id}
          allocation={ghostAllocation}
          interval={interval}
          ghosted
        />
      )}
    </div>
  )
}
