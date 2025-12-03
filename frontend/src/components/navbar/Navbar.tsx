import { NavItem } from "./NavItem";

export function Navbar() {
  return (
    <nav className="bg-linear-to-b from-gray-950 to-transparent flex flex-row justify-center">
      <div className="flex flex-row gap-1 w-9/10">
        <NavItem to="/">Home</NavItem>
        <NavItem to="/planner">Planner</NavItem>
        <NavItem to="/login" right>Login</NavItem>
      </div>
    </nav>
  )
}
