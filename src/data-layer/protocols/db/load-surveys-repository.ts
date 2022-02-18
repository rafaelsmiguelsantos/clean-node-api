import { SurveysModel } from '../../../domain/models/surveys'

export interface ILoadSurveysRepository {
  loadSurveys: () => Promise<SurveysModel[]>
}
