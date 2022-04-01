import { AddSurveyParams } from '@/domain/usecases/survey/add-survey'
import { IAddSurveyRepository } from '@/data-layer/protocols/db/add-survey-repository'
import { ILoadSurveyByIdRepository } from '../protocols/db/load-survey-by-id'
import { SurveyModel } from '@/domain/models/surveys'
import { mockSurveyModel, mockSurveysModel } from '@/domain/test'
import { ILoadSurveysRepository } from '@/data-layer/protocols/db/load-surveys-repository'

export class AddSurveyRepositorySpy implements IAddSurveyRepository {
  addSurveyParams: AddSurveyParams

  async addSurvey (data: AddSurveyParams): Promise<void> {
    this.addSurveyParams = data
    return Promise.resolve()
  }
}

export class LoadSurveyByIdRepositorySpy implements ILoadSurveyByIdRepository {
  surveyModel = mockSurveyModel()
  id: string

  async loadById (id: string): Promise<SurveyModel> {
    this.id = id
    return Promise.resolve(this.surveyModel)
  }
}

export class LoadSurveysRepositorySpy implements ILoadSurveysRepository {
  surveyModels = mockSurveysModel()
  accountId: string

  async loadAll (accountId: string): Promise<SurveyModel[]> {
    this.accountId = accountId
    return Promise.resolve(this.surveyModels)
  }
}
