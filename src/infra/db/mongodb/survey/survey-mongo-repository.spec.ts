import { SurveyMongoRepository } from './survey-mongo-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { Collection } from 'mongodb'
import { mockSurveyData } from '@/domain/test'

let surveyCollection: Collection

const mockSut = (): SurveyMongoRepository => {
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
      const sut = mockSut()
      await sut.addSurvey(mockSurveyData())
      const count = await surveyCollection.countDocuments()
      expect(count).toBe(1)
    })
  })

  describe('loadAll()', () => {
    test('Should load all surveys on success', async () => {
      const addSurveyModels = [mockSurveyData(), mockSurveyData()]
      await surveyCollection.insertMany(addSurveyModels)
      const sut = mockSut()
      const surveys = await sut.loadAll()
      expect(surveys.length).toBe(2)
      expect(surveys[0].id).toBeTruthy()
      expect(surveys[0].question).toBe(addSurveyModels[0].question)
      expect(surveys[1].question).toBe(addSurveyModels[1].question)
    })

    test('Should load empty list', async () => {
      const sut = mockSut()
      const surveys = await sut.loadAll()
      expect(surveys.length).toBe(0)
    })
  })

  describe('loadById()', () => {
    test('Should load survey by id surveys on success', async () => {
      const res = await surveyCollection.insertOne(mockSurveyData())
      const sut = mockSut()
      const survey = await sut.loadById(res.ops[0]._id)
      expect(survey).toBeTruthy()
    })

    test('Should load empty list', async () => {
      const sut = mockSut()
      const surveys = await sut.loadAll()
      expect(surveys.length).toBe(0)
    })
  })
})
