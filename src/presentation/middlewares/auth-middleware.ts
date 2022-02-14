import { AccessDeniedError } from '../errors'
import { forbbiden } from '../helpers/http/http-helper'
import { IMiddleware, HttpRequest, HttpResponse } from '../protocols'
import { ILoadAccountByToken } from '../../domain/usecases/load-account-by-token'

export class AuthMiddleware implements IMiddleware {
  constructor (private readonly loadAccountByToken: ILoadAccountByToken) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const accessToken = httpRequest.headers?.['x-access-token']
    if (accessToken) {
      await this.loadAccountByToken.load(accessToken)
    }
    return forbbiden(new AccessDeniedError())
  }
}
