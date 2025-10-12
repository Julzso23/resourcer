import { createModel } from "@rematch/core";
import { RootModel } from ".";

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
  effects: (dispatch) => ({
    async login(payload: FormData) {
      fetch('http://127.0.0.1:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: payload.get('email'),
          password: payload.get('password'),
        })
      }).then(async response => {
        const token: string = (await response.json()).token
        localStorage.setItem('jwt', token)
        dispatch.auth.setToken(token)
      })
    }
  })
})
