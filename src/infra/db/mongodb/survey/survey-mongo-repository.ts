import { IAddSurveyRepository } from '@/data-layer/protocols/db/add-survey-repository'
import { ILoadSurveyByIdRepository } from '@/data-layer/protocols/db/load-survey-by-id'
import { ILoadSurveysRepository } from '@/data-layer/protocols/db/load-surveys-repository'
import { SurveyModel } from '@/domain/models/surveys'
import { AddSurveyModel } from '@/domain/usecases/add-survey'
import { MongoHelper } from '../helpers/mongo-helper'

export class SurveyMongoRepository implements IAddSurveyRepository, ILoadSurveysRepository, ILoadSurveyByIdRepository {
  async addSurvey (surveyData: AddSurveyModel): Promise<void> {
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
    const survey = await surveyCollection.findOne({ _id: id })
    return survey && MongoHelper.map(survey)
  }
}
