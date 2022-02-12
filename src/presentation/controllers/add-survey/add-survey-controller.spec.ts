import { HttpRequest } from '../../protocols'
import { IValidation } from '../../protocols/validation'
import { AddSurveyController } from './add-survey-controller'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }]

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

describe('AddSurvey Controller', () => {
  test('Should call validation with correct values', async () => {
    const validationStub = makeValidation()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const sut = new AddSurveyController(validationStub)
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })
})
