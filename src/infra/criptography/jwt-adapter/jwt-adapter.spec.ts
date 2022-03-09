import { JwtAdapter } from './jwt-adapter'
import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return Promise.resolve('any_token')
  },
  async verify (): Promise<string> {
    return Promise.resolve('any_value')
  }
}))

const mockSut = (): JwtAdapter => {
  return new JwtAdapter('secret')
}

describe('Jwt Adapter', () => {
  test('Should call sign with correct values', async () => {
    const sut = mockSut()
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt('any_id')
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret')
  })

  test('Should return a token on sign success', async () => {
    const sut = mockSut()
    const accessToken = await sut.encrypt('any_id')
    expect(accessToken).toBe('any_token')
  })

  test('Should throw with sign throws', async () => {
    const sut = mockSut()
    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.encrypt('any_id')
    await expect(promise).rejects.toThrow()
  })
})

describe('verify() method', () => {
  test('Should call verify with correct values', async () => {
    const sut = mockSut()
    const verifySpy = jest.spyOn(jwt, 'verify')
    await sut.decrypt('any_token')
    expect(verifySpy).toHaveBeenCalledWith('any_token', 'secret')
  })

  test('Should return a value on verify success', async () => {
    const sut = mockSut()
    const value = await sut.decrypt('any_token')
    expect(value).toBe('any_value')
  })

  test('Should throw with verify throws', async () => {
    const sut = mockSut()
    jest.spyOn(jwt, 'verify').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.decrypt('any_token')
    await expect(promise).rejects.toThrow()
  })
})
