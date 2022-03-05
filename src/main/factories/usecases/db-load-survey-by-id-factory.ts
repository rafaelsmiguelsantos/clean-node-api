import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/survey-mongo-repository'
import { ILoadSurveyById } from '@/domain/usecases/survey/load-survey-by-id'
import { DbLoadSurveyById } from '@/data-layer/usecases/survey/db-load-survey-by-id/db-load-survey-by-id'

export const makeDbLoadSurveyById = (): ILoadSurveyById => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveyById(surveyMongoRepository)
}
