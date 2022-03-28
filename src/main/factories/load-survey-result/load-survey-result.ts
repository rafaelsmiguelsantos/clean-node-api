import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/log/log-controller-decorator-factory'
import { makeDbLoadSurveyById } from '@/main/factories/usecases/db-load-survey-by-id-factory'
import { LoadSurveyResultController } from '@/presentation/controllers/load-survey-result/load-survey-result-controller'
import { makeDbLoadSurveyResult } from '../usecases/load-survey-result-factory'

export const makeLoadSurveyResultController = (): Controller => {
  const controller = new LoadSurveyResultController(makeDbLoadSurveyById(), makeDbLoadSurveyResult())
  return makeLogControllerDecorator(controller)
}
