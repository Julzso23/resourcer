import { Dispatch, RootState } from '../store'
import { RegisterForm } from '../components/login/RegisterForm'
import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { UserDto } from '../../../dtos/user.dto'

export function RegisterPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const dispatch = useDispatch<Dispatch>()
  const submit = useCallback(
    async (formData: FormData) => {
      dispatch.auth.register(formData).then(() => {
        if (location.pathname == location.state?.from?.pathname) {
          navigate(-2)
        } else {
          navigate(-1)
        }
      })
    },
    [dispatch, navigate, location],
  )

  const loggedInUser = useSelector<RootState, UserDto | undefined>(
    (state) => state.users.loggedInUser,
  )
  if (loggedInUser != null) {
    navigate('/')
  }

  return (
    <div className="flex flex-row justify-center pt-16">
      <RegisterForm action={submit} />
    </div>
  )
}
