import { SurveyAnswerModel } from '@/domain/models/surveys'

export interface AddSurveyModel {
  question: string
  answers: SurveyAnswerModel[]
  date: Date
}

export interface IAddSurvey {
  addSurvey: (data: AddSurveyModel) => Promise<void>
}
