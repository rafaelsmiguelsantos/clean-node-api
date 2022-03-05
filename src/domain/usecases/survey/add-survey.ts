import { SurveyModel } from '@/domain/models/surveys'

export type AddSurveyParams = Omit<SurveyModel, 'id'>

export interface IAddSurvey {
  addSurvey: (data: AddSurveyParams) => Promise<void>
}
