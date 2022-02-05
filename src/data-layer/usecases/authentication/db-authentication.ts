import {
  Authentication,
  AuthenticationModel,
  IHashComparer,
  IEncrypter,
  LoadAccountByEmailRepository,
  IUpdateAccessTokenRepository
} from './index'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: IHashComparer,
    private readonly tokenGenerator: IEncrypter,
    private readonly updateAccessTokenRepository: IUpdateAccessTokenRepository) { }

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email)
    if (account) {
      const isValid = await this.hashComparer.compare(authentication.password, account.password)
      if (isValid) {
        const accessToken = await this.tokenGenerator.encrypt(account.id)
        await this.updateAccessTokenRepository.updateToken(account.id, accessToken)
        return accessToken
      }
    }
    return null
  }
}
