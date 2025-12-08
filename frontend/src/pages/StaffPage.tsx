import { useDispatch, useSelector } from "react-redux"
import { Dispatch, RootState } from "../store"
import { useEffect } from "react"
import { StaffMemberDto } from "../../../dtos/staffMember.dto"
import { StaffMemberCard } from "../components/staff/StaffMemberCard"

export function StaffPage() {
  const dispatch = useDispatch<Dispatch>()
  useEffect(() => {
    dispatch.staff.getStaffMembers({})
  }, [dispatch])

  const staffMembers = useSelector<RootState, StaffMemberDto[]>(state => state.staff.staffMembers)

  return (
    <div className="grid auto-cols-max grid-flow-col justify-center gap-2 p-4">
      { staffMembers.map(staffMember => <StaffMemberCard key={staffMember.id} name={staffMember.name} />) }
    </div>
  )
}
