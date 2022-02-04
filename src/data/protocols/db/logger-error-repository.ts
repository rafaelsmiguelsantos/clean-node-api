export interface ILoggerErrorRepository {
  loggerError: (stack: string) => Promise<void>
}
