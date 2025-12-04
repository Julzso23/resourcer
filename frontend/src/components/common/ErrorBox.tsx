export function ErrorBox({ message }: {
  message: string,
}) {
  return (
    <div className="px-3 py-1.5 border border-red-900 bg-red-950 rounded-md">{ message }</div>
  )
}
