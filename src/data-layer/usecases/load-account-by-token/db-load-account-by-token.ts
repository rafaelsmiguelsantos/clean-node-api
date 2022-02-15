import { ILoadAccountByToken } from '../../../presentation/middlewares'
import { IDecrypter } from '../../protocols/criptography/decrypter'
import { AccountModel } from '../add-account'

export class DbLoadAccountByToken implements ILoadAccountByToken {
  constructor (private readonly decrypter: IDecrypter) { }
  async load (accessToken: string, role?: string): Promise<AccountModel> {
    await this.decrypter.decrypt(accessToken)
    return null
  }
}
