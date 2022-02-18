export interface SurveysModel {
  id: string
  question: string
  answers: SurveyAnswerModel[]
  date: Date
}

export interface SurveyAnswerModel {
  image?: string
  answer: string
}
