import { SurveysModel } from '../../../domain/models/surveys'

export interface ILoadSurveysRepository {
  loadAllSurveys: () => Promise<SurveysModel[]>
}
