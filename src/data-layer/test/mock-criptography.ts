
import { IDecrypter } from '@/data-layer/protocols/criptography/decrypter'
import { IEncrypter } from '@/data-layer/protocols/criptography/encrypter'
import { IHasher } from '@/data-layer/protocols/criptography/hasher'
import faker from 'faker'
import { IHashComparer } from '../protocols/criptography/hash-comparer'

export class HasherSpy implements IHasher {
  digest = faker.random.uuid()
  plaintext: string

  async hash (plaintext: string): Promise<string> {
    this.plaintext = plaintext
    return Promise.resolve(this.digest)
  }
}

export class HashComparerSpy implements IHashComparer {
  plaintext: string
  digest: string
  isValid = true

  async compare (plaintext: string, digest: string): Promise<boolean> {
    this.plaintext = plaintext
    this.digest = digest
    return Promise.resolve(this.isValid)
  }
}

export class EncrypterSpy implements IEncrypter {
  ciphertext = faker.random.uuid()
  plaintext: string

  async encrypt (plaintext: string): Promise<string> {
    this.plaintext = plaintext
    return Promise.resolve(this.ciphertext)
  }
}

export class DecrypterSpy implements IDecrypter {
  plaintext = faker.internet.password()
  ciphertext: string

  async decrypt (ciphertext: string): Promise<string> {
    this.ciphertext = ciphertext
    return Promise.resolve(this.plaintext)
  }
}
