export type TechniquePriority =
  | 'verylow'
  | 'low'
  | 'normal'
  | 'high'
  | 'veryhigh'
  | 'ultra'

export type SynergyEffect = {
  effect: string
  type: string // damage, priority
  damage: number
}

export type Technique = {
  /** identifier */
  name: string
  wikiUrl: string
  type: string
  class: string
  damage: number
  staminaCost: number
  hold: number
  priority: TechniquePriority
  synergy: string
  synergyEffects: SynergyEffect[]
  targets: string
  description: string
}
