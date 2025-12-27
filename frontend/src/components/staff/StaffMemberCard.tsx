import { Link } from "react-router-dom";

export function StaffMemberCard({ name, link }: { name: string, link?: string }) {
  return (
    <Link to={link || '#'}>
      <div className="text-white flex flex-row gap-4 items-center bg-gray-950 p-3 rounded-xl">
        <img src="https://placehold.co/48x48" className="rounded-lg" />
        <span className="overflow-hidden overflow-ellipsis">{name}</span>
      </div>
    </Link>
  )
}
