import { SurveyModel } from '@/domain/models/surveys'
import { mockSurveyModel, mockSurveysModel } from '@/domain/test'
import { AddSurveyParams, IAddSurvey } from '@/domain/usecases/survey/add-survey'
import { ILoadSurveyById } from '@/domain/usecases/survey/load-survey-by-id'
import { ILoadSurveys } from '@/domain/usecases/survey/load-surveys'

export class AddSurveySpy implements IAddSurvey {
  addSurveyParams: AddSurveyParams

  async addSurvey (data: AddSurveyParams): Promise<void> {
    this.addSurveyParams = data
    return Promise.resolve()
  }
}

export class LoadSurveysSpy implements ILoadSurveys {
  surveyModels = mockSurveysModel()
  accountId: string

  async load (accountId: string): Promise<SurveyModel[]> {
    this.accountId = accountId
    return Promise.resolve(this.surveyModels)
  }
}

export class LoadSurveyByIdSpy implements ILoadSurveyById {
  surveyModel = mockSurveyModel()
  id: string

  async loadById (id: string): Promise<SurveyModel> {
    this.id = id
    return Promise.resolve(this.surveyModel)
  }
}
