import { Dispatch, RootState } from '../store'
import { LoginForm } from "../components/login/LoginForm"
import { useCallback, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { UserDto } from '../../../dtos/user.dto'

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const [error, setError] = useState<number | undefined>(undefined)

  const dispatch = useDispatch<Dispatch>()
  const submit = useCallback(async (formData: FormData) => {
    dispatch.auth.login(formData)
      .then(() => {
        if (location.pathname == location.state?.from?.pathname) {
          navigate(-2)
        } else {
          navigate(-1)
        }
      })
      .catch((error) => setError(error))
  }, [dispatch.auth, navigate, location])

  const loggedInUser = useSelector<RootState, UserDto | undefined>(state => state.users.loggedInUser)
  if (loggedInUser != null) {
    navigate('/')
  }

  return (
    <div className="flex flex-row justify-center pt-16">
      <LoginForm action={submit} error={error} />
    </div>
  )
}
