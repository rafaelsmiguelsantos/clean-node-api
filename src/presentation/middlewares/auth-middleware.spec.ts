import { ILoadAccountByToken, forbidden, ok, serverError } from './index'
import { AccessDeniedError } from '../errors'
import { AuthMiddleware } from './auth-middleware'
import { AccountModel } from '../../domain/models/account'
import { HttpRequest } from '../protocols'

const mockFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hashed_password'
})

const mockFakeRequest = (): HttpRequest => ({
  headers: {
    'x-access-token': 'any_token'
  }
})

const makeLoadAccountByTokenStub = (): ILoadAccountByToken => {
  class AddSurveyRepositoryStub implements ILoadAccountByToken {
    async load (accessToken: string, role: string): Promise<AccountModel> {
      return new Promise(resolve => resolve(mockFakeAccount()))
    }
  }
  return new AddSurveyRepositoryStub()
}

type SutTypes = {
  sut: AuthMiddleware
  loadAccountByTokenStub: ILoadAccountByToken
}

const mockSut = (role?: string): SutTypes => {
  const loadAccountByTokenStub = makeLoadAccountByTokenStub()
  const sut = new AuthMiddleware(loadAccountByTokenStub, role)
  return {
    sut,
    loadAccountByTokenStub
  }
}

describe('Auth Middleware', () => {
  test('Should return 403 if no x-access-token exists in headers', async () => {
    const { sut } = mockSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })
  test('Should call LoadAccountByToken with correct accessToken', async () => {
    const role = 'any_role'
    const { sut, loadAccountByTokenStub } = mockSut(role)
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load')
    await sut.handle(mockFakeRequest())
    expect(loadSpy).toHaveBeenCalledWith('any_token', role)
  })

  test('Should return 403 if LoadAccountByToken returns null', async () => {
    const { sut, loadAccountByTokenStub } = mockSut()
    jest.spyOn(loadAccountByTokenStub, 'load').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const httpResponse = await sut.handle(mockFakeRequest())
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should return 200 if LoadAccountByToken returns an account', async () => {
    const { sut } = mockSut()
    const httpResponse = await sut.handle(mockFakeRequest())
    expect(httpResponse).toEqual(ok({ accountId: 'valid_id' }))
  })

  test('Should return 500 if LoadAccountByToken throws', async () => {
    const { sut, loadAccountByTokenStub } = mockSut()
    jest.spyOn(loadAccountByTokenStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle(mockFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
