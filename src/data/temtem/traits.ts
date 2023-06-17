import type { Trait } from '@/models/Temtem/Trait'

import traitsJson from './traits.json'
import { makeDictFromArray } from '@/utils/dict'

export const traits: Trait[] = traitsJson

export const normalizedTraits = makeDictFromArray(traits, 'name')
