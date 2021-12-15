import { Express, Router } from 'express'
import { SignupRoute, LoginRoute } from '../routes'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  SignupRoute(router)
  LoginRoute(router)
}
