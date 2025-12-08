export function StaffMemberCard({ name }: { name: string }) {
  return (
    <div className="text-white flex flex-row gap-4 items-center bg-gray-950 w-fit p-3 rounded-xl">
      <img src="https://placehold.co/48x48" className="rounded-lg" />
      <span>{name}</span>
    </div>
  )
}
