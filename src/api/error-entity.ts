type IError = Response

const ERROR_PLACEHOLDER = 'something_went_wrong'

export class ResponseError<Error extends string> {
  public response: IError
  public message: string | Error

  constructor(response: IError, message: string | undefined) {
    this.response = response
    this.message = message || ERROR_PLACEHOLDER
  }
}
