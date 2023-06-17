import type { TemType } from './Type'

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

export const iconImage = (species: Species) =>
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
