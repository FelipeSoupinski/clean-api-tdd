import { HttpResponse } from '../protocols'
import { ServerError } from '../errors'

export const serverError = (): HttpResponse =>
  ({
    statusCode: 500,
    body: new ServerError()
  })
