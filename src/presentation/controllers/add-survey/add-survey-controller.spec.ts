import { badRequest, noContent, serverError } from '@/presentation/helpers/http/http-helper'
import { IAddSurvey } from '@/domain/usecases/survey/add-survey'
import { AddSurveyController } from './add-survey-controller'
import { mockValidation } from '@/validation/validators/test'
import { mockAddSurvey } from '@/presentation/test/mock-add-survey'
import { HttpRequest } from '@/presentation/protocols/httpRequest'
import { IValidation } from '@/presentation/protocols/validation'
import MockDate from 'mockdate'

type SutTypes = {
  sut: AddSurveyController
  validationStub: IValidation
  addSurveyStub: IAddSurvey
}

const mockRequest = (): HttpRequest => ({
  body: {
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }],
    date: new Date()
  }
})

const mockSut = (): SutTypes => {
  const validationStub = mockValidation()
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
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if Validation Fails', async () => {
    const { sut, validationStub } = mockSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(badRequest(new Error()))
  })

  test('Should call AddSurvey with correct values', async () => {
    const { sut, addSurveyStub } = mockSut()
    const addSurveySpy = jest.spyOn(addSurveyStub, 'addSurvey')
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(addSurveySpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 500 if AddSurvey trhows', async () => {
    const { sut, validationStub } = mockSut()
    jest.spyOn(validationStub, 'validate').mockImplementationOnce(() => {
      throw new Error()
    })
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new Error()))
  })

  test('Should return 500 if AddSurvey trhows', async () => {
    const { sut } = mockSut()
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(noContent())
  })
})
