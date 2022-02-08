import { AddAccountRepository } from '../../../../data-layer/protocols/db/add-account-repository'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { AccountModel } from '../../../../domain/models/account'
import { MongoHelper } from '../helpers/mongo-helper'
import { LoadAccountByEmailRepository } from '../../../../data-layer/usecases/authentication'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository {
  async addAccount (accountData: AddAccountModel): Promise<AccountModel> {
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
}
