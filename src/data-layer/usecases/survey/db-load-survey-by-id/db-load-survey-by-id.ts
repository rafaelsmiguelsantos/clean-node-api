import { ILoadSurveyByIdRepository } from '@/data-layer/protocols/db/load-survey-by-id'
import { SurveyModel } from '@/domain/models/surveys'
import { ILoadSurveyById } from '@/domain/usecases/survey/load-survey-by-id'

export class DbLoadSurveyById implements ILoadSurveyById {
  constructor (private readonly loadSurveyByIdRepository: ILoadSurveyByIdRepository) {}
  async loadById (id: string): Promise<SurveyModel> {
    const survey = await this.loadSurveyByIdRepository.loadById(id)
    return survey
  }
}
