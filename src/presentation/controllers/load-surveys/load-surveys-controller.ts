import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { ILoadSurveys } from './load-surveys-protocols'
import { ok } from '../../helpers/http/http-helper'

export class LoadSurveyController implements Controller {
  constructor (private readonly loadSurveys: ILoadSurveys) { }
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const surveys = await this.loadSurveys.loadSurveys()
    return ok(surveys)
  }
}
