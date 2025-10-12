export function DateRowCell({ children, widthPercent }: {
  children: React.ReactNode,
  widthPercent: number,
}) {
  return (
    <div className="border-r last:border-none border-gray-800 text-center py-2" style={{width: widthPercent + '%'}}>{ children }</div>
  )
}
