import { AccountModel, AddAccountModel, IAddAccount, Encrypter, AddAccountRepository } from './index'

export class DbAddAccount implements IAddAccount {
  private readonly encrypter: Encrypter
  private readonly addAccountRepository: AddAccountRepository

  constructor (encrypter: Encrypter, addAccountRepository: AddAccountRepository) {
    this.encrypter = encrypter
    this.addAccountRepository = addAccountRepository
  }

  async addAccount (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password)
    await this.addAccountRepository.addAccount(Object.assign(accountData, { password: hashedPassword }))
    return new Promise(resolve => resolve(null))
  }
}
