import { store } from '../store'
import { LoginForm } from "../components/login/LoginForm"
import { useNavigate } from 'react-router-dom'
import { useCallback } from 'react'

export function LoginPage() {
  const navigate = useNavigate()

  const submit = useCallback(async (formData: FormData) => {
    await store.dispatch.auth.login(formData)
    navigate('/')
  }, [navigate, store])

  return (
    <div className="flex flex-row justify-center pt-16">
      <LoginForm action={submit} />
    </div>
  )
}
