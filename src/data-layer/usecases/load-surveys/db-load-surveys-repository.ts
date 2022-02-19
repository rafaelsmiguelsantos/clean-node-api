import { SurveyModel } from '../../../domain/models/surveys'
import { ILoadSurveys } from '../../../domain/usecases/load-surveys'
import { ILoadSurveysRepository } from '../../protocols/db/load-surveys-repository'

export class DbLoadSurveys implements ILoadSurveys {
  constructor (private readonly loadSurveysRepository: ILoadSurveysRepository) { }
  async load (): Promise<SurveyModel[]> {
    const surveys = await this.loadSurveysRepository.loadAll()
    return surveys
  }
}
