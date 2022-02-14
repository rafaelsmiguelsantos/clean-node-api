import { ILoadAccountByToken, IMiddleware, HttpRequest, HttpResponse, forbbiden, ok, serverError } from './index'
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
