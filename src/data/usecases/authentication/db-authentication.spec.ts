import { AccountModel } from '../../../domain/models/account'
import { LoadAccountByEmailRepository } from '../../protocols/load-account-by-email-repository'
import { DbAuthentication } from './db-authentication'

describe('DbAuthentication UseCases', () => {
  test('Should call LoadAccountByEmailRepository with correct email', () => {
    class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
      async load (email: string): Promise<AccountModel> {
        const account: AccountModel = {
          id: 'any_id',
          name: 'any_name',
          email: 'any_email@mail.com',
          password: 'any_password'
        }
        return new Promise(resolve => resolve(account))
      }
    }
    const loadAccountByEmailRepository = new LoadAccountByEmailRepositoryStub()
    const sut = new DbAuthentication(loadAccountByEmailRepository)
    const loadSpy = jest.spyOn(loadAccountByEmailRepository, 'load')
    void sut.auth({ email: 'any_email@mail.com', password: 'any_password' })
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
