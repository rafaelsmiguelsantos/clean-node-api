import { CompareFieldsValidation } from './compare-fields-validation'
import { InvalidParamError } from '@/presentation/errors'

const mockSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation('field', 'fieldToCompare')
}

describe('Class CompareFieldsValidation', () => {
  test('Shoul return a InvalidParamError if validation fails', () => {
    const sut = mockSut()
    const error = sut.validate({ field: 'any_value', fieldToCompare: 'any_wrong' })
    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })

  test('Shoul not return if validation succeeds', () => {
    const sut = mockSut()
    const error = sut.validate({ field: 'any_value', fieldToCompare: 'any_value' })
    expect(error).toBeFalsy()
  })
})
