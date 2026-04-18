export function DropdownOption({
  label,
  onClick,
}: {
  label: string,
  onClick: React.MouseEventHandler<HTMLDivElement>,
}) {
  return <div onClick={onClick} className="cursor-pointer hover:bg-gray-800 px-4 py-1">{label}</div>
}
