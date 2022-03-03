import { SurveyModel } from '@/domain/models/surveys'

export interface ILoadSurveyById {
  loadById: (id: string) => Promise<SurveyModel>
}
