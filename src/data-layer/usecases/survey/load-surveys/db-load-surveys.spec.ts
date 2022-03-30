import { LoadSurveysRepositorySpy } from '@/data-layer/test'
import { throwNewError } from '@/domain/test'
import MockDate from 'mockdate'
import { DbLoadSurveys } from './db-load-surveys-repository'

type SutTypes = {
  sut: DbLoadSurveys
  loadSurveysRepositorySpy: LoadSurveysRepositorySpy
}

const mockSut = (): SutTypes => {
  const loadSurveysRepositorySpy = new LoadSurveysRepositorySpy()
  const sut = new DbLoadSurveys(loadSurveysRepositorySpy)
  return {
    sut,
    loadSurveysRepositorySpy
  }
}

describe('DbLoadSurveys', () => {
  beforeAll(() => { MockDate.set(new Date()) })

  afterAll(() => { MockDate.reset() })
  test('Should call LoadSurveysRepository', async () => {
    const { sut, loadSurveysRepositorySpy } = mockSut()
    await sut.load()
    expect(loadSurveysRepositorySpy.callsCount).toBe(1)
  })

  test('Should return a list of Surveys on success', async () => {
    const { sut, loadSurveysRepositorySpy } = mockSut()
    const surveys = await sut.load()
    expect(surveys).toEqual(loadSurveysRepositorySpy.surveyModels)
  })

  test('Should throw if LoadSurveysRepository throws', async () => {
    const { sut, loadSurveysRepositorySpy } = mockSut()
    jest.spyOn(loadSurveysRepositorySpy, 'loadAll').mockImplementationOnce(throwNewError)
    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })
})
