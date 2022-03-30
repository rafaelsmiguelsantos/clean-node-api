import { ILoggerErrorRepository } from '@/data-layer/protocols/db/logger-error-repository'

export class LogErrorRepositorySpy implements ILoggerErrorRepository {
  stack: string

  async loggerError (stack: string): Promise<void> {
    this.stack = stack
    return Promise.resolve()
  }
}
