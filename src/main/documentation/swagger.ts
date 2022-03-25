import { loginPath } from './paths-swagger/login-path'
import { accountSchema } from './schemas/account'
import { errorSchema } from './schemas/error-schema'
import { loginParamsSchema } from './schemas/login-params'
import { badRequest } from './components/bad-request'
import { serverError } from './components/server-error'
import { unauthorized } from './components/unauthorized'
import { notFound } from './components/not-found'
import { forbidden } from './components/forbidden'
import { surveyPath } from './paths-swagger/survey-path'
import { surveysSchema } from './schemas/surveys-schema'
import { surveySchema } from './schemas/survey-schema'
import { surveyAnswerSchema } from './schemas/survey-answer-schema'
import { apiKeyAuthSchema } from './schemas/api-key-auth-schema'
import { signUpParamsSchema } from './schemas/signup-params-schema'
import { signUpPath } from './paths-swagger/signup-path'
import { addSurveyParamsSchema } from './schemas/add-survey-params-schema'

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
  }, {
    name: 'Enquete'
  },{
    name: 'SignUp'
  }],
  paths: {
    '/login': loginPath,
    '/surveys': surveyPath,
    '/signup': signUpPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    signUpParams: signUpParamsSchema,
    error: errorSchema,
    surveys: surveysSchema,
    survey: surveySchema,
    surveyAnswer: surveyAnswerSchema,
    addSurveyParams: addSurveyParamsSchema
  },
  components: {
    securitySchemes: {
      apiKeyAuth: apiKeyAuthSchema
    },
    badRequest,
    serverError,
    unauthorized,
    notFound,
    forbidden
  }
}
