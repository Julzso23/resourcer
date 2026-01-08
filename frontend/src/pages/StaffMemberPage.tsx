import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch, RootState } from "../store"
import { useParams } from "react-router-dom"
import { Loading } from "../components/common/Loading"
import { StaffMemberDto } from "../../../dtos/staffMember.dto"

export function StaffMemberPage() {
  const { id } = useParams()

  const [loading, setLoading] = useState<boolean>(false)

  const dispatch = useDispatch<Dispatch>()
  useEffect(() => {
    setLoading(true)
    dispatch.staff.getStaffMember({ staffMemberId: id }).then(() => setLoading(false))
  }, [dispatch.staff, id])

  const staffMember = useSelector<RootState, StaffMemberDto | undefined>(state => state.staff.staffMembers.find(p => p.id === parseInt(id || '0')))

  return (
    loading ? (<Loading />) :
    (<div>
      { staffMember == undefined ? <h1 className="text-center text-4xl">Staff member not found</h1> : (
        <>
          <div className="bg-gray-950 py-8 items-end px-[10%] relative">
            <img src="https://placehold.co/128x128" className="rounded-xl absolute -bottom-16" />
            <h1 className="text-4xl ml-40">{ staffMember.name }</h1>
          </div>
          <div className="mx-[10%] px-40 py-8">
          </div>
        </>
      ) }
    </div>)
  )
}
