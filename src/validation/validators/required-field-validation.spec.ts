import { RequiredFieldValidation } from '@/validation/validators/required-field-validation'
import { MissingParamError } from '@/presentation/errors'

const mockSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation('field')
}

describe('RequiredField Validation', () => {
  test('Shoul return a MissingParamError if validation fails', () => {
    const sut = mockSut()
    const error = sut.validate({ name: 'any_name' })
    expect(error).toEqual(new MissingParamError('field'))
  })

  test('Shoul not return if validation succeeds', () => {
    const sut = mockSut()
    const error = sut.validate({ field: 'any_name' })
    expect(error).toBeFalsy()
  })
})
