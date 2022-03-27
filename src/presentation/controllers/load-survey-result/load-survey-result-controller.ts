import { ILoadSurveyById } from '@/domain/usecases/survey/load-survey-by-id'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/controllers/load-surveys/load-surveys-protocols'

export class LoadSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: ILoadSurveyById) { }
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadSurveyById.loadById(httpRequest.params.surveyId)
    return Promise.resolve(null)
  }
}
