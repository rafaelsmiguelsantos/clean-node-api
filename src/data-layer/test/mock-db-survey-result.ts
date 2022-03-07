import { SurveyResultModel } from '@/domain/models/survey-result'
import { mockSaveSurveyResultModel } from '@/domain/test'
import { SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result'
import { ISaveSurveyResultRepository } from '@/data-layer/protocols/db/save-survey-result-repository'

export const mockSaveSurveyResultRepository = (): ISaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements ISaveSurveyResultRepository {
    async save (resultData: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return new Promise(resolve => resolve(mockSaveSurveyResultModel()))
    }
  }
  return new SaveSurveyResultRepositoryStub()
}
