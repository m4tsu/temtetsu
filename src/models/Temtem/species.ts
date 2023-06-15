import type { TemType } from './type'

export type TemTemTechnique = {
  name: string
} & (
  | {
      source: 'Levelling'
      levels: number
    }
  | {
      source: 'TechniqueCourses' | 'Breeding'
    }
)

export type TechniqueSource = TemTemTechnique['source']

export type TemTemEvolitonTreeItem = {
  number: number
  name: string
  stage: number
  levels: number
}

export type TemTemEvolutionType = 'level' | 'special'

export type Species = {
  /** identifier */
  number: number
  name: string
  types: [TemType] | [TemType, TemType]
  portraitWikiUrl: string
  wikiUrl: string
  stats: {
    hp: number
    sta: number
    spd: number
    atk: number
    def: number
    spatk: number
    spdef: number
    total: number
  }
  traits: string[]
  details: {
    heightt: {
      cm: number | '?'
      inches: number | '?'
    }
    weight: {
      kg: number | '?'
      lbs: number | '?'
    }
  }
  techniques: TemTemTechnique[]
  trivia: string[]
  evolution:
    | {
        evolves: true
        stage: number
        evolutionTree: TemTemEvolitonTreeItem[]
        type: TemTemEvolutionType
      }
    | {
        evolves: false
      }
  wikiPortraitUrlLarge: string
  icon: string
}

export type Stats = {
  hp: number
  sta: number
  spd: number
  atk: number
  def: number
  spatk: number
  spdef: number
}

export type BaseStats = Stats & {
  total: number
}
