import type { TemType } from './Type'

export const STATS_NAMES = [
  'hp',
  'sta',
  'spd',
  'atk',
  'def',
  'spatk',
  'spdef',
  'total',
] as const
export type StatsName = (typeof STATS_NAMES)[number]
export type Stats = {
  [key in StatsName]: number
}

export type BaseStats = Stats & {
  total: number
}

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
  number: string
  name: string
  nameJa: string
  types: [TemType] | [TemType, TemType]
  portraitWikiUrl: string
  wikiUrl: string
  stats: Stats
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
        to: null | Record<string, unknown>
      }
    | {
        evolves: false
      }
  wikiPortraitUrlLarge: string
  icon: string
}

export const iconImage = (species: Pick<Species, 'icon'>) =>
  `https://temtem-api.mael.tech${species.icon}`

export const formatEvolutionTree = (
  species: Species,
  treeItems: TemTemEvolitonTreeItem[]
):
  | {
      type: 'multiple'
      trees: TemTemEvolitonTreeItem[][]
    }
  | {
      type: 'single'
      tree: TemTemEvolitonTreeItem[]
    } => {
  const isMultiTree =
    treeItems.filter((item) => String(item.number) === species.number).length >
    1
  if (isMultiTree) {
    let currentTree: TemTemEvolitonTreeItem[] = []
    const trees: TemTemEvolitonTreeItem[][] = []
    treeItems.forEach((item) => {
      if (species.number === String(item.number)) {
        if (currentTree.length > 0) {
          trees.push(currentTree)
        }
        currentTree = []
      } else {
        currentTree.push(item)
      }
    })
    if (currentTree.length > 0) {
      trees.push(currentTree)
    }

    return {
      type: 'multiple',
      trees,
    }
  } else {
    return {
      type: 'single',
      tree: treeItems,
    }
  }
}
