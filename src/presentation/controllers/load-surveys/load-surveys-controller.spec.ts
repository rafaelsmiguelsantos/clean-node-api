import { ILoadSurveys, SurveysModel } from './load-surveys-protocols'
import { LoadSurveyController } from './load-surveys-controller'
import MockDate from 'mockdate'

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

describe('LoadSurvey Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })
  test('Should call LoadSurveys', async () => {
    class LoadSurveysStub implements ILoadSurveys {
      async loadSurveys (): Promise<SurveysModel[]> {
        return new Promise(resolve => resolve(makeFakeSurveys()))
      }
    }

    const loadSurveysStub = new LoadSurveysStub()
    const loadSpy = jest.spyOn(loadSurveysStub, 'loadSurveys')
    const sut = new LoadSurveyController(loadSurveysStub)
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })
})
