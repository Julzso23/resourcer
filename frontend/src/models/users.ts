import { createModel } from '@rematch/core'
import { RootModel } from '.'
import { Api } from '../api'
import { UserDto } from '../../../dtos/user.dto'

interface UsersState {
  users: UserDto[]
  loggedInUser: UserDto | undefined
}

export const users = createModel<RootModel>()({
  state: {
    users: [],
    loggedInUser: undefined,
  } as UsersState,
  reducers: {
    setUsers(state, users: UserDto[]) {
      return { ...state, users }
    },

    setLoggedInUser(state, loggedInUser: UserDto | undefined) {
      return { ...state, loggedInUser }
    },
  },
  effects: (dispatch) => ({
    handleError({ error }) {
      if (error === 401) {
        dispatch.auth.logout()
      }
    },

    async getUsers({ searchValue }, rootState) {
      try {
        this.setUsers(
          await Api.get<UserDto[]>(
            'users',
            { searchValue },
            rootState.auth.token || undefined,
          ),
        )
      } catch (error) {
        this.handleError({ error })
      }
    },

    async getLoggedInUser(_, rootState) {
      try {
        this.setLoggedInUser(
          await Api.get<UserDto>(
            'users/me',
            {},
            rootState.auth.token || undefined,
          ),
        )
      } catch (error) {
        if (error === 401) {
          this.setLoggedInUser(undefined)
        }
      }
    },
  }),
})
