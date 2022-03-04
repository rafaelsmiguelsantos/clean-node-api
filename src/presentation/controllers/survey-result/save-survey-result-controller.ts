import { ILoadSurveyById } from '@/domain/usecases/survey/load-survey-by-id'
import { Controller, HttpRequest, HttpResponse } from '../load-surveys/load-surveys-protocols'

export class SaveSurveyResultController implements Controller {
  constructor (private readonly IloadSurveyById: ILoadSurveyById) { }
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.IloadSurveyById.loadById(httpRequest.params.surveyId)
    return null
  }
}
