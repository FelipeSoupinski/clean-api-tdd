import { EmailValidator, HttpRequest, HttpResponse } from '../protocols'
import { badRequest, ok, serverError, unauthorized } from '../helpers'
import { InvalidParamError, MissingParamError } from '../errors'
import { Authentication } from '../../domain/usecases'
import { Controller } from '../protocols/controller'

export class LoginController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { email, password } = httpRequest.body
      if (!this.emailValidator.isValid(email)) {
        return badRequest(new InvalidParamError('email'))
      }
      const token = await this.authentication.auth({ email, password })
      if (!token) {
        return unauthorized()
      }
      return ok({ token })
    } catch (error) {
      return serverError()
    }
  }
}
