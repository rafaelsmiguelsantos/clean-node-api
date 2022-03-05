import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/survey-mongo-repository'
import { ILoadSurveys } from '@/domain/usecases/survey/load-surveys'
import { DbLoadSurveys } from '@/data-layer/usecases/survey/load-surveys/db-load-surveys-repository'

export const makeDbLoadSurveys = (): ILoadSurveys => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveys(surveyMongoRepository)
}
