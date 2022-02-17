export interface AddSurveyModel {
  question: string
  answers: SurveyAnswer[]
  date: Date
}

export interface SurveyAnswer {
  image?: string
  answer: string
}

export interface IAddSurvey {
  addSurvey: (data: AddSurveyModel) => Promise<void>
}
