import { AccountMongoRepository, BcryptAdapter, JwtAdapter } from '../../infra'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { LoginController } from '../../presentation/controllers/login'
import { DbAuthentication } from '../../data/usecases'
import env from '../config/env'

export const makeLoginController = (): LoginController => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.api_key)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAuthentication = new DbAuthentication(
    accountMongoRepository,
    bcryptAdapter,
    jwtAdapter,
    accountMongoRepository
  )
  const emailValidatorAdapter = new EmailValidatorAdapter()
  return new LoginController(emailValidatorAdapter, dbAuthentication)
}
