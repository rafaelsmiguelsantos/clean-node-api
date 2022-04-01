import { SurveyModel } from '@/domain/models/surveys'

export interface ILoadSurveysRepository {
  loadAll: (accountId: string) => Promise<SurveyModel[]>
}
