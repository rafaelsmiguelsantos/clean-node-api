import { LoadAccountByTokenRepository } from '@/data-layer/protocols/db/load-account-by-token-repository'
import { ILoadAccountByToken } from '@/presentation/middlewares'
import { AccountModel } from '@/domain/models/account'
import { IDecrypter } from '@/data-layer/protocols/criptography/decrypter'

export class DbLoadAccountByToken implements ILoadAccountByToken {
  constructor (private readonly decrypter: IDecrypter, private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository) { }
  async load (accessToken: string, role?: string): Promise<AccountModel> {
    let token: string
    try {
      token = await this.decrypter.decrypt(accessToken)
    } catch (error) {
      return null
    }
    if (token) {
      const account = await this.loadAccountByTokenRepository.loadByToken(accessToken, role)
      if (account) {
        return account
      }
    }
    return null
  }
}
