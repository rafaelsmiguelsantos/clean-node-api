import { AddSurveyParams } from '@/domain/usecases/survey/add-survey'
import { DbAddSurvey } from './db-add-survey'
import { IAddSurveyRepository } from '../../../protocols/db/add-survey-repository'
import MockDate from 'mockdate'

const mockFakeSurveyData = (): AddSurveyParams => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }],
  date: new Date()
})

const makeAddSurveyRepositoryStub = (): IAddSurveyRepository => {
  class AddSurveyRepositoryStub implements IAddSurveyRepository {
    async addSurvey (surveyData: AddSurveyParams): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new AddSurveyRepositoryStub()
}

const mockSut = (): SutTypes => {
  const addSurveyRepositoryStub = makeAddSurveyRepositoryStub()
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
    const surveyData = mockFakeSurveyData()
    await sut.addSurvey(surveyData)
    expect(addSurveySpy).toHaveBeenCalledWith(surveyData)
  })

  test('Should throw if AddSurveyRepository throws', async () => {
    const { sut, addSurveyRepositoryStub } = mockSut()
    jest.spyOn(addSurveyRepositoryStub, 'addSurvey').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.addSurvey(mockFakeSurveyData())
    await expect(promise).rejects.toThrow()
  })
})
