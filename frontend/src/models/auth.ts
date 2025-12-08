import { createModel } from "@rematch/core";
import { RootModel } from ".";
import { Api } from "../api";

interface AuthState {
  token: string | null
}

export const auth = createModel<RootModel>()({
  state: {
    token: localStorage.getItem('jwt')
  } as AuthState,
  reducers: {
    setToken(state: AuthState, payload: string): AuthState {
      if (payload == null) {
        localStorage.removeItem('jwt')
      } else {
        localStorage.setItem('jwt', payload)
      }
      return { ...state, token: payload }
    }
  },
  effects: {
    async login(payload: FormData) {
      const token: string | null = (await Api.post<AuthState>('auth/login', {
        email: payload.get('email')!.toString(),
        password: payload.get('password')!.toString(),
      })).token
      if (token) {
        this.setToken(token)
      }
    },

    async logout() {
      this.setToken(null)
    },

    async register(payload: FormData) {
      const token: string | null = (await Api.post<AuthState>('auth/register', {
          name: payload.get('name')!.toString(),
          email: payload.get('email')!.toString(),
          password: payload.get('password')!.toString(),
        })).token
      if (token) {
        this.setToken(token)
      }
    }
  }
})
