import { Authentication, AuthenticationModel } from '@/domain/usecases'
import { LoadAccountByEmailRepository, HashComparer, Encrypter, UpdateTokenRepository } from '@/data/protocols'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateTokenRepository: UpdateTokenRepository
  ) {}

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authentication.email)
    if (account) {
      const compare = await this.hashComparer.compare(authentication.password, account.password)
      if (compare) {
        const token = await this.encrypter.encrypt(account.id)
        await this.updateTokenRepository.updateToken(account.id, token)
        return token
      }
    }
    return null
  }
}
