import jwt from 'jsonwebtoken'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter'

const makeSut = (): JwtAdapter => {
  return new JwtAdapter('secret')
}

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return new Promise(resolve => resolve('any_token'))
  }
}))

describe('JWT Adapter', () => {
  test('Should call sign with correct values', async () => {
    const sut = makeSut()
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt('any_id')
    expect(signSpy).toHaveBeenCalledWith({ value: 'any_id' }, 'secret')
  })

  test('Should throw if sign throws', async () => {
    const sut = makeSut()
    jest.spyOn(jwt, 'sign').mockImplementationOnce(
      async () => new Promise((resolve, reject) => reject(new Error()))
    )
    const promise = sut.encrypt('any_id')
    await expect(promise).rejects.toThrow()
  })

  test('Should return a token on success', async () => {
    const sut = makeSut()
    const token = await sut.encrypt('any_id')
    expect(token).toBe('any_token')
  })
})
