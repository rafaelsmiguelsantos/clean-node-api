import { badRequest, noContent, serverError } from '@/presentation/helpers/http/http-helper'
import { IAddSurvey, AddSurveyParams } from '@/domain/usecases/survey/add-survey'
import { AddSurveyController } from './add-survey-controller'
import { HttpRequest } from '../../protocols'
import { IValidation } from '../../protocols/validation'
import MockDate from 'mockdate'

const mockFakeRequest = (): HttpRequest => ({
  body: {
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }],
    date: new Date()
  }
})

const makeValidation = (): IValidation => {
  class ValidationStub implements IValidation {
    validate (_input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const mockAddSurvey = (): IAddSurvey => {
  class AddSurveyStub implements IAddSurvey {
    async addSurvey (data: AddSurveyParams): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new AddSurveyStub()
}

type SutTypes = {
  sut: AddSurveyController
  validationStub: IValidation
  addSurveyStub: IAddSurvey
}

const mockSut = (): SutTypes => {
  const validationStub = makeValidation()
  const addSurveyStub = mockAddSurvey()
  const sut = new AddSurveyController(validationStub, addSurveyStub)
  return {
    sut,
    validationStub,
    addSurveyStub
  }
}

describe('AddSurvey Controller', () => {
  beforeAll(() => { MockDate.set(new Date()) })

  afterAll(() => { MockDate.reset() })

  test('Should call validation with correct values', async () => {
    const { sut, validationStub } = mockSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = mockFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if Validation Fails', async () => {
    const { sut, validationStub } = mockSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const response = await sut.handle(mockFakeRequest())
    expect(response).toEqual(badRequest(new Error()))
  })

  test('Should call AddSurvey with correct values', async () => {
    const { sut, addSurveyStub } = mockSut()
    const addSurveySpy = jest.spyOn(addSurveyStub, 'addSurvey')
    const httpRequest = mockFakeRequest()
    await sut.handle(httpRequest)
    expect(addSurveySpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 500 if AddSurvey trhows', async () => {
    const { sut, validationStub } = mockSut()
    jest.spyOn(validationStub, 'validate').mockImplementationOnce(() => {
      throw new Error()
    })
    const response = await sut.handle(mockFakeRequest())
    expect(response).toEqual(serverError(new Error()))
  })

  test('Should return 500 if AddSurvey trhows', async () => {
    const { sut } = mockSut()
    const response = await sut.handle(mockFakeRequest())
    expect(response).toEqual(noContent())
  })
})
