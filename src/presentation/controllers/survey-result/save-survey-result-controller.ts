import { ILoadSurveyById } from '@/domain/usecases/survey/load-survey-by-id'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden } from '@/presentation/middlewares'
import { Controller, HttpRequest, HttpResponse } from '../load-surveys/load-surveys-protocols'

export class SaveSurveyResultController implements Controller {
  constructor (private readonly IloadSurveyById: ILoadSurveyById) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const surveyResult = await this.IloadSurveyById.loadById(httpRequest.params.surveyId)
    if (!surveyResult) {
      return forbidden(new InvalidParamError('surveyId'))
    }
    return null
  }
}
