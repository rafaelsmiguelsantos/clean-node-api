import { SurveysModel } from '../../../domain/models/surveys'
import { ILoadSurveysRepository } from '../../protocols/db/load-surveys-repository'
import { DbLoadSurveys } from './db-load-surveys-repository'

const makeFakeSurveys = (): SurveysModel[] => {
  return [
    {
      id: 'any',
      question: 'any_question',
      answers: [{
        image: 'any_image',
        answer: 'any_answer'
      }],
      date: new Date()
    },
    {
      id: 'other_id',
      question: 'other_question',
      answers: [{
        image: 'other_image',
        answer: 'other_answer'
      }],
      date: new Date()
    }
  ]
}

const makeLoadSurveysRepositoryStub = (): ILoadSurveysRepository => {
  class LoadSurveysRepositoryStub implements ILoadSurveysRepository {
    async loadSurveys (): Promise<SurveysModel[]> {
      return new Promise(resolve => resolve(makeFakeSurveys()))
    }
  }
  return new LoadSurveysRepositoryStub()
}

interface SutTypes {
  sut: DbLoadSurveys
  loadSurveysRepositoryStub: ILoadSurveysRepository
}

const makeSut = (): SutTypes => {
  const loadSurveysRepositoryStub = makeLoadSurveysRepositoryStub()
  const sut = new DbLoadSurveys(loadSurveysRepositoryStub)
  return {
    sut,
    loadSurveysRepositoryStub
  }
}

describe('DbLoadSurveys', () => {
  test('Should call LoadSurveysRepository', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    const surveysSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadSurveys')
    await sut.loadSurveys()
    expect(surveysSpy).toHaveBeenCalled()
  })
})
