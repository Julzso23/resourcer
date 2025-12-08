import { useCallback } from "react"
import { NavItem } from "./NavItem"
import { Dispatch, RootState } from "../../store"
import { useDispatch, useSelector } from "react-redux"

export function NavbarUser() {
  const dispatch = useDispatch<Dispatch>()
  const logout = useCallback(() => {
    dispatch.auth.logout()
  }, [dispatch])

  const token = useSelector<RootState, string | null>(state => state.auth.token)

  return (
    <div className="ml-auto flex flex-row gap-1">
      {token != null ? (<>
        <div className="flex flex-col justify-center">Profile</div>
        <NavItem onClick={logout}>Logout</NavItem>
      </>) : (<>
        <NavItem to="/login">Login</NavItem>
        <NavItem to="/register">Register</NavItem>
      </>)}
    </div>
  )
}
