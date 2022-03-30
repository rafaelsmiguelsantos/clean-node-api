export interface IHashComparer {
  compare: (plaitext: string, digest: string) => Promise<boolean>
}
