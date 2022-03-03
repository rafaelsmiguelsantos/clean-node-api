import { AddSurveyModel, IAddSurvey } from '@/domain/usecases/add-survey'
import { IAddSurveyRepository } from '../../../protocols/db/add-survey-repository'

export class DbAddSurvey implements IAddSurvey {
  constructor (private readonly addSurveyRepository: IAddSurveyRepository) {}
  async addSurvey (data: AddSurveyModel): Promise<void> {
    await this.addSurveyRepository.addSurvey(data)
  }
}
