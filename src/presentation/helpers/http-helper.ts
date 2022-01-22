import { HttpResponse } from '../protocols/httpResponse'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})
