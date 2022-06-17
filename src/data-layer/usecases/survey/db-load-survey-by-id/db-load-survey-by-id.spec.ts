import { throwNewError } from '@/domain/test'
import { DbLoadSurveyById } from './db-load-survey-by-id'
import faker from 'faker'
import MockDate from 'mockdate'
import { LoadSurveyByIdRepositorySpy } from '@/data-layer/test/mock-db-survey'

type SutTypes = {
  sut: DbLoadSurveyById
  loadSurveyByIdRepositorySpy: LoadSurveyByIdRepositorySpy
}

const mockSut = (): SutTypes => {
  const loadSurveyByIdRepositorySpy = new LoadSurveyByIdRepositorySpy()
  const sut = new DbLoadSurveyById(loadSurveyByIdRepositorySpy)
  return {
    sut,
    loadSurveyByIdRepositorySpy
  }
}

let surveyId: string
describe('Class DbLoadSurveyById', () => {
  beforeAll(() => { MockDate.set(new Date()) })

  afterAll(() => { MockDate.reset() })

  beforeEach(() => {
    surveyId = faker.random.uuid()
  })
  test('Should call LoadSurveyByIdRepository', async () => {
    const { sut, loadSurveyByIdRepositorySpy } = mockSut()
    await sut.loadById(surveyId)
    expect(loadSurveyByIdRepositorySpy.id).toBe(surveyId)
  })

  test('Should return Survey on success', async () => {
    const { sut, loadSurveyByIdRepositorySpy } = mockSut()
    const survey = await sut.loadById(surveyId)
    expect(survey).toEqual(loadSurveyByIdRepositorySpy.surveyModel)
  })

  test('Should throw if LoadSurveyByIdRepository throws', async () => {
    const { sut, loadSurveyByIdRepositorySpy } = mockSut()
    jest.spyOn(loadSurveyByIdRepositorySpy, 'loadById').mockImplementationOnce(throwNewError)
    const promise = sut.loadById(surveyId)
    await expect(promise).rejects.toThrow()
  })
})
