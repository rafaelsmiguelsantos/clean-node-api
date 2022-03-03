import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-mongo-repository'
import { ILoadAccountByToken } from '@/domain/usecases/account/load-account-by-token'
import { DbLoadAccountByToken } from '@/data-layer/usecases/account/load-account-by-token/db-load-account-by-token'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter/jwt-adapter'
import env from '@/main/env'

export const makeDbLoadAccountByToken = (): ILoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(env.jwt)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbLoadAccountByToken(jwtAdapter, accountMongoRepository)
}
