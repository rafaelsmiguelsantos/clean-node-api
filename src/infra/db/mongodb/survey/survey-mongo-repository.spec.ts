import { SurveyMongoRepository } from './survey-mongo-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { Collection } from 'mongodb'

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
      await surveyCollection.insertMany([{
        question: 'any_question',
        answers: [{
          image: 'any_image',
          answer: 'any_answer'
        }, { answer: 'any_second' }],
        date: new Date()
      },
      {
        question: 'other_question',
        answers: [{
          image: 'other_image',
          answer: 'other_answer'
        }, { answer: 'other_second' }],
        date: new Date()
      }
      ])
      const sut = mockSut()
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

  describe('loadAll()', () => {
    test('Should load all surveys on success', async () => {
      await surveyCollection.insertMany([
        {
          question: 'any_question',
          answers: [
            {
              image: 'any_image',
              answer: 'any_answer'
            }
          ],
          date: new Date()
        },
        {
          question: 'other_question',
          answers: [
            {
              image: 'other_image',
              answer: 'other_answer'
            }
          ],
          date: new Date()
        }
      ])

      const sut = mockSut()

      const surveys = await sut.loadAll()

      expect(surveys.length).toBe(2)
      expect(surveys[0].id).toBeTruthy()
      expect(surveys[0].question).toBe('any_question')
      expect(surveys[1].question).toBe('other_question')
    })

    test('Should load empty list', async () => {
      const sut = mockSut()
      const surveys = await sut.loadAll()
      expect(surveys.length).toBe(0)
    })
  })

  describe('loadById()', () => {
    test('Should load survey by id surveys on success', async () => {
      const response = await surveyCollection.insertOne(
        {
          question: 'any_question',
          answers: [
            {
              image: 'any_image',
              answer: 'any_answer'
            }
          ],
          date: new Date()
        }
      )
      const id = response.insertedId
      const sut = mockSut()
      const survey = await sut.loadById(id)

      expect(survey).toBeTruthy()
      expect(survey.id).toBeTruthy()
    })

    test('Should load empty list', async () => {
      const sut = mockSut()
      const surveys = await sut.loadAll()
      expect(surveys.length).toBe(0)
    })
  })
})
