import { ReactNode } from "react"
import { NavLink } from "react-router-dom"

export function NavItem({ children, to, right }: {
  children: ReactNode,
  to: string,
  right?: boolean,
}) {
  return (
    <NavLink to={to} className={`bg-linear-to-b hover:from-gray-950 hover:to-gray-950/30 active:to-gray-950/50
      hover:shadow-sm text-white/80 hover:text-white flex flex-col justify-center px-5 py-3 select-none
      cursor-pointer [.active]:to-slate-950/50 [.active]:text-white ${right ? 'ml-auto' : ''}`}>
      { children }
    </NavLink>
  )
}
