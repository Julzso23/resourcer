import { createModel } from "@rematch/core"
import { RootModel } from "."
import { Api } from "../api"
import { UserDto } from "../../../dtos/user.dto"
import { history } from "../history"

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
        history.replace('/login')
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
