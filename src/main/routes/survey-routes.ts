
import { Router } from 'express'
import { adaptMiddleware } from '@/main/adapters/express-middleware-adapter'
import { adaptRoutes } from '@/main/adapters/express-routes-adapter'
import { makeSurveyController } from '@/main/factories/add-survey/add-survey-controller-factory'
import { makeLoadSurveysController } from '@/main/factories/load-surveys/load-surveys-controller-factory'
import { makeAuthMiddleware } from '@/main/factories/middlewares/auth-middleware-factory'

export default (router: Router): void => {
  const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
  const auth = adaptMiddleware(makeAuthMiddleware())
  router.post('/surveys', adminAuth, adaptRoutes(makeSurveyController()))
  router.get('/surveys', auth, adaptRoutes(makeLoadSurveysController()))
}
