export type Gear = {
  /** identifier */
  key: string // name の Space を _ に変換したもの
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
  nameJa?: string
  descriptionJa?: string
}
