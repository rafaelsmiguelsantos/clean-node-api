import { EmailValidation, RequiredFieldValidation, ValidationComposite } from '../../../validation/validators'
import { IValidation } from '../../../presentation/protocols/validation'
import { EmailValidator } from '../../../validation/protocols/email-validator'
import { makeLoginValidation } from './login-validation-factory'

const makeEMailValitor = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}
jest.mock('../../../validation/validators/validation-composite.ts')

describe('LoginValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeLoginValidation()
    const validations: IValidation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidation('email', makeEMailValitor()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
