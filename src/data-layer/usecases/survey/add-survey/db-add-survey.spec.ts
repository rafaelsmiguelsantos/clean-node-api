import { DbAddSurvey } from './db-add-survey'
import { mockSurveyData, throwNewError } from '@/domain/test'
import { AddSurveyRepositorySpy } from '@/data-layer/test'
import MockDate from 'mockdate'

type SutTypes = {
  sut: DbAddSurvey
  addSurveyRepositorySpy: AddSurveyRepositorySpy
}

const mockSut = (): SutTypes => {
  const addSurveyRepositorySpy = new AddSurveyRepositorySpy()
  const sut = new DbAddSurvey(addSurveyRepositorySpy)
  return {
    sut,
    addSurveyRepositorySpy
  }
}

describe('DbAddSurvey Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call AddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepositorySpy } = mockSut()
    const surveyData = mockSurveyData()
    await sut.addSurvey(surveyData)
    expect(addSurveyRepositorySpy.addSurveyParams).toEqual(surveyData)
  })

  test('Should throw if AddSurveyRepository throws', async () => {
    const { sut, addSurveyRepositorySpy } = mockSut()
    jest.spyOn(addSurveyRepositorySpy, 'addSurvey').mockImplementationOnce(throwNewError)
    const promise = sut.addSurvey(mockSurveyData())
    await expect(promise).rejects.toThrow()
  })
})
