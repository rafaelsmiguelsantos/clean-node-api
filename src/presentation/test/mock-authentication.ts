import { AuthenticationParams, IAuthentication } from '@/domain/usecases/account/authentication'

export const mockAuthenticationToken = (): IAuthentication => {
  class AuthenticationStub implements IAuthentication {
    async auth (authentication: AuthenticationParams): Promise<string> {
      return new Promise(resolve => resolve('any_token'))
    }
  }
  return new AuthenticationStub()
}
