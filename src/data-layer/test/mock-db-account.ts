import { AddAccountRepository } from '@/data-layer/protocols/db//add-account-repository'
import { AccountModel } from '@/domain/models/account'
import { AddAccountParams } from '@/domain/usecases/account/add-account'
import { LoadAccountByEmailRepository } from '@/data-layer/protocols/db/load-account-by-email-repository'
import { LoadAccountByTokenRepository } from '@/data-layer/protocols/db/load-account-by-token-repository'
import { IUpdateAccessTokenRepository } from '@/data-layer/protocols/db/update-access-token-repository'
import { mockAccountModel } from '@/domain/test'

export class AddAccountRepositorySpy implements AddAccountRepository {
  accountModel = mockAccountModel()
  addAccountParams: AddAccountParams

  async add (data: AddAccountParams): Promise<AccountModel> {
    this.addAccountParams = data
    return Promise.resolve(this.accountModel)
  }
}

export class LoadAccountByEmailRepositorySpy implements LoadAccountByEmailRepository {
  accountModel = mockAccountModel()
  email: string

  async loadByEmail (email: string): Promise<AccountModel> {
    this.email = email
    return Promise.resolve(this.accountModel)
  }
}

export class LoadAccountByTokenRepositorySpy implements LoadAccountByTokenRepository {
  accountModel = mockAccountModel()
  token: string
  role: string

  async loadByToken (token: string, role?: string): Promise<AccountModel> {
    this.token = token
    this.role = role
    return Promise.resolve(this.accountModel)
  }
}

export class UpdateAccessTokenRepositorySpy implements IUpdateAccessTokenRepository {
  id: string
  token: string

  async updateAccessToken (id: string, token: string): Promise<void> {
    this.id = id
    this.token = token
    return Promise.resolve()
  }
}
