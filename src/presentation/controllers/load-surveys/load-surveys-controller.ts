import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { ILoadSurveys } from './load-surveys-protocols'

export class LoadSurveyController implements Controller {
  constructor (private readonly loadSurveys: ILoadSurveys) { }
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadSurveys.loadSurveys()
    return null
  }
}
