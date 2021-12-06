import { HttpResponse } from '@/presentation/protocols'
import { ServerError } from '@/presentation/errors'

export const serverError = (): HttpResponse =>
  ({
    statusCode: 500,
    body: new ServerError()
  })
