import { noContent, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { ILoadSurveys, SurveyModel } from './load-surveys-protocols'
import { LoadSurveyController } from './load-surveys-controller'
import MockDate from 'mockdate'

const makeFakeSurveys = (): SurveyModel[] => {
  return [
    {
      id: 'any',
      question: 'any_question',
      answers: [{
        image: 'any_image',
        answer: 'any_answer'
      }],
      date: new Date()
    },
    {
      id: 'other_id',
      question: 'other_question',
      answers: [{
        image: 'other_image',
        answer: 'other_answer'
      }],
      date: new Date()
    }
  ]
}

type SutTypes = {
  sut: LoadSurveyController
  loadSurveysStub: ILoadSurveys
}

const makeLoadSurveys = (): ILoadSurveys => {
  class LoadSurveysStub implements ILoadSurveys {
    async load (): Promise<SurveyModel[]> {
      return new Promise(resolve => resolve(makeFakeSurveys()))
    }
  }

  return new LoadSurveysStub()
}

const makeSut = (): SutTypes => {
  const loadSurveysStub = makeLoadSurveys()
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
    const { sut, loadSurveysStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveysStub, 'load')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(ok(makeFakeSurveys()))
  })

  test('Should return 204 if LoadSurveys returns empty', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'load').mockReturnValueOnce(new Promise(resolve => resolve([])))
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if LoadSurveys throws', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'load').mockImplementationOnce(() => {
      throw new Error()
    })
    const response = await sut.handle({})
    expect(response).toEqual(serverError(new Error()))
  })
})
