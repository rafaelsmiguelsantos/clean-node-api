import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'
import request from 'supertest'
import app from '../config/app'
import env from '../../main/env'

let surveyCollection: Collection
let accountCollection: Collection

const mockAccessToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'Camila',
    email: 'camila@mail.com',
    password: '123',
    role: 'admin'
  })
  const id = res.insertedId.toHexString()
  const accessToken = sign({ id }, env.jwt)
  await accountCollection.updateOne({
    _id: res.insertedId
  }, {
    $set: {
      accessToken
    }
  })
  return accessToken
}

describe('Survey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('GET /surveys', () => {
    test('Should return 403 on LoadSurveys without accessToken', async () => {
      await request(app)
        .get('/api/surveys')
        .expect(403)
    })
  })

  test('Should return 204 on add survey with valid accessToken', async () => {
    const accessToken = await mockAccessToken()
    await request(app)
      .get('/api/surveys')
      .set('x-access-token', accessToken)
      .send({
        question: 'Question',
        answers: [{
          answer: 'Answer 1',
          image: 'http://image-name.com'
        }, {
          answer: 'Answer 2'
        }]
      })
      .expect(204)
  })
})

describe('Survey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /surveys', () => {
    test('Should return 403 on addSurvey withou accessToken', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'Question',
          answers: [{
            image: 'http://image-name.com',
            answer: 'any'
          }, { answer: 'any 2' }]
        })
        .expect(403)
    })
  })

  test('Should return 204 on add survey with valid accessToken', async () => {
    const accessToken = await mockAccessToken()
    await request(app)
      .post('/api/surveys')
      .set('x-access-token', accessToken)
      .send({
        question: 'Question',
        answers: [{
          answer: 'Answer 1',
          image: 'http://image-name.com'
        }, {
          answer: 'Answer 2'
        }]
      })
      .expect(204)
  })
})
