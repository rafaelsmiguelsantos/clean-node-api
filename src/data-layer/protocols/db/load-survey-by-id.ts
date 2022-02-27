import { SurveyModel } from '@/domain/models/surveys'

export interface ILoadSurveyByIdRepository {
  loadById: (id: string) => Promise<SurveyModel>
}
