import { DbAddSurvey } from './db-add-survey'
import { IAddSurveyRepository } from '../../../protocols/db/add-survey-repository'
import { mockAddSurveyRepository } from '@/data-layer/test'
import { mockSurveyData } from '@/domain/test'
import MockDate from 'mockdate'

const mockSut = (): SutTypes => {
  const addSurveyRepositoryStub = mockAddSurveyRepository()
  const sut = new DbAddSurvey(addSurveyRepositoryStub)
  return {
    sut,
    addSurveyRepositoryStub
  }
}

type SutTypes = {
  sut: DbAddSurvey
  addSurveyRepositoryStub: IAddSurveyRepository
}

describe('DbAddSurvey Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should AddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepositoryStub } = mockSut()
    const addSurveySpy = jest.spyOn(addSurveyRepositoryStub, 'addSurvey')
    const surveyData = mockSurveyData()
    await sut.addSurvey(surveyData)
    expect(addSurveySpy).toHaveBeenCalledWith(surveyData)
  })

  test('Should throw if AddSurveyRepository throws', async () => {
    const { sut, addSurveyRepositoryStub } = mockSut()
    jest.spyOn(addSurveyRepositoryStub, 'addSurvey').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.addSurvey(mockSurveyData())
    await expect(promise).rejects.toThrow()
  })
})
