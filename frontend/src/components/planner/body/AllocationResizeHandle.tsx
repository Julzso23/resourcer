export function AllocationResizeHandle({ right = false }: {
  right?: boolean,
}) {
  return (
    <div className={`h-full w-fit p-1 cursor-ew-resize hidden group-hover:block ${right ? 'ml-auto' : ''}`}>
      <div className="bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.5),rgba(255,255,255,0.5)_1px,transparent_1px,transparent_3px)] h-full w-2"></div>
    </div>
  )
}
