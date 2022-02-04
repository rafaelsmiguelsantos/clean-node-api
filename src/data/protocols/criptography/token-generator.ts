export class ITokenGenerator {
  generate: (id: string) => Promise<string>
}
