import { ILoggerErrorRepository } from '@/data-layer/protocols/db/logger-error-repository'
import { MongoHelper } from '../helpers/mongo-helper'

export class LogMongoRepository implements ILoggerErrorRepository {
  async loggerError (stack: string): Promise<void> {
    const errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.insertOne({
      stack,
      date: new Date()
    })
  }
}
