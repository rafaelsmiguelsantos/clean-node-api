import { AddSurveyParams } from '@/domain/usecases/survey/add-survey'

export interface IAddSurveyRepository {
  addSurvey: (surveyData: AddSurveyParams) => Promise<void>
}
