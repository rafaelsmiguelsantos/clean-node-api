import { AuthenticationModel } from '@/domain/models/authentication'
import {
  IAuthentication,
  AuthenticationParams,
  IHashComparer,
  IEncrypter,
  LoadAccountByEmailRepository,
  IUpdateAccessTokenRepository
} from './index'

export class DbAuthentication implements IAuthentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: IHashComparer,
    private readonly tokenGenerator: IEncrypter,
    private readonly updateAccessTokenRepository: IUpdateAccessTokenRepository) { }

  async auth (authenticationParams: AuthenticationParams): Promise<AuthenticationModel> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authenticationParams.email)
    if (account) {
      const isValid = await this.hashComparer.compare(authenticationParams.password, account.password)
      if (isValid) {
        const accessToken = await this.tokenGenerator.encrypt(account.id)
        await this.updateAccessTokenRepository.updateAccessToken(account.id, accessToken)
        return { accessToken, name: account.name }
      }
    }
    return null
  }
}
