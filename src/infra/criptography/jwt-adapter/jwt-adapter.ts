import jwt from 'jsonwebtoken'
import { IDecrypter } from '../../../data-layer/protocols/criptography/decrypter'
import { IEncrypter } from '../../../data-layer/usecases/authentication'

export class JwtAdapter implements IEncrypter, IDecrypter {
  constructor (private readonly secret: string) { }

  async encrypt (value: string): Promise<string> {
    const accessToken = await jwt.sign({ id: value }, this.secret)
    return accessToken
  }

  async decrypt (value: string): Promise<string> {
    await jwt.verify(value, this.secret)
    return null
  }
}
