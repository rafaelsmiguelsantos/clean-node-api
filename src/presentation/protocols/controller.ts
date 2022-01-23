import { HttpResponse } from './httpResponse'
import { HttpRequest } from './httpRequest'

export interface Controller {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>
}
