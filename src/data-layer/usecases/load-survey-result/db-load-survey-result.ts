import { ILoadSurveyByIdRepository } from '@/data-layer/protocols/db/load-survey-by-id'
import { ILoadSurveyResultRepository } from '@/data-layer/protocols/db/load-survey-result-repository'
import { SurveyResultModel } from '@/domain/models/survey-result'
import { ILoadSurveyResult } from '@/domain/usecases/survey-result/load-survey-result'

export class DbLoadSurveyResult implements ILoadSurveyResult {
  constructor (
    private readonly loadSurveyResultRepository: ILoadSurveyResultRepository,
    private readonly loadSurveyByIdRepository: ILoadSurveyByIdRepository) { }

  async load (surveyId: string): Promise<SurveyResultModel> {
    const surveyLoadResult = await this.loadSurveyResultRepository.loadBySurveyId(surveyId)
    if (!surveyLoadResult) {
      await this.loadSurveyByIdRepository.loadById(surveyId)
    }
    return surveyLoadResult
  }
}
