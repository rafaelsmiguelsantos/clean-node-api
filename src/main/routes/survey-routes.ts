
import { Router } from 'express'
import { adaptMiddleware } from '../adapters/express-middleware-adapter'
import { adaptRoutes } from '../adapters/express-routes-adapter'
import { makeSurveyController } from '../factories/add-survey/add-survey-controller-factory'
import { makeLoadSurveysController } from '../factories/load-surveys/load-surveys-controller-factory'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'

export default (router: Router): void => {
  const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
  const auth = adaptMiddleware(makeAuthMiddleware())
  router.post('/surveys', adminAuth, adaptRoutes(makeSurveyController()))
  router.get('/surveys', auth, adaptRoutes(makeLoadSurveysController()))
}
