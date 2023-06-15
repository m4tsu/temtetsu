import type { Species } from '@/models/Temtem/species'

import speciesJson from './knownTemtemSpecies.json'

export const species: Species[] = speciesJson as unknown as Species[]
