import { useDispatch, useSelector } from "react-redux"
import { Dispatch, RootState } from "../store"
import { useEffect, useState } from "react"
import { StaffMemberDto } from "../../../dtos/staffMember.dto"
import { StaffMemberCard } from "../components/staff/StaffMemberCard"
import { TextInput } from "../components/common/TextInput"
import { useDebounce } from "use-debounce"

export function StaffPage() {
  const [_searchValue, setSearchValue] = useState('')
  const [searchValue] = useDebounce(_searchValue, 500)

  const dispatch = useDispatch<Dispatch>()
  useEffect(() => {
    dispatch.staff.getStaffMembers({searchValue})
  }, [dispatch, searchValue])

  const staffMembers = useSelector<RootState, StaffMemberDto[]>(state => state.staff.staffMembers)

  return (
    <div className="p-4 flex flex-col gap-4">
      <TextInput type="text" placeholder="Search" value={_searchValue} onChange={e => setSearchValue(e.target.value)} />
      <div className="grid xl:grid-cols-8 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2">
        { staffMembers.map(staffMember => <StaffMemberCard key={staffMember.id} name={staffMember.name} />) }
      </div>
    </div>
  )
}
