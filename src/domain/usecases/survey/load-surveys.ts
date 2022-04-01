import { SurveyModel } from '@/domain/models/surveys'

export interface ILoadSurveys {
  load: (accountId: string) => Promise<SurveyModel[]>
}
