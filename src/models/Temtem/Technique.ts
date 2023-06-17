import type { TemType } from './Type'

export type TechniquePriority =
  | 'verylow'
  | 'low'
  | 'normal'
  | 'high'
  | 'veryhigh'
  | 'ultra'

export const priorityIcon = (priority: TechniquePriority) =>
  `/images/temtem/techniques/Techniques_Priority_${priority}.png`

export type SynergyEffect = {
  effect: string
  type: string // damage, priority
  damage: number
}

export type Category = 'Special' | 'Physical' | 'Status'
export const categoryIcon = (category: Category) =>
  `/images/temtem/techniques/Techniques_Categories_${category}.png`

export type Technique = {
  /** identifier */
  name: string
  wikiUrl: string
  type: TemType
  class: Category
  damage: number
  staminaCost: number
  hold: number
  priority: TechniquePriority
  synergy: string
  synergyEffects: SynergyEffect[]
  targets: string
  description: string
  nameJa?: string
  descriptionJa?: string
}
