import MockDate from 'mockdate'
import { ISaveSurveyResultRepository } from '@/data-layer/protocols/db/save-survey-result-repository'
import { DbSaveSurveyResult } from './db-save-survey-result'
import { mockSaveSurveyResultModel, mockSaveSurveyResultParams } from '@/domain/test'
import { mockSaveSurveyResultRepository } from '@/data-layer/test/mock-db-survey-result'

const mockSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = mockSaveSurveyResultRepository()
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub)
  return {
    sut,
    saveSurveyResultRepositoryStub
  }
}

type SutTypes = {
  sut: DbSaveSurveyResult
  saveSurveyResultRepositoryStub: ISaveSurveyResultRepository
}

describe('DbSaveSurveyResult Usecase', () => {
  beforeAll(() => { MockDate.set(new Date()) })

  afterAll(() => { MockDate.reset() })

  test('Should ISaveSurveyResultRepository with correct values', async () => {
    const { sut, saveSurveyResultRepositoryStub } = mockSut()
    const addSurveySpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save')
    const surveyResultData = mockSaveSurveyResultParams()
    await sut.save(surveyResultData)
    expect(addSurveySpy).toHaveBeenCalledWith(surveyResultData)
  })

  test('Should throw if ISaveSurveyResultRepository throws', async () => {
    const { sut, saveSurveyResultRepositoryStub } = mockSut()
    jest.spyOn(saveSurveyResultRepositoryStub, 'save').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.save(mockSaveSurveyResultParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return SurveyResult on success', async () => {
    const { sut } = mockSut()
    const surveyResultData = await sut.save(mockSaveSurveyResultParams())
    expect(surveyResultData).toEqual(mockSaveSurveyResultModel())
  })
})
