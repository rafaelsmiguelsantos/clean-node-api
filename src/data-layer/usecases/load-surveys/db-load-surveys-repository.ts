import { SurveysModel } from '../../../domain/models/surveys'
import { ILoadSurveysRepository } from '../../protocols/db/load-surveys-repository'

export class DbLoadSurveys implements ILoadSurveysRepository {
  constructor (private readonly loadSurveysRepository: ILoadSurveysRepository) { }
  async loadAllSurveys (): Promise<SurveysModel[]> {
    const surveys = await this.loadSurveysRepository.loadAllSurveys()
    return surveys
  }
}
