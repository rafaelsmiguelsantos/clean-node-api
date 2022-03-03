import { AddSurveyModel } from '@/domain/usecases/survey/add-survey'

export interface IAddSurveyRepository {
  addSurvey: (surveyData: AddSurveyModel) => Promise<void>
}
