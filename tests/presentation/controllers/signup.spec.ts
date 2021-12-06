import { SignupController } from '@/presentation/controllers/signup'

describe('Signup Controller', () => {
  test('Should return 400 if no name is provided', async () => {
    const sut = new SignupController()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        password_confirmation: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })
})
