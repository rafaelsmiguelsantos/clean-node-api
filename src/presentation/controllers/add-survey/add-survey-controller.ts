import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { badRequest, noContent, serverError } from '@/presentation/helpers/http/http-helper'
import { IValidation } from '@/presentation/protocols/validation'
import { IAddSurvey } from '@/domain/usecases/survey/add-survey'

export class AddSurveyController implements Controller {
  constructor (private readonly validation: IValidation, private readonly addSurvey: IAddSurvey) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { answers, question } = httpRequest.body
      await this.addSurvey.addSurvey({
        question,
        answers,
        date: new Date()
      })
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
