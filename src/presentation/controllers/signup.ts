import { HttpRequest, HttpResponse, Controller } from '@/presentation/protocols'
import { MissingParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers'

export class SignupController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'password_confirmation']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
