import HidePassword from './collection/hide-password.svg'
import ShowPassword from './collection/show-password.svg'
import Google from './collection/google.svg'
import Logo from 'assets/img/logo.svg'

export const ICON_COLLECTION = {
  hidePassword: HidePassword,
  showPassword: ShowPassword,
  google: Google,
  logo: Logo,
}

type Keys = keyof typeof ICON_COLLECTION
export type IconCollectionType = (typeof ICON_COLLECTION)[Keys]
