import { Hasher } from '../../data-layer/protocols/criptography/hasher'
import bcrypt from 'bcrypt'
import { IHashComparer } from '../../data-layer/usecases/authentication'

export class BcryptAdapter implements Hasher, IHashComparer {
  private readonly salt: number

  constructor (salt: number) {
    this.salt = salt
  }

  async compare (value: string, hash: string): Promise<boolean> {
    const isValid = await bcrypt.compare(value, hash)
    return isValid
  }

  async hash (value: string): Promise<string> {
    const hash = await bcrypt.hash(value, 12)
    return hash
  }
}
