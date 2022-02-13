import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { AddSurveyMongoRepository } from './add-survey-mongo-repository'

let surveyCollection: Collection

describe('AddSurvey Mongo Repository', () => {
  beforeAll(async () => { await MongoHelper.connect(process.env.MONGO_URL) })

  afterAll(async () => { await MongoHelper.disconnect() })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
  })

  const makeSut = (): AddSurveyMongoRepository => {
    return new AddSurveyMongoRepository()
  }

  test('Should add survey on success', async () => {
    const sut = makeSut()
    await sut.addSurvey({
      question: 'any_question',
      answers: [{
        image: 'any_image',
        answer: 'any_answer'
      },{ answer: 'any_second' }]
    })
    const survey = await surveyCollection.findOne({ question: 'any_question' })
    expect(survey).toBeTruthy()
  })
})
