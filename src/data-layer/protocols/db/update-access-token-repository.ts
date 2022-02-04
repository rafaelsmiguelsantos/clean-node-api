export interface IUpdateAccessTokenRepository {
  updateToken: (id: string, token: string) => Promise<void>
}
