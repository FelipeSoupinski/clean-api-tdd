import { HttpResponse } from '../protocols'
import { UnauthorizedError } from '../errors'

export const unauthorized = (): HttpResponse =>
  ({
    statusCode: 401,
    body: new UnauthorizedError()
  })
