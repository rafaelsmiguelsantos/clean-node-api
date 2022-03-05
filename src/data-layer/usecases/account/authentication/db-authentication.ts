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

  async auth (authentication: AuthenticationParams): Promise<string> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authentication.email)
    if (account) {
      const isValid = await this.hashComparer.compare(authentication.password, account.password)
      if (isValid) {
        const accessToken = await this.tokenGenerator.encrypt(account.id)
        await this.updateAccessTokenRepository.updateAccessToken(account.id, accessToken)
        return accessToken
      }
    }
    return null
  }
}
