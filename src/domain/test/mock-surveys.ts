import { SurveyModel } from '@/domain/models/surveys'
import { AddSurveyParams } from '@/domain/usecases/survey/add-survey'
import { mockSurveyModel } from './mock-survey'
import faker from 'faker'

export const mockSurveysModel = (): SurveyModel[] => [
  mockSurveyModel(),
  mockSurveyModel()
]

export const mockSurveyData = (): AddSurveyParams => ({
  question: faker.random.words(),
  answers: [{
    image: faker.image.imageUrl(),
    answer: faker.random.word()
  }, {
    answer: faker.random.word()
  }],
  date: faker.date.recent()
})
