import { IDecrypter } from '@/data-layer/protocols/criptography/decrypter'
import { IEncrypter } from '@/data-layer/usecases/account/authentication'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements IEncrypter, IDecrypter {
  constructor (private readonly secret: string) { }

  async encrypt (plaintext: string): Promise<string> {
    const ciphertext = await jwt.sign({ id: plaintext }, this.secret)
    return ciphertext
  }

  async decrypt (ciphertext: string): Promise<string> {
    const plaintext: any = await jwt.verify(ciphertext, this.secret)
    return plaintext
  }
}
