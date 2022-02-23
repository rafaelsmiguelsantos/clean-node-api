import { SurveyModel } from '@/domain/models/surveys'

export interface ILoadSurveysRepository {
  loadAll: () => Promise<SurveyModel[]>
}
