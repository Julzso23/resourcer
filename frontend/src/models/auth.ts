import { createModel, RematchDispatch } from "@rematch/core";
import { RootModel } from ".";
import { Api } from "../api";

interface AuthState {
  token: string
}

export const auth = createModel<RootModel>()({
  state: {
    token: localStorage.getItem('jwt')
  } as AuthState,
  reducers: {
    setToken(state: AuthState, payload: string): AuthState {
      state.token = payload
      return state
    }
  },
  effects: (dispatch: RematchDispatch<RootModel>) => ({
    async login(payload: FormData) {
      const token: string = (await Api.post<AuthState>('auth/login', {
          email: payload.get('email')!.toString(),
          password: payload.get('password')!.toString(),
        })).token
      localStorage.setItem('jwt', token)
      dispatch.auth.setToken(token)
    }
  })
})
