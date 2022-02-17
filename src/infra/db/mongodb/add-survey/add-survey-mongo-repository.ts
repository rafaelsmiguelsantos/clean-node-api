import { IAddSurveyRepository } from '../../../../data-layer/protocols/db/add-survey-repository'
import { AddSurveyModel } from '../../../../domain/usecases/add-survey'
import { MongoHelper } from '../helpers/mongo-helper'

export class AddSurveyMongoRepository implements IAddSurveyRepository {
  async addSurvey (surveyData: AddSurveyModel): Promise<void> {
    const surveyCollection = MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(surveyData)
  }
}
