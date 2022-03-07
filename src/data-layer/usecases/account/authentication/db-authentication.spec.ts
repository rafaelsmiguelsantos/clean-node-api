import { mockEncrypter, mockHashComparer } from '@/data-layer/test/mock-criptography'
import { mockAccountModel } from '@/domain/test'
import { DbAuthentication } from './db-authentication'

import {
  AccountModel,
  AuthenticationParams,
  IHashComparer,
  IEncrypter,
  LoadAccountByEmailRepository,
  IUpdateAccessTokenRepository
} from './index'

const mockFakeAuthentication = (): AuthenticationParams => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})

const mockFakeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async loadByEmail (email: string): Promise<AccountModel> {
      return new Promise(resolve => resolve(mockAccountModel()))
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

const makeUpdateAccessTokenRepository = (): IUpdateAccessTokenRepository => {
  class UpdateAccessTokenRepository implements IUpdateAccessTokenRepository {
    async updateAccessToken (id: string, token: string): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new UpdateAccessTokenRepository()
}

type SutTypes = {
  sut: DbAuthentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  hashComparerStub: IHashComparer
  encrypterStub: IEncrypter
  updateAccessTokenRepositoryStub: IUpdateAccessTokenRepository
}

const mockSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = mockFakeLoadAccountByEmailRepository()
  const hashComparerStub = mockHashComparer()
  const encrypterStub = mockEncrypter()
  const updateAccessTokenRepositoryStub = makeUpdateAccessTokenRepository()
  const sut = new DbAuthentication(loadAccountByEmailRepositoryStub, hashComparerStub, encrypterStub, updateAccessTokenRepositoryStub)
  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
    encrypterStub,
    updateAccessTokenRepositoryStub
  }
}

describe('DbAuthentication UseCases', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = mockSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.auth(mockFakeAuthentication())
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = mockSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.auth(mockFakeAuthentication())
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = mockSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(null)
    const accessToken = await sut.auth(mockFakeAuthentication())
    expect(accessToken).toBeNull()
  })

  test('Should call HashComparer with correct values', async () => {
    const { sut, hashComparerStub } = mockSut()
    const compareSpy = jest.spyOn(hashComparerStub, 'compare')
    await sut.auth(mockFakeAuthentication())
    expect(compareSpy).toHaveBeenCalledWith('any_password', 'any_password')
  })

  test('Should throw if HashComparer throws', async () => {
    const { sut, hashComparerStub } = mockSut()
    jest.spyOn(hashComparerStub, 'compare').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.auth(mockFakeAuthentication())
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if HashComparer returns false', async () => {
    const { sut, hashComparerStub } = mockSut()
    jest.spyOn(hashComparerStub, 'compare').mockReturnValueOnce(new Promise(resolve => resolve(false)))
    const accessToken = await sut.auth(mockFakeAuthentication())
    expect(accessToken).toBeNull()
  })

  test('Should call Encrypter with correct id', async () => {
    const { sut, encrypterStub } = mockSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    await sut.auth(mockFakeAuthentication())
    expect(encryptSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = mockSut()
    jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.auth(mockFakeAuthentication())
    await expect(promise).rejects.toThrow()
  })

  test('Should return token on success', async () => {
    const { sut } = mockSut()
    const accessToken = await sut.auth(mockFakeAuthentication())
    expect(accessToken).toBe('any_token')
  })

  test('Should call UpdateAccessTokenGenerator with correct values', async () => {
    const { sut, updateAccessTokenRepositoryStub } = mockSut()
    const updateTokenSpy = jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken')
    await sut.auth(mockFakeAuthentication())
    expect(updateTokenSpy).toHaveBeenCalledWith('any_id', 'any_token')
  })

  test('Should throw if UpdateAccessTokenGenerator throws', async () => {
    const { sut, updateAccessTokenRepositoryStub } = mockSut()
    jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.auth(mockFakeAuthentication())
    await expect(promise).rejects.toThrow()
  })
})
