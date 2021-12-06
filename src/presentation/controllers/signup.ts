import { HttpRequest, HttpResponse } from '@/presentation/protocols'

export class SignupController {
  handle (httpRequest: HttpRequest): HttpResponse {
    return {
      statusCode: 400
    }
  }
}
