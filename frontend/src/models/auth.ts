import { createModel } from "@rematch/core";
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
  effects: {
    async login(payload: FormData) {
      const token: string = (await Api.post<AuthState>('auth/login', {
          email: payload.get('email')!.toString(),
          password: payload.get('password')!.toString(),
        })).token
      localStorage.setItem('jwt', token)
      this.setToken(token)
    },

    async logout() {
      this.setToken(undefined)
    },

    async register(payload: FormData) {
      const token: string = (await Api.post<AuthState>('auth/register', {
          name: payload.get('name')!.toString(),
          email: payload.get('email')!.toString(),
          password: payload.get('password')!.toString(),
        })).token
      localStorage.setItem('jwt', token)
      this.setToken(token)
    }
  }
})
