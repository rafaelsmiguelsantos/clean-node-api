import { makeSignUpValidation } from './signup-validation-factory'
import { makeDbAuthentication } from '../usecases/db-authentication-factory'
import { makeDbAddAccount } from '../usecases/db-add-account-factory'
import { Controller } from '../../../presentation/protocols'
import { SignUpController } from '../../../presentation/controllers/signup/signup-controller'
import { makeLogControllerDecorator } from '../log-controller-decorator-factory'

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}
