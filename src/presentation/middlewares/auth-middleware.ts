import { AccessDeniedError } from '../errors'
import { forbbiden } from '../helpers/http/http-helper'
import { IMiddleware, HttpRequest, HttpResponse } from '../protocols'

export class AuthMiddleware implements IMiddleware {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = forbbiden(new AccessDeniedError())
    return new Promise(resolve => resolve(error))
  }
}
