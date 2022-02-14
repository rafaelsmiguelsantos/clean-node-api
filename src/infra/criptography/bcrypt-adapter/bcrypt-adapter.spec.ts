import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

const SALT = 12

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return new Promise(resolve => resolve('hash'))
  },
  async compare (): Promise<boolean> {
    return new Promise(resolve => resolve(true))
  }
}))

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(SALT)
}

describe('Bcrypt Adapter', () => {
  test('Should call hash with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.hash('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', SALT)
  })

  test('Should return a valid hash on hash success', async () => {
    const sut = makeSut()
    const hash = await sut.hash('any_value')
    expect(hash).toBe('hash')
  })

  test('Should throw if bcrypt throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.hash('any_value')
    await expect(promise).rejects.toThrow()
  })

  test('Should call compare with correct values', async () => {
    const sut = makeSut()
    const compareSpy = jest.spyOn(bcrypt, 'compare')
    await sut.compare('any_value', 'any_value')
    expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_value')
  })

  test('Should return a true when compare succeeds', async () => {
    const sut = makeSut()
    const isValid = await sut.compare('any_value', 'any_value')
    expect(isValid).toBe(true)
  })

  test('Should return a false when compare fails', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => false)
    const isValid = await sut.compare('any_value', 'hash')
    await expect(isValid).toBe(false)
  })

  test('Should throw if compare throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.compare('any_value', 'hash')
    await expect(promise).rejects.toThrow()
  })
})
