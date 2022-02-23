import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { makeAddSurveyValidation } from './add-survey-validation-factory'
import { IValidation } from '@/presentation/protocols/validation'

jest.mock('@/validation/validators/validation-composite.ts')

describe('SurveyValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddSurveyValidation()
    const validations: IValidation[] = []
    for (const field of ['question', 'answers']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
