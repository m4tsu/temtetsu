import type { Gear } from '@/models/Temtem/Gear'
import { makeDictFromArray } from '@/utils/dict'

import gearsJson from './gears.json'

export const gears: Gear[] = gearsJson

export const gearsByKey = makeDictFromArray(gears, 'key')

export const gearsByName = makeDictFromArray(gears, 'name')
