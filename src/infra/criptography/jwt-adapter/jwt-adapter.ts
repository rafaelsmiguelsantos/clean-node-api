import jwt from 'jsonwebtoken'
import { IEncrypter } from '../../../data-layer/usecases/authentication'

export class JwtAdapter implements IEncrypter {
  constructor (private readonly secret: string) { }

  async encrypt (value: string): Promise<string> {
    await jwt.sign({ id: 'any_id' }, this.secret)
    return null
  }
}
