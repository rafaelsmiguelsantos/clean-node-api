import { AccountModel, AddAccountModel, IAddAccount, Hasher, AddAccountRepository } from './index'

export class DbAddAccount implements IAddAccount {
  constructor (private readonly hasher: Hasher, private readonly addAccountRepository: AddAccountRepository) {
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.hasher.hash(accountData.password)
    const account = await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))
    return account
  }
}
