import type { Trait } from '@/models/Temtem/Trait'
import { makeDictFromArray } from '@/utils/dict'

import traitsJson from './traits.json'

export const traits: Trait[] = traitsJson.filter(
  (trait): trait is Trait =>
    trait.nameJa !== undefined &&
    trait.key !== undefined &&
    trait.descriptionJa !== undefined
)

export const traitsByKey = makeDictFromArray(traits, 'key')
export const traitsByName = makeDictFromArray(traits, 'name')
