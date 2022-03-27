import { ILoadSurveyResultRepository } from '@/data-layer/protocols/db/load-survey-result-repository'
import { SurveyResultModel } from '@/domain/models/survey-result'
import { ILoadSurveyResult } from '@/domain/usecases/survey-result/load-survey-result'

export class DbLoadSurveyResult implements ILoadSurveyResult {
  constructor (private readonly loadSurveyResultRepository: ILoadSurveyResultRepository) { }

  async load (surveyId: string): Promise<SurveyResultModel> {
    const surveyLoadResult = await this.loadSurveyResultRepository.loadBySurveyId(surveyId)
    return surveyLoadResult
  }
}
