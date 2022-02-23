import { makeLogControllerDecorator } from '../log/log-controller-decorator-factory'
import { makeDbAuthentication } from '../usecases/db-authentication-factory'
import { makeLoginValidation } from './login-validation-factory'
import { LoginController } from '@/presentation/controllers/login/login-controller'
import { Controller } from '@/presentation/protocols'

export const makeLoginController = (): Controller => {
  return makeLogControllerDecorator(new LoginController(makeLoginValidation(), makeDbAuthentication()))
}
