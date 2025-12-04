import { store } from '../store'
import { LoginForm } from "../components/login/LoginForm"
import { useNavigate } from 'react-router-dom'
import { useCallback, useState } from 'react'

export function LoginPage() {
  const navigate = useNavigate()

  const [error, setError] = useState<number | undefined>(undefined)

  const submit = useCallback(async (formData: FormData) => {
    store.dispatch.auth.login(formData)
      .then(() => navigate('/'))
      .catch((error) => setError(error))
  }, [navigate, store])

  return (
    <div className="flex flex-row justify-center pt-16">
      <LoginForm action={submit} error={error} />
    </div>
  )
}
