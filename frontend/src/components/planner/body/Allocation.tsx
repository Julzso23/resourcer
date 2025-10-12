export function Allocation({ left, width }: {
  left: number,
  width: number,
}) {
  return (
    <div className="absolute border top-1/8 h-3/4" style={{ left: left + '%', width: width + '%' }}></div>
  )
}
