import { ISaveSurveyResultRepository } from '@/data-layer/protocols/db/save-survey-result-repository'
import { SurveyResultModel } from '@/domain/models/survey-result'
import { ISaveSurveyResult, SaveSurveyResultModel } from '@/domain/usecases/save-survey-result'

export class DbSaveSurveyResult implements ISaveSurveyResult {
  constructor (private readonly saveSurveyResult: ISaveSurveyResultRepository) {}
  async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
    const survey = await this.saveSurveyResult.save(data)
    return survey
  }
}
