import type { Trait } from '@/models/Temtem/Trait'
import { makeDictFromArray } from '@/utils/dict'

import traitsJson from './traits.json'

export const traits: Trait[] = traitsJson

export const traitsByKey = makeDictFromArray(traits, 'key')
export const traitsByName = makeDictFromArray(traits, 'name')
