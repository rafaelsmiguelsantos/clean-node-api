import { SurveyResultModel } from '@/domain/models/survey-result'

export interface ILoadSurveyResult {
  save: (surveyId: string) => Promise<SurveyResultModel>
}
