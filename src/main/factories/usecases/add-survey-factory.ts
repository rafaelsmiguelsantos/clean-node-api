import { AddSurveyMongoRepository } from '../../../infra/db/mongodb/add-survey/add-survey-mongo-repository'
import { DbAddSurvey } from '../../../data-layer/usecases/add-survey/db-add-survey'
import { IAddSurvey } from '../../../domain/usecases/add-survey'

export const makeDbAddSurvey = (): IAddSurvey => {
  const surveyMongoRepository = new AddSurveyMongoRepository()
  return new DbAddSurvey(surveyMongoRepository)
}