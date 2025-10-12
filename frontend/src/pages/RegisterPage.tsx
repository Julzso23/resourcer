import { redirect } from "react-router-dom"

export function RegisterPage() {
  function submit(formData: FormData): void {
    fetch('http://127.0.0.1:3000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
      })
    }).then(async response => {
      localStorage.setItem('jwt', (await response.json()).token)
      redirect('/')
    })
  }

  return (
    <>
      <form action={submit}>
        <input type="text" name="name" placeholder="Name"></input>
        <input type="email" name="email" placeholder="Email address"></input>
        <input type="password" name="password" placeholder="Password"></input>
        <button type="submit">Register</button>
      </form>
    </>
  )
}
