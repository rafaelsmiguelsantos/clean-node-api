import { noContent, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { ILoadSurveys } from './load-surveys-protocols'
import { LoadSurveyController } from './load-surveys-controller'
import MockDate from 'mockdate'
import { mockLoadSurveys, mockSurveys } from '@/presentation/test/mock-load-surveys'

type SutTypes = {
  sut: LoadSurveyController
  loadSurveysStub: ILoadSurveys
}

const mockSut = (): SutTypes => {
  const loadSurveysStub = mockLoadSurveys()
  const sut = new LoadSurveyController(loadSurveysStub)
  return {
    sut,
    loadSurveysStub
  }
}

describe('LoadSurvey Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveys', async () => {
    const { sut, loadSurveysStub } = mockSut()
    const loadSpy = jest.spyOn(loadSurveysStub, 'load')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })

  test('Should return 200 on success', async () => {
    const { sut } = mockSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(ok(mockSurveys()))
  })

  test('Should return 204 if LoadSurveys returns empty', async () => {
    const { sut, loadSurveysStub } = mockSut()
    jest.spyOn(loadSurveysStub, 'load').mockReturnValueOnce(Promise.resolve([]))
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if LoadSurveys throws', async () => {
    const { sut, loadSurveysStub } = mockSut()
    jest.spyOn(loadSurveysStub, 'load').mockImplementationOnce(() => {
      throw new Error()
    })
    const response = await sut.handle({})
    expect(response).toEqual(serverError(new Error()))
  })
})
