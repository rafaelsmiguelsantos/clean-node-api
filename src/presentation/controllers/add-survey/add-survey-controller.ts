import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { IValidation } from '../../protocols/validation'

export class AddSurveyController implements Controller {
  constructor (private readonly validation: IValidation) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    this.validation.validate(httpRequest.body)
    return new Promise(resolve => resolve(null))
  }
}
