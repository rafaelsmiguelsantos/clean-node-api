import { makeLogControllerDecorator } from '../log/log-controller-decorator-factory'
import { makeAddSurveyValidation } from './add-survey-validation-factory'
import { AddSurveyController } from '@/presentation/controllers/add-survey/add-survey-controller'
import { makeDbAddSurvey } from '../usecases/add-survey-factory'
import { Controller } from '@/presentation/protocols'

export const makeSurveyController = (): Controller => {
  const controller = new AddSurveyController(makeAddSurveyValidation(), makeDbAddSurvey())
  return makeLogControllerDecorator(controller)
}
