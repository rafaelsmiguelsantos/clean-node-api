import { AddSurveyModel } from '@/domain/usecases/add-survey'

export interface IAddSurveyRepository {
  addSurvey: (surveyData: AddSurveyModel) => Promise<void>
}
