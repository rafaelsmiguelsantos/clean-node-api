import { loginPath } from './paths-swagger/login-path'
import { accountSchema } from './schemas/account'
import { loginParamsSchema } from './schemas/login-params'

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
    loginParams: loginParamsSchema
  }
}
