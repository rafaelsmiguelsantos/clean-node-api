import { HttpRequest, IAuthentication } from './login-protocols'
import { badRequest, ok, serverError, unauthorized } from '@/presentation/helpers/http/http-helper'
import { MissingParamError } from '@/presentation/errors'
import { LoginController } from '@/presentation/controllers/login/login-controller'
import { IValidation } from '../../protocols/validation'
import { mockValidation } from '@/validation/validators/test'
import { mockAuthenticationToken } from '@/presentation/test/mock-authentication'

type SutTypes = {
  sut: LoginController
  authenticationStub: IAuthentication
  validationStub: IValidation
}

const mockRequest = (): HttpRequest => ({
  body: {
    email: 'any_email@mail.com',
    password: 'any_password'
  }
})

const mockSut = (): SutTypes => {
  const authenticationStub = mockAuthenticationToken()
  const validationStub = mockValidation()
  const sut = new LoginController(validationStub, authenticationStub)
  return {
    sut,
    authenticationStub,
    validationStub
  }
}

describe('Login Controller', () => {
  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = mockSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    await sut.handle(mockRequest())
    expect(authSpy).toHaveBeenCalledWith({ email: 'any_email@mail.com', password: 'any_password' })
  })

  test('Should return 401 if invalid credentials are provided', async () => {
    const { sut, authenticationStub } = mockSut()
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(new Promise(resolve => resolve(null)))

    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(unauthorized())
  })

  test('Should return 500 if an Authentication throws', async () => {
    const { sut, authenticationStub } = mockSut()
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(new Promise((_resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 if valid credentials are provided', async () => {
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
})
