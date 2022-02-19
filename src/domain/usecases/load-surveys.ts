import { SurveyModel } from '../models/surveys'

export interface ILoadSurveys {
  load: () => Promise<SurveyModel[]>
}
