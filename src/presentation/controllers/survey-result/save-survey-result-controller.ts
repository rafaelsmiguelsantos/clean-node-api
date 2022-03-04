import { ISaveSurveyResult } from '@/domain/usecases/survey-result/save-survey-result'
import { ILoadSurveyById } from '@/domain/usecases/survey/load-survey-by-id'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, serverError } from '@/presentation/middlewares'
import { Controller, HttpRequest, HttpResponse } from '../load-surveys/load-surveys-protocols'

export class SaveSurveyResultController implements Controller {
  constructor (private readonly IloadSurveyById: ILoadSurveyById, private readonly saveSurveyResult: ISaveSurveyResult) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { accountId } = httpRequest
      const { surveyId } = httpRequest.params
      const { answer } = httpRequest.body
      const surveyResult = await this.IloadSurveyById.loadById(surveyId)
      if (surveyResult) {
        const answers = surveyResult.answers.map(a => a.answer)
        if (!answers.includes(answer)) {
          return forbidden(new InvalidParamError('answer'))
        }
      } else {
        return forbidden(new InvalidParamError('surveyId'))
      }
      await this.saveSurveyResult.save({
        accountId,
        surveyId,
        answer,
        date: new Date()
      })
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
