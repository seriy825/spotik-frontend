import { APP_ROLES } from 'shared/constants/constants'

export interface IUser {
  id: string
  email: string
  roles: APP_ROLES[]
}

export interface IJwtInfo extends IUser {
  exp: number
  iat: number
}
