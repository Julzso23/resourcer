import { DateTime, Interval } from 'luxon'

export function pointerToDateTime(
  interval: Interval,
  rowBoundingBox: DOMRect,
  pointerX: number,
): DateTime {
  return interval
    .start!.plus({
      days:
        (interval.length('days') / rowBoundingBox.width) *
        (pointerX - rowBoundingBox.x),
    })
    .plus({ days: 0.5 })
    .startOf('day')
}
