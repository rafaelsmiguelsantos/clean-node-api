import { ILoggerErrorRepository } from '@/data-layer/protocols/db/logger-error-repository'

export const mockLogErrorRepository = (): ILoggerErrorRepository => {
  class LoggerErrorRepositoryStub implements ILoggerErrorRepository {
    async loggerError (stack: string): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new LoggerErrorRepositoryStub()
}
