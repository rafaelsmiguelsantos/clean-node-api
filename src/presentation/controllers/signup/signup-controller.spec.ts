import { SignUpController } from './signup-controller'
import { IAddAccount, IAuthentication } from './signup-protocols'
import { EmailInUseError, MissingParamError, ServerError } from '@/presentation/errors'
import { ok, serverError, badRequest, forbidden } from '@/presentation/helpers/http/http-helper'
import { IValidation } from '../../protocols/validation'
import { throwNewError } from '@/domain/test'
import { HttpRequest } from '@/presentation/protocols/httpRequest'
import { mockAuthenticationToken } from '@/presentation/test/mock-authentication'
import { mockValidation } from '@/validation/validators/test'
import { mockAddAccount } from '@/presentation/test/mock-add-account'

type SutTypes = {
  sut: SignUpController
  addAccountStub: IAddAccount
  validationStub: IValidation
  authenticationStub: IAuthentication
}

const mockRequest = (): HttpRequest => ({
  body: {
    name: 'valid_name',
    email: 'valid_email@email.com',
    password: 'valid_password',
    passwordConfirmation: 'valid_password'
  }
})

const mockSut = (): SutTypes => {
  const authenticationStub = mockAuthenticationToken()
  const addAccountStub = mockAddAccount()
  const validationStub = mockValidation()
  const sut = new SignUpController(addAccountStub, validationStub, authenticationStub)
  return {
    sut,
    addAccountStub,
    validationStub,
    authenticationStub
  }
}

describe('SingUp Controller', () => {
  test('Should return 500 if AddAccount throws', async () => {
    const { sut, addAccountStub } = mockSut()
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(throwNewError)

    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountStub } = mockSut()
    const addAccountSpy = jest.spyOn(addAccountStub, 'add')

    await sut.handle(mockRequest())

    expect(addAccountSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email@email.com',
      password: 'valid_password'
    })
  })

  test('Should return 403 if AddAccount returns null', async () => {
    const { sut, addAccountStub } = mockSut()
    jest.spyOn(addAccountStub, 'add').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = mockSut()

    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok({ accessToken: 'any_token' }))
  })

  test('Should call validation with correct values', async () => {
    const { sut, validationStub } = mockSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')

    const httpRequest = mockRequest()
    await sut.handle(httpRequest)

    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = mockSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))

    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })

  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = mockSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    await sut.handle(mockRequest())
    expect(authSpy).toHaveBeenCalledWith({ email: 'valid_email@email.com', password: 'valid_password' })
  })

  test('Should return 500 if an Authentication throws', async () => {
    const { sut, authenticationStub } = mockSut()
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
