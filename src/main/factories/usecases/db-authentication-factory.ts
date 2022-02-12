import { AccountMongoRepository } from '../../../infra/db/mongodb/account/account-mongo-repository'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../infra/criptography/jwt-adapter/jwt-adapter'
import { DbAuthentication } from '../../../data-layer/usecases/authentication/db-authentication'
import { Authentication } from '../../../domain/usecases/authentication'
import env from '../../env'

export const makeDbAuthentication = (): Authentication => {
  const SALT = 12
  const bcryptAdapter = new BcryptAdapter(SALT)
  const jwtAdapter = new JwtAdapter(env.jwt)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
}
