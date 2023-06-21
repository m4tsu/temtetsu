export type Gear = {
  /** identifier */
  key: string // name をURLとして利用可能な文字列に変換した文字列
  name: string
  wikiUrl: string
  wikiIconUrl: string
  icon: string
  category: string
  consumable: boolean
  limitedQuantity: boolean
  purchasable: boolean
  buyPrice: number
  description: string
  gameDescription: string
  nameJa: string // これが無いやつは対戦で使えないやつらしいから無視する
  descriptionJa: string
}
