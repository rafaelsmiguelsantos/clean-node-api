import { ILoadSurveyByIdRepository } from '@/data-layer/protocols/db/load-survey-by-id'
import { DbLoadSurveyById } from './db-load-survey-by-id'
import { mockLoadSurveyByIdRepository } from '@/data-layer/test'
import MockDate from 'mockdate'
import { mockSurvey } from '@/domain/test/mock-survey'

type SutTypes = {
  sut: DbLoadSurveyById
  loadSurveyByIdRepositoryStub: ILoadSurveyByIdRepository
}

const mockSut = (): SutTypes => {
  const loadSurveyByIdRepositoryStub = mockLoadSurveyByIdRepository()
  const sut = new DbLoadSurveyById(loadSurveyByIdRepositoryStub)
  return {
    sut,
    loadSurveyByIdRepositoryStub
  }
}

describe('Class DbLoadSurveyById', () => {
  beforeAll(() => { MockDate.set(new Date()) })

  afterAll(() => { MockDate.reset() })
  test('Should call LoaSurveyByIdRepository', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = mockSut()
    const surveysSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById')
    await sut.loadById('any_id')
    expect(surveysSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should return Survey on success', async () => {
    const { sut } = mockSut()
    const httpResponse = await sut.loadById('any_id')
    expect(httpResponse).toEqual(mockSurvey())
  })

  test('Should throw if LoaSurveyByIdRepository throws', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = mockSut()
    jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.loadById('any_id')
    await expect(promise).rejects.toThrow()
  })
})
