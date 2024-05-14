import { BaseHttpService } from 'services/base-http-service'
import { IUser } from 'shared/types/user'

class UserApiService {
  private readonly http: BaseHttpService

  constructor(httpService: BaseHttpService) {
    this.http = httpService
  }

  getCurrent = async (): Promise<IUser> => {
    const payload = await this.http.get(`/user/current`)
    return payload.json()
  }
}

export const UserApi = new UserApiService(new BaseHttpService())
