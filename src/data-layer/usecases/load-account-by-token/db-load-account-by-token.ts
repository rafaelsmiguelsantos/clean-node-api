import { ILoadAccountByToken } from '../../../presentation/middlewares'
import { IDecrypter } from '../../protocols/criptography/decrypter'
import { LoadAccountByTokenRepository } from '../../protocols/db/load-account-by-token-repository'
import { AccountModel } from '../add-account'

export class DbLoadAccountByToken implements ILoadAccountByToken {
  constructor (private readonly decrypter: IDecrypter, private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository) { }
  async load (accessToken: string, role?: string): Promise<AccountModel> {
    const token = await this.decrypter.decrypt(accessToken)
    if (token) {
      const account = await this.loadAccountByTokenRepository.loadByToken(token, role)
      if (account) {
        return account
      }
    }
    return null
  }
}
