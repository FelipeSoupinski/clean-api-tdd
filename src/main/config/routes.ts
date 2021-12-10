import { Express, Router } from 'express'
import { SignupRoute } from '../routes'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  SignupRoute(router)
}
