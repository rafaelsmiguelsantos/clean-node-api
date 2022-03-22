import { loginPath } from './paths-swagger/login-path'
import { accountSchema } from './schemas/account'
import { errorSchema } from './schemas/error-schema'
import { loginParamsSchema } from './schemas/login-params'
import { badRequest } from './components/bad-request'
import { serverError } from './components/server-error'
import { unauthorized } from './components/unauthorized'
import { notFound } from './components/not-found'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean Node API',
    description: 'Enquetes',
    version: '2.2.0'
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'Login'
  }],
  paths: {
    '/login': loginPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    error: errorSchema
  },
  components: {
    badRequest,
    serverError,
    unauthorized,
    notFound
  }
}
