import { ReactNode } from "react"

export function Button({ children }: {
  children?: ReactNode
}) {
  return (
    <button className="bg-slate-950 rounded-lg border border-gray-800 shadow-md px-2 py-1 cursor-pointer hover:shadow-black active:shadow-none">{ children }</button>
  )
}
