import jwt from 'jsonwebtoken'
import { Encrypter } from '@/data/protocols'

export class JwtAdapter implements Encrypter {
  constructor (private readonly key: string) {}

  async encrypt (value: string): Promise<string> {
    const token = jwt.sign({ value }, this.key)
    return token
  }
}
