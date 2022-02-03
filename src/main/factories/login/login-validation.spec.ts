import { EmailValidation } from '../../../presentation/helpers/validators/email-validation'
import { RequiredFieldValidation } from '../../../presentation/helpers/validators/required-field-validation'
import { IValidation } from '../../../presentation/helpers/validators/validation'
import { ValidationComposite } from '../../../presentation/helpers/validators/validation-composite'
import { EmailValidator } from '../../../presentation/protocols/email-validator'
import { makeLoginValidation } from './login-validation'

const makeEMailValitor = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}
jest.mock('../../../presentation/helpers/validators/validation-composite.ts')

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
