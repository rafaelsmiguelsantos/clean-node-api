import { HttpRequest } from '../protocols/httpRequest'
import { HttpResponse } from '../protocols/httpResponse'
import { MissingParamError } from '../errors/missing-param-error'
export class SignUpController {
  handle (httpRquest: HttpRequest): HttpResponse {
    if (!httpRquest.body.name) {
      return {
        statusCode: 400,
        body: new MissingParamError('name')
      }
    }
    if (!httpRquest.body.email) {
      return {
        statusCode: 400,
        body: new MissingParamError('email')
      }
    }
  }
}
