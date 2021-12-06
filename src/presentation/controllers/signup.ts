import HttpRequest from '@/domain/http-request'
import HttpResponse from '@/domain/http-response'

export class SignupController {
  handle (httpRequest: HttpRequest): HttpResponse {
    return {
      statusCode: 400
    }
  }
}
