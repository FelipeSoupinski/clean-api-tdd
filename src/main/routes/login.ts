import { Router } from 'express'
import { makeLoginController } from '../factories/login'
import { adaptRoute } from '../adapters/express-routes'

export const LoginRoute = (router: Router): void => {
  router.post('/login', adaptRoute(makeLoginController()))
}
