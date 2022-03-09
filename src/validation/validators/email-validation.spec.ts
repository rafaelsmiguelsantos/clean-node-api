import { InvalidParamError } from '@/presentation/errors'
import { mockEMailValitor } from '@/validation/validators/test'
import { EmailValidation } from '@/validation/validators/email-validation'
import { EmailValidator } from '@/validation/protocols/email-validator'

type SutTypes = {
  sut: EmailValidation
  emailValidatorStub: EmailValidator
}

const mockSut = (): SutTypes => {
  const emailValidatorStub = mockEMailValitor()
  const sut = new EmailValidation('email', emailValidatorStub)
  return {
    sut,
    emailValidatorStub
  }
}

describe('Class Email Validation', () => {
  test('Should return 400 if EmailValidator returns false', () => {
    const { sut, emailValidatorStub } = mockSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const error = sut.validate({ email: 'valid_email@email.com' })
    expect(error).toEqual(new InvalidParamError('email'))
  })

  test('Should call EmailValidator with correct email', () => {
    const { sut, emailValidatorStub } = mockSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')

    sut.validate({ email: 'valid_email@email.com' })
    expect(isValidSpy).toHaveBeenCalledWith('valid_email@email.com')
  })

  test('Should trhow 500 if EmailValidator throws', () => {
    const { sut, emailValidatorStub } = mockSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })

    expect(sut.validate).toThrow()
  })
})
