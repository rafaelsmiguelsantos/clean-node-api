import { AddAccountRepository } from '../../../../data-layer/protocols/db/add-account-repository'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { AccountModel } from '../../../../domain/models/account'
import { MongoHelper } from '../helpers/mongo-helper'
import { IUpdateAccessTokenRepository, LoadAccountByEmailRepository } from '../../../../data-layer/usecases/authentication'
import { ObjectId } from 'mongodb'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository, IUpdateAccessTokenRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    console.log(accountData)
    await accountCollection.insertOne(accountData)

    return MongoHelper.map(accountData)
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })
    return account && MongoHelper.map(account)
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.updateOne({ _id: new ObjectId(id) }, {
      $set: {
        accessToken: token
      }
    })
  }
}
