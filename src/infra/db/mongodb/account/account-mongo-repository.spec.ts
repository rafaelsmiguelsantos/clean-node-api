import { AccountMongoRepository } from './account-mongo-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { Collection } from 'mongodb'
import { mockAddAccountParams } from '@/domain/test'

let accountCollection: Collection
beforeAll(async () => { await MongoHelper.connect(process.env.MONGO_URL) })

afterAll(async () => { await MongoHelper.disconnect() })

beforeEach(async () => {
  accountCollection = await MongoHelper.getCollection('accounts')
  await accountCollection.deleteMany({})
})

const mockSut = (): AccountMongoRepository => {
  return new AccountMongoRepository()
}

describe('Account Mongo Repository', () => {
  test('Should return an account on add success', async () => {
    const sut = mockSut()
    const account = await sut.add(mockAddAccountParams())

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_password')
  })

  test('Should return an account on loadByEmail success', async () => {
    const sut = mockSut()
    await accountCollection.insertOne({
      name: 'any',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    const account = await sut.loadByEmail('any_email@mail.com')

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_password')
  })

  test('Should return null if loadByEmail fails', async () => {
    const sut = mockSut()
    const account = await sut.loadByEmail('any_email@mail.com')
    expect(account).toBeFalsy()
  })

  test('Should update the account accessToken on updateAccessToken success', async () => {
    const sut = mockSut()
    const res = await accountCollection.insertOne({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    const fakeAccount = { _id: res.insertedId }
    let account = await accountCollection.findOne(fakeAccount)
    expect(account.accessToken).toBeFalsy()
    await sut.updateAccessToken(res.insertedId.toString(), 'admin')
    account = await accountCollection.findOne(fakeAccount)
    expect(account).toBeTruthy()
    expect(account.accessToken).toBe('admin')
  })
})

describe('loadByToken()', () => {
  test('Should return an account on loadByToken without role', async () => {
    const sut = mockSut()
    await accountCollection.insertOne({
      name: 'any',
      email: 'any_email@mail.com',
      password: 'any_password',
      accessToken: 'any_token'
    })
    const account = await sut.loadByToken('any_token')
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_password')
  })

  test('Should return an account on loadByToken with admin role', async () => {
    const sut = mockSut()
    await accountCollection.insertOne({
      name: 'any',
      email: 'any_email@mail.com',
      password: 'any_password',
      accessToken: 'any_token',
      role: 'admin'
    })
    const account = await sut.loadByToken('any_token', 'admin')
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_password')
  })

  test('Should return null if loadByToken fails', async () => {
    const sut = mockSut()
    const account = await sut.loadByToken('any_email@mail.com')
    expect(account).toBeFalsy()
  })

  test('Should return null on loadByToken with invalid role', async () => {
    const sut = mockSut()
    await accountCollection.insertOne({
      name: 'any',
      email: 'any_email@mail.com',
      password: 'any_password',
      accessToken: 'any_token'
    })
    const account = await sut.loadByToken('any_token', 'admin')
    expect(account).toBeFalsy()
  })

  test('Should return an account on loadByToken if user is admin', async () => {
    const sut = mockSut()
    await accountCollection.insertOne({
      name: 'any',
      email: 'any_email@mail.com',
      password: 'any_password',
      accessToken: 'any_token',
      role: 'admin'
    })
    const account = await sut.loadByToken('any_token')
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_password')
  })
})
