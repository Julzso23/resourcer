import { PointerEventHandler } from 'react'

export function AllocationResizeHandle({
  right = false,
  onPointerDown,
  onPointerMove,
  onPointerUp,
}: {
  right?: boolean
  onPointerDown: PointerEventHandler
  onPointerMove: PointerEventHandler
  onPointerUp: PointerEventHandler
}) {
  return (
    <div
      className={`h-full w-fit p-1 cursor-ew-resize opacity-0 group-hover:opacity-50 hover:opacity-70 active:opacity-90 ${right ? 'ml-auto' : ''}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      <div className="bg-[repeating-linear-gradient(90deg,rgba(255,255,255,1),rgba(255,255,255,1)_1px,transparent_1px,transparent_3px)] h-full w-2"></div>
    </div>
  )
}
