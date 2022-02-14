import { IMiddleware, HttpRequest, HttpResponse } from '../protocols'
import { forbbiden, ok, serverError } from '../helpers/http/http-helper'
import { ILoadAccountByToken } from '../../domain/usecases/load-account-by-token'
import { AccessDeniedError } from '../errors'

export class AuthMiddleware implements IMiddleware {
  constructor (private readonly loadAccountByToken: ILoadAccountByToken, private readonly role?: string) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['x-access-token']
      if (accessToken) {
        const account = await this.loadAccountByToken.load(accessToken, this.role)
        if (account) {
          return ok({ accountId: account.id })
        }
      }
      return forbbiden(new AccessDeniedError())
    } catch (error) {
      return serverError(error)
    }
  }
}
