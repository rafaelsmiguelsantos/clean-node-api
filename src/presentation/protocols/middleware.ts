import { HttpResponse } from './httpResponse'
import { HttpRequest } from './httpRequest'

export interface IMiddleware {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>
}
