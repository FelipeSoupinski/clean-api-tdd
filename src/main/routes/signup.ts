import { Router } from 'express'
import { makeSignUpController } from '../factories/signup'
import { adaptRoute } from '../adapters/express-routes'

export const SignupRoute = (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
}
