import { IAddAccount } from '@/domain/usecases/account/add-account'
import { IValidation } from '@/presentation/protocols/validation'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { EmailInUseError } from '@/presentation/errors'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols'
import { IAuthentication } from '@/domain/usecases/account/authentication'

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
      const authenticationModel = await this.authentication.auth({ email, password })
      return ok(authenticationModel)
    } catch (error) {
      return serverError(error)
    }
  }
}
