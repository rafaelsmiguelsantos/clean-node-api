import { AccountModel, AddAccountModel, IAddAccount, Hasher, AddAccountRepository } from './index'

export class DbAddAccount implements IAddAccount {
  constructor (private readonly encrypter: Hasher, private readonly addAccountRepository: AddAccountRepository) {
  }

  async addAccount (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.hash(accountData.password)
    const account = await this.addAccountRepository.addAccount(Object.assign(accountData, { password: hashedPassword }))
    return account
  }
}
