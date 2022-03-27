import { SurveyModel } from '@/domain/models/surveys'

export const mockSurveyModel = (): SurveyModel => {
  return {
    id: 'any_id',
    question: 'any_question',
    answers: [{
      answer: 'any_answer'
    }, {
      answer: 'any_answer',
      image: 'any_image'
    }],
    date: new Date()
  }
}
