export type Trait = {
  /** identifier */
  key: string // name をURLとして利用可能な文字列に変換した文字列
  name: string
  wikiUrl: string
  description: string
  effect: string
  nameJa?: string
  descriptionJa?: string
}
