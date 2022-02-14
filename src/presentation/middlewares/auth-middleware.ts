import { AccessDeniedError } from '../errors'
import { forbbiden, ok } from '../helpers/http/http-helper'
import { IMiddleware, HttpRequest, HttpResponse } from '../protocols'
import { ILoadAccountByToken } from '../../domain/usecases/load-account-by-token'

export class AuthMiddleware implements IMiddleware {
  constructor (private readonly loadAccountByToken: ILoadAccountByToken) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const accessToken = httpRequest.headers?.['x-access-token']
    if (accessToken) {
      const account = await this.loadAccountByToken.load(accessToken)
      if (account) {
        return ok({ accountId: account.id })
      }
    }
    return forbbiden(new AccessDeniedError())
  }
}
