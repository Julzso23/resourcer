import { createModel } from "@rematch/core"
import { RootModel } from "."
import { Api } from "../api"
import { StaffMemberDto } from "../../../dtos/staffMember.dto"
import { history } from "../history"

interface StaffState {
  staffMembers: StaffMemberDto[]
}

export const staff = createModel<RootModel>()({
  state: {
    staffMembers: []
  } as StaffState,
  reducers: {
    setStaffMembers(state, staffMembers: StaffMemberDto[]) {
      return { ...state, staffMembers }
    }
  },
  effects: (dispatch) => ({
    handleError({ error }: { error: any }) {
      if (error === 401) {
        dispatch.auth.logout()
        history.replace('/login')
      }
    },

    async getStaffMembers({ searchValue }, rootState) {
      try {
        this.setStaffMembers(await Api.get<StaffMemberDto[]>('staff', { searchValue }, rootState.auth.token || undefined))
      } catch (error) {
        this.handleError({ error })
      }
    },
  }),
})
