import { SurveyModel } from '@/domain/models/surveys'

export type AddSurveyModel = Omit<SurveyModel, 'id'>

export interface IAddSurvey {
  addSurvey: (data: AddSurveyModel) => Promise<void>
}
