import { Controller } from '../../../presentation/protocols'
import { makeLogControllerDecorator } from '../log/log-controller-decorator-factory'
import { AddSurveyController } from '../../../presentation/controllers/add-survey/add-survey-controller'
import { makeAddSurveyValidation } from './add-survey-validation-factory'
import { makeDbAddSurvey } from '../usecases/add-survey-factory'

export const makeSurveyController = (): Controller => {
  const controller = new AddSurveyController(makeAddSurveyValidation(), makeDbAddSurvey())
  return makeLogControllerDecorator(controller)
}
