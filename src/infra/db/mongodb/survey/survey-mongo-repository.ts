import { ILoadSurveyByIdRepository } from '@/data-layer/protocols/db/load-survey-by-id'
import { ILoadSurveysRepository } from '@/data-layer/protocols/db/load-surveys-repository'
import { IAddSurveyRepository } from '@/data-layer/protocols/db/add-survey-repository'
import { AddSurveyParams } from '@/domain/usecases/survey/add-survey'
import { SurveyModel } from '@/domain/models/surveys'
import { MongoHelper } from '../helpers/mongo-helper'
import { ObjectId } from 'mongodb'

export class SurveyMongoRepository implements IAddSurveyRepository, ILoadSurveysRepository, ILoadSurveyByIdRepository {
  async addSurvey (surveyData: AddSurveyParams): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(surveyData)
  }

  async loadAll (): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const surveys: SurveyModel[] = await surveyCollection.find().toArray()
    return MongoHelper.mapCollection(surveys)
  }

  async loadById (id: string): Promise<SurveyModel> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const survey = await surveyCollection.findOne({ _id: new ObjectId(id) })
    return survey && MongoHelper.map(survey)
  }
}
