
import { Router } from 'express'
import { adaptMiddleware } from '@/main/adapters/express-middleware-adapter'
import { adaptRoutes } from '@/main/adapters/express-routes-adapter'
import { makeAuthMiddleware } from '@/main/factories/middlewares/auth-middleware-factory'
import { makeSaveSurveyResultController } from '@/main/factories/save-survey-result/save-survey-result-controller-factory'

export default (router: Router): void => {
  const auth = adaptMiddleware(makeAuthMiddleware())
  router.put('/surveys/:surveyId/results', auth, adaptRoutes(makeSaveSurveyResultController()))
}
