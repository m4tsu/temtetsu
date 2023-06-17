import type { Species } from '@/models/Temtem/Species'
import { makeDictFromArray } from '@/utils/dict'

import speciesJson from './species.json'

export const species: Species[] = speciesJson as unknown as Species[]

export const normalizedSpecies = makeDictFromArray(species, 'number')
