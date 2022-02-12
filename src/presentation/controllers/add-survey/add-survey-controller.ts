import { IAddSurvey } from '../../../domain/usecases/add-survey'
import { badRequest } from '../../helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { IValidation } from '../../protocols/validation'

export class AddSurveyController implements Controller {
  constructor (private readonly validation: IValidation, private readonly addSurvey: IAddSurvey) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (error) {
      return badRequest(error)
    }
    const { answers, question } = httpRequest.body

    await this.addSurvey.addSurvey({
      question,
      answers
    })
    return new Promise(resolve => resolve(null))
  }
}
