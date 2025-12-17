import { store } from '../store'
import { LoginForm } from "../components/login/LoginForm"
import { useCallback, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const [error, setError] = useState<number | undefined>(undefined)

  const submit = useCallback(async (formData: FormData) => {
    store.dispatch.auth.login(formData)
      .then(() => {
        if (location.pathname == location.state?.from?.pathname) {
          navigate(-2)
        } else {
          navigate(-1)
        }
      })
      .catch((error) => setError(error))
  }, [store, navigate, location])

  return (
    <div className="flex flex-row justify-center pt-16">
      <LoginForm action={submit} error={error} />
    </div>
  )
}
