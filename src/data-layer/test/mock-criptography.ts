
import { IHashComparer } from '@/data-layer/protocols/criptography/hash-comparer'
import { IDecrypter } from '@/data-layer/protocols/criptography/decrypter'
import { IEncrypter } from '@/data-layer/protocols/criptography/encrypter'
import { IHasher } from '@/data-layer/protocols/criptography/hasher'

export const mockHasher = (): IHasher => {
  class HasherStub implements IHasher {
    async hash (value: string): Promise<string> {
      return await Promise.resolve('hashed_password')
    }
  }
  return new HasherStub()
}

export const mockDecrypter = (): IDecrypter => {
  class DecrypterStub implements IDecrypter {
    async decrypt (token: string): Promise<string> {
      return Promise.resolve('any_token')
    }
  }
  return new DecrypterStub()
}

export const mockEncrypter = (): IEncrypter => {
  class EncrypterStub implements IEncrypter {
    async encrypt (value: string): Promise<string> {
      return Promise.resolve('any_token')
    }
  }
  return new EncrypterStub()
}

export const mockHashComparer = (): IHashComparer => {
  class HashComparerStub implements IHashComparer {
    async compare (value: string, hash: string): Promise<boolean> {
      return Promise.resolve(true)
    }
  }
  return new HashComparerStub()
}
