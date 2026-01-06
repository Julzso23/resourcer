import { useCallback, useEffect } from "react"
import { NavItem } from "./NavItem"
import { Dispatch, RootState } from "../../store"
import { useDispatch, useSelector } from "react-redux"
import { UserDto } from "../../../../dtos/user.dto"

export function NavbarUser() {
  const dispatch = useDispatch<Dispatch>()
  const logout = useCallback(() => {
    dispatch.auth.logout()
  }, [dispatch])

  const token = useSelector<RootState, string | null>(state => state.auth.token)
  useEffect(() => {
    dispatch.users.getLoggedInUser({})
  }, [dispatch, token])
  const loggedInUser = useSelector<RootState, UserDto | undefined>(state => state.users.loggedInUser)

  return (
    <div className="ml-auto flex flex-row gap-1">
      {loggedInUser != null ? (<>
        <div className="flex flex-col justify-center">{ loggedInUser.name }</div>
        <NavItem onClick={logout}>Logout</NavItem>
      </>) : (<>
        <NavItem to="/login">Login</NavItem>
        <NavItem to="/register">Register</NavItem>
      </>)}
    </div>
  )
}
