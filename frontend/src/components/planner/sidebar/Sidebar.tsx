import { ReactNode } from "react"

export function Sidebar({ children, onClose, closing }: {
  children: ReactNode,
  onClose: () => void,
  closing: boolean,
}) {
  return (
    <menu
      className={`border rounded-lg border-gray-800 bg-gray-950 shadow md:w-64 w-full relative text-white
        ${closing ? 'opacity-0 animate-slide-closed' : 'animate-slide-open'}`}
      onAnimationEnd={() => closing && onClose()}>
      { children }
    </menu>
  )
}
