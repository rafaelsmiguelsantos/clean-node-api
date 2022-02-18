import { SurveysModel } from '../../../domain/models/surveys'
import { ILoadSurveysRepository } from '../../protocols/db/load-surveys-repository'

export class DbLoadSurveys implements ILoadSurveysRepository {
  constructor (private readonly loadSurveysRepository: ILoadSurveysRepository) { }
  async loadSurveys (): Promise<SurveysModel[]> {
    const surveys = await this.loadSurveysRepository.loadSurveys()
    return surveys
  }
}
