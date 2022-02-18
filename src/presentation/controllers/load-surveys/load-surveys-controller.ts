import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { ILoadSurveys } from './load-surveys-protocols'
import { ok, serverError } from '../../helpers/http/http-helper'

export class LoadSurveyController implements Controller {
  constructor (private readonly loadSurveys: ILoadSurveys) { }
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurveys.loadSurveys()
      return ok(surveys)
    } catch (error) {
      return serverError(error)
    }
  }
}
