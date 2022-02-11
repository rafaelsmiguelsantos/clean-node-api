import { DbAddAccount } from '../../../data-layer/usecases/add-account/db-add-account'
import { DbAuthentication } from '../../../data-layer/usecases/authentication/db-authentication'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../infra/criptography/jwt-adapter/jwt-adapter'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/account-mongo-repository'
import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-mongo-repository'

import { SignUpController } from '../../../presentation/controllers/signup/signup-controller'
import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import env from '../../env'
import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)

  const accountMongoRepository = new AccountMongoRepository()
  const jwtAdapter = new JwtAdapter(env.jwt)

  const dbAddCcount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const dbAuthentication = new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)

  const signUpController = new SignUpController(
    dbAddCcount, makeSignUpValidation(), dbAuthentication)
  const loggerMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(signUpController, loggerMongoRepository)
}
