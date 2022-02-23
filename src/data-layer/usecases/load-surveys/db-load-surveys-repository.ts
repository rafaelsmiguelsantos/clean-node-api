import { ILoadSurveysRepository } from '@/data-layer/protocols/db/load-surveys-repository'
import { ILoadSurveys } from '@/domain/usecases/load-surveys'
import { SurveyModel } from '@/domain/models/surveys'

export class DbLoadSurveys implements ILoadSurveys {
  constructor (private readonly loadSurveysRepository: ILoadSurveysRepository) { }
  async load (): Promise<SurveyModel[]> {
    const surveys = await this.loadSurveysRepository.loadAll()
    return surveys
  }
}
