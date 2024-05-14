import { create } from 'zustand'
import { IUser } from 'shared/types/user'
import {
  removeFromStorage,
  saveTokenStorage,
} from 'services/auth-token-service'

type AuthStore = {
  isLoggedIn: boolean
  user: IUser
  setLoggedIn: (token: string | null) => void
  setUser: (user: IUser | null) => void
}

export const useAuthState = create<AuthStore>((set, get) => ({
  isLoggedIn: false,
  user: null,
  setLoggedIn(token) {
    if (!token) {
      removeFromStorage()
      set({ isLoggedIn: false })
      return
    }
    saveTokenStorage(token)
    set({ isLoggedIn: true })
  },
  setUser(user) {
    if (!user) {
      set({ user: null })
    }
    set({ user })
  },
}))
