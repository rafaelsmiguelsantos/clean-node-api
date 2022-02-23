import { CompareFieldsValidation, EmailValidation, RequiredFieldValidation, ValidationComposite } from '../../../validation/validators'
import { IValidation } from '../../../presentation/protocols/validation'
import { EmailValidator } from '../../../validation/protocols/email-validator'
import { makeSignUpValidation } from './signup-validation-factory'

const makeEMailValitor = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}
jest.mock('@/validation/validators/validation-composite.ts')

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    const validations: IValidation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', makeEMailValitor()))
    makeSignUpValidation()
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
