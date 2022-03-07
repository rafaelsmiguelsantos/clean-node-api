import { AddSurveyParams } from '@/domain/usecases/survey/add-survey'
import { IAddSurveyRepository } from '@/data-layer/protocols/db/add-survey-repository'
import { ILoadSurveyByIdRepository } from '../protocols/db/load-survey-by-id'
import { SurveyModel } from '@/domain/models/surveys'
import { mockSurveyModel, mockSurveysModel } from '@/domain/test'
import { ILoadSurveysRepository } from '@/data-layer/protocols/db/load-surveys-repository'

export const mockAddSurveyRepository = (): IAddSurveyRepository => {
  class AddSurveyRepositoryStub implements IAddSurveyRepository {
    async addSurvey (surveyData: AddSurveyParams): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new AddSurveyRepositoryStub()
}

export const mockLoadSurveyByIdRepository = (): ILoadSurveyByIdRepository => {
  class LoadSurveyByIdRepositoryStub implements ILoadSurveyByIdRepository {
    async loadById (id: string): Promise<SurveyModel> {
      return new Promise(resolve => resolve(mockSurveyModel()))
    }
  }
  return new LoadSurveyByIdRepositoryStub()
}

export const mockLoadSurveysRepository = (): ILoadSurveysRepository => {
  class LoadSurveysRepositoryStub implements ILoadSurveysRepository {
    async loadAll (): Promise<SurveyModel[]> {
      return new Promise(resolve => resolve(mockSurveysModel()))
    }
  }
  return new LoadSurveysRepositoryStub()
}
