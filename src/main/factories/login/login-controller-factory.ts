import { Controller } from '../../../presentation/protocols'
import { makeLoginValidation } from './login-validation-factory'
import { LoginController } from '../../../presentation/controllers/login/login-controller'
import { makeDbAuthentication } from '../usecases/db-authentication-factory'
import { makeLogControllerDecorator } from '../log-controller-decorator-factory'

export const makeLoginController = (): Controller => {
  return makeLogControllerDecorator(new LoginController(makeLoginValidation(), makeDbAuthentication()))
}
