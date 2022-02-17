import { HttpRequest, HttpResponse, Controller, IAuthentication } from './signup-protocols'

import { badRequest, forbidden, ok, serverError } from '../../helpers/http/http-helper'
import { IAddAccount } from '../../../domain/usecases/add-account'
import { EmailInUseError } from '../../errors'
import { IValidation } from '../../protocols/validation'

export class SignUpController implements Controller {
  constructor (private readonly addAccount: IAddAccount, private readonly validation: IValidation, private readonly authentication: IAuthentication) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { name, email, password } = httpRequest.body
      const account = await this.addAccount.add({
        name,
        email,
        password
      })
      if (!account) {
        return forbidden(new EmailInUseError())
      }
      const accessToken = await this.authentication.auth({ email, password })
      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
