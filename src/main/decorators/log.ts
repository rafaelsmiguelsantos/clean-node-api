import { Controller, HttpResponse, HttpRequest } from '../../presentation/protocols'
import { ILoggerErrorRepository } from '../../data-layer/protocols/db/logger-error-repository'

export class LogControllerDecorator implements Controller {
  private readonly controller: Controller
  private readonly logErrorRepository: ILoggerErrorRepository

  constructor (controller: Controller, logErrorRepository: ILoggerErrorRepository) {
    this.controller = controller
    this.logErrorRepository = logErrorRepository
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)
    if (httpResponse.statusCode === 500) {
      await this.logErrorRepository.loggerError(httpResponse.body.stack)
    }
    return httpResponse
  }
}
