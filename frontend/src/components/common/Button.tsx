import { MouseEventHandler, ReactNode } from "react"

export function Button({ children, onClick, negative = false }: {
  children?: ReactNode,
  onClick?: MouseEventHandler,
  negative?: boolean,
}) {
  return (
    <button
      className={`rounded-lg border border-gray-800 shadow-sm px-2 py-1 cursor-pointer hover:shadow-black
        active:shadow-none ${negative ? 'bg-red-900' : 'bg-slate-950'} ${negative ? 'hover:bg-red-800' : 'hover:bg-gray-900'}`}
      onClick={onClick}>
      { children }
    </button>
  )
}
