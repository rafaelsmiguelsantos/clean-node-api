import { AddSurveyParams, IAddSurvey } from '@/domain/usecases/survey/add-survey'

export const mockAddSurvey = (): IAddSurvey => {
  class AddSurveyStub implements IAddSurvey {
    async addSurvey (data: AddSurveyParams): Promise<void> {
      return Promise.resolve()
    }
  }
  return new AddSurveyStub()
}
