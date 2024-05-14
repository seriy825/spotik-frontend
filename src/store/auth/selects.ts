/* eslint-disable react-hooks/rules-of-hooks */
import { useAuthState } from './state'

export const selectIsLoggedIn = () =>
  useAuthState((state) => !!state.isLoggedIn)
export const selectUserData = () => useAuthState((state) => state.user)
