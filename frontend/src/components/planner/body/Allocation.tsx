import { Ref, useCallback, useRef, useState } from 'react'
import { AllocationModel } from '../Planner'
import { DateTime, Interval } from 'luxon'
import { AllocationResizeHandle } from './AllocationResizeHandle'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch, RootState } from '../../../store'
import { CreateAllocationDto } from '../../../../../dtos/createAllocation.dto'

enum AllocationState {
  Idle,
  Move,
  ResizeLeft,
  ResizeRight,
}

export function Allocation({
  allocation,
  interval,
}: {
  allocation: AllocationModel
  interval: Interval
}) {
  const ref: Ref<HTMLDivElement> = useRef(null)

  const [dragState, setDragState] = useState<AllocationState>(
    AllocationState.Idle,
  )

  const allocationLeft = (allocationInterval: Interval) =>
    (Math.max(allocationInterval.start!.diff(interval.start!).as('days'), 0) /
      interval.length('days')) *
      100 +
    '%'
  const allocationWidth = (allocationInterval: Interval) =>
    ((allocationInterval.intersection(interval)?.length('days') || 0) /
      interval.length('days')) *
      100 +
    '%'
  const [intervalOverride, setIntervalOverride] = useState<
    Interval | undefined
  >(undefined)
  const [leftOffset, setLeftOffset] = useState<number>(0)
  const [rightOffset, setRightOffset] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)

  const isOverflowingLeft: boolean =
    (intervalOverride || allocation.interval)
      .start!.diff(interval.start!)
      .as('days') < 0
  const isOverflowingRight: boolean =
    (intervalOverride || allocation.interval)
      .end!.diff(interval.end!)
      .as('days') > 0
  const borderRadiusClasses =
    isOverflowingLeft && isOverflowingRight
      ? ''
      : isOverflowingLeft && !isOverflowingRight
        ? 'rounded-r-sm'
        : !isOverflowingLeft && isOverflowingRight
          ? 'rounded-l-sm'
          : 'rounded-sm'

  const onPointerDown = useCallback(
    (event: React.PointerEvent, newState: AllocationState) => {
      if (loading) return

      setDragState(newState)
      const rowWidth: number =
        ref.current!.parentElement!.getBoundingClientRect().width
      setLeftOffset(
        event.clientX -
          ref.current!.getBoundingClientRect().x -
          Math.min(
            (rowWidth / interval.length('days')) *
              (intervalOverride || allocation.interval)
                .start!.diff(interval.start!)
                .as('days'),
            0,
          ),
      )
      setRightOffset(event.clientX - ref.current!.getBoundingClientRect().right)

      const element: HTMLElement = event.target as HTMLElement
      element.setPointerCapture(event.pointerId)
      event.preventDefault()
      event.stopPropagation()
    },
    [ref, interval, allocation, intervalOverride, loading],
  )

  const onPointerMove = useCallback(
    (event: React.PointerEvent) => {
      if (loading) return

      const rowX: number = ref.current!.parentElement!.getBoundingClientRect().x
      const rowWidth: number =
        ref.current!.parentElement!.getBoundingClientRect().width
      switch (dragState) {
        case AllocationState.Move: {
          const start: DateTime = interval
            .start!.plus({
              days:
                (interval.length('days') / rowWidth) *
                (event.clientX - rowX - leftOffset),
            })
            .plus({ days: 0.5 })
            .startOf('day')
          setIntervalOverride(
            Interval.after(start, allocation.interval.toDuration()),
          )
          break
        }
        case AllocationState.ResizeLeft: {
          const start: DateTime = interval
            .start!.plus({
              days:
                (interval.length('days') / rowWidth) *
                (event.clientX - rowX - leftOffset),
            })
            .plus({ days: 0.5 })
            .startOf('day')
          if (allocation.interval.end!.diff(start).as('days') >= 1) {
            setIntervalOverride(
              Interval.fromDateTimes(start, allocation.interval.end!),
            )
          }
          break
        }
        case AllocationState.ResizeRight: {
          const end: DateTime = interval
            .start!.plus({
              days:
                (interval.length('days') / rowWidth) *
                (event.clientX - rowX - rightOffset),
            })
            .plus({ days: 0.5 })
            .startOf('day')
          if (end.diff(allocation.interval.start!).as('days') >= 1) {
            setIntervalOverride(
              Interval.fromDateTimes(allocation.interval.start!, end),
            )
          }
          break
        }
        default:
          return
      }

      event.preventDefault()
      event.stopPropagation()
    },
    [dragState, leftOffset, rightOffset, allocation, interval, ref, loading],
  )

  const dispatch = useDispatch<Dispatch>()
  const currentProposal = useSelector<RootState, number | undefined>(
    (state) => state.planner.currentProposal,
  )
  const projectView = useSelector<RootState, boolean>(
    (state) => state.planner.projectView,
  )
  const onPointerUp = useCallback(
    (event: React.PointerEvent) => {
      if (loading) return

      setDragState(AllocationState.Idle)
      const element: HTMLElement = event.target as HTMLElement
      element.releasePointerCapture(event.pointerId)
      event.preventDefault()
      event.stopPropagation()

      if (
        intervalOverride != null &&
        !intervalOverride.equals(allocation.interval)
      ) {
        setLoading(true)
        dispatch.planner
          .editAllocation({
            oldAllocation: allocation,
            newAllocation: new CreateAllocationDto(
              allocation.staffMemberId,
              allocation.projectId,
              allocation.percent,
              intervalOverride.start!.toJSDate(),
              intervalOverride.end!.toJSDate(),
              currentProposal!,
              projectView,
            ),
          })
          .then(() => setLoading(false))
      }
    },
    [
      intervalOverride,
      dispatch,
      allocation,
      currentProposal,
      projectView,
      loading,
    ],
  )

  return (
    <div
      ref={ref}
      className={`absolute border top-1/8 h-3/4 bg-green-950 border-emerald-950 shadow box-border select-none flex
        flex-row cursor-move group touch-none
        ${dragState !== AllocationState.Idle ? 'shadow-black' : ''} ${borderRadiusClasses}
        ${loading ? 'animate-pulse' : ''}`}
      style={{
        left: allocationLeft(intervalOverride || allocation.interval),
        width: allocationWidth(intervalOverride || allocation.interval),
      }}
      onPointerDown={(event) => onPointerDown(event, AllocationState.Move)}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {!isOverflowingLeft && (
        <AllocationResizeHandle
          onPointerDown={(event) =>
            onPointerDown(event, AllocationState.ResizeLeft)
          }
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        />
      )}
      <span className="px-2 overflow-hidden text-ellipsis">
        {allocation.name} - {allocation.percent}%
      </span>
      {!isOverflowingRight && (
        <AllocationResizeHandle
          onPointerDown={(event) =>
            onPointerDown(event, AllocationState.ResizeRight)
          }
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          right={true}
        />
      )}

      {loading && (
        <div className="absolute left-0 right-0 top-0 bottom-0 cursor-not-allowed backdrop-blur-[2px]"></div>
      )}
    </div>
  )
}
