import { SurveyModel } from '@/domain/models/surveys'

export interface ILoadSurveys {
  load: () => Promise<SurveyModel[]>
}
