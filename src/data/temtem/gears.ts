import type { Gear } from '@/models/Temtem/Gear'
import { makeDictFromArray } from '@/utils/dict'

import gearsJson from './gears.json'

export const gears: Gear[] = gearsJson.filter(
  (gear): gear is Gear =>
    gear.nameJa !== undefined &&
    gear.key !== undefined &&
    gear.descriptionJa !== undefined
)

export const gearsByKey = makeDictFromArray(gears, 'key')

export const gearsByName = makeDictFromArray(gears, 'name')
