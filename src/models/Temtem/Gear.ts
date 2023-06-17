export type Gear = {
  /** identifier */
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
