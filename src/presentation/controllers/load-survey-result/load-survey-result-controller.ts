import { ILoadSurveyResult } from '@/domain/usecases/survey-result/load-survey-result'
import { ILoadSurveyById } from '@/domain/usecases/survey/load-survey-by-id'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/controllers/load-surveys/load-surveys-protocols'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, serverError } from '@/presentation/middlewares'

export class LoadSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: ILoadSurveyById, private readonly loadSurveyResult: ILoadSurveyResult) { }
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params
      const survey = await this.loadSurveyById.loadById(surveyId)
      if (!survey) {
        return forbidden(new InvalidParamError('surveyId'))
      }
      await this.loadSurveyResult.load(surveyId)
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
