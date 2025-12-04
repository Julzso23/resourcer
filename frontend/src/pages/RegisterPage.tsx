import { useNavigate } from "react-router-dom"
import { store } from "../store"
import { RegisterForm } from "../components/login/RegisterForm"
import { useCallback } from "react"

export function RegisterPage() {
  const navigate = useNavigate()

  const submit = useCallback(async (formData: FormData) => {
    store.dispatch.auth.register(formData).then(() => navigate('/'))
  }, [navigate, store])

  return (
    <div className="flex flex-row justify-center pt-16">
      <RegisterForm action={submit} />
    </div>
  )
}
