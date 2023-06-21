import type { Technique } from '@/models/Temtem/Technique'
import { makeDictFromArray } from '@/utils/dict'

import techniquesJson from './techniques.json'

export const techniques: Technique[] = techniquesJson.filter(
  (technique) =>
    technique.nameJa !== undefined &&
    technique.key !== undefined &&
    technique.descriptionJa !== undefined
) as Technique[]

export const techniquesByKey = makeDictFromArray(techniques, 'key')
export const techniquesByName = makeDictFromArray(techniques, 'name')
