import { CompareFieldsValidation, EmailValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { makeSignUpValidation } from './signup-validation-factory'
import { IValidation } from '@/presentation/protocols/validation'
import { EmailValidatorAdapter } from '@/infra/validators/email-validator-adapter'

jest.mock('@/validation/validators/validation-composite.ts')

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    const validations: IValidation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
    makeSignUpValidation()
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
