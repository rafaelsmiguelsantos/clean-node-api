import { ILoadSurveyById } from '@/domain/usecases/survey/load-survey-by-id'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/controllers/load-surveys/load-surveys-protocols'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden } from '@/presentation/middlewares'

export class LoadSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: ILoadSurveyById) { }
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const survey = await this.loadSurveyById.loadById(httpRequest.params.surveyId)
    if (!survey) {
      return forbidden(new InvalidParamError('surveyId'))
    }
    return Promise.resolve(null)
  }
}
