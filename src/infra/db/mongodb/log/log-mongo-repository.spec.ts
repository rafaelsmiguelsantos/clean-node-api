import { LogMongoRepository } from './log-mongo-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { Collection } from 'mongodb'
import faker from 'faker'

const mockSut = (): LogMongoRepository => {
  return new LogMongoRepository()
}

describe('Logger Mongo Repository', () => {
  let errorCollection: Collection

  beforeAll(async () => { await MongoHelper.connect(process.env.MONGO_URL) })

  afterAll(async () => { await MongoHelper.disconnect() })

  beforeEach(async () => {
    errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.deleteMany({})
  })

  test('Should create an error log on success', async () => {
    const sut = mockSut()
    await sut.loggerError(faker.random.words())
    const count = await errorCollection.countDocuments()
    expect(count).toBe(1)
  })
})
