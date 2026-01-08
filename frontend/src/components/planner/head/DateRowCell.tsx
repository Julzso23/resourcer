import { MouseEventHandler } from 'react'

export function DateRowCell({
  children,
  widthPercent,
  onClick,
}: {
  children: React.ReactNode
  widthPercent: number
  onClick: MouseEventHandler
}) {
  return (
    <div
      className="border-r last-of-type:border-none border-gray-800 text-center py-2 cursor-pointer hover:bg-slate-900 active:bg-gray-900"
      style={{ width: widthPercent + '%' }}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
