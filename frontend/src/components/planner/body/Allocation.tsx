import { Ref, useCallback, useRef, useState } from "react"
import { AllocationModel } from "../Planner"
import { DateTime, Interval } from "luxon"
import { AllocationResizeHandle } from "./AllocationResizeHandle"

export function Allocation({ allocation, interval }: {
  allocation: AllocationModel,
  interval: Interval,
}) {
  const ref: Ref<HTMLDivElement> = useRef(null)

  const [dragging, setDragging] = useState(false)

  const allocationLeft = (allocationInterval: Interval) => (Math.max(allocationInterval.start!.diff(interval.start!).as('days'), 0) / interval.length('days')) * 100 + '%'
  const allocationWidth = (allocationInterval: Interval) => ((allocationInterval.intersection(interval)?.length('days') || 0) / interval.length('days')) * 100 + '%'
  const [intervalOverride, setIntervalOverride] = useState<Interval | undefined>(undefined)
  const [leftOffset, setLeftOffset] = useState<number>(0)

  const onPointerDown = useCallback((event: React.PointerEvent) => {
    setDragging(true)
    const rowWidth: number = ref.current!.parentElement!.getBoundingClientRect().width
    setLeftOffset(
      event.clientX -
      ref.current!.getBoundingClientRect().x -
      Math.min((rowWidth / interval.length('days')) * (intervalOverride || allocation.interval).start!.diff(interval.start!).as('days'), 0))

    ref.current?.setPointerCapture(event.pointerId)
  }, [setDragging, setLeftOffset, ref, interval, allocation, intervalOverride])

  const onPointerMove = useCallback((event: React.PointerEvent) => {
    if (!dragging) return
    const rowX: number = ref.current!.parentElement!.getBoundingClientRect().x
    const rowWidth: number = ref.current!.parentElement!.getBoundingClientRect().width
    const start: DateTime = interval.start!.plus({ days: (interval.length('days') / rowWidth) * (event.clientX - rowX - leftOffset) }).plus({ days: 0.5 }).startOf('day')
    setIntervalOverride(Interval.after(start, allocation.interval.toDuration()))
  }, [dragging, leftOffset, setIntervalOverride, allocation, interval, ref])

  const onPointerUp = useCallback((event: React.PointerEvent) => {
    setDragging(false)
    ref.current?.releasePointerCapture(event.pointerId)
  }, [setDragging, intervalOverride, setIntervalOverride])

  return (
    <div
      ref={ref}
      className={`absolute border top-1/8 h-3/4 bg-green-950 border-emerald-950 rounded-sm shadow-md box-border select-none flex flex-row cursor-move group ${dragging ? 'shadow-black' : ''}`}
      style={{ left: allocationLeft(intervalOverride || allocation.interval), width: allocationWidth(intervalOverride || allocation.interval) }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}>
      <AllocationResizeHandle />
      <AllocationResizeHandle right={true} />
    </div>
  )
}
