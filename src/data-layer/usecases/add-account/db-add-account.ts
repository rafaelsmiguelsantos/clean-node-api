import { AccountModel, AddAccountModel, IAddAccount, IHasher, AddAccountRepository, LoadAccountByEmailRepository } from './index'

export class DbAddAccount implements IAddAccount {
  constructor (private readonly hasher: IHasher, private readonly addAccountRepository: AddAccountRepository, private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository) {
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(accountData.email)
    if (!account) {
      const hashedPassword = await this.hasher.hash(accountData.password)
      const newAccount = await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))
      return newAccount
    }
    return null
  }
}
