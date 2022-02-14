export interface AuthenticationModel {
  email: string
  password: string
}
export interface IAuthentication {
  auth: (authentication: AuthenticationModel) => Promise<string>
}
