import { ILoadSurveyById } from '@/domain/usecases/survey/load-survey-by-id'
import { mockLoadSurveyById } from '@/presentation/test/mock-load-surveys'
import { HttpRequest } from '../load-surveys/load-surveys-protocols'
import { LoadSurveyResultController } from './load-survey-result-controller'

const mockFakeRequest = (): HttpRequest => ({
  params: {
    surveyId: 'any_id'
  }
})

type SutTypes = {
  sut: LoadSurveyResultController
  loadSurveyByIdStub: ILoadSurveyById
}

const mockSut = (): SutTypes => {
  const loadSurveyByIdStub = mockLoadSurveyById()
  const sut = new LoadSurveyResultController(loadSurveyByIdStub)
  return {
    sut,
    loadSurveyByIdStub
  }
}

describe('LoadSurveyResult Controller', () => {
  test('Should call LoadSurveyById with correct value', async () => {
    const { sut, loadSurveyByIdStub } = mockSut()
    const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById')
    await sut.handle(mockFakeRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })
})
