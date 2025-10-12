import { redirect } from "react-router-dom"
import { store } from '../store'

export function LoginPage() {
  async function submit(formData: FormData) {
    await store.dispatch.auth.login(formData)
    redirect('/')
  }

  return (
    <>
      <form action={submit}>
        <input type="email" name="email" placeholder="Email address"></input>
        <input type="password" name="password" placeholder="Password"></input>
        <button type="submit">Login</button>
      </form>
    </>
  )
}
