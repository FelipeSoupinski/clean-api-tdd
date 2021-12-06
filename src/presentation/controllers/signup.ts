import { HttpRequest, HttpResponse } from '@/presentation/protocols'
import { MissingParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers'

export class SignupController {
  handle (httpRequest: HttpRequest): HttpResponse {
    for (const field of ['name', 'email', 'password', 'password_confirmation']) {
      console.log(field)
      if (!httpRequest[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
