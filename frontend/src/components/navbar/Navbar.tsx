import { NavbarUser } from "./NavbarUser";
import { NavItem } from "./NavItem";

export function Navbar() {
  return (
    <nav className="bg-linear-to-b from-gray-950 to-transparent flex flex-row justify-center text-white">
      <div className="flex flex-row gap-1 w-9/10">
        <NavItem to="/">Home</NavItem>
        <NavItem to="/planner">Planner</NavItem>
        <NavbarUser />
      </div>
    </nav>
  )
}
