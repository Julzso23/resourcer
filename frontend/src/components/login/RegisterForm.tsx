import { Button } from "../common/Button"
import { TextInput } from "../common/TextInput"

export function RegisterForm({ action }: {
  action: (formData: FormData) => Promise<void>
}) {
  return (
    <form action={action} className="flex flex-col gap-2 bg-gray-800 rounded-lg p-4 text-white lg:w-3xl md:w-2xl sm:w-xl w-9/10">
      <TextInput type="text" name="name" placeholder="Name" autoComplete="name" />
      <TextInput type="email" name="email" placeholder="Email address" autoComplete="email" />
      <TextInput type="password" name="password" placeholder="Password" autoComplete="new-password" />
      <Button type="submit">Register</Button>
    </form>
  )
}
