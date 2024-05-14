import { BaseHttpService } from 'services/base-http-service'
import { APP_ROLES } from 'shared/constants/constants'
import { IUser } from 'shared/types/user'

export enum Provider {
  GOOGLE,
}

export class SignUpDTO {
  email: string
  name: string
  password: string
  passwordConfirmation: string
}

export class SignInDTO {
  email: string
  password: string
}

export class ISignUpResponse {
  id: number
  email: string
  updatedAt: Date
  roles: APP_ROLES[]
}

export class ISignInResponse {
  accessToken: string
  user: IUser
}

class AuthApiService {
  private readonly http: BaseHttpService

  constructor(httpService: BaseHttpService) {
    this.http = httpService
  }

  signUp = async (data: SignUpDTO): Promise<ISignUpResponse> => {
    const payload = await this.http.post(`/auth/sign-up`, data)
    return payload.json()
  }

  signIn = async (data: SignInDTO): Promise<ISignInResponse> => {
    const payload = await this.http.post(`/auth/sign-in`, data)
    return payload.json()
  }

  signInGoogle = async (): Promise<ISignInResponse> => {
    const payload = await this.http.get(`/auth/google`)
    return payload.json()
  }

  signGoogle = async (token: string): Promise<ISignInResponse> => {
    const payload = await this.http.get(`/auth/success?token=${token}}`)
    return payload.json()
  }
}

export const AuthApi = new AuthApiService(new BaseHttpService())
