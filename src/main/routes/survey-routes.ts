
import { Router } from 'express'
import { adaptRoutes } from '../adapters/express-routes-adapter'
import { makeSurveyController } from '../factories/add-survey/add-survey-controller-factory'

export default (router: Router): void => {
  router.post('/surveys', adaptRoutes(makeSurveyController()))
}
