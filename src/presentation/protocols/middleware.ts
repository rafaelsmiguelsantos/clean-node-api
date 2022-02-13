import { HttpRequest } from './httpRequest'
import { HttpResponse } from './httpResponse'

export interface IMiddleware {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>
}
