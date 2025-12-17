import { createModel } from "@rematch/core"
import { RootModel } from "."
import { Api } from "../api"
import { UserDto } from "../../../dtos/user.dto"

interface UsersState {
  users: UserDto[]
}

export const users = createModel<RootModel>()({
  state: {
    users: []
  } as UsersState,
  reducers: {
    setUsers(state, users: UserDto[]) {
      return { ...state, users }
    }
  },
  effects: (dispatch) => ({
    handleError({ error }: { error: any }) {
      if (error === 401) {
        dispatch.auth.logout()
      }
    },

    async getUsers({ searchValue }, rootState) {
      try {
        this.setUsers(await Api.get<UserDto[]>('users', { searchValue }, rootState.auth.token || undefined))
      } catch (error) {
        this.handleError({ error })
      }
    },
  }),
})
