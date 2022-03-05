import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { ILoggerErrorRepository } from '@/data-layer/protocols/db/logger-error-repository'
import { serverError, ok } from '@/presentation/helpers/http/http-helper'
import { AccountModel } from '@/domain/models/account'
import { LogControllerDecorator } from './log-controller-decorator'

const makeLogErrorRepository = (): ILoggerErrorRepository => {
  class LoggerErrorRepositoryStub implements ILoggerErrorRepository {
    async loggerError (stack: string): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new LoggerErrorRepositoryStub()
}

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      return new Promise(resolve => resolve(ok(mockFakeAccount())))
    }
  }
  return new ControllerStub()
}

const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const loggerErrorRepositoryStub = makeLogErrorRepository()
  const sut = new LogControllerDecorator(controllerStub, loggerErrorRepositoryStub)
  return {
    sut,
    controllerStub,
    loggerErrorRepositoryStub
  }
}

const mockFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@email.com',
  password: 'valid_password'
})

const mockFakeRequest = (): HttpRequest => ({
  body: {
    name: 'valid_name',
    email: 'valid_email@email.com',
    password: 'valid_password',
    passwordConfirmation: 'valid_password'
  }
})

const mockFakeServerError = (): HttpResponse => {
  const fakeError = new Error()
  fakeError.stack = 'any_stack'
  return serverError(fakeError)
}

type SutTypes = {
  sut: LogControllerDecorator
  controllerStub: Controller
  loggerErrorRepositoryStub: ILoggerErrorRepository
}

describe('LogController Decorator', () => {
  test('Should call controller method handle', async () => {
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    await sut.handle(mockFakeRequest())
    expect(handleSpy).toHaveBeenCalledWith(mockFakeRequest())
  })

  test('Should return the same result of the controller', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockFakeRequest())
    expect(httpResponse).toEqual(ok(mockFakeAccount()))
  })

  test('Should call LoggerErrorRepository with correct error if controller returns a ServerError', async () => {
    const { sut, controllerStub, loggerErrorRepositoryStub } = makeSut()

    const logSpy = jest.spyOn(loggerErrorRepositoryStub, 'loggerError')
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(new Promise(resolve => resolve(mockFakeServerError())))

    await sut.handle(mockFakeRequest())
    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })
})
