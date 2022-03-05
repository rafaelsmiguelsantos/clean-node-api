import { AddSurveyParams, IAddSurvey } from '@/domain/usecases/survey/add-survey'
import { IAddSurveyRepository } from '../../../protocols/db/add-survey-repository'

export class DbAddSurvey implements IAddSurvey {
  constructor (private readonly addSurveyRepository: IAddSurveyRepository) {}
  async addSurvey (data: AddSurveyParams): Promise<void> {
    await this.addSurveyRepository.addSurvey(data)
  }
}
