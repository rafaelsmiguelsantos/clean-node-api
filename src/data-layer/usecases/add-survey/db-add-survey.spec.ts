import { AddSurveyModel } from '../../../domain/usecases/add-survey'
import { DbAddSurvey } from './db-add-survey'
import { IAddSurveyRepository } from '../../protocols/db/add-survey-repository'

const makeFakeSurveyData = (): AddSurveyModel => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }]
})

const makeAddSurveyRepositoryStub = (): IAddSurveyRepository => {
  class AddSurveyRepositoryStub implements IAddSurveyRepository {
    async addSurvey (surveyData: AddSurveyModel): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new AddSurveyRepositoryStub()
}

const makeSut = (): SutTypes => {
  const addSurveyRepositoryStub = makeAddSurveyRepositoryStub()
  const sut = new DbAddSurvey(addSurveyRepositoryStub)
  return {
    sut,
    addSurveyRepositoryStub
  }
}

interface SutTypes {
  sut: DbAddSurvey
  addSurveyRepositoryStub: IAddSurveyRepository
}

describe('DbAddSurvey Usecase', () => {
  test('Should AddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()
    const addSurveySpy = jest.spyOn(addSurveyRepositoryStub, 'addSurvey')
    const surveyData = makeFakeSurveyData()
    await sut.addSurvey(surveyData)
    expect(addSurveySpy).toHaveBeenCalledWith(surveyData)
  })
})
