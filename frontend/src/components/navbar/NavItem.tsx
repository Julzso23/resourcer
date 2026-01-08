import { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

export function NavItem({
  children,
  to,
  right,
  onClick,
}: {
  children: ReactNode
  to?: string
  right?: boolean
  onClick?: () => void
}) {
  const className = `bg-linear-to-b hover:from-gray-950 hover:to-gray-950/30 active:to-gray-950/50
    hover:shadow-sm text-white/80 hover:text-white flex flex-col justify-center px-5 py-3 select-none
    cursor-pointer [.active]:to-slate-950/50 [.active]:text-white ${right ? 'ml-auto' : ''}`

  return to ? (
    <NavLink to={to} className={className}>
      {children}
    </NavLink>
  ) : (
    <div className={className} onClick={onClick}>
      {children}
    </div>
  )
}
