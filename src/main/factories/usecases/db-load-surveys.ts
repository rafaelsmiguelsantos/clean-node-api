import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/survey-mongo-repository'
import { ILoadSurveys } from '@/domain/usecases/load-surveys'
import { DbLoadSurveys } from '@/data-layer/usecases/load-surveys/db-load-surveys-repository'

export const makeDbLoadSurveys = (): ILoadSurveys => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveys(surveyMongoRepository)
}
