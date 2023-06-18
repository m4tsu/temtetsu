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

type SynergyEffectType = 'damage' | 'condition' | 'unknown'
export type SynergyEffect = {
  /**
   * type: damage... ex.) effect: "+80 Damage"
   * type: condition... ex.) effect: "2 Turns Asleep"
   * type: unknown... ex.) effect: "SPD"
   */
  effect: string
  type: SynergyEffectType // damage, priority, condition
  damage: number
}

export type Category = 'Special' | 'Physical' | 'Status'
export const categoryIcon = (category: Category) =>
  `/images/temtem/techniques/Techniques_Categories_${category}.png`

export type Targets =
  | 'Single Other Target'
  | 'Self'
  | 'Single Target'
  | 'All'
  | 'All Other Temtem'
  | 'Single Team'
  | 'Other Team or Ally'
export const targetsJaMap = {
  All: '全体',
  'All Other Temtem': '自身以外',
  Self: '自身',
  'Single Other Target': '自身以外の1体',
  'Single Target': '1体',
  'Single Team': '1チーム',
  'Other Team or Ally': '相手チームまたは味方',
} as const satisfies {
  [k in Targets]: string
}

export type Synergy = 'None' | TemType

export type Technique = {
  /** identifier */
  key: string // name をURLとして利用可能な文字列に変換した文字列
  name: string
  wikiUrl: string
  type: TemType
  class: Category
  damage: number
  staminaCost: number
  hold: number
  priority: TechniquePriority
  synergy: Synergy
  synergyEffects: SynergyEffect[]
  targets: Targets
  description: string
  nameJa?: string
  descriptionJa?: string
}
