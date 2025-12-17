import { store } from "../store"
import { RegisterForm } from "../components/login/RegisterForm"
import { useCallback } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export function RegisterPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const submit = useCallback(async (formData: FormData) => {
    store.dispatch.auth.register(formData).then(() => {
        if (location.pathname == location.state?.from?.pathname) {
          navigate(-2)
        } else {
          navigate(-1)
        }
      })
  }, [store, navigate, location])

  return (
    <div className="flex flex-row justify-center pt-16">
      <RegisterForm action={submit} />
    </div>
  )
}
