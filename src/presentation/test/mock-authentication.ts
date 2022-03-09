import { AccountModel } from '@/domain/models/account'
import { mockAddAccountModel } from '@/domain/test'
import { AuthenticationParams, IAuthentication } from '@/domain/usecases/account/authentication'
import { ILoadAccountByToken } from '@/domain/usecases/account/load-account-by-token'

export const mockAuthenticationToken = (): IAuthentication => {
  class AuthenticationStub implements IAuthentication {
    async auth (authentication: AuthenticationParams): Promise<string> {
      return new Promise(resolve => resolve('any_token'))
    }
  }
  return new AuthenticationStub()
}

export const mockLoadAccountByToken = (): ILoadAccountByToken => {
  class AddSurveyRepositoryStub implements ILoadAccountByToken {
    async load (accessToken: string, role: string): Promise<AccountModel> {
      return new Promise(resolve => resolve(mockAddAccountModel()))
    }
  }
  return new AddSurveyRepositoryStub()
}
