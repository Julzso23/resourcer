import { createModel } from "@rematch/core"
import { RootModel } from "."
import { Api } from "../api"
import { StaffMemberDto } from "../../../dtos/staffMember.dto"

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
    handleError({ error }) {
      if (error === 401) {
        dispatch.auth.logout()
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
