export class IEncrypter {
  encrypt: (value: string) => Promise<string>
}
