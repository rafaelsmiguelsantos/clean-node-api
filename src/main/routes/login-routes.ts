
import { Router } from 'express'
import { makeSignUpController } from '../factories/signup/signup-factory'
import { makeLoginController } from '../factories/login/login-factory'
import { adaptRoutes } from '../adapters/express-routes-adapter'

export default (router: Router): void => {
  router.post('/signup', adaptRoutes(makeSignUpController()))
  router.post('/login', adaptRoutes(makeLoginController()))
}
