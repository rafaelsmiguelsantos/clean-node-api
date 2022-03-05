import { ISaveSurveyResultRepository } from '@/data-layer/protocols/db/save-survey-result-repository'
import { SurveyResultModel } from '@/domain/models/survey-result'
import { ISaveSurveyResult, SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result'

export class DbSaveSurveyResult implements ISaveSurveyResult {
  constructor (private readonly saveSurveyResult: ISaveSurveyResultRepository) {}
  async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    const survey = await this.saveSurveyResult.save(data)
    return survey
  }
}
