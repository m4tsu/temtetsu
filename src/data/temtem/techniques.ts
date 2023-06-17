import type { Technique } from '@/models/Temtem/Technique'
import { makeDictFromArray } from '@/utils/dict'

import techniquesJson from './techniques.json'

export const techniques: Technique[] = techniquesJson as Technique[]

export const normalizedTechniques = makeDictFromArray(techniques, 'name')
