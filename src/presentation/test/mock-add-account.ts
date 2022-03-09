import { AccountModel } from '@/domain/models/account'
import { mockAddAccountModel } from '@/domain/test'
import { AddAccountParams, IAddAccount } from '@/domain/usecases/account/add-account'

export const mockAddAccount = (): IAddAccount => {
  class AddAccountStub implements IAddAccount {
    async add (account: AddAccountParams): Promise<AccountModel> {
      return Promise.resolve(mockAddAccountModel())
    }
  }
  return new AddAccountStub()
}
