export class IEncrypter {
  encrypt: (plaintext: string) => Promise<string>
}
