import { SurveysModel } from '../models/surveys'

export interface ILoadSurveys {
  loadSurveys: () => Promise<SurveysModel[]>
}
