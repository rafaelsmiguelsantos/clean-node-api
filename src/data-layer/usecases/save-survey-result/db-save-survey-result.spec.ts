import MockDate from 'mockdate'
import { SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result'
import { SurveyResultModel } from '@/domain/models/survey-result'
import { ISaveSurveyResultRepository } from '@/data-layer/protocols/db/save-survey-result-repository'
import { DbSaveSurveyResult } from './db-save-survey-result'

const mockSurveyResultData = (): SaveSurveyResultParams => ({
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  answer: 'any_answer',
  date: new Date()
})

const mockSurveyResult = (): SurveyResultModel => Object.assign({}, mockSurveyResultData(), { id: 'any_id' })

const makeSaveSurveyResultRepositoryStub = (): ISaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements ISaveSurveyResultRepository {
    async save (resultData: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return new Promise(resolve => resolve(mockSurveyResult()))
    }
  }
  return new SaveSurveyResultRepositoryStub()
}

const mockSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = makeSaveSurveyResultRepositoryStub()
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
    const surveyResultData = mockSurveyResultData()
    await sut.save(surveyResultData)
    expect(addSurveySpy).toHaveBeenCalledWith(surveyResultData)
  })

  test('Should throw if ISaveSurveyResultRepository throws', async () => {
    const { sut, saveSurveyResultRepositoryStub } = mockSut()
    jest.spyOn(saveSurveyResultRepositoryStub, 'save').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.save(mockSurveyResultData())
    await expect(promise).rejects.toThrow()
  })

  test('Should return SurveyResult on success', async () => {
    const { sut } = mockSut()
    const surveyResultData = await sut.save(mockSurveyResultData())
    expect(surveyResultData).toEqual(mockSurveyResult())
  })
})
