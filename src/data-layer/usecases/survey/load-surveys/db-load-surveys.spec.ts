import { LoadSurveysRepositorySpy } from '@/data-layer/test/mock-db-survey'
import { throwNewError } from '@/domain/test'
import faker from 'faker'
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
    const accountId = faker.random.uuid()
    await sut.load(accountId)
    expect(loadSurveysRepositorySpy.accountId).toBe(accountId)
  })

  test('Should return a list of Surveys on success', async () => {
    const { sut, loadSurveysRepositorySpy } = mockSut()
    const surveys = await sut.load(faker.random.uuid())
    expect(surveys).toEqual(loadSurveysRepositorySpy.surveyModels)
  })

  test('Should throw if LoadSurveysRepository throws', async () => {
    const { sut, loadSurveysRepositorySpy } = mockSut()
    jest.spyOn(loadSurveysRepositorySpy, 'loadAll').mockImplementationOnce(throwNewError)
    const promise = sut.load(faker.random.uuid())
    await expect(promise).rejects.toThrow()
  })
})
