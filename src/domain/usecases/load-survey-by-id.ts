import { SurveyModel } from '@/domain/models/surveys'

export interface ILoadSurveys {
  loadById: (id: string) => Promise<SurveyModel>
}
