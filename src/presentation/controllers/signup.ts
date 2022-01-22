import { HttpRequest } from '../protocols/httpRequest'
import { HttpResponse } from '../protocols/httpResponse'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'
export class SignUpController {
  handle (httpRquest: HttpRequest): HttpResponse {
    if (!httpRquest.body.name) {
      return badRequest(new MissingParamError('name'))
    }
    if (!httpRquest.body.email) {
      return badRequest(new MissingParamError('email'))
    }
  }
}
