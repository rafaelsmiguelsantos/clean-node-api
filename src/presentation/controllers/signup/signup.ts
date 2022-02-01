import { HttpRequest, HttpResponse, Controller, IValidation } from './signup-protocols'

import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { IAddAccount } from '../../../domain/usecases/add-account'

export class SignUpController implements Controller {
  private readonly addAccount: IAddAccount
  private readonly validation: IValidation

  constructor (addAccount: IAddAccount, validation: IValidation) {
    this.addAccount = addAccount
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { name, email, password } = httpRequest.body
      const account = await this.addAccount.addAccount({
        name,
        email,
        password
      })
      console.log(account)
      return ok(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
