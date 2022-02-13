import { badRequest, ok, serverError, unauthorized } from '../../helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, Authentication } from './login-protocols'
import { IValidation } from '../../protocols/validation'

export class LoginController implements Controller {
  constructor (private readonly validation: IValidation, private readonly authentication: Authentication) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { email, password } = httpRequest.body
      const accessToken = await this.authentication.auth({ email, password })
      if (!accessToken) {
        return unauthorized()
      }
      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
