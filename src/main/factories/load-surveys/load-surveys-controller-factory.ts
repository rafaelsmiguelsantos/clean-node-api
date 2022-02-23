import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '../log/log-controller-decorator-factory'
import { LoadSurveyController } from '@/presentation/controllers/load-surveys/load-surveys-controller'
import { makeDbLoadSurveys } from '../usecases/db-load-surveys'

export const makeLoadSurveysController = (): Controller => {
  const controller = new LoadSurveyController(makeDbLoadSurveys())
  return makeLogControllerDecorator(controller)
}
