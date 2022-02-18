import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { SurveyMongoRepository } from './add-survey-mongo-repository'

let surveyCollection: Collection

const makeSut = (): SurveyMongoRepository => {
  return new SurveyMongoRepository()
}
describe('AddSurvey Mongo Repository', () => {
  beforeAll(async () => { await MongoHelper.connect(process.env.MONGO_URL) })

  afterAll(async () => { await MongoHelper.disconnect() })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
  })

  describe('addSurveys', () => {
    test('Should add survey on success', async () => {
      const sut = makeSut()
      await sut.addSurvey({
        question: 'any_question',
        answers: [{
          image: 'any_image',
          answer: 'any_answer'
        }, { answer: 'any_second' }],
        date: new Date()
      })
      const survey = await surveyCollection.findOne({ question: 'any_question' })
      expect(survey).toBeTruthy()
    })
  })
})
