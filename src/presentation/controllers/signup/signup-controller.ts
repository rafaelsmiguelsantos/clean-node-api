import { HttpRequest, HttpResponse, Controller, IValidation, Authentication } from './signup-protocols'

import { badRequest, ok, serverError } from '../../helpers/http/http-helper'
import { IAddAccount } from '../../../domain/usecases/add-account'

export class SignUpController implements Controller {
  constructor (private readonly addAccount: IAddAccount, private readonly validation: IValidation, private readonly authentication: Authentication) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { name, email, password } = httpRequest.body
      await this.addAccount.addAccount({
        name,
        email,
        password
      })
      const accessToken = await this.authentication.auth({ email, password })
      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
